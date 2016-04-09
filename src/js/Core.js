import utils from './utils';
import Images from './addons/Images';
import Embeds from './addons/Embeds';

export default class Core {

    constructor(plugin) {
        this._plugin = plugin;
        this._editor = this._plugin.base;

        this.initAddons();
        this.addButtons();
        this.events();
    }

    events() {
        let addonActions;

        // This could be chained when medium-editor 5.15.2 is released
        // https://github.com/yabwe/medium-editor/pull/1046
        this._plugin.on(document, 'click', this.toggleButtons.bind(this));
        this._plugin.on(document, 'keyup', this.toggleButtons.bind(this));
        this._plugin.on(this.buttons.getElementsByClassName('medium-editor-insert-buttons-show')[0], 'click', this.toggleAddons.bind(this));

        // This could be written in one statement when medium-editor 5.15.2 is released
        // https://github.com/yabwe/medium-editor/pull/1046
        addonActions = this.buttons.getElementsByClassName('medium-editor-insert-action');
        Array.prototype.forEach.call(addonActions, (action) => {
            this._plugin.on(action, 'click', this.handleAddonClick.bind(this));
        });

        this._plugin.on(window, 'resize', this.positionButtons.bind(this));
    }

    initAddons() {
        // Initialiez all default addons, we'll delete ones we don't need later
        this._plugin.initializedAddons = {
            images: new Images(this._plugin, this._plugin.addons.images),
            embeds: new Embeds(this._plugin, this._plugin.addons.embeds)
        };

        Object.keys(this._plugin.addons).forEach((name) => {
            const addonOptions = this._plugin.addons[name];

            // If the addon isn't between default ones,
            // try to find it in global namespace under MediumEditorInsertAddon name
            // (replace "Addon" with an actual addon name)
            if (!this._plugin.initializedAddons[name] && addonOptions) {
                const className = `MediumEditorInsert${utils.ucfirst(name)}`;

                if (window[className]) {
                    this._plugin.initializedAddons[name] = new window[className](this._plugin, addonOptions);
                } else {
                    window.console.error(`Addon "${name}" couldn't be found!`);
                }
            }

            // Delete disabled addon
            if (!addonOptions) {
                delete this._plugin.initializedAddons[name];
            }
        });
    }

    addButtons() {
        let html;

        this.buttons = document.createElement('div');
        this.buttons.id = `medium-editor-insert-${this._plugin.getEditorId()}`;
        this.buttons.classList.add('medium-editor-insert-buttons');
        this.buttons.setAttribute('contentediable', false);

        html = `<a class="medium-editor-insert-buttons-show">+</a>
            <ul class="medium-editor-insert-buttons-addons">`;

        Object.keys(this._plugin.initializedAddons).forEach((name) => {
            const addon = this._plugin.initializedAddons[name];

            html += `<li><a class="medium-editor-insert-action" data-addon="${name}">${addon.label}</a></li>`;
        });

        html += `</ul>`;

        this.buttons.innerHTML = html;

        document.body.appendChild(this.buttons);
    }

    removeButtons() {
        this.buttons.remove();
    }

    positionButtons() {
        let el, elPosition, addons, addonButton, addonsStyle, addonButtonStyle, position;

        // Don't position buttons if they aren't active
        if (this.buttons.classList.contains('medium-editor-insert-buttons-active') === false) {
            return;
        }

        el = this._editor.getSelectedParentElement();
        elPosition = el.getBoundingClientRect();
        addons = this.buttons.getElementsByClassName('medium-editor-insert-buttons-addons')[0];
        addonButton = this.buttons.getElementsByClassName('medium-editor-insert-action')[0];
        addonsStyle = window.getComputedStyle(addons);
        addonButtonStyle = window.getComputedStyle(addonButton);

        // Calculate position
        position = {
            top: window.scrollY + elPosition.top,
            left: window.scrollX + elPosition.left - parseInt(addonsStyle.left, 10) - parseInt(addonButtonStyle.marginLeft, 10)
        };

        // If left position is lower than 0, the buttons would be out of the viewport.
        // In that case, align buttons with the editor
        position.left = position.left < 0 ? elPosition.left : position.left;

        this.buttons.style.left = `${position.left}px`;
        this.buttons.style.top = `${position.top}px`;
    }

    toggleButtons() {
        const el = this._editor.getSelectedParentElement();

        if (this.shouldDisplayButtonsOnElement(el)) {
            this.selectElement(el);
            this.showButtons();
        } else {
            this.deselectElement();
            this.hideButtons();
        }
    }

    shouldDisplayButtonsOnElement(el) {
        const addonClassNames = [];
        let isAddon = false;

        // Don't show buttons when the element has text
        if (el.innerText.trim() !== '') {
            return false;
        }

        // Get class names used by addons
        Object.keys(this._plugin.initializedAddons).forEach((addonName) => {
            const addon = this._plugin.initializedAddons[addonName];
            if (addon.elementClassName) {
                addonClassNames.push(addon.elementClassName);
            }
        });

        // Don't show buttons if the element is an addon element
        // - when the element has an addon class, or some of its parents have it
        addonClassNames.forEach((className) => {
            if (el.classList.contains(className) || utils.getClosestWithClassName(el, className)) {
                isAddon = true;
                return;
            }
        });

        return !isAddon;
    }

    selectElement(el) {
        this.selectedElement = el;
    }

    deselectElement() {
        this.selectedElement = null;
    }

    showButtons() {
        this.buttons.classList.add('medium-editor-insert-buttons-active');
        this.positionButtons();
    }

    hideButtons() {
        this.buttons.classList.remove('medium-editor-insert-buttons-active');
        this.buttons.classList.remove('medium-editor-insert-addons-active');
    }

    toggleAddons() {
        this.buttons.classList.toggle('medium-editor-insert-addons-active');
    }

    handleAddonClick(e) {
        const name = e.currentTarget.getAttribute('data-addon');

        e.preventDefault();

        this._plugin.initializedAddons[name].handleClick(e);
    }

}
