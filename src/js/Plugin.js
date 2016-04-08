import Core from './Core';

const MediumEditorInsert = MediumEditor.Extension.extend({
    name: 'insert',

    addons: {
        images: true,
        embeds: true
    },

    init: function() {
        MediumEditor.Extension.prototype.init.apply(this, arguments);

        this.core = new Core(this);
    },

    destroy: function() {
        this.core.removeButtons();
    }
});

export default MediumEditorInsert;
