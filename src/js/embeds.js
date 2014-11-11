;(function ($, window, document, undefined) {

    'use strict';

    /** Default values */
    var pluginName = 'mediumInsert',
        addonName = 'Embeds', // first char is uppercase
        defaults = {
            label: '<span class="fa fa-youtube-play"></span>',
            placeholder: 'Paste a YouTube, Vimeo, Facebook, Twitter or Instagram link and press Enter'
            //,oembedProxy: 'http://medium.iframe.ly/api/oembed?iframe=1'
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

        this.options = $.extend(true, {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    /**
     * Initialization
     *
     * @return {void}
     */

    Embeds.prototype.init = function () {
        this.events();
    };

    /**
     * Event listeners
     *
     * @return {void}
     */

    Embeds.prototype.events = function () {
        this.$el
            .on('selectstart mousedown', '.medium-insert-embeds-placeholder', $.proxy(this, 'disablePlaceholderSelection'))
            .on('keyup', $.proxy(this, 'togglePlaceholder'));
    };    
    
    /**
     * Add embedded element
     *
     * @return {void}
     */
    
    Embeds.prototype.add = function () {   
        var $place = this.$el.find('.medium-insert-active');
                     
        $place.addClass('medium-insert-embeds-input');
            
        this.togglePlaceholder({ target: $place.get(0) });
        
        $place.click();
    };

    /**
     * Disable placeholder selection, instead move cursor to input
     *
     * @return {void}
     */
    
    Embeds.prototype.disablePlaceholderSelection = function (e) {
        var $place = $(e.target).closest('.medium-insert-embeds-input'),
            range, sel;
        
        e.preventDefault();
        e.stopPropagation();
        
        $place.prepend('&nbsp;');

        // Place caret at the beginning of input
        range = document.createRange();
        sel = window.getSelection();
        range.setStart($place.get(0).childNodes[0], 0);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    };

    /**
     * Toggles placeholder
     *
     * @return {void}
     */    
    
    Embeds.prototype.togglePlaceholder = function (e) {
        var $place = $(e.target),
            selection = window.getSelection(),
            range = selection.getRangeAt(0),
            $current = $(range.commonAncestorContainer),
            $placeholder, re, text;

        if ($current.hasClass('medium-insert-embeds-input')) {
            $place = $current;
        } else if ($current.closest('.medium-insert-embeds-input').length) {
            $place = $current.closest('.medium-insert-embeds-input');
        }

        if ($place.hasClass('medium-insert-embeds-input')) {
            
            $placeholder = $place.find('.medium-insert-embeds-placeholder');
            re = new RegExp(this.options.placeholder, 'g');
            text = $place.text().replace(re, '').trim();

            if (text === '' && $placeholder.length === 0) {
                $place.append(this.templates['src/js/templates/embeds-placeholder.hbs']({
                    placeholder: this.options.placeholder
                }));
            } else if (text !== '' && $placeholder.length) {
                $placeholder.remove();
            }
            
        }
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
