;(function ($, window, document, undefined) {

    'use strict';

    /** Default values */
    var pluginName = 'mediumInsert',
        defaults = {
            editor: null,
            enabled: true,
            beginning: false,
            blocks: 'p, h1, h2, h3, h4, h5, h6, ol, ul, blockquote',
            addons: {
              images: {
                  label: '<span class="fa fa-camera"></span>'
              },
              embeds: {
                  label: '<span class="fa fa-play"></span>'
              }
            },
            root: 'body'
        },
        that;

    /**
     * Core plugin's object
     *
     * Sets options, variables and calls init() function
     *
     * @constructor
     * @param {DOM} el - DOM element to init the plugin on
     * @param {object} options - Options to override defaults
     * @return {void}
     */

    function Core (el, options) {
        that = this;
        this.el = el;
        this.$el = $(el);
        this.templates = window.MediumInsert.Templates;

        this.options = $.extend({}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    /**
     * Initialization
     *
     * @return {void}
     */

    Core.prototype.init = function () {
        this.$el.addClass('medium-editor-insert-plugin');

        if (typeof this.options.addons !== 'object' || Object.keys(this.options.addons).length === 0) {
            this.disable();
        }

        this.events();
        this.clean();
    };

    /**
     * Event listeners
     *
     * @return {void}
     */

    Core.prototype.events = function () {
        this.$el
            // Prevent dragging and dropping things into text,
            // implicitely allow dropping only into plugin's placeholder
            .on('dragover drop', 'p, h1, h2, h3, h4, h5, h6, ol, ul, blockquote', function (e) {
                e.preventDefault();
            })
            .on('blur', this.addEditorPlaceholder)
            .on('keyup click', this.addButtons)
            .on('selectstart mousedown', '.mediumInsert', this.disableSelection)
            .on('keydown', this.fixSelectAll);
            
        $(document).on('click', '.mediumInsert-buttonsShow', this.showAddons);
    };

    /**
     * Deselects selected text
     *
     * @return {void}
     */

    Core.prototype.deselect = function () {
        document.getSelection().removeAllRanges();
    };

    /**
     * Disables the plugin
     *
     * @return {void}
     */

    Core.prototype.disable = function () {
        this.options.enabled = false;

        this.$el.find('.mediumInsert-buttons').addClass('hide');
    };

    /**
     * Enables the plugin
     *
     * @return {void}
     */

    Core.prototype.enable = function () {
        this.settings.enabled = true;

        this.$el.find('.mediumInsert-buttons').removeClass('hide');
    };

    /**
     * Disables selectstart mousedown events on plugin elements except images
     *
     * @return {void}
     */

    Core.prototype.disableSelection = function (e) {
        if ($(e.target).is('img') === false) {
            e.preventDefault();
        }
    };

    /**
     * Fix #39
     * For some reason Chrome doesn't "select-all", when the last placeholder is visible.
     * So it's needed to hide it when the user "selects all", and show it again when they presses any other key.
     *
     * @return {boolean} document.execCommand()
     */

    Core.prototype.fixSelectAll = function (e) {
        that.$el.children().last().removeClass('hide');

         if ((e.ctrlKey || e.metaKey) && e.which === 65) {
            e.preventDefault();

            if(that.$el.find('p').text().trim().length === 0) {
              return false;
            }

            that.$el.children().last().addClass('hide');

            return document.execCommand('selectAll', false, null);
        }
    };

    /**
     * Adds .medium-editor-placeholder class to the editor, when its content is empty
     *
     * @return {void}
     */

    Core.prototype.addEditorPlaceholder = function () {
        var $clone = that.$el.clone(),
            cloneHtml;

        $clone.find('.mediumInsert').remove();
        cloneHtml = $clone.html().replace(/^\s+|\s+$/g, '');

        if (cloneHtml === '' || cloneHtml === '<p><br></p>') {
            that.$el.addClass('medium-editor-placeholder');
        }
    };

    /**
     * Returns max ID of #mediumInsert-ID elemets
     *
     * @return {integer} max - Max ID
     */

    Core.prototype.getMaxId = function () {
        var max = -1;

        $('div[id^="mediumInsert-"]').each(function () {
            var id = parseInt($(this).attr('id').split('-')[1], 10);

            if (id > max) {
                max = id;
            }
        });

        return max;
    };

    /**
     * Cleans a content of the editor
     *
     * @return {void}
     */

    Core.prototype.clean = function () {
        var $lastChild = that.$el.children(':last');

        if (that.options.enabled === false) {
            return;
        }

        // Fix #39
        // After deleting all content (ctrl+A and delete) in Firefox, all content is deleted and only <br> appears
        // To force placeholder to appear, set <p><br></p> as content of the $el
        if (that.$el.html() === '' || this.$el.html() === '<br>') {
            this.$el.html(this.templates['src/js/templates/empty-line.hbs']().trim());
        }

        // Fix #29
        // Wrap content text in <p></p> to avoid Firefox problems
        this.$el
            .contents()
            .filter(function () {
                return this.nodeName === '#text' && $.trim($(this).text()) !== '';
            })
            .wrap('<p />');

        // If last element is non-empty placeholder, add one empty line at the end to force placeholder to appear
        if ($lastChild.hasClass('mediumInsert') && $lastChild.find('.mediumInsert-placeholder').children().length > 0) {
            that.$el.append(that.templates['src/js/templates/empty-line.hbs']().trim());
        }

        // Fix not deleting placeholder in Firefox by removing all empty placeholders
        that.$el.find('.mediumInsert-placeholder:empty').each(function () {
            $(this).parent().remove();
        });
    };

    /**
     * Returns HTML template of buttons
     *
     * @return {string} HTML template of buttons
     */

    Core.prototype.getButtons = function () {
        var addons = [];

        if (that.options.enabled === false) {
            return;
        }

        $.each(that.options.addons, function (key, addon) {
            addons.push({
                name: key,
                label: addon.label
            });
        });

        return that.templates['src/js/templates/buttons.hbs']({
            addons: addons
        }).trim();
    };

    /**
     * Adds plugin's buttons to editor, if carret is in an empty paragraph
     *
     * @return {void}
     */

    Core.prototype.addButtons = function () {
        var selection = window.getSelection(),
            range = selection.getRangeAt(0),
            $current = $(range.commonAncestorContainer),
            $buttons = $(that.getButtons()),
            id = that.getMaxId() + 1;

        that.clean();
        that.removeButtons();
        
        if ($current.text().trim() === '') {
            $(that.options.root).append($buttons);
            $buttons.css({
                left: $current.offset().left - parseInt($buttons.find('.mediumInsert-buttonsOptions').css('left')) - parseInt($buttons.find('.mediumInsert-buttonsOptions a:first').css('margin-left')),
                top: $current.offset().top
            });
            $buttons.find('.mediumInsert-buttonsShow').fadeIn();
        }
    };
    
    /**
     * Removes buttonsShow
     *
     * @returns {void}
     */
    
    Core.prototype.removeButtons = function () {
        $(that.options.root).find('.mediumInsert-buttons').remove();
    };
    
    Core.prototype.showAddons = function (e) {
        var $el = $(e.target);
        
        $el.siblings('.mediumInsert-buttonsOptions').fadeIn();
    };

    /** Plugin initialization */
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Core(this, options));
            }
        });
    };

})(jQuery, window, document);
