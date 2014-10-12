;(function ($, window, document, undefined) {

    'use strict';

    /** Default values */
    var pluginName = 'mediumInsert',
        addonName = 'Images', // first char is uppercase
        defaults = {
            label: '<span class="fa fa-camera"></span>'
        },
        that;

    /**
     * Images object
     *
     * Sets options, variables and calls init() function
     *
     * @constructor
     * @param {DOM} el - DOM element to init the plugin on
     * @param {object} options - Options to override defaults
     * @return {void}
     */

    function Images (el, options) {
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

    Images.prototype.init = function () {
        this.events();
    };

    /**
     * Event listeners
     *
     * @return {void}
     */

    Images.prototype.events = function () {

    };
    
    /**
     * Add image
     * 
     * @return {void}
     */
    
    Images.prototype.add = function () {

    };

    /** Plugin initialization */
    
    $.fn[pluginName + addonName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName + '_addon_'+ addonName)) {
                $.data(this, 'plugin_' + pluginName + '_addon_'+ addonName, new Images(this, options));
            }
        });
    };

})(jQuery, window, document);
