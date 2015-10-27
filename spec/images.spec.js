describe("Images addon", function () {
    beforeEach(function () {
        $('body').append('<div id="fixtures"><div class="editable"></div></div>');
        this.$el = $('.editable');
        this.editor = new MediumEditor(this.$el.get(0));
        this.$el.mediumInsert({
            editor: this.editor
        });
        this.addon = this.$el.data('plugin_mediumInsertImages');
    });

    afterEach(function () {
        $('#fixtures').remove();
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
});
