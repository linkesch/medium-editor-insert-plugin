/*global placeCaret */

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

test('selecting embed', function () {
    this.$el.prepend('<div class="medium-insert-embeds"><figure></figure><div class="medium-insert-embeds-overlay"></div></div>');

    this.$el.find('.medium-insert-embeds-overlay').click();
    this.clock.tick(50);

    ok(this.$el.find('.medium-insert-embeds').hasClass('medium-insert-embeds-selected'), 'embed is selected');
    equal($('.medium-insert-embeds-toolbar').length, 1, 'embed toolbar added');
    ok($('.medium-insert-embeds-toolbar2').length, '2nd toolbar added');
    ok(this.$el.find('figcaption').length, 'caption added');
});

test('clicking on caption removes placeholder', function () {
    this.$el.prepend('<div class="medium-insert-embeds">'+
        '<figure><figcaption class="medium-insert-caption-placeholder"></figcaption></figure>'+
        '<div class="medium-insert-embeds-overlay"></div>'+
    '</div>');

    this.$el.find('.medium-insert-caption-placeholder').click();
    this.clock.tick(50);

    equal(this.$el.find('figcaption').hasClass('medium-insert-caption-placeholder'), false, 'caption placeholder removed');
});

test('unselecting embed', function () {
    this.$el.prepend('<div class="medium-insert-embeds medium-insert-embeds-selected"><figure><figcaption></figcaption></figure></div><div class="medium-insert-embeds-toolbar"></div>');
    this.$el.click();

    equal(this.$el.find('.medium-insert-embeds').hasClass('medium-insert-embeds-selected'), false, 'embed is unselected');
    equal($('.medium-insert-embeds-toolbar').length, 0, 'embed toolbar removed');
    equal($('.medium-insert-embeds-toolbar2').length, 0, '2nd toolbar removed');
    equal(this.$el.find('figcaption').length, 0, 'caption removed');
});

test('removing embed', function () {
    var $event = $.Event('keydown');

    $event.which = 8;

    this.$el.prepend('<div class="medium-insert-embeds medium-insert-embeds-selected"></div><div class="medium-insert-embeds-toolbar"></div>');
    this.$el.trigger($event);

    equal(this.$el.find('.medium-insert-embeds').length, 0, 'embed deleted');
    equal($('.medium-insert-embeds-toolbar').length, 0, 'embed toolbar removed');
});

asyncTest('removing embed triggers input event', function () {
   var $event = $.Event('keydown');

   this.$el.one('input', function () {
       ok(1, 'input triggered');
       start();
   });

   $event.which = 8;

   this.$el.prepend('<div class="medium-insert-embeds medium-insert-embeds-selected"></div><div class="medium-insert-embeds-toolbar"></div>');

   this.$el.trigger($event);
});

test('choosing embed style', function () {
    var $embed;

    this.$el.prepend('<div class="medium-insert-embeds medium-insert-embeds-left"><div class="medium-insert-embeds-overlay"></div></div>');
    $embed = this.$el.find('.medium-insert-embeds');

    $embed.find('.medium-insert-embeds-overlay').click();
    this.clock.tick(50);

    $('.medium-insert-embeds-toolbar .medium-editor-action').first().click();

    ok($embed.hasClass('medium-insert-embeds-wide'), 'new style added');
    equal($embed.hasClass('medium-insert-embeds-left'), false, 'old style removed');
});

asyncTest('choosing embed style triggers input event', function () {
    this.$el.prepend('<div class="medium-insert-embeds medium-insert-embeds-left"><div class="medium-insert-embeds-overlay"></div></div>');

    this.$el.one('input', function () {
        ok(1, 'input triggered');
        start();
    });

    this.$el.find('.medium-insert-embeds-overlay').click();
    this.clock.tick(50);

    $('.medium-insert-embeds-toolbar .medium-editor-action').first().click();
});

asyncTest('choosing embed style calls callback function', function () {
    $('#qunit-fixture').html('<div class="editable"></div>');
    this.$el = $('.editable');

    this.$el.mediumInsert({
        addons: {
            embeds: {
                styles: {
                    wide: {
                        added: function () {
                            ok(1, 'callback function called');
                            start();
                        }
                    }
                }
            }
        }
    });

    this.$el.prepend('<div class="medium-insert-embeds medium-insert-embeds-left"><div class="medium-insert-embeds-overlay"></div></div>');

    // Place caret into first paragraph
    placeCaret(this.$el.find('p').get(0), 0);

    this.$el.find('.medium-insert-embeds-overlay').click();
    this.clock.tick(50);

    $('.medium-insert-embeds-toolbar .medium-editor-action').first().click();
});

asyncTest('clicking embed action calls callback function', function () {
    $('#qunit-fixture').html('<div class="editable"></div>');
    this.$el = $('.editable');

    this.$el.mediumInsert({
        addons: {
            embeds: {
                actions: {
                    remove: {
                        clicked: function () {
                            ok(1, 'callback function called');
                            start();
                        }
                    }
                }
            }
        }
    });

    this.$el.prepend('<div class="medium-insert-embeds medium-insert-embeds-left"><div class="medium-insert-embeds-overlay"></div></div>');

    // Place caret into first paragraph
    placeCaret(this.$el.find('p').get(0), 0);

    this.$el.find('.medium-insert-embeds-overlay').click();
    this.clock.tick(50);

    $('.medium-insert-embeds-toolbar2 .medium-editor-action').first().click();
});

test('backwards compatibility', function () {
    $('#qunit-fixture').html('<div class="editable"><div class="medium-insert-embeds"><iframe></iframe></div></div>');
    this.$el = $('.editable');

    this.$el.mediumInsert();

    ok(this.$el.find('.medium-insert-embeds .medium-insert-embed iframe').length, 'old embed structure was wrapped into new one');
});

// These tests don't work in PhantomJS
test('embedding youtube', function () {
    var $event = $.Event('keydown');

    $event.which = 13;
    $('#qunit-fixture').html('<div class="editable"><p class="medium-insert-embeds-input medium-insert-embeds-active">https://www.youtube.com/watch?v=BROWqjuTM0g</p></div>');
    this.$el = $('.editable');
    this.$el.mediumInsert({
        addons: {
            embeds: {
                oembedProxy: false
            }
        }
    });
    this.$el.trigger($event);

    equal(this.$el.find('.medium-insert-embeds').length, 1, 'embed added');
    equal(this.$el.find('.medium-insert-embeds iframe').length, 1, 'iframe added');
    equal(this.$el.find('.medium-insert-embeds-input').length, 0, 'placeholder removed');
});

test('embedding vimeo', function () {
    var $event = $.Event('keydown');

    $event.which = 13;
    $('#qunit-fixture').html('<div class="editable"><p class="medium-insert-embeds-input medium-insert-embeds-active">http://vimeo.com/2619976</p></div>');
    this.$el = $('.editable');
    this.$el.mediumInsert({
        addons: {
            embeds: {
                oembedProxy: false
            }
        }
    });
    this.$el.trigger($event);

    equal(this.$el.find('.medium-insert-embeds').length, 1, 'embed added');
    equal(this.$el.find('.medium-insert-embeds iframe').length, 1, 'iframe added');
    equal(this.$el.find('.medium-insert-embeds-input').length, 0, 'placeholder removed');
});

test('embedding instagram', function () {
    var $event = $.Event('keydown');

    $event.which = 13;
    $('#qunit-fixture').html('<div class="editable"><p class="medium-insert-embeds-input medium-insert-embeds-active">http://instagram.com/p/u7PiWCsGxj</p></div>');
    this.$el = $('.editable');
    this.$el.mediumInsert({
        addons: {
            embeds: {
                oembedProxy: false
            }
        }
    });
    this.$el.trigger($event);

    equal(this.$el.find('.medium-insert-embeds').length, 1, 'embed added');
    equal(this.$el.find('.medium-insert-embeds iframe').length, 1, 'iframe added');
    equal(this.$el.find('.medium-insert-embeds-input').length, 0, 'placeholder removed');
});

test('converting bad embed into text', function () {
    var $event = $.Event('keydown');

    $event.which = 13;
    $('#qunit-fixture').html('<div class="editable"><p class="medium-insert-embeds-input medium-insert-embeds-active">test</p></div>');
    this.$el = $('.editable');
    this.$el.mediumInsert({
        addons: {
            embeds: {
                oembedProxy: false
            }
        }
    });
    this.$el.trigger($event);

    equal(this.$el.find('.medium-insert-embeds-input').length, 0, 'embed removed');
    equal(this.$el.find('p:first').html(), 'test', 'content converted into text');
});

test('disabled embed first toolbar', function () {
    $('#qunit-fixture').html('<div class="editable"></div>');
    this.$el = $('.editable');
    this.$el.mediumInsert({
        addons: {
            embeds: {
                oembedProxy: false,
                styles: false
            }
        }
    });

    this.$el.prepend('<div class="medium-insert-embeds"><figure></figure><div class="medium-insert-embeds-overlay"></div></div>');

    this.$el.find('.medium-insert-embeds-overlay').click();
    this.clock.tick(50);

    equal($('.medium-insert-embeds-toolbar').length, 0, 'first toolbar not added');
    equal($('.medium-insert-embeds-toolbar2').length, 1, '2nd toolbar added');
});

test('disabled embed toolbar2', function () {
    $('#qunit-fixture').html('<div class="editable"></div>');
    this.$el = $('.editable');
    this.$el.mediumInsert({
        addons: {
            embeds: {
                oembedProxy: false,
                actions: false
            }
        }
    });

    this.$el.prepend('<div class="medium-insert-embeds"><figure></figure><div class="medium-insert-embeds-overlay"></div></div>');

    this.$el.find('.medium-insert-embeds-overlay').click();
    this.clock.tick(50);

    equal($('.medium-insert-embeds-toolbar').length, 1, 'first toolbar added');
    equal($('.medium-insert-embeds-toolbar2').length, 0, '2nd toolbar not added');
});

test('contentediable attr and overlay are added on initialization', function () {
    $('#qunit-fixture').html('<div class="editable"><div class="medium-insert-embeds"><figure class="medium-insert-embed"></figure></div></div>');
    this.$el = $('.editable');

    this.$el.mediumInsert({
        addons: {
            embeds: {}
        }
    });

    equal(this.$el.find('.medium-insert-embeds').attr('contenteditable'), 'false', 'contenteditable attr was added to embeds');
    ok(this.$el.find('.medium-insert-embeds .medium-insert-embeds-overlay').length, 1, 'overlay added');
});

/* THIS TEST FOR SOME REASON DOESN'T WORK IN PHANTOMJS

test('editor\'s serialize removes also contenteditable attr and ovelay', function () {
    var html = '<div class="medium-insert-embeds"><figure class="medium-insert-embed"></figure></div>',
        editor, $serialized;

    $('#qunit-fixture').html('<div class="editable">'+ html +'</div>');
    this.$el = $('.editable');

    editor = new MediumEditor(this.$el.get(0));

    this.$el.mediumInsert({
        editor: editor,
        addons: {
            embeds: {}
        }
    });

    $serialized = $(editor.serialize()['element-0'].value);
    equal($serialized.find('.medium-insert-embeds').attr('contenteditable'), undefined, 'contenteditable attr was removed');
    equal($serialized.find('.medium-insert-embeds-overlay').length, 0, 'overlay was removed');
});
*/
