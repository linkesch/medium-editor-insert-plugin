(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'handlebars', 'medium-editor', 'blueimp-file-upload', 'jquery-sortable'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                    Handlebars = require('handlebars');
                    MediumEditor = require('medium-editor');
                }
                else {
                    jQuery = require('jquery')(root);
                    Handlebars = require('handlebars')(root);
                    MediumEditor = require('medium-editor')(root);
                }
            }
            factory(jQuery, Handlebars, MediumEditor);
            return jQuery;
        };
    } else {
        factory(jQuery, Handlebars, MediumEditor);
    }
}(function ($, Handlebars, MediumEditor) {
