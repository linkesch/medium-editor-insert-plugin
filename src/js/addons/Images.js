import utils from '../utils';

export default class Images {

	constructor(plugin, options) {
		this._plugin = plugin;
        this._editor = this._plugin.base;

		this.options = {
			label: '<span class="fa fa-camera"></span>',
			preview: true,
			uploadUrl: 'upload.php'
		};

		Object.assign(this.options, options);

		this.label = this.options.label;
	}

	handleClick() {
		this._input = document.createElement('input');
		this._input.type = 'file';
		this._input.multiple = true;

		this._plugin.on(this._input, 'change', this.uploadFiles.bind(this));

		this._input.click();
	}

	uploadFiles() {
		const paragraph = this._plugin.core.activeParagraph;

		if (paragraph.nodeName.toLowerCase() === 'p') {
			const div = document.createElement('div');

			paragraph.parentNode.insertBefore(div, paragraph);
			this._plugin.core.activeParagraph = div;
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
                const image = this._plugin.core.activeParagraph.querySelector(`[data-uid="${uid}"]`);

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
        const el = this._plugin.core.activeParagraph,
            figure = document.createElement('figure'),
            img = document.createElement('img');

        img.src = url;
        img.alt = '';
        if (uid) {
            img.setAttribute('data-uid', uid);
        }
        figure.appendChild(img);

        el.classList.add('medium-editor-insert-images');
        el.appendChild(figure);
    }

    replaceImage(image, url) {
        image.src = url;
        image.removeAttribute('data-uid');
    }

}
