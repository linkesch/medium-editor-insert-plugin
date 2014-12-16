/*global placeCaret: false */

module('embeds', {
    setup: function () {
        this.clock = sinon.useFakeTimers();

        $('#qunit-fixture').html('<div class="editable"></div>');
        this.$el = $('.editable');
        this.$el.mediumInsert({
            addons: {
                embeds: {
                    oembedProxy: false
                }
            }
        });
        this.addon = this.$el.data('plugin_mediumInsertEmbeds');

        // Place caret into first paragraph
        placeCaret(this.$el.find('p').get(0), 0);
    },
    teardown: function () {
        this.clock.restore();
    }
});

test('toggling placeholder', function () {
    var $p = this.$el.find('p').first();

    this.$el.append('<div id="p2">&nbsp;</div>');

    $p.click();
    this.$el.find('.medium-insert-buttons-show').click();
    this.$el.find('.medium-insert-action[data-addon="embeds"]').click();

    equal(this.$el.find('.medium-insert-embeds-input').length, 1, 'placeholder added');
    ok(this.$el.find('.medium-insert-embeds-input').is('div'), 'placeholder is div');

    placeCaret(this.$el.find('#p2').get(0), 0);
    this.$el.click();

    equal(this.$el.find('.medium-insert-embeds-input').length, 0, 'placeholder removed');
});

test('removing empty placeholder on backspace', function () {
    var $event = $.Event('keydown');

    $event.which = 8;
    this.$el.prepend('<p class="medium-insert-embeds-input medium-insert-embeds-active"></p>');

    this.$el.trigger($event);

    equal(this.$el.find('.medium-insert-embeds-input').length, 0, 'placeholder removed');
});
/** /
// These tests doesn't work in PhantomJS
test('embedding youtube', function () {
    var $event = $.Event('keydown');

    $event.which = 13;
    this.$el.prepend('<p class="medium-insert-embeds-input medium-insert-embeds-active">https://www.youtube.com/watch?v=BROWqjuTM0g</p>');

    this.$el.trigger($event);

    equal(this.$el.find('.medium-insert-embeds').length, 1, 'embed added');
    equal(this.$el.find('.medium-insert-embeds iframe').length, 1, 'iframe added');
    equal(this.$el.find('.medium-insert-embeds-input').length, 0, 'placeholder removed');
});

test('embedding vimeo', function () {
    var $event = $.Event('keydown');

    $event.which = 13;
    this.$el.prepend('<p class="medium-insert-embeds-input medium-insert-embeds-active">http://vimeo.com/2619976</p>');

    this.$el.trigger($event);

    equal(this.$el.find('.medium-insert-embeds').length, 1, 'embed added');
    equal(this.$el.find('.medium-insert-embeds iframe').length, 1, 'iframe added');
    equal(this.$el.find('.medium-insert-embeds-input').length, 0, 'placeholder removed');
});

test('embedding instagram', function () {
    var $event = $.Event('keydown');

    $event.which = 13;
    this.$el.prepend('<p class="medium-insert-embeds-input medium-insert-embeds-active">http://instagram.com/p/u7PiWCsGxj</p>');

    this.$el.trigger($event);

    equal(this.$el.find('.medium-insert-embeds').length, 1, 'embed added');
    equal(this.$el.find('.medium-insert-embeds iframe').length, 1, 'iframe added');
    equal(this.$el.find('.medium-insert-embeds-input').length, 0, 'placeholder removed');
});

asyncTest('embedding triggers input event', function () {
    var $event = $.Event('keydown');

    this.$el.one('input', function () {
        ok(1, 'input triggered');
        start();
    });

    $event.which = 13;
    this.$el.prepend('<p class="medium-insert-embeds-input medium-insert-embeds-active">https://www.youtube.com/watch?v=BROWqjuTM0g</p>');

    this.$el.trigger($event);
});

asyncTest('embedding wront link triggers input event', function () {
    var $event = $.Event('keydown');

    this.$el.one('input', function () {
        ok(1, 'input triggered');
        start();
    });

    $event.which = 13;
    this.$el.prepend('<p class="medium-insert-embeds-input medium-insert-embeds-active">asd</p>');

    this.$el.trigger($event);
});
/**/