describe("Images addon", function () {
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

    it("creates preview image before upload", function (done) {
        this.$el.find('p').click();

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
        this.addon.options.preview = false;
        this.$el.find('p').click();

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
        this.$el.one('input', function () {
            expect(true).toBe(true);
            done();
        });

        this.addon.showImage(null, {
            submit: function () {}
        });
    });

    it('truggers input event twice on showImage for preview', function (done) {
        var inputTriggerCount = 0,
            stubbedImage = jasmine.createSpy('image'),
            context = this.$el.prepend('<div class="medium-insert-images medium-insert-active">' +
                '<figure><img src="data:" alt=""></figure>' +
            '</div>');

        spyOn(this.addon, 'getDOMImage').and.returnValue(stubbedImage);

        this.$el.on('input', function () {
            inputTriggerCount++;

            if (inputTriggerCount === 2) {
                this.$el.off('input');
                expect(true).toBe(true);
                done();
            }
        }.bind(this));

        this.addon.showImage('http://image.co', {
            context: context
        });
        stubbedImage.onload();
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
});
