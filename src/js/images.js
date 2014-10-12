;(function ($, window, document, undefined) {

    'use strict';

    /** Default values */
    var pluginName = 'mediumInsert',
        addonName = 'Images', // first char is uppercase
        defaults = {
            label: '<span class="fa fa-camera"></span>',
            uploadScript: 'upload.php'
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
        var $file = $(that.templates['src/js/templates/images-fileupload.hbs']());
        
        $file.fileupload({
            url: that.options.uploadScript,
            dataType: 'json',
            add: that.uploadAdd,
            progressall: that.uploadProgressall,
            done: that.uploadDone
        });
        
        $file.click();
    };
    
    /**
     * Callback invoked as soon as files are added to the fileupload widget - via file input selection, drag & drop or add API call.
     * https://github.com/blueimp/jQuery-File-Upload/wiki/Options#add
     *
     * @param {Event} e
     * @param {object} data
     * @return {void}
     */
    
    Images.prototype.uploadAdd = function (e, data) {
        if (that.$el.find('.mediumInsert-active progress').length === 0) {
            that.$el.find('.mediumInsert-active').append(that.templates['src/js/templates/images-progressbar.hbs']());
        }
        
        if (data.autoUpload || (data.autoUpload !== false && $(this).fileupload('option', 'autoUpload'))) {
            data.process().done(function () {
                data.submit();
            });
        }
    };
    
    /**
     * Callback for global upload progress events
     * https://github.com/blueimp/jQuery-File-Upload/wiki/Options#progressall
     * 
     * @param {Event} e
     * @param {object} data
     * @return {void}
     */
    
    Images.prototype.uploadProgressall = function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10),
            $progressbar = that.$el.find('.mediumInsert-active progress');
        $progressbar
            .attr('value', progress)
            .text(progress);
            
        if (progress === 100) {
            $progressbar.remove();
        }
    };
    
    /**
     * Callback for successful upload requests.
     * https://github.com/blueimp/jQuery-File-Upload/wiki/Options#done
     * 
     * @param {Event} e
     * @param {object} data
     * @return {void}
     */
    
    Images.prototype.uploadDone = function (e, data) {
        var $place = that.$el.find('.mediumInsert-active');
        
        $.each(data.result.files, function (index, file) {
            $place.append(that.templates['src/js/templates/images-image.hbs']({
                img: file.url
            }));
        });
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
