describe('Images addon', function () {
    beforeEach(function () {
        $('body').append('<div id="fixtures"><div class="editable"></div></div>');
        this.$el = $('.editable');
        this.editor = new MediumEditor(this.$el.get(0));
        this.$el.mediumInsert({
            editor: this.editor
        });
        this.addon = this.$el.data('plugin_mediumInsertImages');

        jasmine.clock().install();
    });

    afterEach(function () {
        $('#fixtures').remove();

        jasmine.clock().uninstall();
    });

    it('creates preview image before upload', function (done) {
        var $p = this.$el.find('p');

        placeCaret($p.get(0), 0);
        $p.click();

        this.addon.uploadAdd(null, {
            autoUpload: true,
            files: [new Blob([''], { type: 'image/jpeg' })],
            submit: function () {
                expect(this.$el.find('.medium-insert-images').length).toEqual(1);
                expect(this.$el.find('.medium-insert-images img').length).toEqual(1);
                expect(this.$el.find('.medium-insert-images .medium-insert-images-progress').length).toEqual(1);
                expect(this.$el.find('.medium-insert-images img').attr('src').match(/^data:/).length).toEqual(1);
                done();
            }.bind(this),
            process: function () {
                return this;
            },
            done: function (callback) {
                callback();
            }
        });
    });

    it('replaces preview by uploaded image', function () {
        var stubbedImage = jasmine.createSpy('image');
        spyOn(this.addon, 'getDOMImage').and.returnValue(stubbedImage);
        this.$el.prepend('<div class="medium-insert-images medium-insert-active"><figure><img src="data:" alt=""></figure></div>');

        this.addon.uploadDone(null, {
            context: this.$el.find('figure'),
            result: {
                files: [
                    { url: 'test.jpg' }
                ]
            }
        });
        stubbedImage.onload();
        expect(this.$el.find('.medium-insert-images img').attr('src')).toEqual('test.jpg');
    });

    it('uploads without preview when it is set like this in options', function (done) {
        var $p = this.$el.find('p');

        this.addon.options.preview = false;

        placeCaret($p.get(0), 0);
        $p.click();

        this.addon.uploadAdd(null, {
            autoUpload: true,
            files: [new Blob([''], { type: 'image/jpeg' })],
            submit: function () {
                expect(this.$el.find('.medium-insert-images').length).toEqual(1);
                expect(this.$el.find('.medium-insert-images progress').length).toEqual(1);
                expect(this.$el.find('.medium-insert-images img').length).toEqual(0);

                this.addon.uploadDone(null, {
                    result: {
                        files: [
                            { url: 'test.jpg' }
                        ]
                    }
                });

                expect(this.$el.find('.medium-insert-images img').attr('src')).toEqual('test.jpg');
                done();
            }.bind(this),
            process: function () {
                return this;
            },
            done: function (callback) {
                callback();
            }
        });
    });

    it('automatically adds grid when multiple images are in a set', function (done) {
        this.addon.options.preview = false;
        this.$el.prepend('<div class="medium-insert-images medium-insert-active">' +
            '<figure></figure>' +
            '<figure></figure>' +
        '</div>');

        this.addon.uploadAdd(null, {
            autoUpload: true,
            files: [new Blob([''], { type: 'image/jpeg' })],
            submit: function () {
                this.addon.uploadDone(null, {
                    result: {
                        files: [
                            { url: 'test.jpg' }
                        ]
                    }
                });

                expect(this.$el.find('.medium-insert-images').hasClass('medium-insert-images-grid')).toBe(true);
                done();
            }.bind(this),
            process: function () {
                return this;
            },
            done: function (callback) {
                callback();
            }
        });
    });

    it('doesn\'t add grid when not enough images are in a set', function (done) {
        this.addon.options.preview = false;
        this.$el.prepend('<div class="medium-insert-images medium-insert-active">' +
            '<figure></figure>' +
        '</div>');

        this.addon.uploadAdd(null, {
            autoUpload: true,
            files: [new Blob([''], { type: 'image/jpeg' })],
            submit: function () {
                this.addon.uploadDone(null, {
                    result: {
                        files: [
                            { url: 'test.jpg' }
                        ]
                    }
                });

                expect(this.$el.find('.medium-insert-images').hasClass('medium-insert-images-grid')).toBe(false);
                done();
            }.bind(this),
            process: function () {
                return this;
            },
            done: function (callback) {
                callback();
            }
        });
    });

    it('triggers input event on showImage', function (done) {
        this.editor.subscribe('editableInput', function () {
            expect(true).toBe(true);
            done();
        });

        this.addon.showImage(null, {
            submit: function () {}
        });
    });

    it('triggers input event twice on showImage for preview', function (done) {
        var inputTriggerCount = 0,
            stubbedImage = jasmine.createSpy('image'),
            context = this.$el.prepend('<div class="medium-insert-images medium-insert-active">' +
                '<figure><img src="data:" alt=""></figure>' +
            '</div>');

        spyOn(this.addon, 'getDOMImage').and.returnValue(stubbedImage);

        this.editor.subscribe('editableInput', function () {
            inputTriggerCount++;

            if (inputTriggerCount === 2) {
                expect(true).toBe(true);
                done();
            }
        });

        this.addon.showImage('http://image.co', {
            context: context
        });
        stubbedImage.onload();
    });

    it('calls uploadCompleted when preview is enabled', function (done) {
        var stubbedImage = jasmine.createSpy('image'),
            context = this.$el.prepend('<div class="medium-insert-images medium-insert-active">' +
                '<figure><img src="data:" alt=""></figure>' +
            '</div>');

        spyOn(this.addon, 'getDOMImage').and.returnValue(stubbedImage);

        this.addon.options.uploadCompleted = function () {
            expect(true).toBe(true);
            done();
        };

        this.addon.showImage('http://image.co', {
            context: context
        });
        stubbedImage.onload();
    });

    it('calls uploadCompleted when preview is disabled', function (done) {
        this.addon.options.preview = false;

        this.addon.options.uploadCompleted = function () {
            expect(true).toBe(true);
            done();
        };

        this.addon.showImage(null, {
            submit: function () {}
        });
    });

    it('supports selecting image', function () {
        this.$el.find('p')
            .addClass('medium-insert-images')
            .append('<figure><img src="image1.jpg" alt=""></figure>');

        this.$el.find('img').click();
        jasmine.clock().tick(50);

        expect(this.$el.find('img').hasClass('medium-insert-image-active')).toBe(true);
        expect($('.medium-insert-images-toolbar').length).toEqual(1);
        expect($('.medium-insert-images-toolbar2').length).toEqual(1);
        expect(this.$el.find('figcaption').length).toEqual(1);
    });

    it('supports disabling captions', function () {
        $('#fixture').html('<div class="editable"><div class="medium-insert-images"><figure><img src="image1.jpg" alt=""></figure></div></div>');
        this.$el = $('.editable');
        this.$el.mediumInsert({
            addons: {
                images: {
                    captions: false
                }
            }
        });

        this.$el.find('img').click();
        jasmine.clock().tick(50);

        expect(this.$el.find('figcaption').length).toEqual(0);
    });

    it('removes placeholder after clicking on caption', function () {
        this.$el.find('p')
            .addClass('medium-insert-images')
            .append('<figure><img src="image1.jpg" alt="" class="medium-insert-image-active"><figcaption class="medium-insert-caption-placeholder"></figcaption></figure>');

        this.$el.find('.medium-insert-caption-placeholder').click();
        jasmine.clock().tick(50);

        expect(this.$el.find('figcaption').hasClass('medium-insert-caption-placeholder')).toEqual(false);
    });

    it('supports unselecting image', function () {
        this.$el.find('p')
            .addClass('medium-insert-images')
            .append('<figure><img src="image1.jpg" alt="" class="medium-insert-image-active"><figcaption></figcaption></figure>');

        this.$el.click();

        expect(this.$el.find('img').hasClass('medium-insert-image-active')).toBe(false);
        expect($('.medium-insert-images-toolbar').length).toEqual(0);
        expect($('.medium-insert-images-toolbar2').length).toEqual(0);
        expect(this.$el.find('figcaption').length).toEqual(0);
    });

    it('supports removing image', function () {
        var $event = $.Event('keydown');

        $event.which = 8;

        this.$el.find('p')
            .addClass('medium-insert-images medium-insert-images-grid')
            .append('<figure><img src="image1.jpg" alt=""></figure>' +
                '<figure><img src="image2.jpg" alt=""></figure>' +
                '<figure><img src="image3.jpg" alt=""></figure>' +
                '<figure><img src="image4.jpg" alt="" class="medium-insert-image-active"></figure>');

        this.$el.trigger($event);

        expect(this.$el.find('img').length).toEqual(3);
        expect(this.$el.find('.medium-insert-images').hasClass('medium-insert-images-grid')).toBe(true);

        this.$el.find('img').last().addClass('medium-insert-image-active');
        this.$el.trigger($event);

        expect(this.$el.find('img').length).toEqual(2);

        this.$el.find('img').addClass('medium-insert-image-active');
        this.$el.trigger($event);

        expect(this.$el.find('.medium-insert-images').length).toEqual(0);
        expect($('.medium-insert-images-toolbar').length).toEqual(0);
    });

    it('fires deleteFile function even when images isn\'t selected but backspace is pressed in text', function () {
        var $p = this.$el.find('p'),
            $event = $.Event('keydown');

        $event.which = 8;

        spyOn(jQuery, 'ajax');

        $p.before('<div class="medium-insert-images"><figure><img src="delete-image1.jpg" alt=""></figure></div>');
        $p.html('test');

        placeCaret($p.get(0), 0);
        this.$el.trigger($event);

        expect(jQuery.ajax.calls.count()).toEqual(1);
    });

    it('fires deleteFile function even when images isn\'t selected but delete is pressed in text', function () {
        var $p = this.$el.find('p'),
            $event = $.Event('keydown');

        $event.which = 46;

        spyOn(jQuery, 'ajax');

        $p.after('<div class="medium-insert-images"><figure><img src="delete-image1.jpg" alt=""></figure></div>');
        $p.html('test');

        placeCaret($p.get(0), $p.text().length);
        this.$el.trigger($event);

        expect(jQuery.ajax.calls.count()).toEqual(1);
    });

    it('triggers input event after removing image', function (done) {
        var $event = $.Event('keydown');

        this.editor.subscribe('editableInput', function () {
            expect(true).toBe(true);
            done();
        });

        $event.which = 8;

        this.$el.find('p')
            .addClass('medium-insert-images')
            .append('<figure><img src="image1.jpg" alt=""></figure>' +
                '<figure><img src="image2.jpg" alt="" class="medium-insert-image-active"></figure>');

        this.$el.trigger($event);
    });

    it('supports deleting file', function () {
        var $event = $.Event('keydown');

        $event.which = 8;

        this.$el.find('p')
            .addClass('medium-insert-images')
            .append('<figure><img src="image1.jpg" alt=""></figure>' +
                '<figure><img src="image2.jpg" alt="" class="medium-insert-image-active"></figure>');

        spyOn(jQuery, 'ajax');
        this.$el.trigger($event);

        expect(jQuery.ajax.calls.count()).toEqual(1);
    });

    it('support changing image style', function () {
        var $p = this.$el.find('p')
            .attr('class', 'medium-insert-images medium-insert-active medium-insert-images-left')
            .append('<figure><img src="image1.jpg" alt=""></figure>');

        $p.find('img').click();
        jasmine.clock().tick(50);

        $('.medium-insert-images-toolbar .medium-editor-action').first().click();

        expect($p.hasClass('medium-insert-images-wide')).toBe(true);
        expect($p.hasClass('medium-insert-images-left')).toBe(false);
    });

    it('triggers input event after changing image style', function (done) {
        var $p = this.$el.find('p')
            .attr('class', 'medium-insert-images medium-insert-active medium-insert-images-left')
            .append('<figure><img src="image1.jpg" alt=""></figure>');

        this.editor.subscribe('editableInput', function () {
            expect(true).toBe(true);
            done();
        });

        $p.find('img').click();
        jasmine.clock().tick(50);

        $('.medium-insert-images-toolbar .medium-editor-action').first().click();
    });

    it('calls callback function after changing image style ', function (done) {
        this.addon.options.styles.wide.added = function () {
            expect(true).toBe(true);
            done();
        };

        this.$el.find('p')
            .addClass('medium-insert-images')
            .append('<figure><img src="image1.jpg" alt=""></figure>');

        // Place caret into first paragraph
        placeCaret(this.$el.find('p').get(0), 0);

        this.$el.find('img').click();
        jasmine.clock().tick(50);

        $('.medium-insert-images-toolbar .medium-editor-action').first().click();
    });

    it('calls callback function after clicking on image action ', function (done) {
        this.addon.options.actions.remove.clicked = function () {
            expect(true).toBe(true);
            done();
        };

        this.$el.find('p')
            .addClass('medium-insert-images')
            .append('<figure><img src="image1.jpg" alt=""></figure>');

        // Place caret into first paragraph
        placeCaret(this.$el.find('p').get(0), 0);

        this.$el.find('img').click();
        jasmine.clock().tick(50);

        $('.medium-insert-images-toolbar2 .medium-editor-action').first().click();
    });

    it('validatates file type on upload', function (done) {
        spyOn(window, 'alert').and.callFake(function (text) {
            expect(text).toMatch(/^This file is not in a supported format/);
            done();
        });

        this.$el.find('p').click();

        this.addon.uploadAdd(null, {
            files: [{ type: 'application/json' }]
        });
    });

    it('validates file size on upload', function (done) {
        this.addon.options.fileUploadOptions.maxFileSize = 1000;

        spyOn(window, 'alert').and.callFake(function (text) {
            expect(text).toMatch(/^This file is too big/);
            done();
        });

        this.$el.find('p').click();

        this.addon.uploadAdd(null, {
            files: [{ type: 'image/jpeg', size: 1001 }]
        });
    });

    it('calls callback function after failing upload', function (done) {
        this.addon.options.fileUploadOptions.maxFileSize = 1000;
        this.addon.options.uploadFailed = function () {
            expect(true).toBe(true);
            done();
        };

        this.$el.find('p').click();

        this.addon.uploadAdd(null, {
            files: [{type: 'image/jpeg', size: 1001}]
        });
    });

    it('show alert if callback is no function', function (done) {
        this.addon.options.fileUploadOptions.maxFileSize = 1000;
        this.addon.options.uploadFailed = "string";

        spyOn(window, 'alert').and.callFake(function (text) {
            expect(text).not.toBe(null);
            done();
        });

        this.$el.find('p').click();

        this.addon.uploadAdd(null, {
            files: [{type: 'image/jpeg', size: 1001}]
        });
    });
});
