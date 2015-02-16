;(function ($, window, document, undefined) {

    'use strict';

    /** Default values */
    var pluginName = 'mediumInsert',
        
        // first char is uppercase
        addonName = 'Products', 
        defaults = {
            label: '<span class="fa fa-shopping-cart"></span>',
            placeholder: 'Search for a product on Hubrick',
            styles: {
                wide: {
                    label: '<span class="fa fa-align-justify"></span>'
                },
                left: {
                    label: '<span class="fa fa-align-left"></span>'
                },
                right: {
                    label: '<span class="fa fa-align-right"></span>'
                }
            }
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
            .on('keydown', $.proxy(this, 'removeProduct'))
            .on('keydown', $.proxy(this, 'search'));

        $(document)
            .on('click', $.proxy(this, 'unselectProduct'))
            .on('click', '.medium-insert-products > div', $.proxy(this, 'selectProduct'))
            .on('click', '.medium-insert-products-toolbar .medium-editor-action', $.proxy(this, 'toolbarAction'));
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
     * Add product element
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
     * Search Hubrick Products endpoint for products
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
            //this.getCore().moveCaret($place);
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
            //console.log('removing product');
            //this.$el.find('.medium-insert-products-active').remove();
        }
    };

    /**
     * Adds product toolbar to editor
     *
     * @returns {void}
     */

    Products.prototype.addToolbar = function () {
        var $productBlock = this.$el.find('.hubrick-product-block'),
            $div = $productBlock.closest('.medium-insert-products'),
            active = false,
            $toolbar;

        $toolbar = $(this.templates['src/js/templates/products-toolbar.hbs']({
            styles: this.options.styles
        }).trim());

        $('body').append($toolbar);

        $toolbar
            .css({
                top: $productBlock.offset().top  - $toolbar.height() - 8 - 2 - 5, 
                left: $productBlock.offset().left + $productBlock.width() / 2 - $toolbar.width() / 2
            })
            .show();

        $toolbar.find('button').each(function () {
            if ($div.hasClass('medium-insert-products-'+ $(this).data('action'))) {
                $(this).addClass('medium-editor-button-active');
                active = true;
            }
        });

        if (active === false) {
            $toolbar.find('button').first().addClass('medium-editor-button-active');
        }
    };

    /**
     * Fires product action
     *
     * @param {Event} e
     * @returns {void}
     */

    Products.prototype.toolbarAction = function (e) {
        var $button = $(e.target).is('button') ? $(e.target) : $(e.target).closest('button'),
            $li = $button.closest('li'),
            $ul = $li.closest('ul'),
            $lis = $ul.find('li'),
            $p = this.$el.find('.medium-insert-active'),
            that = this;

        $button.addClass('medium-editor-button-active');
        $li.siblings().find('.medium-editor-button-active').removeClass('medium-editor-button-active');

        $lis.find('button').each(function () {
            var className = 'medium-insert-products-'+ $(this).data('action');

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

    /**
     * Select clicked product
     *
     * @param {Event} e
     * @returns {void}
     */

    Products.prototype.selectProduct = function (e) {
        var $product = $(e.target).closest('.medium-insert-products'),        
            that = this;
        $product.addClass('medium-insert-products-active');
        $product.closest('.medium-insert-products').addClass('medium-insert-active');

        setTimeout(function () {
            that.addToolbar();
        }, 50);
    };

    /**
     * Unselect selected product
     *
     * @param {Event} e
     * @returns {void}
     */

    Products.prototype.unselectProduct = function (e) {
        var $el = $(e.target),
            $product = this.$el.find('.hubrick-product-block');

        if ($el.is('.hubrick-product-block') || $el.closest('.hubrick-product-block').length) {
            return;
        }

        $product
            .closest('.medium-insert-products-active')
            .removeClass('medium-insert-products-active');
        $('.medium-insert-products-toolbar').remove();
    };


    Products.prototype.removeProduct = function (e) {

        var $product, $parent, $empty;

        // if backspace or delete have been pressed
        if (e.which === 8 || e.which === 46) {

            // there should only be one active product at any given time
            $product = this.$el.find('.medium-insert-products-active');

            if ($product.length) {
                e.preventDefault();
                $parent = $product.closest('.medium-insert-products');
                $('.medium-insert-products-toolbar').remove();

                if ($parent.length) {
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

    // Images.prototype.removeImage = function (e) {
    //     var $image, $parent, $empty;

    //     if (e.which === 8 || e.which === 46) {
    //         $image = this.$el.find('.medium-insert-image-active');

    //         if ($image.length) {
    //             e.preventDefault();

    //             this.deleteFile($image.attr('src'));

    //             $parent = $image.closest('.medium-insert-images');
    //             $image.closest('figure').remove();

    //             $('.medium-insert-images-toolbar').remove();

    //             if ($parent.find('figure').length === 0) {
    //                 $empty = $(this.templates['src/js/templates/core-empty-line.hbs']().trim());
    //                 $parent.before($empty);
    //                 $parent.remove();

    //                 // Hide addons
    //                 this.getCore().hideAddons();

    //                 this.getCore().moveCaret($empty);
    //             }

    //             this.$el.trigger('input');
    //         }
    //     }
    // };


    /** Plugin initialization */

    $.fn[pluginName + addonName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName + addonName)) {
                $.data(this, 'plugin_' + pluginName + addonName, new Products(this, options));
            }
        });
    };

})(jQuery, window, document);
