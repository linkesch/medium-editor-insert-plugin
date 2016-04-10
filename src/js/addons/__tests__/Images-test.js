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
        container.remove();
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

    it('should remove image on backspace', () => {
        const event = new Event('keydown');
        event.which = MediumEditor.util.keyCode.BACKSPACE;

        spyOn(addon, 'deleteFile');

        container.innerHTML = `<div class="medium-editor-insert-images">
            <figure><img src="#" alt="" class="medium-editor-insert-image-active" /></figure>
            <figure><img src="#" alt="" /></figure>
        </div>`;

        document.dispatchEvent(event);
        expect(container.getElementsByTagName('figure').length).toBe(1);
        expect(container.getElementsByClassName('medium-editor-insert-images').length).toBe(1);
        expect(container.getElementsByTagName('p').length).toBe(0);
        expect(addon.deleteFile).toHaveBeenCalled();
    });

    it('should remove whole wrapper on backspace when there are no images left', () => {
        const event = new Event('keydown');
        event.which = MediumEditor.util.keyCode.BACKSPACE;

        spyOn(addon, 'deleteFile');

        container.innerHTML = `<div class="medium-editor-insert-images">
            <figure><img src="#" alt="" class="medium-editor-insert-image-active" /></figure>
        </div>`;

        document.dispatchEvent(event);
        expect(container.getElementsByTagName('figure').length).toBe(0);
        expect(container.getElementsByClassName('medium-editor-insert-images').length).toBe(0);
        expect(addon.deleteFile).toHaveBeenCalled();
    });

    it('should delete image even no image is selected but backspace is pressed in text', () => {
        let p;
        const event = new Event('keydown');
        event.which = MediumEditor.util.keyCode.BACKSPACE;

        spyOn(addon, 'deleteFile');

        container.innerHTML = `<div class="medium-editor-insert-images">
            <figure><img src="#" alt="" /></figure>
        </div>
        <p>asd</p>`;

        p = container.getElementsByTagName('p')[0];
        MediumEditor.selection.moveCursor(document, p, 0);
        document.dispatchEvent(event);

        expect(container.getElementsByTagName('figure').length).toBe(0);
        expect(container.getElementsByClassName('medium-editor-insert-images').length).toBe(0);
        expect(container.getElementsByTagName('p').length).toBe(1);
        expect(addon.deleteFile).toHaveBeenCalled();
    });

    it('should delete image even no image is selected but delete is pressed in text', () => {
        let p;
        const event = new Event('keydown');
        event.which = MediumEditor.util.keyCode.DELETE;

        spyOn(addon, 'deleteFile');

        container.innerHTML = `<p>asd</p>
        <div class="medium-editor-insert-images">
            <figure><img src="#" alt="" /></figure>
        </div>`;

        p = container.getElementsByTagName('p')[0];
        MediumEditor.selection.moveCursor(document, p.firstChild, p.firstChild.textContent.length);
        document.dispatchEvent(event);

        expect(container.getElementsByTagName('figure').length).toBe(0);
        expect(container.getElementsByClassName('medium-editor-insert-images').length).toBe(0);
        expect(container.getElementsByTagName('p').length).toBe(1);
        expect(addon.deleteFile).toHaveBeenCalled();
    });

    it('should delete image even image is in selection and backspace is pressed', () => {
        let p1, p2;
        const event = new Event('keydown');
        event.which = MediumEditor.util.keyCode.BACKSPACE;

        spyOn(addon, 'deleteFile');

        container.innerHTML = `<p>start</p>
        <div class="medium-editor-insert-images">
            <figure><img src="#" alt="" /></figure>
        </div>
        <p>end</p>`;

        p1 = container.getElementsByTagName('p')[0];
        p2 = container.getElementsByTagName('p')[1];

        MediumEditor.selection.select(document, p1, 0, p2.firstChild, p2.firstChild.textContent.length);
        document.dispatchEvent(event);

        expect(addon.deleteFile).toHaveBeenCalled();
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

    describe('deleteImage()', () => {
        it('should create AJAX call', () => {
            spyOn(XMLHttpRequest.prototype, 'open');
            spyOn(XMLHttpRequest.prototype, 'send');

            addon.options.deleteData = {
                'CSRF': 'abcd123'
            };
            addon.deleteFile('01.jpg');

            expect(XMLHttpRequest.prototype.open).toHaveBeenCalledWith('DELETE', 'delete.php', true);
            expect(XMLHttpRequest.prototype.send).toHaveBeenCalledWith({
                file: '01.jpg',
                CSRF: 'abcd123'
            });
        });
    });
});
