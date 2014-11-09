;(function ($, window, document, undefined) {

    'use strict';

    /** Default values */
    var pluginName = 'mediumInsert',
        addonName = 'Embeds', // first char is uppercase
        defaults = {
            label: '<span class="fa fa-youtube-play"></span>',
            urlPlaceholder: 'Paste or type a link'
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
