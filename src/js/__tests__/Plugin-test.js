import MediumEditorInsert from '../Plugin';
import Core from '../Core';

describe('Plugin', () => {
    let container, editor, plugin;

	beforeEach(() => {
        container = document.createElement('div');
        container.classList.add('editable');
        document.body.appendChild(container);
	});

    afterEach(() => {
        editor.destroy();
    });

    it('should initialize the plugin', () => {
        plugin = new MediumEditorInsert();
        editor = new MediumEditor('.editable', {
            extensions: {
                insert: plugin
            }
        });

        expect(plugin.core instanceof Core).toBeTruthy();
    });

    it('should remove the buttons on destroy()', () => {
        let buttons;

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
        expect(buttons.length).toBe(1);

        editor.destroy();

        buttons = document.getElementsByClassName('medium-editor-insert-buttons');
        expect(buttons.length).toBe(0);
    });
});
