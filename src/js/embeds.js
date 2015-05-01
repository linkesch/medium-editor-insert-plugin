;(function ($, window, document, undefined) {

    'use strict';

    /** Default values */
    var pluginName = 'mediumInsert',
        addonName = 'Embeds', // first char is uppercase
        defaults = {
            label: '<span class="fa fa-youtube-play"></span>',
            placeholder: 'Paste a YouTube, Vimeo, Facebook, Twitter or Instagram link and press Enter',
            oembedProxy: 'http://medium.iframe.ly/api/oembed?iframe=1',
            captions: true,
            captionPlaceholder: 'Type caption (optional)',
            styles: {
                wide: {
                    label: '<span class="fa fa-align-justify"></span>',
                    // added: function ($el) {},
                    // removed: function ($el) {}
                },
                left: {
                    label: '<span class="fa fa-align-left"></span>',
                    // added: function ($el) {},
                    // removed: function ($el) {}
                },
                right: {
                    label: '<span class="fa fa-align-right"></span>',
                    // added: function ($el) {},
                    // removed: function ($el) {}
                }
            },
            actions: {
                remove: {
                    label: '<span class="fa fa-times"></span>',
                    clicked: function () {
                        var $event = $.Event('keydown');

                        $event.which = 8;
                        $(document).trigger($event);
                    }
                }
            }
        };

    /**
     * Embeds object
     *
     * Sets options, variables and calls init() function
     *
     * @constructor
     * @param {DOM} el - DOM element to init the plugin on
     * @param {object} options - Options to override defaults
     * @return {void}
     */

    function Embeds (el, options) {
        this.el = el;
        this.$el = $(el);
        this.templates = window.MediumInsert.Templates;
        this.core = this.$el.data('plugin_'+ pluginName);

        this.options = $.extend(true, {}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        // Extend editor's functions
        if (this.core.getEditor()) {
            this.core.getEditor()._serializePreEmbeds = this.core.getEditor().serialize;
            this.core.getEditor().serialize = this.editorSerialize;
        }

        this.init();
    }

    /**
     * Initialization
     *
     * @return {void}
     */

    Embeds.prototype.init = function () {
        var $embeds = this.$el.find('.medium-insert-embeds');

        $embeds.attr('contenteditable', false);
        $embeds.each(function () {
            if ($(this).find('.medium-insert-embeds-overlay').length === 0) {
                $(this).append($('<div />').addClass('medium-insert-embeds-overlay'));
            }
        });

        this.events();
        this.backwardsCompatibility();
    };

    /**
     * Event listeners
     *
     * @return {void}
     */

    Embeds.prototype.events = function () {
        $(document)
            .on('click', $.proxy(this, 'unselectEmbed'))
            .on('keydown', $.proxy(this, 'removeEmbed'))
            .on('click', '.medium-insert-embeds-toolbar .medium-editor-action', $.proxy(this, 'toolbarAction'))
            .on('click', '.medium-insert-embeds-toolbar2 .medium-editor-action', $.proxy(this, 'toolbar2Action'));

        this.$el
            .on('keyup click paste', $.proxy(this, 'togglePlaceholder'))
            .on('keydown', $.proxy(this, 'processLink'))
            .on('click', '.medium-insert-embeds-overlay', $.proxy(this, 'selectEmbed'))
            .on('contextmenu', '.medium-insert-embeds-placeholder', $.proxy(this, 'fixRightClickOnPlaceholder'));
    };

    /**
     * Replace v0.* class names with new ones, wrap embedded content to new structure
     *
     * @return {void}
     */

    Embeds.prototype.backwardsCompatibility = function () {
        var that = this;

        this.$el.find('.mediumInsert-embeds')
            .removeClass('mediumInsert-embeds')
            .addClass('medium-insert-embeds');

        this.$el.find('.medium-insert-embeds').each(function () {
            if ($(this).find('.medium-insert-embed').length === 0) {
                $(this).after(that.templates['src/js/templates/embeds-wrapper.hbs']({
                    html: $(this).html()
                }));
                $(this).remove();
            }
        });
    };

    /**
     * Get the Core object
     *
     * @return {object} Core object
     */

    Embeds.prototype.getCore = function () {
        return this.core;
    };

    /**
     * Extend editor's serialize function
     *
     * @return {object} Serialized data
     */

    Embeds.prototype.editorSerialize = function () {
        var data = this._serializePreEmbeds();

        $.each(data, function (key) {
            var $data = $('<div />').html(data[key].value);

            $data.find('.medium-insert-embeds').removeAttr('contenteditable');
            $data.find('.medium-insert-embeds-overlay').remove();

            data[key].value = $data.html();
        });

        return data;
    };

    /**
     * Add embedded element
     *
     * @return {void}
     */

    Embeds.prototype.add = function () {
        var $place = this.$el.find('.medium-insert-active');

        // Fix #132
        // Make sure that the content of the paragraph is empty and <br> is wrapped in <p></p> to avoid Firefox problems
        $place.html(this.templates['src/js/templates/core-empty-line.hbs']().trim());

        // Replace paragraph with div to prevent #124 issue with pasting in Chrome,
        // because medium editor wraps inserted content into paragraph and paragraphs can't be nested
        if ($place.is('p')) {
            $place.replaceWith('<div class="medium-insert-active">'+ $place.html() +'</div>');
            $place = this.$el.find('.medium-insert-active');
            this.getCore().moveCaret($place);
        }

        $place.addClass('medium-insert-embeds medium-insert-embeds-input medium-insert-embeds-active');

        this.togglePlaceholder({ target: $place.get(0) });

        $place.click();
        this.getCore().hideButtons();
    };

    /**
     * Toggles placeholder
     *
     * @param {Event} e
     * @return {void}
     */

    Embeds.prototype.togglePlaceholder = function (e) {
        var $place = $(e.target),
            selection = window.getSelection(),
            range, $current, text;

        if (!selection || selection.rangeCount === 0) {
            return;
        }

        range = selection.getRangeAt(0);
        $current = $(range.commonAncestorContainer);

        if ($current.hasClass('medium-insert-embeds-active')) {
            $place = $current;
        } else if ($current.closest('.medium-insert-embeds-active').length) {
            $place = $current.closest('.medium-insert-embeds-active');
        }

        if ($place.hasClass('medium-insert-embeds-active')) {

            text = $place.text().trim();

            if (text === '' && $place.hasClass('medium-insert-embeds-placeholder') === false) {
                $place
                    .addClass('medium-insert-embeds-placeholder')
                    .attr('data-placeholder', this.options.placeholder);
            } else if (text !== '' && $place.hasClass('medium-insert-embeds-placeholder')) {
                $place
                    .removeClass('medium-insert-embeds-placeholder')
                    .removeAttr('data-placeholder');
            }

        } else {
            this.$el.find('.medium-insert-embeds-active').remove();
        }
    };

    /**
     * Right click on placeholder in Chrome selects whole line. Fix this by placing caret at the end of line
     *
     * @param {Event} e
     * @return {void}
     */

    Embeds.prototype.fixRightClickOnPlaceholder = function (e) {
        this.getCore().moveCaret($(e.target));
    };

    /**
     * Process link
     *
     * @param {Event} e
     * @return {void}
     */

    Embeds.prototype.processLink = function (e) {
        var $place = this.$el.find('.medium-insert-embeds-active'),
            url;

        if (!$place.length) {
            return;
        }

        url = $place.text().trim();

        // Return empty placeholder on backspace, delete or enter
        if (url === '' && [8, 46, 13].indexOf(e.which) !== -1) {
            $place.remove();
            return;
        }

        if (e.which === 13) {
            e.preventDefault();
            e.stopPropagation();

            if (this.options.oembedProxy) {
                this.oembed(url);
            } else {
                this.parseUrl(url);
            }
        }
    };

    /**
     * Get HTML via oEmbed proxy
     *
     * @param {string} url
     * @return {void}
     */

    Embeds.prototype.oembed = function (url) {
        var that = this;

        $.support.cors = true;

        $.ajax({
            crossDomain: true,
            cache: false,
            url: this.options.oembedProxy,
            dataType: 'json',
            data: {
                url: url
            },
            success: function(data) {
                var html = data && data.html;

                if (data && !data.html && data.type === 'photo' && data.url) {
                    html = '<img src="' + data.url + '" alt="">';
                }

                $.proxy(that, 'embed', html)();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var responseJSON = (function() {
                    try {
                        return JSON.parse(jqXHR.responseText);
                    } catch(e) {}
                })();

                if (typeof window.console !== 'undefined') {
                    window.console.log((responseJSON && responseJSON.error) || jqXHR.status || errorThrown.message);
                } else {
                    window.alert('Error requesting media from ' + that.options.oembedProxy + ' to insert: ' + errorThrown + ' (response status: ' + jqXHR.status + ')');
                }

                $.proxy(that, 'convertBadEmbed', url)();
            }
        });
    };

    /**
     * Get HTML using regexp
     *
     * @param {string} url
     * @return {void}
     */

    Embeds.prototype.parseUrl = function (url) {
        var html;

        if (!(new RegExp(['youtube', 'youtu.be', 'vimeo', 'instagram'].join('|')).test(url))) {
            $.proxy(this, 'convertBadEmbed', url)();
            return false;
        }

        html = url.replace(/\n?/g, '')
            .replace(/^((http(s)?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|v\/)?)([a-zA-Z0-9\-_]+)(.*)?$/, '<div class="video"><iframe width="420" height="315" src="//www.youtube.com/embed/$7" frameborder="0" allowfullscreen></iframe></div>')
            .replace(/^https?:\/\/vimeo\.com(\/.+)?\/([0-9]+)$/, '<iframe src="//player.vimeo.com/video/$2" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
            //.replace(/^https:\/\/twitter\.com\/(\w+)\/status\/(\d+)\/?$/, '<blockquote class="twitter-tweet" align="center" lang="en"><a href="https://twitter.com/$1/statuses/$2"></a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>')
            //.replace(/^https:\/\/www\.facebook\.com\/(video.php|photo.php)\?v=(\d+).+$/, '<div class="fb-post" data-href="https://www.facebook.com/photo.php?v=$2"><div class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/photo.php?v=$2">Post</a></div></div>')
            .replace(/^https?:\/\/instagram\.com\/p\/(.+)\/?$/, '<span class="instagram"><iframe src="//instagram.com/p/$1/embed/" width="612" height="710" frameborder="0" scrolling="no" allowtransparency="true"></iframe></span>');


        this.embed((/<("[^"]*"|'[^']*'|[^'">])*>/).test(html) ? html : false);
    };

    /**
     * Add html to page
     *
     * @param {string} html
     * @return {void}
     */

    Embeds.prototype.embed = function (html) {
        var $place = this.$el.find('.medium-insert-embeds-active');

        if (!html) {
            alert('Incorrect URL format specified');
            return false;
        } else {
            $place.after(this.templates['src/js/templates/embeds-wrapper.hbs']({
                html: html
            }));
            $place.remove();

            this.$el.trigger('input');

            if (html.indexOf('facebook') !== -1) {
                if (typeof(FB) !== 'undefined') {
                    setTimeout(function () {
                        FB.XFBML.parse();
                    }, 2000);
                }
            }
        }
    };

    /**
     * Convert bad oEmbed content to an actual line.
     * Instead of displaying the error message we convert the bad embed
     *
     * @param {string} content Bad content
     *
     * @return {void}
     */
    Embeds.prototype.convertBadEmbed = function (content) {
        var $place, $empty, $content,
            emptyTemplate = this.templates['src/js/templates/core-empty-line.hbs']().trim();

        $place = this.$el.find('.medium-insert-embeds-active');

        // convert embed node to an empty node and insert the bad embed inside
        $content = $(emptyTemplate);
        $place.before($content);
        $place.remove();
        $content.html(content);

        // add an new empty node right after to simulate Enter press
        $empty = $(emptyTemplate);
        $content.after($empty);

        this.$el.trigger('input');

        this.getCore().moveCaret($place);
    };

    /**
     * Select clicked embed
     *
     * @param {Event} e
     * @returns {void}
     */

    Embeds.prototype.selectEmbed = function (e) {
        if(this.getCore().options.enabled) {
            var $embed = $(e.target).hasClass('medium-insert-embeds') ? $(e.target) : $(e.target).closest('.medium-insert-embeds'),
                that = this;

            $embed.addClass('medium-insert-embeds-selected');

            setTimeout(function () {
                that.addToolbar();

                if (that.options.captions) {
                    that.getCore().addCaption($embed.find('figure'), that.options.captionPlaceholder);
                }
            }, 50);
        }
    };

    /**
     * Unselect selected embed
     *
     * @param {Event} e
     * @returns {void}
     */

    Embeds.prototype.unselectEmbed = function (e) {
        var $el = $(e.target).hasClass('medium-insert-embeds') ? $(e.target) : $(e.target).closest('.medium-insert-embeds'),
            $embed = this.$el.find('.medium-insert-embeds-selected');

        if ($el.hasClass('medium-insert-embeds-selected')) {
            $embed.not($el).removeClass('medium-insert-embeds-selected');
            $('.medium-insert-embeds-toolbar, .medium-insert-embeds-toolbar2').remove();
            this.getCore().removeCaptions($el.find('figcaption'));

            if ($(e.target).is('.medium-insert-caption-placeholder') || $(e.target).is('figcaption')) {
                $el.removeClass('medium-insert-embeds-selected');
                this.getCore().removeCaptionPlaceholder($el.find('figure'));
            }
            return;
        }

        $embed.removeClass('medium-insert-embeds-selected');
        $('.medium-insert-embeds-toolbar, .medium-insert-embeds-toolbar2').remove();

        if ($(e.target).is('.medium-insert-caption-placeholder')) {
            this.getCore().removeCaptionPlaceholder($el.find('figure'));
        } else if ($(e.target).is('figcaption') === false) {
            this.getCore().removeCaptions();
        }
    };

    /**
     * Remove embed
     *
     * @param {Event} e
     * @returns {void}
     */

    Embeds.prototype.removeEmbed = function (e) {
        var $embed, $empty;

        if (e.which === 8 || e.which === 46) {
            $embed = this.$el.find('.medium-insert-embeds-selected');

            if ($embed.length) {
                e.preventDefault();

                $('.medium-insert-embeds-toolbar, .medium-insert-embeds-toolbar2').remove();

                $empty = $(this.templates['src/js/templates/core-empty-line.hbs']().trim());
                $embed.before($empty);
                $embed.remove();

                // Hide addons
                this.getCore().hideAddons();

                this.getCore().moveCaret($empty);
                this.$el.trigger('input');
            }
        }
    };

    /**
     * Adds embed toolbar to editor
     *
     * @returns {void}
     */

    Embeds.prototype.addToolbar = function () {
        var $embed = this.$el.find('.medium-insert-embeds-selected'),
            active = false,
            $toolbar, $toolbar2, top;

        if ($embed.length === 0) {
            return;
        }

        $('body').append(this.templates['src/js/templates/embeds-toolbar.hbs']({
            styles: this.options.styles,
            actions: this.options.actions
        }).trim());

        $toolbar = $('.medium-insert-embeds-toolbar');
        $toolbar2 = $('.medium-insert-embeds-toolbar2');

        top = $embed.offset().top - $toolbar.height() - 8 - 2 - 5; // 8px - hight of an arrow under toolbar, 2px - height of an embed outset, 5px - distance from an embed
        if (top < 0) {
            top = 0;
        }

        $toolbar
            .css({
                top: top,
                left: $embed.offset().left + $embed.width() / 2 - $toolbar.width() / 2
            })
            .show();

        $toolbar2
            .css({
                top: $embed.offset().top + 2, // 2px - distance from a border
                left: $embed.offset().left + $embed.width() - $toolbar2.width() - 4 // 4px - distance from a border
            })
            .show();

        $toolbar.find('button').each(function () {
            if ($embed.hasClass('medium-insert-embeds-'+ $(this).data('action'))) {
                $(this).addClass('medium-editor-button-active');
                active = true;
            }
        });

        if (active === false) {
            $toolbar.find('button').first().addClass('medium-editor-button-active');
        }
    };

    /**
     * Fires toolbar action
     *
     * @param {Event} e
     * @returns {void}
     */

    Embeds.prototype.toolbarAction = function (e) {
        var $button = $(e.target).is('button') ? $(e.target) : $(e.target).closest('button'),
            $li = $button.closest('li'),
            $ul = $li.closest('ul'),
            $lis = $ul.find('li'),
            $embed = this.$el.find('.medium-insert-embeds-selected'),
            that = this;

        $button.addClass('medium-editor-button-active');
        $li.siblings().find('.medium-editor-button-active').removeClass('medium-editor-button-active');

        $lis.find('button').each(function () {
            var className = 'medium-insert-embeds-'+ $(this).data('action');

            if ($(this).hasClass('medium-editor-button-active')) {
                $embed.addClass(className);

                if (that.options.styles[$(this).data('action')].added) {
                    that.options.styles[$(this).data('action')].added($embed);
                }
            } else {
                $embed.removeClass(className);

                if (that.options.styles[$(this).data('action')].removed) {
                    that.options.styles[$(this).data('action')].removed($embed);
                }
            }
        });

        this.$el.trigger('input');
    };

    /**
     * Fires toolbar2 action
     *
     * @param {Event} e
     * @returns {void}
     */

    Embeds.prototype.toolbar2Action = function (e) {
        var $button = $(e.target).is('button') ? $(e.target) : $(e.target).closest('button'),
            callback = this.options.actions[$button.data('action')].clicked;

        if (callback) {
            callback(this.$el.find('.medium-insert-embeds-selected'));
        }

        this.$el.trigger('input');
    };

    /** Plugin initialization */

    $.fn[pluginName + addonName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName + addonName)) {
                $.data(this, 'plugin_' + pluginName + addonName, new Embeds(this, options));
            }
        });
    };

})(jQuery, window, document);
