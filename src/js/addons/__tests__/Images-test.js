import MediumEditorInsert from '../../Plugin';

describe('Images', () => {
    let container, plugin, editor, addon;

	beforeEach(() => {
        container = document.createElement('div');
        container.classList.add('editable');
        document.body.appendChild(container);

		plugin = new MediumEditorInsert();

        editor = new MediumEditor('.editable', {
            extensions: {
                insert: plugin
            }
        });

        addon = plugin.initializedAddons.images;
        jasmine.Ajax.install();
	});

    afterEach(() => {
        editor.destroy();
        jasmine.Ajax.uninstall();
    });

    it('should select clicked image', () => {
        let image;

        container.innerHTML = `<div class="medium-editor-insert-images">
            <figure><img src="#" alt="" /></figure>
        </div>`;

        image = container.getElementsByTagName('img')[0];
        image.click();

        expect(image.classList.contains('medium-editor-insert-image-active')).toBeTruthy();
    });

    it('should unselect image on click elsewhere', () => {
        let image;

        container.innerHTML = `<div class="medium-editor-insert-images">
            <figure><img src="#" alt="" class="medium-editor-insert-image-active" /></figure>
        </div>`;

        image = container.getElementsByTagName('img')[0];
        document.body.click();

        expect(image.classList.contains('medium-editor-insert-image-active')).toBeFalsy();
    });

    it('should unselect image and select new one on click', () => {
        let images;

        container.innerHTML = `<div class="medium-editor-insert-images">
            <figure><img src="#" alt="" class="medium-editor-insert-image-active" /></figure>
            <figure><img src="#" alt="" /></figure>
        </div>`;

        images = container.getElementsByTagName('img');
        images[1].click();

        expect(images[0].classList.contains('medium-editor-insert-image-active')).toBeFalsy();
        expect(images[1].classList.contains('medium-editor-insert-image-active')).toBeTruthy();
    });

    describe('handleClick()', () => {
        it('should create file input and call uploadFiles() on change', (done) => {
            const event = new Event('change');

            addon.uploadFiles = () => {
                expect(true).toBe(true);
                done();
            };

            addon.handleClick();
            addon._input.dispatchEvent(event);
        });
    });

    describe('uploadFiles()', () => {
        it('should replace paragraph with div when uploading file', () => {
            const p = document.createElement('p');
            p.innerHTML = '&nbsp;';

            container.appendChild(p);
            editor.selectElement(p);
            p.click();

            addon._input = { files: [] };
            addon.uploadFiles();

            expect(container.innerHTML).toBe('<div></div>');
        });

        it('should call preview() and upload() functions for each file', () => {
            const p = document.createElement('p');
            p.innerHTML = '&nbsp;';

            spyOn(addon, 'preview');
            spyOn(addon, 'upload');

            container.appendChild(p);
            editor.selectElement(p);
            p.click();

            addon._input = { files: [{}, {}] };
            addon.uploadFiles();

            expect(addon.preview).toHaveBeenCalled();
            expect(addon.preview.calls.count()).toBe(2);
            expect(addon.upload).toHaveBeenCalled();
            expect(addon.upload.calls.count()).toBe(2);
        });

        it('shouldn\'t call preview() when preview option is disabled', () => {
            const p = document.createElement('p');
            p.innerHTML = '&nbsp;';

            spyOn(addon, 'preview');
            spyOn(addon, 'upload');

            container.appendChild(p);
            editor.selectElement(p);
            p.click();

            addon.options.preview = false;
            addon._input = { files: [{}] };
            addon.uploadFiles();

            expect(addon.preview).not.toHaveBeenCalled();
            expect(addon.upload).toHaveBeenCalled();
        });
    });

    describe('preview()', () => {
        it('should call insertImage()', (done) => {
            addon.insertImage = () => {
                expect(true).toBe(true);
                done();
            };

            addon.preview(new Blob([''], { type: 'image/jpeg' }));
        });
    });

    describe('upload()', () => {
        it('should call insertImage() if preview image doesn\'t exist', (done) => {
            const p = document.createElement('p');

            p.innerHTML = '&nbsp;';
            container.appendChild(p);
            editor.selectElement(p);
            p.click();

            jasmine.Ajax.stubRequest('upload.php').andReturn({
                "responseText": '01.jpg'
            });

            addon.insertImage = (image) => {
                expect(image).toBe('01.jpg');
                done();
            };

            addon.upload(new Blob([''], { type: 'image/jpeg' }));
        });

        it('should call replaceImage() if preview image does exist', (done) => {
            const uid = 'abcd123',
                img = document.createElement('img');

            img.src = 'preview.jpg';
            img.setAttribute('data-uid', uid);
            container.appendChild(img);

            plugin.core.selectElement(container);

            jasmine.Ajax.stubRequest('upload.php').andReturn({
                "responseText": '01.jpg'
            });

            addon.replaceImage = (image, url) => {
                expect(image).toBe(img);
                expect(url).toBe('01.jpg');
                done();
            };

            addon.upload(new Blob([''], { type: 'image/jpeg' }), uid);
        });
    });

    describe('insertImage()', () => {
        it('should create image and add class to parent', () => {
            const div = document.createElement('div');
            let domImage, figure, image;

            plugin.core.selectElement(div);

            domImage = addon.insertImage('01.jpg', 'abcd123');
            domImage.onload();

            figure = div.getElementsByTagName('figure')[0];
            image = figure.getElementsByTagName('img')[0];
            expect(image.src).toContain('01.jpg');
            expect(image.getAttribute('data-uid')).toBe('abcd123');
            expect(div.classList.contains('medium-editor-insert-images')).toBeTruthy();
        });
    });

    describe('replaceImage()', () => {
        it('should replace image with new one and remove data-uid', () => {
            const image = document.createElement('img');
            let domImage;

            image.src = '01.jpg';

            domImage = addon.replaceImage(image, '02.jpg');
            domImage.onload();

            expect(image.src).toContain('02.jpg');
            expect(image.hasAttribute('data-uid')).toBeFalsy();
        });
    });
});
