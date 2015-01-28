/*global placeCaret: false, Blob: false */

module('images', {
    setup: function () {
        this.clock = sinon.useFakeTimers();

        $('#qunit-fixture').html('<div class="editable"></div>');
        this.$el = $('.editable');
        this.$el.mediumInsert();
        this.addon = this.$el.data('plugin_mediumInsertImages');

        // Place caret into first paragraph
        placeCaret(this.$el.find('p').get(0), 0);
    },
    teardown: function () {
        this.clock.restore();
    }
});

asyncTest('image preview', function () {
    var that = this;

    this.$el.find('p').click();

    this.addon.uploadAdd(null, {
        autoUpload: true,
        files: [new Blob([''], { type: 'image/jpeg' })],
        submit: function () {
            equal(that.$el.find('.medium-insert-images').length, 1, '.medium-insert-images div added');
            equal(that.$el.find('.medium-insert-images img').length, 1, 'image added');
            equal(that.$el.find('.medium-insert-images .medium-insert-images-progress').length, 1, 'progressbar added');
            ok(that.$el.find('.medium-insert-images img').attr('src').match(/^data:/), 'preview is displayed');
            start();
        },
        process: function () {
            return this;
        },
        done: function (callback) {
            callback();
        }
    });
});

test('image preview replaced by uploaded image', function () {
    this.$el.prepend('<div class="medium-insert-images medium-insert-active">'+
        '<figure><img src="data:" alt=""></figure>'+
    '</div>');

    this.addon.uploadDone(null, {
        context: this.$el.find('figure'),
        result: {
            files: [
                { url: 'test.jpg' }
            ]
        }
    });

    equal(this.$el.find('.medium-insert-images img').attr('src'), 'test.jpg', 'preview replaced with uploaded image');
});

asyncTest('image upload without preview', function () {
    var that = this;

    this.addon.options.preview = false;
    this.$el.find('p').click();

    this.addon.uploadAdd(null, {
        autoUpload: true,
        files: [new Blob([''], { type: 'image/jpeg' })],
        submit: function () {
            equal(that.$el.find('.medium-insert-images').length, 1, '.medium-insert-images div added');
            equal(that.$el.find('.medium-insert-images progress').length, 1, 'progressbar added');
            equal(that.$el.find('.medium-insert-images img').length, 0, 'no preview displayed');

            that.addon.uploadDone(null, {
                result: {
                    files: [
                        { url: 'test.jpg' }
                    ]
                }
            });

            equal(that.$el.find('.medium-insert-images img').attr('src'), 'test.jpg', 'preview replaced with uploaded image');
            start();
        },
        process: function () {
            return this;
        },
        done: function (callback) {
            callback();
        }
    });
});

asyncTest('triggering input event on uploadDone', function () {
    var that = this;

    this.$el.one('input', function () {
        ok(1, 'input triggered');
        start();
    });

    this.stub(this.addon, 'showImage', function () {
        that.addon.showImage.restore();
    });

    this.addon.uploadDone(null, {
        result: {
            files: [
                { url: 'test.jpg' }
            ]
        }
    });
});

test('selecting image', function () {
    this.$el.find('p')
        .addClass('medium-insert-images')
        .append('<figure><img src="image1.jpg" alt=""></figure>');

    this.$el.find('img').click();
    this.clock.tick(50);

    ok(this.$el.find('img').hasClass('medium-insert-image-active'), 'image is selected');
    equal($('.medium-insert-images-toolbar').length, 1, 'image toolbar added');
});

test('unselecting image', function () {
    this.$el.find('p')
        .addClass('medium-insert-images')
        .append('<figure><img src="image1.jpg" alt="" class="medium-insert-image-active"></figure>');

    this.$el.click();

    equal(this.$el.find('img').hasClass('medium-insert-image-active'), false, 'image is unselected');
    equal($('.medium-insert-images-toolbar').length, 0, 'image toolbar removed');
});

test('removing image', function () {
    var $event = $.Event('keydown');

    $event.which = 8;

    this.$el.find('p')
        .addClass('medium-insert-images')
        .append('<figure><img src="image1.jpg" alt=""></figure>'+
            '<figure><img src="image2.jpg" alt="" class="medium-insert-image-active"></figure>');

    this.$el.trigger($event);

    equal(this.$el.find('img').length, 1, 'image deleted');
    equal(this.$el.find('img').attr('src'), 'image1.jpg', 'not selected image was not deleted');


    this.$el.find('img').addClass('medium-insert-image-active');
    this.$el.trigger($event);

    equal(this.$el.find('.medium-insert-images').length, 0, 'whole .medium-insert-images was deleted');
    equal($('.medium-insert-images-toolbar').length, 0, 'image toolbar removed');
});

asyncTest('removing image triggers input event', function () {
   var $event = $.Event('keydown');

   this.$el.one('input', function () {
       ok(1, 'input triggered');
       start();
   });

   $event.which = 8;

   this.$el.find('p')
       .addClass('medium-insert-images')
       .append('<figure><img src="image1.jpg" alt=""></figure>'+
           '<figure><img src="image2.jpg" alt="" class="medium-insert-image-active"></figure>');

   this.$el.trigger($event);
});

asyncTest('deleting file', function () {
    var $event = $.Event('keydown');

    $event.which = 8;

    this.$el.find('p')
        .addClass('medium-insert-images')
        .append('<figure><img src="image1.jpg" alt=""></figure>'+
            '<figure><img src="image2.jpg" alt="" class="medium-insert-image-active"></figure>');

    this.stub(jQuery, 'post', function () {
       ok(1, 'ajax call created');
       jQuery.post.restore();
       start();
    });

    this.$el.trigger($event);
});

test('choosing image style', function () {
    var $p = this.$el.find('p')
        .attr('class', 'medium-insert-images medium-insert-active medium-insert-images-left')
        .append('<figure><img src="image1.jpg" alt=""></figure>');

    $p.find('img').click();
    this.clock.tick(50);

    $('.medium-insert-images-toolbar .medium-editor-action').first().click();

    ok($p.hasClass('medium-insert-images-wide'), 'image style added');
    equal($p.hasClass('medium-insert-images-left'), false, 'old style removed');
});

asyncTest('choosing image style triggers input event', function () {
    var $p = this.$el.find('p')
        .attr('class', 'medium-insert-images medium-insert-active medium-insert-images-left')
        .append('<figure><img src="image1.jpg" alt=""></figure>');

    this.$el.one('input', function () {
        ok(1, 'input triggered');
        start();
    });

    $p.find('img').click();
    this.clock.tick(50);

    $('.medium-insert-images-toolbar .medium-editor-action').first().click();
});

asyncTest('choosing image style calls callback function', function () {
    $('#qunit-fixture').html('<div class="editable"></div>');
    this.$el = $('.editable');

    this.$el.mediumInsert({
        addons: {
            images: {
                styles: {
                    wide: {
                        added: function () {
                            ok(1, 'callback function called');
                            start();
                        }
                    }
                }
            }
        }
    });

    this.$el.find('p')
        .addClass('medium-insert-images')
        .append('<figure><img src="image1.jpg" alt=""></figure>');

    // Place caret into first paragraph
    placeCaret(this.$el.find('p').get(0), 0);

    this.$el.find('img').click();
    this.clock.tick(50);

    $('.medium-insert-images-toolbar .medium-editor-action').first().click();
});