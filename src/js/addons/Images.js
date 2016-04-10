import utils from '../utils';

export default class Images {

	constructor(plugin, options) {
		this.options = {
			label: '<span class="fa fa-camera"></span>',
			preview: true,
			uploadUrl: 'upload.php',
            deleteUrl: 'delete.php',
            deleteMethod: 'DELETE',
            deleteData: {}
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
        this._plugin.on(document, 'keydown', this.removeImage.bind(this));

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

        // Replace paragraph with div, because figure is a block element
        // and can't be nested inside paragraphs
		if (paragraph.nodeName.toLowerCase() === 'p') {
			const div = document.createElement('div');

			paragraph.parentNode.insertBefore(div, paragraph);
			this._plugin.core.selectElement(div);
			paragraph.remove();
		}

		Array.prototype.forEach.call(this._input.files, (file) => {
            // Generate uid for this image, so we can identify it later
            // and we can replace preview image with uploaded one
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
        let domImage;

        img.alt = '';

        if (uid) {
            img.setAttribute('data-uid', uid);
        }

        // If we're dealing with a preview image,
        // we don't have to preload it before displaying
        if (url.match(/^data:/)) {
            img.src = url;
            figure.appendChild(img);
            el.appendChild(figure);
        } else {
            domImage = new Image();
            domImage.onload = () => {
                img.src = domImage.src;
                figure.appendChild(img);
                el.appendChild(figure);
            };
            domImage.src = url;
        }

        el.classList.add(this.elementClassName);

        // Return domImage so we can test this function easily
        return domImage;
    }

    replaceImage(image, url) {
        const domImage = new Image();

        domImage.onload = () => {
            image.src = domImage.src;
            image.removeAttribute('data-uid');
        };

        domImage.src = url;

        // Return domImage so we can test this function easily
        return domImage;
    }

    selectImage(e) {
        const el = e.target;

        if (el.nodeName.toLowerCase() === 'img' && utils.getClosestWithClassName(el, this.elementClassName)) {
            el.classList.add('medium-editor-insert-image-active');

            this._editor.selectElement(el);
        }
    }

    unselectImage(e) {
        const el = e.target;
        let clickedImage, images;

        // Unselect all selected images. If an image is clicked, unselect all except this one.
        if (el.nodeName.toLowerCase() === 'img' && el.classList.contains('medium-editor-insert-image-active')) {
            clickedImage = el;
        }

        images = utils.getElementsByClassName(this._plugin.getEditorElements(), 'medium-editor-insert-image-active');
        Array.prototype.forEach.call(images, (image) => {
            if (image !== clickedImage) {
                image.classList.remove('medium-editor-insert-image-active');
            }
        });
    }

    removeImage(e) {
        if ([MediumEditor.util.keyCode.BACKSPACE, MediumEditor.util.keyCode.DELETE].indexOf(e.which) > -1) {
            const images = utils.getElementsByClassName(this._plugin.getEditorElements(), 'medium-editor-insert-image-active'),
                selection = window.getSelection();
            let selectedHtml;

            // Remove image even if it's not selected, but backspace/del is pressed in text
            if (selection && selection.rangeCount) {
                const range = MediumEditor.selection.getSelectionRange(document),
                    focusedElement = MediumEditor.selection.getSelectedParentElement(range),
                    caretPosition = MediumEditor.selection.getCaretOffsets(focusedElement).left;
                let sibling;

                // Is backspace pressed and caret is at the beginning of a paragraph, get previous element
                if (e.which === MediumEditor.util.keyCode.BACKSPACE && caretPosition === 0) {
                    sibling = focusedElement.previousElementSibling;
                // Is del pressed and caret is at the end of a paragraph, get next element
                } else if (e.which === MediumEditor.util.keyCode.DELETE && caretPosition === focusedElement.innerText.length) {
                    sibling = focusedElement.nextElementSibling;
                }

                if (sibling && sibling.classList.contains('medium-editor-insert-images')) {
                    const newImages = sibling.getElementsByTagName('img');
                    Array.prototype.forEach.call(newImages, (image) => {
                        images.push(image);
                    });
                }

                // If text is selected, find images in the selection
                selectedHtml = MediumEditor.selection.getSelectionHtml(document);
                if (selectedHtml) {
                    const temp = document.createElement('div');
                    let wrappers, newImages;
                    temp.innerHTML = selectedHtml;

                    wrappers = temp.getElementsByClassName('medium-editor-insert-images');
                    newImages = utils.getElementsByTagName(wrappers, 'img');

                    Array.prototype.forEach.call(newImages, (image) => {
                        images.push(image);
                    });
                }
            }

            if (images.length) {
                if (!selectedHtml) {
                    e.preventDefault();
                }

                images.forEach((image) => {
                    const wrapper = utils.getClosestWithClassName(image, 'medium-editor-insert-images');
                    this.deleteFile(image.src);

                    image.parentNode.remove();

                    // If wrapper has no images anymore, remove it
                    if (wrapper.childElementCount === 0) {
                        const next = wrapper.nextElementSibling,
                            prev = wrapper.previousElementSibling;

                        wrapper.remove();

                        // If there is no selection, move cursor at the beginning of next paragraph (if delete is pressed),
                        // or nove it at the end of previous paragraph (if backspace is pressed)
                        if (!selectedHtml) {
                            if (next || prev) {
                                if ((next && e.which === MediumEditor.util.keyCode.DELETE) || !prev) {
                                    MediumEditor.selection.moveCursor(document, next, 0);
                                } else {
                                    MediumEditor.selection.moveCursor(document, prev.lastChild, prev.lastChild.textContent.length);
                                }
                            }
                        }
                    }
                });
            }
        }
    }

    deleteFile(image) {
        if (this.options.deleteUrl) {
            const xhr = new XMLHttpRequest(),
                data = Object.assign({}, {
                    file: image
                }, this.options.deleteData);

            xhr.open(this.options.deleteMethod, this.options.deleteUrl, true);
            xhr.send(data);
        }
    }

}
