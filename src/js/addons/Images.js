import utils from '../utils';

export default class Images {

	constructor(plugin, options) {
		this.options = {
			label: '<span class="fa fa-camera"></span>',
			preview: true,
			uploadUrl: 'upload.php'
		};

		Object.assign(this.options, options);

        this._plugin = plugin;
        this._editor = this._plugin.base;
        this.elementClassName = 'medium-editor-insert-images';
		this.label = this.options.label;

        this.events();
	}

    events() {
        this._plugin.on(document, 'click', this.unselectImage.bind(this));

        this._plugin.getEditorElements().forEach((editor) => {
            this._plugin.on(editor, 'click', this.selectImage.bind(this));
        });
    }

	handleClick() {
		this._input = document.createElement('input');
		this._input.type = 'file';
		this._input.multiple = true;

		this._plugin.on(this._input, 'change', this.uploadFiles.bind(this));

		this._input.click();
	}

	uploadFiles() {
		const paragraph = this._plugin.core.selectedElement;

		if (paragraph.nodeName.toLowerCase() === 'p') {
			const div = document.createElement('div');

			paragraph.parentNode.insertBefore(div, paragraph);
			this._plugin.core.selectElement(div);
			paragraph.remove();
		}

		Array.prototype.forEach.call(this._input.files, (file) => {
			const uid = utils.generateRandomString();

			if (this.options.preview) {
				this.preview(file, uid);
			}

			this.upload(file, uid);
		});

		this._plugin.core.hideButtons();
	}

	preview(file, uid) {
		const reader = new FileReader();

		reader.onload = (e) => {
			this.insertImage(e.target.result, uid);
		};

		reader.readAsDataURL(file);
	}

	upload(file, uid) {
		const xhr = new XMLHttpRequest(),
			data = new FormData();

		xhr.open("POST", this.options.uploadUrl, true);
		xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const image = this._plugin.core.selectedElement.querySelector(`[data-uid="${uid}"]`);

                if (image) {
                    this.replaceImage(image, xhr.responseText);
                } else {
                    this.insertImage(xhr.responseText);
                }
            }
		};

		data.append("file", file);
		xhr.send(data);
	}

    insertImage(url, uid) {
        const el = this._plugin.core.selectedElement,
            figure = document.createElement('figure'),
            img = document.createElement('img');

        img.src = url;
        img.alt = '';
        if (uid) {
            img.setAttribute('data-uid', uid);
        }
        figure.appendChild(img);

        el.classList.add(this.elementClassName);
        el.appendChild(figure);
    }

    replaceImage(image, url) {
        image.src = url;
        image.removeAttribute('data-uid');
    }

    selectImage(e) {
        const el = e.target;

        if (el.nodeName.toLowerCase() === 'img' && utils.getClosestWithClassName(el, this.elementClassName)) {
            el.classList.add('medium-editor-insert-image-active');
        }
    }

    unselectImage(e) {
        const el = e.target;
        let clickedImage;

        if (el.nodeName.toLowerCase() === 'img' && el.classList.contains('medium-editor-insert-image-active')) {
            clickedImage = el;
        }

        this._plugin.getEditorElements().forEach((editor) => {
            const images = editor.getElementsByClassName('medium-editor-insert-image-active');

            Array.prototype.forEach.call(images, (image) => {
                if (image !== clickedImage) {
                    image.classList.remove('medium-editor-insert-image-active');
                }
            });
        });
    }

}
