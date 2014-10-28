/*global placeCaret: false */

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

test('image done uploading', function () {
    this.$el.find('p').click();
    
    this.addon.uploadDone(null, { 
        result: { 
            files: [
                { url: 'image1.jpg' }, 
                { url: 'image2.jpg' }
            ]
        }
    });
        
    equal(this.$el.find('.mediumInsert-images').length, 1, '.mediumInsert-images div added');
    equal(this.$el.find('.mediumInsert-images img').length, 2, '2 images added');
    equal(this.$el.find('.mediumInsert-images img').first().attr('src'), 'image1.jpg', '1st image is correct');
    equal(this.$el.find('.mediumInsert-images img').last().attr('src'), 'image2.jpg', '2st image is correct');
});

test('selecting image', function () {
    this.$el.find('p').append('<div class="mediumInsert-images">'+
        '<figure><img src="image1.jpg" alt=""></figure>'+
    '</div>');

    this.$el.find('img').click();
    this.clock.tick(50);
    
    ok(this.$el.find('img').hasClass('mediumInsert-imageActive'), 'image is selected');
    equal(this.$el.find('.mediumInsert-imageToolbar').length, 1, 'image toolbar added');
});

test('unselecting image', function () {
    this.$el.find('p').append('<div class="mediumInsert-images">'+
        '<figure><img src="image1.jpg" alt="" class="mediumInsert-imageActive"></figure>'+
    '</div>');

    this.$el.click();
    
    equal(this.$el.find('img').hasClass('mediumInsert-imageActive'), false, 'image is unselected');
    equal(this.$el.find('.mediumInsert-imageToolbar').length, 0, 'image toolbar removed');
});

test('removing image', function () {
    var $event = $.Event("keydown");
    
    $event.keyCode = 8;

    this.$el.find('p').append('<div class="mediumInsert-images">'+
        '<figure><img src="image1.jpg" alt=""></figure>'+
        '<figure><img src="image2.jpg" alt="" class="mediumInsert-imageActive"></figure>'+
    '</div>');

    this.$el.trigger($event);
    
    equal(this.$el.find('img').length, 1, 'image deleted');
    equal(this.$el.find('img').attr('src'), 'image1.jpg', 'not selected image was not deleted');
    
    
    this.$el.find('img').addClass('mediumInsert-imageActive');
    this.$el.trigger($event);
    
    equal(this.$el.find('.mediumInsert-images').length, 0, 'whole .mediumInsert-images was delated');
});

asyncTest('deleting file', function () {
    var $event = $.Event("keydown");
    
    $event.keyCode = 8;

    this.$el.find('p').append('<div class="mediumInsert-images">'+
        '<figure><img src="image1.jpg" alt=""></figure>'+
        '<figure><img src="image2.jpg" alt="" class="mediumInsert-imageActive"></figure>'+
    '</div>');

    this.stub(jQuery, 'post', function () {
       ok(1, 'ajax call created');
       jQuery.post.restore();
       start(); 
    });

    this.$el.trigger($event);
});

test('choosing image style', function () {
    var $p = this.$el.find('p')
        .append('<div class="mediumInsert-images">'+
            '<figure><img src="image1.jpg" alt=""></figure>'+
        '</div>')
        .addClass('medium-insert-images-left');

    $p.find('img').click();
    this.clock.tick(50);
    
    this.$el.find('.mediumInsert-imageToolbar .medium-editor-action').first().click();

    ok($p.hasClass('medium-insert-images-wide'), 'image style added');
    equal($p.hasClass('medium-insert-images-left'), false, 'old style removed');
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
    
    this.$el.find('p').append('<div class="mediumInsert-images">'+
            '<figure><img src="image1.jpg" alt=""></figure>'+
        '</div>');
        
    // Place caret into first paragraph 
    placeCaret(this.$el.find('p').get(0), 0);

    this.$el.find('img').click();
    this.clock.tick(50);
    
    this.$el.find('.mediumInsert-imageToolbar .medium-editor-action').first().click();
});