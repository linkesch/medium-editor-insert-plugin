import MediumEditorInsert from '../../Plugin';

describe('Images', () => {
    let container, plugin, editor;

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
	});

    afterEach(() => {
        editor.destroy();
    });

    it('should select clicked image', () => {
        let image;

        container.innerHTML = `<div class="medium-editor-insert-images">
            <figure><img src="01.jpg" alt="" /></figure>
        </div>`;

        image = container.getElementsByTagName('img')[0];
        image.click();

        expect(image.classList.contains('medium-editor-insert-image-active')).toBeTruthy();
    });

    it('should unselect image on click elsewhere', () => {
        let image;

        container.innerHTML = `<div class="medium-editor-insert-images">
            <figure><img src="01.jpg" alt="" class="medium-editor-insert-image-active" /></figure>
        </div>`;

        image = container.getElementsByTagName('img')[0];
        document.body.click();

        expect(image.classList.contains('medium-editor-insert-image-active')).toBeFalsy();
    });

    it('should unselect image and select new one on click', () => {
        let images;

        container.innerHTML = `<div class="medium-editor-insert-images">
            <figure><img src="01.jpg" alt="" class="medium-editor-insert-image-active" /></figure>
            <figure><img src="02.jpg" alt="" /></figure>
        </div>`;

        images = container.getElementsByTagName('img');
        images[1].click();

        expect(images[0].classList.contains('medium-editor-insert-image-active')).toBeFalsy();
        expect(images[1].classList.contains('medium-editor-insert-image-active')).toBeTruthy();
    });
});
