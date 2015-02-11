;(function ($, window, document, undefined) {

    'use strict';

    /** Default values */
    var pluginName = 'mediumInsert',
        
        // first char is uppercase
        addonName = 'Products', 
        defaults = {
            label: '<span class="fa fa-shopping-cart"></span>',
            placeholder: 'Search for a product on Hubrick'
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

    function Products (el, options) {
        this.el = el;
        this.$el = $(el);
        this.templates = window.MediumInsert.Templates;

        this.options = $.extend(true, {}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    /**
     * Initialization
     *
     * @return {void}
     */

    Products.prototype.init = function () {
        this.events();
    };

    /**
     * Event listeners
     *
     * @return {void}
     */

    Products.prototype.events = function () {
        this.$el
            .on('selectstart mousedown', '.medium-insert-products-placeholder', $.proxy(this, 'disablePlaceholderSelection'))
            .on('keyup click', $.proxy(this, 'togglePlaceholder'))
            .on('keydown', $.proxy(this, 'search'));
    };

    /**
     * Get the Core object
     *
     * @return {object} Core object
     */
    Products.prototype.getCore = function () {
        if (typeof(this.core) === 'undefined') {
            this.core = this.$el.data('plugin_'+ pluginName);
        }

        return this.core;
    };

    /**
     * Add embedded element
     *
     * @return {void}
     */

    Products.prototype.add = function () {
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

        $place.addClass('medium-insert-products-input medium-insert-products-active');

        this.togglePlaceholder({ target: $place.get(0) });

        $place.click();
    };

    /**
     * Search Hubrick Products endpoint for 
     *
     * @param {event} e
     * @return {void}
     */
    Products.prototype.search = function (e) {
        var $place = this.$el.find('.medium-insert-products-active'),
            re, url;

        if (!$place.length) {
            return;
        }

        re = new RegExp(this.options.placeholder, 'g');
        url = $place.text().replace(re, '').trim();

        // Return empty placeholder on backspace, delete or enter
        if (url === '' && [8, 46, 13].indexOf(e.which) !== -1) {
            $place.remove();
            return;
        }

        if (e.which === 13) {
            e.preventDefault();
            e.stopPropagation();

            var html = '<div class="medium-product-block">This is a test product block</div>';
            this.insertProduct((/<("[^"]*"|'[^']*'|[^'">])*>/).test(html) ? html : false);

        }
    },

    /**
     * Disable placeholder selection, instead move cursor to input
     *
     * @param {Event} e
     * @return {void}
     */

    Products.prototype.disablePlaceholderSelection = function (e) {
        var $place = $(e.target).closest('.medium-insert-products-input');

        e.preventDefault();
        e.stopPropagation();

        this.getCore().moveCaret($place);
    };

    /**
     * Toggles placeholder
     *
     * @param {Event} e
     * @return {void}
     */

    Products.prototype.togglePlaceholder = function (e) {
        var $place = $(e.target),
            selection = window.getSelection(),
            range = selection.getRangeAt(0),
            $current = $(range.commonAncestorContainer),
            $placeholder, re, text;

        if ($current.hasClass('medium-insert-products-active')) {
            $place = $current;
        } else if ($current.closest('.medium-insert-products-active').length) {
            $place = $current.closest('.medium-insert-products-active');
        }

        if ($place.hasClass('medium-insert-products-active')) {
            $placeholder = $place.find('.medium-insert-products-placeholder');
            re = new RegExp(this.options.placeholder, 'g');
            text = $place.text().replace(re, '').trim();

            if (text === '' && $placeholder.length === 0) {
                $place.append(this.templates['src/js/templates/products-placeholder.hbs']({
                    placeholder: this.options.placeholder
                }));
            } else if (text !== '' && $placeholder.length) {
                $placeholder.remove();
            }

        } else {
            this.$el.find('.medium-insert-products-active').remove();
        }
    };

    /**
     * Add product HTML to page
     *
     * @param {string} html
     * @return {void}
     */

    Products.prototype.insertProduct = function (html) {
        var $place = this.$el.find('.medium-insert-products-active');

        if (!html) {
            return false;
        } else {
            $place.after(this.templates['src/js/templates/products-wrapper.hbs']({
                html: html
            }));
            $place.remove();

            this.$el.trigger('input');
        }
    };

    /** Plugin initialization */

    $.fn[pluginName + addonName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName + addonName)) {
                $.data(this, 'plugin_' + pluginName + addonName, new Products(this, options));
            }
        });
    };

})(jQuery, window, document);
