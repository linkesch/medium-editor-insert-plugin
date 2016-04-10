import utils from './utils';
import ToolbarButton from './ToolbarButton';

const MediumEditorToolbar = MediumEditor.extensions.toolbar;

export default class Toolbar extends MediumEditorToolbar {

    constructor(options) {
        super(options);

        this.name = `${options.type}Toolbar`;

        options.buttons.forEach((buttonOptions) => {
            const button = new ToolbarButton(Object.assign({}, {
                window: this.plugin.window,
                document: this.plugin.document,
                base: this.plugin.base
            }, buttonOptions));

            button.init();
            this.plugin.base.extensions.push(button);
        });

        this.window = options.plugin.window;
        this.document = options.plugin.document;
        this.base = options.plugin.base;

        this.init();
    }

    createToolbar() {
        const toolbar = this.document.createElement('div');

        toolbar.id = `medium-editor-insert-${this.type}-toolbar-${this.getEditorId()}`;
        toolbar.className = 'medium-editor-toolbar';

        if (this.static) {
            toolbar.className += ' static-toolbar';
        } else if (this.relativeContainer) {
            toolbar.className += ' medium-editor-relative-toolbar';
        } else {
            toolbar.className += ' medium-editor-stalker-toolbar';
        }

        toolbar.appendChild(this.createToolbarButtons());

        // Add any forms that extensions may have
        this.forEachExtension((extension) => {
            if (extension.hasForm) {
                toolbar.appendChild(extension.getForm());
            }
        });

        this.attachEventHandlers();

        return toolbar;
    }

    createToolbarButtons() {
        const ul = this.document.createElement('ul');
        let li,
            btn,
            buttons,
            extension,
            buttonName,
            buttonOpts;

        ul.id = `medium-editor-insert-${this.type}-toolbar-actions${this.getEditorId()}`;
        ul.className = 'medium-editor-toolbar-actions';
        ul.style.display = 'block';

        this.buttons.forEach((button) => {
            if (typeof button === 'string') {
                buttonName = button;
                buttonOpts = null;
            } else {
                buttonName = button.name;
                buttonOpts = button;
            }

            // If the button already exists as an extension, it'll be returned
            // othwerise it'll create the default built-in button
            extension = this.base.addBuiltInExtension(buttonName, buttonOpts);

            if (extension && typeof extension.getButton === 'function') {
                btn = extension.getButton(this.base);
                li = this.document.createElement('li');
                if (MediumEditor.util.isElement(btn)) {
                    li.appendChild(btn);
                } else {
                    li.innerHTML = btn;
                }
                ul.appendChild(li);
            }
        }, this);

        buttons = ul.querySelectorAll('button');
        if (buttons.length > 0) {
            buttons[0].classList.add(this.firstButtonClass);
            buttons[buttons.length - 1].classList.add(this.lastButtonClass);
        }

        return ul;
    }

    checkState() {
        let activeElements;

        if (this.base.preventSelectionUpdates) {
            return;
        }

        // Wait for elements to be selected
        setTimeout(() => {
            activeElements = utils.getElementsByClassName(this.getEditorElements(), this.activeClassName);

            // Hide toolbar when no elements are selected
            if (activeElements.length === 0) {
                return this.hideToolbar();
            }

            // Now we know there's a focused editable with a selection
            this.showAndUpdateToolbar();
        }, 10);
    }

    setToolbarPosition() {
        const container = utils.getElementsByClassName(this.getEditorElements(), this.activeClassName)[0];
        let anchorPreview;

        // If there isn't a valid selection, bail
        if (!container) {
            return this;
        }

        this.showToolbar();
        this.positionStaticToolbar(container);

        anchorPreview = this.base.getExtensionByName('anchor-preview');

        if (anchorPreview && typeof anchorPreview.hidePreview === 'function') {
            anchorPreview.hidePreview();
        }
    }

}
