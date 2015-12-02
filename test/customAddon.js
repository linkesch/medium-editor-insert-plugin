;var obj = (function ($, window, document, undefined) {

	'use strict';

	/** Default values */
	var pluginName = 'mediumInsert',
		addonName = 'CustomAddon', // first char is uppercase
		defaults = {
			label: '<span class="fa fa-optin-monster"></span>'
		};

	/**
	 * Custom Addon object
	 *
	 * Sets options, variables and calls init() function	
	 *
	 * @constructor
	 * @param {DOM} el - DOM element to init the plugin on
	 * @param {object} options - Options to override defaults
	 * @return {void}
	 */

	function CustomAddon (el, options) {
		this.el = el;
		this.$el = $(el);
		this.templates = window.MediumInsert.Templates;
		this.core = this.$el.data('plugin_'+ pluginName);

		this.options = $.extend(true, {}, defaults, options);

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	/**
	 * initialization
	 *
	 * @return {void}
	 */

	CustomAddon.prototype.init = function () {
		alert("got it mufucka!");
		this.events();
	};

	/**
	 * Event listeners
	 *
	 * @return {void}
	 */

	CustomAddon.prototype.events = function () {

	};

	/**
	 * Get the Core object
	 *
	 * @return {object} Core object
	 */
	CustomAddon.prototype.getCore = function () {
		return this.core;
	};

	/**
	 * Add custom content
	 *
	 * This function is called when user click on the addon's icon
	 *
	 * @return {void}
	 */

	CustomAddon.prototype.add = function () {
		alert('you clicked our custom addon! thanks bae.')
	};


	/** Addon initialization */

	$.fn[pluginName + addonName] = function (options) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName + addonName)) {
				$.data(this, 'plugin_' + pluginName + addonName, new CustomAddon(this, options));
			}
		});
	};

})(jQuery, window, document);