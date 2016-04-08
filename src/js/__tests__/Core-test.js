import MediumEditorInsert from '../Plugin';

describe('Core', () => {
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

    it('should add buttons to body', () => {
        const buttons = document.getElementsByClassName('medium-editor-insert-buttons'),
            actions = buttons[0].getElementsByClassName('medium-editor-insert-action');

        expect(buttons.length).toBe(1);
        expect(actions.length).toBe(2);
        expect(actions[0].dataset.addon).toBe('images');
        expect(actions[1].dataset.addon).toBe('embeds');
    });

    it('should be able to disable certain addons', () => {
        let buttons, actions;

        editor.destroy();
        editor = new MediumEditor('.editable', {
            extensions: {
                insert: new MediumEditorInsert({
                    addons: {
                        embeds: false
                    }
                })
            }
        });

        buttons = document.getElementsByClassName('medium-editor-insert-buttons');
        actions = buttons[0].getElementsByClassName('medium-editor-insert-action');

        expect(buttons.length).toBe(1);
        expect(actions.length).toBe(1);
        expect(actions[0].dataset.addon).toBe('images');
    });

    it('should show buttons when caret is in an empty paragraph and hide when paragraph is not empty', () => {
        const buttons = document.getElementsByClassName('medium-editor-insert-buttons')[0],
            p1 = document.createElement('p'),
            p2 = document.createElement('p');

        p1.innerHTML = '<br />';
        p2.innerHTML = 'Lorem ipsum';
        container.appendChild(p1);
        container.appendChild(p2);

        expect(buttons.classList.contains('medium-editor-insert-buttons-active')).toBeFalsy();

        editor.selectElement(p1);
        p1.click();

        expect(buttons.classList.contains('medium-editor-insert-buttons-active')).toBeTruthy();

        editor.selectElement(p2);
        p2.click();

        expect(buttons.classList.contains('medium-editor-insert-buttons-active')).toBeFalsy();
    });

    /*
     * This test is not working and I don't know why
     *
    it('should toggle addons when clicking on + button', () => {
        const buttons = document.getElementsByClassName('medium-editor-insert-buttons')[0],
            show = buttons.getElementsByClassName('medium-editor-insert-buttons-show')[0];

        expect(buttons.classList.contains('medium-editor-insert-addons-active')).toBeFalsy();

        show.click();
        expect(buttons.classList.contains('medium-editor-insert-addons-active')).toBeTruthy();

        show.click();
        expect(buttons.classList.contains('medium-editor-insert-addons-active')).toBeFalsy();
    });
    */

    it('should call addon after clicking on addon button', () => {
        const buttons = document.getElementsByClassName('medium-editor-insert-buttons'),
            actions = buttons[0].getElementsByClassName('medium-editor-insert-action');

        spyOn(plugin.initializedAddons.images, 'handleClick');

        actions[0].click();
        expect(plugin.initializedAddons.images.handleClick).toHaveBeenCalled();
    });
});
