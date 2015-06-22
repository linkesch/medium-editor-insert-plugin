/**
 * Placing caret to element and selected position
 *
 * @param {Element} el
 * @param {integer} position
 * @return {void}
 */

function placeCaret (el, position) {
    var range, sel;

    range = document.createRange();
    sel = window.getSelection();
    range.setStart(el.childNodes[0], position);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
}


module('core', {
    setup: function () {
        this.clock = sinon.useFakeTimers();

        $('#qunit-fixture').html('<div class="editable"></div>');
        this.$el = $('.editable');
    },
    teardown: function () {
        this.clock.restore();
    }
});

test('plugin initialization', function () {
    this.$el.mediumInsert();

    ok(this.$el.hasClass('medium-editor-insert-plugin'), '.medium-editor-insert-plugin class added');
});

asyncTest('addons initialization', function () {
    this.stub($.fn, 'mediumInsertImages', function () {
        ok(1, 'images initialized');
        $.fn.mediumInsertImages.restore();
        start();
    });

    this.$el.data('plugin_mediumInsertImages', {
        options: {}
    });
    this.$el.mediumInsert();
});

test('plugin does nothing if there is no addon selected', function () {
    this.$el.mediumInsert({
      addons: false
    });

    equal(this.$el.html(), '', 'editor is empty');
});

test('adding empty paragraph if there is no content', function () {
    this.$el.mediumInsert();

    equal(this.$el.find('p').length, 1, 'paragraph created');
});

test('wrapping <br> into paragraph', function () {
    this.$el.html('<br>');

    this.$el.mediumInsert();

    equal(this.$el.find('p').length, 1, 'paragraph created');
    equal(this.$el.find('br').length, 1, 'only 1 br exists');
});

test('wrapping text content into paragraph', function () {
    this.$el.html('text');

    this.$el.mediumInsert();

    equal(this.$el.find('p').length, 1, 'paragraph created');
});

test('adding empty paragraph at the end if the last element is an addon element', function () {
    this.$el.html('<div class="medium-insert-images"></div>');

    this.$el.mediumInsert();

    ok(this.$el.find('.medium-insert-images').next().is('p'), 'paragraph created');
});

test('adding plugin\'s buttons to the $el', function () {
    this.$el.mediumInsert();

    equal(this.$el.find('.medium-insert-buttons').length, 1, 'buttons appended');
});

test('showing plugin\'s buttons after clicking on empty paragraph', function () {
    this.$el.html('<p id="paragraph">&nbsp;</p><p id="paragraph2" class="medium-insert-active">test</p>');

    this.$el.mediumInsert();

    // Place caret at the beginning of #paragraph
    placeCaret(document.getElementById('paragraph'), 0);

    this.$el.find('#paragraph').click();
    this.clock.tick(1);

    equal(this.$el.find('.medium-insert-buttons').css('display'), 'block', 'buttons are visible');
    ok(this.$el.find('#paragraph').hasClass('medium-insert-active'), 'active paragraph has medium-insert-active class');
    equal(this.$el.find('#paragraph2').hasClass('medium-insert-active'), false, 'inactive paragraph does not have medium-insert-active class');
});

test('showing only addon button after clicking on addon paragraph', function () {
    this.$el.html('<p id="paragraph" class="medium-insert-images">&nbsp;</p><p id="paragraph2" class="medium-insert-active">test</p>');

    this.$el.mediumInsert();

    // Place caret at the beginning of #paragraph
    placeCaret(document.getElementById('paragraph'), 0);

    this.$el.find('#paragraph').click();
    this.clock.tick(101);

    equal(this.$el.find('.medium-insert-buttons').css('display'), 'block', 'buttons are visible');
    equal(this.$el.find('.medium-insert-buttons a[data-addon="embeds"]').parent().css('display'), 'none', 'inactive addon is not visible');
});

test('hiding plugin\'s buttons after clicking on non-empty paragraph', function () {
    this.$el.html('<p>&nbsp;</p><p id="paragraph2">test</p>');

    this.$el.mediumInsert();

    // Place caret at the beginning of #paragraph
    placeCaret(document.getElementById('paragraph2'), 0);

    this.$el.find('#paragraph2').click();

    equal(this.$el.find('.medium-insert-buttons').css('display'), 'none', 'buttons are hidden');
});

test('toggling addons buttons after clicking on show button', function () {
    this.$el.html('<p id="paragraph">&nbsp;</p><p>test</p>');

    this.$el.mediumInsert();

    // Place caret at the beginning of #paragraph
    placeCaret(document.getElementById('paragraph'), 0);

    this.$el.find('#paragraph').click();
    this.$el.find('.medium-insert-buttons-show').click();

    equal(this.$el.find('.medium-insert-buttons-addons').css('display'), 'block', 'addons are visible');
    ok(this.$el.find('.medium-insert-buttons-show').hasClass('medium-insert-buttons-rotate'), '.medium-insert-buttons-rotate class added');

    this.$el.find('.medium-insert-buttons-show').click();

    ok(!this.$el.find('.medium-insert-buttons-show').hasClass('medium-insert-buttons-rotate'), '.medium-insert-buttons-rotate class removed');
});

asyncTest('calling addon\'s add function if addon\'s button is clicked', function () {
    var addonInstance;

    this.$el.html('<p id="paragraph">&nbsp;</p><p>test</p>');

    this.$el.mediumInsert({
        addons: {
            embeds: false
        }
    });
    addonInstance = this.$el.data('plugin_mediumInsertImages');

    this.stub(addonInstance, 'add', function () {
        ok(1, 'add() called');
        addonInstance.add.restore();
        start();
    });

    // Place caret at the beginning of #paragraph
    placeCaret(document.getElementById('paragraph'), 0);

    this.$el.find('#paragraph').click();
    this.$el.find('.medium-insert-buttons-show').click();
    this.$el.find('.medium-insert-action').click();
});

/* THESE TESTS FOR SOME REASON DON'T WORK IN PHANTOMJS

test('editor\'s serialize removes also plugin buttons', function () {
    var editor = new MediumEditor('.editable');

    this.$el.mediumInsert({
        editor: editor
    });

    equal(editor.serialize()['element-0'].value, '<p><br></p>', 'plugin buttons are removed');
});

test('editor\'s deactivate function disables plugin', function () {
    var editor = new MediumEditor(this.$el.get(0));

    this.$el.mediumInsert({
        editor: editor
    });

    editor.deactivate();

    equal(this.$el.data('plugin_mediumInsert').options.enabled, false, 'plugin was disabled');
});

test('editor\'s activate function enables plugin', function () {
    var editor = new MediumEditor(this.$el.get(0));

    this.$el.mediumInsert({
        editor: editor
    });

    editor.activate();

    ok(this.$el.data('plugin_mediumInsert').options.enabled, 'plugin was enabled');
});

test('editor\'s update placeholder function displays placeholder dispite of plugin buttons', function () {
    var editor = new MediumEditor(this.$el.get(0));

    this.$el.mediumInsert({
        editor: editor
    });

    editor.placeholders.updatePlaceholder(this.$el.get(0));

    ok(this.$el.hasClass('medium-editor-placeholder'), 'placeholder was displayed');
});

test('editor\'s update placeholder function hides placeholder when there is a text', function () {
    var editor = new MediumEditor(this.$el.get(0));

    this.$el.mediumInsert({
        editor: editor
    });

    this.$el.addClass('medium-editor-placeholder');
    this.$el.prepend('<p>asd</p>');

    editor.placeholders.updatePlaceholder(this.$el.get(0));

    equal(this.$el.hasClass('medium-editor-placeholder'), false, 'placeholder was removed');
});
*/