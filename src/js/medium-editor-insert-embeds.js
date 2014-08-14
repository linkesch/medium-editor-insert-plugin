(function ($) {

  $.fn.mediumInsert.registerAddon('embeds', {

    /**
    * Embed default options
    */

    default: {
      urlPlaceholder: 'type or paste url here'
    },

    /**
     * Embeds initial function
     * @return {void}
     */
    init : function (options) {
      this.options = $.extend(this.default, options);
      this.$el = $.fn.mediumInsert.insert.$el;
      this.setEmbedButtonEvents();
      this.preparePreviousEmbeds();
    },

    insertButton : function (buttonLabels) {
      var label = 'Embed';
      if (buttonLabels == 'fontawesome' || typeof buttonLabels === 'object' && !!(buttonLabels.fontawesome)) {
        label = '<i class="fa fa-code"></i>';
      }
      return '<button data-addon="embeds" data-action="add" class="medium-editor-action mediumInsert-action">' + label + '</button>';
    },

    /**
     * Add embed to $placeholder
     * @param {element} $placeholder $placeholder to add embed to
     * @return {void}
     */
    add : function ($placeholder) {
      $.fn.mediumInsert.insert.deselect();


      var formHtml = '<div class="medium-editor-toolbar-form-anchor mediumInsert-embedsWire" style="display: block;"><input type="text" value="" placeholder="' + this.options.urlPlaceholder + '" class="mediumInsert-embedsText"></div>';
      $(formHtml).appendTo($placeholder.prev());
      setTimeout(function () {
        $placeholder.prev().find('input').focus();
      }, 50);

      $.fn.mediumInsert.insert.deselect();

      this.currentPlaceholder = $placeholder;
      $(".mediumInsert-embedsText").focus();
    },

    /**
    * Make existing embeds interactive
    *
    * @return {void}
    */

    preparePreviousEmbeds: function () {
      this.$el.find('.mediumInsert-embeds').each(function() {
        var $parent = $(this).parent();
        $parent.html('<div class="mediumInsert-placeholder" draggable="true">' + $parent.html() + '</div>');
      });
    },

    setEmbedButtonEvents : function () {
      var that = this;
      $(document).on('keypress', 'input.mediumInsert-embedsText', function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
          that.setEnterActionEvents();
          that.removeToolbar();
        }
      });

      this.$el.on('blur', '.mediumInsert-embedsText', function () {
        that.removeToolbar();
      });

    },
    setEnterActionEvents : function () {
      var that = this;
      if ($.fn.mediumInsert.settings.enabled === false) {
        return false;
      }

      var url = $("input.mediumInsert-embedsText").val();
      if (!url) {
        return false;
      }
      that.convertUrlToEmbedTag(url, function(error, oebmed) {
        if (error || !oebmed.html) {
          alert('Incorrect URL format specified');
        } else {
          embed_tag = oebmed.html;
          embed_tag = $('<div class="mediumInsert-embeds"></div>').append(embed_tag);
          that.currentPlaceholder.append(embed_tag);
          that.currentPlaceholder.closest('[data-medium-element]').trigger('keyup').trigger('input');
        }
      });
    },

    removeToolbar : function () {
      $(".mediumInsert-embedsWire").remove();
    },

    convertUrlToEmbedTag : function (url, cb) {
        $.ajax({
            url: '//medium.iframe.ly/api/oembed',
            dataType: "json",
            data: {
                url: url,
                iframe: 1
            },
            success: function(data, textStatus, jqXHR) {
                cb(null, data, jqXHR);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var responseJSON = function() {
                    try {
                        return JSON.parse(jqXHR.responseText);
                    } catch(e) {}
                }();

                cb((responseJSON && responseJSON.error) || jqXHR.status || errorThrown.message, responseJSON, jqXHR);
            }
        });
    }

  });

}(jQuery));
