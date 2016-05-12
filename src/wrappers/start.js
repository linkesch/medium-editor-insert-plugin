(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'handlebars/runtime', 'medium-editor', 'blueimp-file-upload', 'jquery-sortable'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (jQuery) {
            if (typeof window === 'undefined') {
                throw new Error("medium-editor-insert-plugin runs only in a browser.")
            }

            if (jQuery === undefined) {
                jQuery = require('jquery');
            }
            window.jQuery = jQuery;

            Handlebars = require('handlebars/runtime');
            MediumEditor = require('medium-editor');
            require('jquery-sortable');
            require('blueimp-file-upload');

            factory(jQuery, Handlebars, MediumEditor);
            return jQuery;
        };
    } else {
        factory(jQuery, Handlebars, MediumEditor);
    }
}(function ($, Handlebars, MediumEditor) {
