;(function ($, window, document, undefined) {

    'use strict';

    /** Default values */
    var pluginName = 'mediumInsert',
        addonName = 'Columns', // first char is uppercase
        defaults = {
            label: '<span class="fa fa-columns"></span>',
            placeholder: 'Column'
        };

    /**
     * Columns object
     *
     * Sets options, variables and calls init() function
     *
     * @constructor
     * @param {DOM} el - DOM element to init the plugin on
     * @param {object} options - Options to override defaults
     * @return {void}
     */

    function Columns (el, options) {
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

    Columns.prototype.init = function () {
        this.events();
    };

    /**
     * Event listeners
     *
     * @return {void}
     */

    Columns.prototype.events = function () {
        this.$el
            .on('keyup click', $.proxy(this, 'togglePlaceholders'));
    };

    /**
     * Get the Core object
     *
     * @return {object} Core object
     */
    Columns.prototype.getCore = function () {
        if (typeof(this.core) === 'undefined') {
            this.core = this.$el.data('plugin_'+ pluginName);
        }

        return this.core;
    };

    /**
     * Add columns
     *
     * @return {void}
     */

    Columns.prototype.add = function () {
        var $place = this.$el.find('.medium-insert-active');

        if ($place.is('p')) {
            $place.replaceWith('<div class="medium-insert-active">'+ $place.html() +'</div>');
            $place = this.$el.find('.medium-insert-active');
        }

        $place.addClass('medium-insert-columns medium-insert-columns-3');
        $place.html(this.templates['src/js/templates/columns.hbs']());
        this.getCore().moveCaret($place);

        this.togglePlaceholders();

        $place.click();
    };

   /**
    * Toggles placeholders
    *
    * @return {void}
    */

    Columns.prototype.togglePlaceholders = function () {
        var $columns = this.$el.find('.medium-insert-column'),
            that = this;

        $columns.each(function () {
            var $parent = $(this).closest('.medium-insert-columns'),
                children = $parent.children().length,
                $placeholder, re, text;

            if ($(this).find('p').length === 0) {
                $(this).remove();

                children--;
                if (children === 0) {
                    $parent.remove();
                } else {
                    $parent
                        .removeClass('medium-insert-columns-3')
                        .removeClass('medium-insert-columns-'+ children);
                }

                return;
            }

            $parent
                .removeClass('medium-insert-columns-3')
                .removeClass('medium-insert-columns-'+ children);

            $placeholder = $('.medium-insert-column-placeholder', this);
            re =new RegExp(that.options.placeholder, 'g');
            text = $(this).text().replace(re, '').trim();

            if (text === '' && $placeholder.length === 0) {
                $(this).append(that.templates['src/js/templates/columns-placeholder.hbs']({
                    placeholder: that.options.placeholder
                }));
            } else if (text !== '' && $placeholder.length) {
                $placeholder.remove();
            }
        });
    };

    /** Plugin initialization */

    $.fn[pluginName + addonName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName + addonName)) {
                $.data(this, 'plugin_' + pluginName + addonName, new Columns(this, options));
            }
        });
    };

})(jQuery, window, document);
