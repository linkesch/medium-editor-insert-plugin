describe('Core', function () {
    beforeEach(function () {
        $('body').append('<div id="fixtures"><div class="editable"></div></div>');
        this.$el = $('.editable');

        jasmine.clock().install();
    });

    afterEach(function () {
        $('#fixtures').remove();

        jasmine.clock().uninstall();
    });

    it('initializes plugin', function () {
        this.$el.mediumInsert();

        expect(this.$el.hasClass('medium-editor-insert-plugin')).toBe(true);
    });

    it('initializes plugin on a textarea', function () {
        var textareaId;

        $('#fixtures').html('<div medium-editor-textarea-id="123"></div><textarea id="textarea" medium-editor-textarea-id="123">test</textarea>');
        this.$el = $('#textarea');

        this.$el.mediumInsert();
        textareaId = this.$el.attr('medium-editor-textarea-id');

        expect(this.$el.hasClass('medium-editor-insert-plugin')).toBe(false);
        expect(this.$el.siblings('[medium-editor-textarea-id="' + textareaId + '"]').hasClass('medium-editor-insert-plugin')).toBe(true);
    });

    it('initializes addons', function () {
        spyOn($.fn, 'mediumInsertImages');

        this.$el.data('plugin_mediumInsertImages', {
            options: {}
        });
        this.$el.mediumInsert();

        expect($.fn.mediumInsertImages.calls.count()).toEqual(1);
    });

    it('does nothing if there is no addon selected', function () {
        this.$el.mediumInsert({
            addons: false
        });

        expect(this.$el.html()).toBe('');
    });

    it('adds empty paragraph if there is no content', function () {
        this.$el.mediumInsert();

        expect(this.$el.find('p').length).toEqual(1);
    });

    it('wraps <br> into paragraph', function () {
        this.$el.html('<br>');

        this.$el.mediumInsert();

        expect(this.$el.find('p').length).toEqual(1);
        expect(this.$el.find('br').length).toEqual(1);
    });

    it('wraps text content into paragraph', function () {
        this.$el.html('text');

        this.$el.mediumInsert();

        expect(this.$el.find('p').length).toEqual(1);
    });

    it('adds empty paragraph at the end if the last element is an addon element', function () {
        this.$el.html('<div class="medium-insert-images"></div>');

        this.$el.mediumInsert();

        expect(this.$el.find('.medium-insert-images').next().is('p')).toBe(true);
    });

    it('adds plugin\'s buttons to the $el', function () {
        this.$el.mediumInsert();

        expect(this.$el.find('.medium-insert-buttons').length).toEqual(1);
    });

    it('shows plugin\'s buttons after clicking on empty paragraph', function () {
        this.$el.html('<p id="paragraph">&nbsp;</p><p id="paragraph2" class="medium-insert-active">test</p>');

        this.$el.mediumInsert();

        // Place caret at the beginning of #paragraph
        placeCaret(document.getElementById('paragraph'), 0);

        this.$el.find('#paragraph').click();
        jasmine.clock().tick(1);

        expect(this.$el.find('.medium-insert-buttons').css('display')).toBe('block');
        expect(this.$el.find('#paragraph').hasClass('medium-insert-active')).toBe(true);
        expect(this.$el.find('#paragraph2').hasClass('medium-insert-active')).toBe(false);
    });

    it('shows only addon button after clicking on addon paragraph', function () {
        this.$el.html('<p id="paragraph" class="medium-insert-images">&nbsp;</p><p id="paragraph2" class="medium-insert-active">test</p>');

        this.$el.mediumInsert();

        // Place caret at the beginning of #paragraph
        placeCaret(document.getElementById('paragraph'), 0);

        this.$el.find('#paragraph').click();
        jasmine.clock().tick(101);

        expect(this.$el.find('.medium-insert-buttons').css('display')).toBe('block');
        expect(this.$el.find('.medium-insert-buttons button[data-addon="embeds"]').parent().css('display')).toBe('none');
    });

    it('hides plugin\'s buttons after clicking on non-empty paragraph', function () {
        this.$el.html('<p>&nbsp;</p><p id="paragraph2">test</p>');

        this.$el.mediumInsert();

        // Place caret at the beginning of #paragraph
        placeCaret(document.getElementById('paragraph2'), 0);

        this.$el.find('#paragraph2').click();

        expect(this.$el.find('.medium-insert-buttons').css('display')).toBe('none');
    });

    it('toggles addons buttons after clicking on show button', function () {
        this.$el.html('<p id="paragraph">&nbsp;</p><p>test</p>');

        this.$el.mediumInsert();

        // Place caret at the beginning of #paragraph
        placeCaret(document.getElementById('paragraph'), 0);

        this.$el.find('#paragraph').click();
        this.$el.find('.medium-insert-buttons-show').click();

        expect(this.$el.find('.medium-insert-buttons-addons').css('display')).toBe('block');
        expect(this.$el.find('.medium-insert-buttons-show').hasClass('medium-insert-buttons-rotate')).toBe(true);

        this.$el.find('.medium-insert-buttons-show').click();

        expect(!this.$el.find('.medium-insert-buttons-show').hasClass('medium-insert-buttons-rotate')).toBe(true);
    });

    it('calls addon\'s add function if addon\'s button is clicked', function () {
        var addonInstance;

        this.$el.html('<p id="paragraph">&nbsp;</p><p>test</p>');

        this.$el.mediumInsert({
            addons: {
                embeds: false
            }
        });
        addonInstance = this.$el.data('plugin_mediumInsertImages');

        spyOn(addonInstance, 'add');

        // Place caret at the beginning of #paragraph
        placeCaret(document.getElementById('paragraph'), 0);

        this.$el.find('#paragraph').click();
        this.$el.find('.medium-insert-buttons-show').click();
        this.$el.find('.medium-insert-action').click();

        expect(addonInstance.add.calls.count()).toBe(1);
    });

    it('removes also plugin buttons on serialization', function () {
        var editor = new MediumEditor('.editable');

        this.$el.mediumInsert({
            editor: editor
        });

        expect(editor.serialize()['element-0'].value).toBe('<p><br></p>');
    });

    it('disables plugin on editor destroy', function () {
        var editor = new MediumEditor(this.$el.get(0));

        this.$el.mediumInsert({
            editor: editor
        });

        editor.destroy();

        expect(this.$el.data('plugin_mediumInsert').options.enabled).toBe(false);
    });

    it('enables plugin on editor setup', function () {
        var editor = new MediumEditor(this.$el.get(0));

        this.$el.mediumInsert({
            editor: editor
        });

        editor.setup();

        expect(this.$el.data('plugin_mediumInsert').options.enabled).toBe(true);
    });

    it('displays placeholder dispite of plugin buttons', function () {
        var editor = new MediumEditor(this.$el.get(0));

        this.$el.mediumInsert({
            editor: editor
        });

        editor.getExtensionByName('placeholder').updatePlaceholder(this.$el.get(0));

        expect(this.$el.hasClass('medium-editor-placeholder')).toBe(true);
    });

    it('hides placeholder when there is a text', function () {
        var editor = new MediumEditor(this.$el.get(0));

        this.$el.mediumInsert({
            editor: editor
        });

        this.$el.addClass('medium-editor-placeholder');
        this.$el.prepend('<p>asd</p>');

        editor.getExtensionByName('placeholder').updatePlaceholder(this.$el.get(0));

        expect(this.$el.hasClass('medium-editor-placeholder')).toBe(false);
    });
});
