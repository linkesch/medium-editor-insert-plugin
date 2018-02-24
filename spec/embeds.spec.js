describe('Embeds addon', function () {
    beforeEach(function () {
        $('body').append('<div id="fixtures"><div class="editable"></div></div>');
        this.$el = $('.editable');
        this.editor = new MediumEditor(this.$el.get(0));
        this.$el.mediumInsert({
            editor: this.editor,
            addons: {
                embeds: {
                    oembedProxy: false,
                    parseOnPaste: true
                }
            }
        });
        this.addon = this.$el.data('plugin_mediumInsertEmbeds');

        jasmine.clock().install();
    });

    afterEach(function () {
        $('#fixtures').remove();

        jasmine.clock().uninstall();
    });

    it('toggles placeholder', function () {
        var $p = this.$el.find('p').first();

        this.$el.append('<div id="p2">&nbsp;</div>');

        placeCaret($p.get(0), 0);
        $p.click();

        this.$el.find('.medium-insert-buttons-show').click();
        this.$el.find('.medium-insert-action[data-addon="embeds"]').click();

        expect(this.$el.find('.medium-insert-embeds-input').length).toEqual(1);
        expect(this.$el.find('.medium-insert-embeds-input').is('div')).toBe(true);

        placeCaret(this.$el.find('#p2').get(0), 0);
        this.$el.click();

        expect(this.$el.find('.medium-insert-embeds-input').length).toEqual(0);
    });

    it('removes empty placeholder on backspace', function () {
        var $event = $.Event('keydown');

        $event.which = 8;
        this.$el.prepend('<p class="medium-insert-embeds-input medium-insert-embeds-active"></p>');

        this.$el.trigger($event);

        expect(this.$el.find('.medium-insert-embeds-input').length).toEqual(0);
    });

    it('supports selecting embed', function () {
        this.$el.prepend('<div class="medium-insert-embeds"><figure></figure><div class="medium-insert-embeds-overlay"></div></div>');

        this.$el.find('.medium-insert-embeds-overlay').click();
        jasmine.clock().tick(50);

        expect(this.$el.find('.medium-insert-embeds').hasClass('medium-insert-embeds-selected')).toBe(true);
        expect($('.medium-insert-embeds-toolbar').length).toEqual(1);
        expect($('.medium-insert-embeds-toolbar2').length).toEqual(1);
        expect(this.$el.find('figcaption').length).toEqual(1);
    });

    it('supports disabling captions', function () {
        $('#fixtures').html('<div class="editable"><div class="medium-insert-embeds"><figure></figure><div class="medium-insert-embeds-overlay"></div></div></div>');
        this.$el = $('.editable');
        this.$el.mediumInsert({
            addons: {
                embeds: {
                    captions: false
                }
            }
        });

        this.$el.find('img').click();
        jasmine.clock().tick(50);

        expect(this.$el.find('figcaption').length).toEqual(0);
    });

    it('removes placeholder after clicking on caption', function () {
        this.$el.prepend('<div class="medium-insert-embeds">' +
            '<figure><figcaption class="medium-insert-caption-placeholder"></figcaption></figure>' +
            '<div class="medium-insert-embeds-overlay"></div>' +
            '</div>');

        this.$el.find('.medium-insert-caption-placeholder').click();
        jasmine.clock().tick(50);

        expect(this.$el.find('figcaption').hasClass('medium-insert-caption-placeholder')).toBe(false);
    });

    it('supports unselecting embed', function () {
        this.$el.prepend('<div class="medium-insert-embeds medium-insert-embeds-selected"><figure><figcaption></figcaption></figure></div><div class="medium-insert-embeds-toolbar"></div>');
        this.$el.click();

        expect(this.$el.find('.medium-insert-embeds').hasClass('medium-insert-embeds-selected')).toBe(false);
        expect($('.medium-insert-embeds-toolbar').length).toEqual(0);
        expect($('.medium-insert-embeds-toolbar2').length).toEqual(0);
        expect(this.$el.find('figcaption').length).toEqual(0);
    });

    it('removes embed on backspace', function () {
        var $event = $.Event('keydown');

        $event.which = 8;

        this.$el.prepend('<div class="medium-insert-embeds medium-insert-embeds-selected"></div><div class="medium-insert-embeds-toolbar"></div>');
        this.$el.trigger($event);

        expect(this.$el.find('.medium-insert-embeds').length).toEqual(0);
        expect($('.medium-insert-embeds-toolbar').length).toEqual(0);
    });

    it('triggers input event after removing embed ', function (done) {
        var $event = $.Event('keydown');

        this.editor.subscribe('editableInput', function () {
            expect(true).toBe(true);
            done();
        });

        $event.which = 8;

        this.$el.prepend('<div class="medium-insert-embeds medium-insert-embeds-selected"></div><div class="medium-insert-embeds-toolbar"></div>');

        this.$el.trigger($event);
    });

    it('supports chaning embed style', function () {
        var $embed;

        this.$el.prepend('<div class="medium-insert-embeds medium-insert-embeds-left"><div class="medium-insert-embeds-overlay"></div></div>');
        $embed = this.$el.find('.medium-insert-embeds');

        $embed.find('.medium-insert-embeds-overlay').click();
        jasmine.clock().tick(50);

        $('.medium-insert-embeds-toolbar .medium-editor-action').first().click();

        expect($embed.hasClass('medium-insert-embeds-wide')).toBe(true);
        expect($embed.hasClass('medium-insert-embeds-left')).toBe(false);
    });

    it('triggers input event after changing embed style ', function (done) {
        this.$el.prepend('<div class="medium-insert-embeds medium-insert-embeds-left"><div class="medium-insert-embeds-overlay"></div></div>');

        this.editor.subscribe('editableInput', function () {
            expect(true).toBe(true);
            done();
        });

        this.$el.find('.medium-insert-embeds-overlay').click();
        jasmine.clock().tick(50);

        $('.medium-insert-embeds-toolbar .medium-editor-action').first().click();
    });

    it('choosing embed style calls callback function', function (done) {
        this.addon.options.styles.wide.added = function () {
            expect(true).toBe(true);
            done();
        };

        this.$el.prepend('<div class="medium-insert-embeds medium-insert-embeds-left"><div class="medium-insert-embeds-overlay"></div></div>');

        // Place caret into first paragraph
        placeCaret(this.$el.find('p').get(0), 0);

        this.$el.find('.medium-insert-embeds-overlay').click();
        jasmine.clock().tick(50);

        $('.medium-insert-embeds-toolbar .medium-editor-action').first().click();
    });

    it('calls callback function after clicking on embed action ', function (done) {
        this.addon.options.actions.remove.clicked = function () {
            expect(true).toBe(true);
            done();
        };

        this.$el.prepend('<div class="medium-insert-embeds medium-insert-embeds-left"><div class="medium-insert-embeds-overlay"></div></div>');

        // Place caret into first paragraph
        placeCaret(this.$el.find('p').get(0), 0);

        this.$el.find('.medium-insert-embeds-overlay').click();
        jasmine.clock().tick(50);

        $('.medium-insert-embeds-toolbar2 .medium-editor-action').first().click();
    });

    it('maintains backwards compatibility', function () {
        $('#fixtures').html('<div class="editable"><div class="medium-insert-embeds"><iframe></iframe></div></div>');
        this.$el = $('.editable');

        this.$el.mediumInsert();

        expect(this.$el.find('.medium-insert-embeds .medium-insert-embed iframe').length).toEqual(1);
    });

    it('supports embedding youtube', function () {
        var $event = $.Event('keydown');

        $event.which = 13;
        $('#fixtures').html('<div class="editable"><p class="medium-insert-embeds-input medium-insert-embeds-active">https://www.youtube.com/watch?v=BROWqjuTM0g</p></div>');
        this.$el = $('.editable');
        this.$el.mediumInsert({
            addons: {
                embeds: {
                    oembedProxy: false
                }
            }
        });
        this.$el.trigger($event);

        expect(this.$el.find('.medium-insert-embeds').length).toEqual(1);
        expect(this.$el.find('.medium-insert-embeds iframe').length).toEqual(1);
        expect(this.$el.find('.medium-insert-embeds-input').length).toEqual(0);
    });

    it('supports embedding youtube via paste', function () {
        var e = {
            originalEvent: {
                clipboardData: {
                    getData: function () {
                        return 'https://www.youtube.com/watch?v=BROWqjuTM0g';
                    }
                }
            }
        };
        this.$el = $('.editable');
        this.$el.append($('<p>https://www.youtube.com/watch?v=BROWqjuTM0g</p>'));
        this.addon.processPasted(e);

        expect(this.$el.find('.medium-insert-embeds').length).toEqual(1);
        expect(this.$el.find('.medium-insert-embeds iframe').length).toEqual(1);
    });

    it('supports embedding vimeo', function () {
        var $event = $.Event('keydown');

        $event.which = 13;
        $('#fixtures').html('<div class="editable"><p class="medium-insert-embeds-input medium-insert-embeds-active">http://vimeo.com/2619976</p></div>');
        this.$el = $('.editable');
        this.$el.mediumInsert({
            addons: {
                embeds: {
                    oembedProxy: false
                }
            }
        });
        this.$el.trigger($event);

        expect(this.$el.find('.medium-insert-embeds').length).toEqual(1);
        expect(this.$el.find('.medium-insert-embeds iframe').length).toEqual(1);
        expect(this.$el.find('.medium-insert-embeds-input').length).toEqual(0);
    });

    it('supports embedding vimeo via paste', function () {
        var e = {
            originalEvent: {
                clipboardData: {
                    getData: function () {
                        return 'http://vimeo.com/2619976';
                    }
                }
            }
        };
        this.$el = $('.editable');
        this.$el.append($('<p>http://vimeo.com/2619976</p>'));
        this.addon.processPasted(e);

        expect(this.$el.find('.medium-insert-embeds').length).toEqual(1);
        expect(this.$el.find('.medium-insert-embeds iframe').length).toEqual(1);
    });

    it('support embedding instagram', function () {
        var $event = $.Event('keydown');

        $event.which = 13;
        $('#fixtures').html('<div class="editable"><p class="medium-insert-embeds-input medium-insert-embeds-active">http://instagram.com/p/u7PiWCsGxj</p></div>');
        this.$el = $('.editable');
        this.$el.mediumInsert({
            addons: {
                embeds: {
                    oembedProxy: false
                }
            }
        });
        this.$el.trigger($event);

        expect(this.$el.find('.medium-insert-embeds').length).toEqual(1);
        expect(this.$el.find('.medium-insert-embeds iframe').length).toEqual(1);
        expect(this.$el.find('.medium-insert-embeds-input').length).toEqual(0);
    });

    it('support embedding twitter', function () {
        var $event = $.Event('keydown');

        $event.which = 13;
        $('#fixtures').html('<div class="editable"><p class="medium-insert-embeds-input medium-insert-embeds-active">https://twitter.com/medium_editor/status/694987296379125760</p></div>');
        this.$el = $('.editable');
        this.$el.mediumInsert({
            addons: {
                embeds: {
                    oembedProxy: false
                }
            }
        });
        this.$el.trigger($event);

        expect(this.$el.find('.medium-insert-embeds').length).toEqual(1);
        expect(this.$el.find('.medium-insert-embeds .twitter-tweet').length).toEqual(1);
        expect(this.$el.find('.medium-insert-embeds-input').length).toEqual(0);
    });

    it('support embedding facebook', function () {
        var $event = $.Event('keydown');

        $event.which = 13;
        $('#fixtures').html('<div class="editable"><p class="medium-insert-embeds-input medium-insert-embeds-active">https://www.facebook.com/cneistat/videos/vb.210351389002863/922328184471843/?type=2&theater</p></div>');
        this.$el = $('.editable');
        this.$el.mediumInsert({
            addons: {
                embeds: {
                    oembedProxy: false
                }
            }
        });
        this.$el.trigger($event);

        expect(this.$el.find('.medium-insert-embeds').length).toEqual(1);
        expect(this.$el.find('.medium-insert-embeds .fb-post').length).toEqual(1);
        expect(this.$el.find('.medium-insert-embeds-input').length).toEqual(0);
    });

    it('converts bad embed into text', function () {
        var $event = $.Event('keydown');

        $event.which = 13;
        $('#fixtures').html('<div class="editable"><p class="medium-insert-embeds-input medium-insert-embeds-active">test</p></div>');
        this.$el = $('.editable');
        this.$el.mediumInsert({
            addons: {
                embeds: {
                    oembedProxy: false
                }
            }
        });
        this.$el.trigger($event);

        expect(this.$el.find('.medium-insert-embeds-input').length).toEqual(0);
        expect(this.$el.find('p:first').html()).toBe('test');
    });

    it('support disabling style toolbar', function () {
        this.addon.options.styles = false;

        this.$el.prepend('<div class="medium-insert-embeds"><figure></figure><div class="medium-insert-embeds-overlay"></div></div>');

        this.$el.find('.medium-insert-embeds-overlay').click();
        jasmine.clock().tick(50);

        expect($('.medium-insert-embeds-toolbar').length).toEqual(0);
        expect($('.medium-insert-embeds-toolbar2').length).toEqual(1);
    });

    it('support disabling action toolbar', function () {
        this.addon.options.actions = false;

        this.$el.prepend('<div class="medium-insert-embeds"><figure></figure><div class="medium-insert-embeds-overlay"></div></div>');

        this.$el.find('.medium-insert-embeds-overlay').click();
        jasmine.clock().tick(50);

        expect($('.medium-insert-embeds-toolbar').length).toEqual(1);
        expect($('.medium-insert-embeds-toolbar2').length).toEqual(0);
    });

    it('adds contentediable attr and overlay on initialization', function () {
        $('#fixtures').html('<div class="editable"><div class="medium-insert-embeds"><figure class="medium-insert-embed"></figure></div></div>');
        this.$el = $('.editable');

        this.$el.mediumInsert({
            addons: {
                embeds: {}
            }
        });

        expect(this.$el.find('.medium-insert-embeds').attr('contenteditable')).toBe('false');
        expect(this.$el.find('.medium-insert-embeds .medium-insert-embeds-overlay').length).toEqual(1);
    });

    it('removes also contenteditable attr and ovelay on editor\'s serialize', function () {
        var html = '<div class="medium-insert-embeds"><figure class="medium-insert-embed"></figure></div>',
            editor, $serialized;

        $('#fixtures').html('<div class="editable">' + html + '</div>');
        this.$el = $('.editable');

        editor = new MediumEditor(this.$el.get(0));

        this.$el.mediumInsert({
            editor: editor,
            addons: {
                embeds: {}
            }
        });

        $serialized = $(editor.serialize()['element-0'].value);
        expect($serialized.find('.medium-insert-embeds').attr('contenteditable')).toBeUndefined();
        expect($serialized.find('.medium-insert-embeds-overlay').length).toEqual(0);
    });

    it('uses data-embed-code as container html for javascript-based embeds', function () {
        var html = '<div class="medium-insert-embeds"><figure class="medium-insert-embed"><div data-embed-code="&amp;lt;blockquote&amp;gt;good-value&amp;lt;/blockquote&amp;gt;">bad-value</div></figure></div>',
            editor, $serialized;

        $('#fixtures').html('<div class="editable">' + html + '</div>');
        this.$el = $('.editable');

        editor = new MediumEditor(this.$el.get(0));

        this.$el.mediumInsert({
            editor: editor,
            addons: {
                embeds: {}
            }
        });

        $serialized = $(editor.serialize()['element-0'].value);
        expect($serialized.find('[data-embed-code]').html()).toEqual('<blockquote>good-value</blockquote>');
    });

    it('does include meta when storeMeta is set', function () {
        var $event = $.Event('keydown');

        $event.which = 13;
        $('#fixtures').html('<div class="editable"><p class="medium-insert-embeds-input medium-insert-embeds-active">https://www.facebook.com/cneistat/videos/vb.210351389002863/922328184471843/?type=2&theater</p></div>');
        this.$el = $('.editable');
        this.$el.mediumInsert({
            addons: {
                embeds: {
                    oembedProxy: false,
                    storeMeta: true
                }
            }
        });
        this.$el.trigger($event);

        expect(this.$el.find('.medium-insert-embeds').length).toEqual(1);
        expect(this.$el.find('.medium-insert-embeds .fb-post').length).toEqual(1);
        expect(this.$el.find('.medium-insert-embeds-meta').length).toEqual(1);
        expect(this.$el.find('.medium-insert-embeds-input').length).toEqual(0);
    });

    it('does not include meta when storeMeta is not set', function () {
        var $event = $.Event('keydown');

        $event.which = 13;
        $('#fixtures').html('<div class="editable"><p class="medium-insert-embeds-input medium-insert-embeds-active">https://www.facebook.com/cneistat/videos/vb.210351389002863/922328184471843/?type=2&theater</p></div>');
        this.$el = $('.editable');
        this.$el.mediumInsert({
            addons: {
                embeds: {
                    oembedProxy: false,
                    storeMeta: false
                }
            }
        });
        this.$el.trigger($event);

        expect(this.$el.find('.medium-insert-embeds').length).toEqual(1);
        expect(this.$el.find('.medium-insert-embeds .fb-post').length).toEqual(1);
        expect(this.$el.find('.medium-insert-embeds-meta').length).toEqual(0);
        expect(this.$el.find('.medium-insert-embeds-input').length).toEqual(0);
    });

    it('does not include meta for bad embeds', function () {
        var $event = $.Event('keydown');

        $event.which = 13;
        $('#fixtures').html('<div class="editable"><p class="medium-insert-embeds-input medium-insert-embeds-active">test</p></div>');
        this.$el = $('.editable');

        this.$el.mediumInsert({
            addons: {
                embeds: {
                    oembedProxy: false,
                    storeMeta: true
                }
            }
        });
        this.$el.trigger($event);

        expect(this.$el.find('.medium-insert-embeds-input').length).toEqual(0);
        expect(this.$el.find('.medium-insert-embeds-meta').length).toEqual(0);
        expect(this.$el.find('p:first').html()).toBe('test');
    });


});
