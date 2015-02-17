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
        $('#qunit-fixture').html('<div class="editable"></div>');
        this.$el = $('.editable');
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

    equal(this.$el.find('.medium-insert-buttons').css('display'), 'block', 'buttons are visible');
    ok(this.$el.find('#paragraph').hasClass('medium-insert-active'), 'active paragraph has medium-insert-active class');
    equal(this.$el.find('#paragraph2').hasClass('medium-insert-active'), false, 'inactive paragraph does not have medium-insert-active class');
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

    this.$el.find('.medium-insert-buttons-show').click();

    equal(this.$el.find('.medium-insert-buttons-addons').css('display'), 'none', 'addons are hidden');
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