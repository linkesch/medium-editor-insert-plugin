;(function ($, window, document, undefined) {

    'use strict';

    /** Default values */
    var pluginName = 'mediumInsert',
        addonName = 'Images', // first char is uppercase
        defaults = {
            label: '<span class="fa fa-camera"></span>',
            uploadScript: 'upload.php',
            deleteScript: 'delete.php',
            preview: true,
            styles: {
                wide: {
                    label: '<span class="fa fa-align-justify"></span>'
                },
                left: {
                    label: '<span class="fa fa-align-left"></span>'
                },
                right: {
                    label: '<span class="fa fa-align-right"></span>'
                },
                grid: {
                    label: '<span class="fa fa-th"></span>'
                }
            }
        };

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
        this.el = el;
        this.$el = $(el);
        this.templates = window.MediumInsert.Templates;

        this.options = $.extend(true, {}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        // Allow image preview only in browsers, that support's that
        if (this.options.preview && !window.FileReader) {
            this.options.preview = false;
        }

        this.init();
    }

    /**
     * Initialization
     *
     * @return {void}
     */

    Images.prototype.init = function () {
        this.events();
        this.backwardsCompatibility();
        this.sorting();
    };

    /**
     * Event listeners
     *
     * @return {void}
     */

    Images.prototype.events = function () {
        $(document)
            .on('click', $.proxy(this, 'unselectImage'))
            .on('keydown', $.proxy(this, 'removeImage'))
            .on('click', '.medium-insert-images-toolbar .medium-editor-action', $.proxy(this, 'toolbarAction'));

        this.$el
            .on('click', '.medium-insert-images img', $.proxy(this, 'selectImage'));
    };

    /**
     * Replace v0.* class names with new ones
     *
     * @return {void}
     */

    Images.prototype.backwardsCompatibility = function () {
        this.$el.find('.mediumInsert')
            .removeClass('mediumInsert')
            .addClass('medium-insert-images');

        this.$el.find('.medium-insert-images.small')
            .removeClass('small')
            .addClass('medium-insert-images-left');
    };

    /**
     * Get the Core object
     *
     * @return {object} Core object
     */
    Images.prototype.getCore = function () {
        if (typeof(this.core) === 'undefined') {
            this.core = this.$el.data('plugin_'+ pluginName);
        }

        return this.core;
    };

    /**
     * Add image
     *
     * @return {void}
     */

    Images.prototype.add = function () {
        var that = this,
            $file = $(this.templates['src/js/templates/images-fileupload.hbs']());

        $file.fileupload({
            url: this.options.uploadScript,
            dataType: 'json',
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            add: function (e, data) {
                $.proxy(that, 'uploadAdd', e, data)();
            },
            progress: function (e, data) {
                $.proxy(that, 'uploadProgress', e, data)();
            },
            progressall: function (e, data) {
                $.proxy(that, 'uploadProgressall', e, data)();
            },
            done: function (e, data) {
                $.proxy(that, 'uploadDone', e, data)();
            }
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
        var $place = this.$el.find('.medium-insert-active'),
            that = this,
            reader;

        this.getCore().hideButtons();

        // Replace paragraph with div, because figure elements can't be inside paragraph
        if ($place.is('p')) {
            $place.replaceWith('<div class="medium-insert-active">'+ $place.html() +'</div>');
            $place = this.$el.find('.medium-insert-active');
            this.getCore().moveCaret($place);
        }

        $place.addClass('medium-insert-images');

        if (this.options.preview === false && $place.find('progress').length === 0) {
            $place.append(this.templates['src/js/templates/images-progressbar.hbs']());
        }

        if (data.autoUpload || (data.autoUpload !== false && $(e.target).fileupload('option', 'autoUpload'))) {
            data.process().done(function () {
                // If preview is set to true, let the showImage handle the upload start
                if (that.options.preview) {
                    reader = new FileReader();

                    reader.onload = function (e) {
                        $.proxy(that, 'showImage', e.target.result, data)();
                    };

                    reader.readAsDataURL(data.files[0]);
                } else {
                    data.submit();
                }
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
        var progress, $progressbar;

        if (this.options.preview === false) {
            progress = parseInt(data.loaded / data.total * 100, 10);
            $progressbar = this.$el.find('.medium-insert-active').find('progress');

            $progressbar
                .attr('value', progress)
                .text(progress);

            if (progress === 100) {
                $progressbar.remove();
            }
        }
    };

    /**
     * Callback for upload progress events.
     * https://github.com/blueimp/jQuery-File-Upload/wiki/Options#progress
     *
     * @param {Event} e
     * @param {object} data
     * @return {void}
     */

    Images.prototype.uploadProgress = function (e, data) {
        var progress, $progressbar;

        if (this.options.preview) {
            progress = 100 - parseInt(data.loaded / data.total * 100, 10);
            $progressbar = data.context.find('.medium-insert-images-progress');

            $progressbar.css('width', progress +'%');

            if (progress === 0) {
                $progressbar.remove();
            }
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
        $.proxy(this, 'showImage', data.result.files[0].url, data)();

        this.getCore().clean();
        this.$el.trigger('input');

        this.sorting();
    };

    /**
     * Add uploaded / preview image to DOM
     *
     * @param {string} img
     * @returns {void}
     */

    Images.prototype.showImage = function (img, data) {
        var $place;

        // If preview is allowed and preview image already exists,
        // replace it with uploaded image
        if (this.options.preview && data.context) {
            data.context.find('img').attr('src', img);
        } else {
            $place = this.$el.find('.medium-insert-active');

            data.context = $(this.templates['src/js/templates/images-image.hbs']({
                img: img,
                progress: this.options.preview
            })).appendTo($place);

            $place.find('br').remove();

            if (this.options.preview) {
                data.submit();
            }
        }
    };

    /**
     * Select clicked image
     *
     * @param {Event} e
     * @returns {void}
     */

    Images.prototype.selectImage = function (e) {
        var $image = $(e.target),
            that = this;

        $image.addClass('medium-insert-image-active');
        $image.closest('.medium-insert-images').addClass('medium-insert-active');

        setTimeout(function () {
            that.addToolbar();
        }, 50);
    };

    /**
     * Unselect selected image
     *
     * @param {Event} e
     * @returns {void}
     */

    Images.prototype.unselectImage = function (e) {
        var $el = $(e.target),
            $image = this.$el.find('.medium-insert-image-active');

        if ($el.is('img') && $el.hasClass('medium-insert-image-active')) {
            $image.not($el).removeClass('medium-insert-image-active');
            $('.medium-insert-images-toolbar').remove();
            return;
        }

        $image.removeClass('medium-insert-image-active');

        $('.medium-insert-images-toolbar').remove();
    };

    /**
     * Remove image
     *
     * @param {Event} e
     * @returns {void}
     */

    Images.prototype.removeImage = function (e) {
        var $image, $parent, $empty;

        if (e.which === 8 || e.which === 46) {
            $image = this.$el.find('.medium-insert-image-active');

            if ($image.length) {
                e.preventDefault();

                this.deleteFile($image.attr('src'));

                $parent = $image.closest('.medium-insert-images');
                $image.closest('figure').remove();

                $('.medium-insert-images-toolbar').remove();

                if ($parent.find('figure').length === 0) {
                    $empty = $(this.templates['src/js/templates/core-empty-line.hbs']().trim());
                    $parent.before($empty);
                    $parent.remove();

                    // Hide addons
                    this.getCore().hideAddons();

                    this.getCore().moveCaret($empty);
                }

                this.$el.trigger('input');
            }
        }
    };

    /**
     * Makes ajax call to deleteScript
     *
     * @param {String} file File name
     * @returns {void}
     */

    Images.prototype.deleteFile = function (file) {
        if (this.options.deleteScript) {
            $.post(this.options.deleteScript, { file: file });
        }
    };

    /**
     * Adds image toolbar to editor
     *
     * @returns {void}
     */

    Images.prototype.addToolbar = function () {
        var $image = this.$el.find('.medium-insert-image-active'),
            $p = $image.closest('.medium-insert-images'),
            active = false,
            $toolbar;

        $toolbar = $(this.templates['src/js/templates/images-toolbar.hbs']({
            styles: this.options.styles
        }).trim());

        $('body').append($toolbar);

        $toolbar
            .css({
                top: $image.offset().top - $toolbar.height() - 8 - 2 - 5, // 8px - hight of an arrow under toolbar, 2px - height of an image outset, 5px - distance from an image
                left: $image.offset().left + $image.width() / 2 - $toolbar.width() / 2
            })
            .show();

        $toolbar.find('button').each(function () {
            if ($p.hasClass('medium-insert-images-'+ $(this).data('action'))) {
                $(this).addClass('medium-editor-button-active');
                active = true;
            }
        });

        if (active === false) {
            $toolbar.find('button').first().addClass('medium-editor-button-active');
        }
    };

    /**
     * Fires toolbar action
     *
     * @param {Event} e
     * @returns {void}
     */

    Images.prototype.toolbarAction = function (e) {
        var $button = $(e.target).is('button') ? $(e.target) : $(e.target).closest('button'),
            $li = $button.closest('li'),
            $ul = $li.closest('ul'),
            $lis = $ul.find('li'),
            $p = this.$el.find('.medium-insert-active'),
            that = this;

        $button.addClass('medium-editor-button-active');
        $li.siblings().find('.medium-editor-button-active').removeClass('medium-editor-button-active');

        $lis.find('button').each(function () {
            var className = 'medium-insert-images-'+ $(this).data('action');

            if ($(this).hasClass('medium-editor-button-active')) {
                $p.addClass(className);

                if (that.options.styles[$(this).data('action')].added) {
                    that.options.styles[$(this).data('action')].added($p);
                }
            } else {
                $p.removeClass(className);

                if (that.options.styles[$(this).data('action')].removed) {
                    that.options.styles[$(this).data('action')].removed($p);
                }
            }
        });

        this.$el.trigger('input');
    };

    /**
     * Initialize sorting
     *
     * @returns {void}
     */

    Images.prototype.sorting = function () {
        var that = this;

        $('.medium-insert-images').sortable({
            group: 'medium-insert-images',
            containerSelector: '.medium-insert-images',
            itemSelector: 'figure',
            placeholder: '<figure class="placeholder">',
            nested: false,
            vertical: false,
            afterMove: function () {
                that.$el.trigger('input');
            }
        });
    };

    /** Plugin initialization */

    $.fn[pluginName + addonName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName + addonName)) {
                $.data(this, 'plugin_' + pluginName + addonName, new Images(this, options));
            }
        });
    };

})(jQuery, window, document);
