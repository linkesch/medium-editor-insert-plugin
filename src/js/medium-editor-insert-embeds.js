/*!
 * medium-editor-insert-plugin v0.1.1 - jQuery insert plugin for MediumEditor
 *
 * Embeds Addon
 *
 * https://github.com/orthes/medium-editor-images-plugin
 *
 * Copyright (c) 2014 Vexus2 (https://github.com/vexus2)
 * Released under the MIT license
 */

(function ($) {

  $.fn.mediumInsert.registerAddon('embeds', {

    /**
     * Embeds initial function
     * @return {void}
     */
    init : function () {
      this.$el = $.fn.mediumInsert.insert.$el;
      this.setEmbedButtonEvents();
    },

    insertButton : function (buttonLabels) {
      var label = 'Embed';
      if (buttonLabels == 'fontawesome') {
        label = '<i class="fa fa-code"></i>';
      }
      return '<button data-addon="embeds" data-action="add" class="medium-editor-action medium-editor-action-image mediumInsert-action">' + label + '</button>';
    },

    /**
     * Add embed to $placeholder
     * @param {element} $placeholder $placeholder to add embed to
     * @return {void}
     */
    add : function ($placeholder) {
      $(".mediumInsert-embedsPlaceholder").remove();
      $.fn.mediumInsert.insert.deselect();
      $placeholder.append('<div class="mediumInsert-embedsPlaceholder">' +
           '<i class="fa fa-code mediumInsert-embedsImage"></i>' +
           '<div class="mediumInsert-embedsWire">' +
             '<div class="mediumInsert-embedsBox">' +
               '<input type="text" class="mediumInsert-embedsText" placeholder="type or paste url here">' +
               '<button class="mediumInsert-embedsButton">Embed</button>' +
             '</div>' +
           '</div>' +
         '</div>');
      this.currentPlaceholder = $placeholder;
      $(".mediumInsert-embedsText").focus();
    },

    setEmbedButtonEvents : function () {
      var that = this;
      $(document).on('click', 'button.mediumInsert-embedsButton', function () {
        that.setEnterActionEvents();
      });
      $(document).on('keypress', 'input.mediumInsert-embedsText', function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
          that.setEnterActionEvents();
        }
      });
    },
    setEnterActionEvents : function() {
      var that = this;
      if ($.fn.mediumInsert.settings.enabled === false) {
        return;
      }

      var url = $("input.mediumInsert-embedsText").val();
      if (!url) {
        return;
      }
      var embed_tag = that.convertUrlToEmbedTag(url);
      if (!embed_tag) {
        alert('Incorrect URL format specified');
      } else {
        embed_tag = $('<div class="mediumInsert-embeds"></div>').append(embed_tag);
        that.currentPlaceholder.parent().append(embed_tag);
      }
      $(".mediumInsert-embedsPlaceholder").remove();
    },

    convertUrlToEmbedTag : function (url) {
      var embed_tag = url.replace(/\n?/g, '').replace(/https?:\/\/www\.youtube\.com\/watch\?v=(.+?)$/, '<div class="video"><iframe width="420" height="315" src="//www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe></div>')
        .replace(/http:\/\/vimeo\.com\/(\d+)$/, '<iframe src="//player.vimeo.com/video/$1" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
        .replace(/https:\/\/twitter\.com\/(\w+)\/status\/(\d+)\/?$/, '<blockquote class="twitter-tweet" lang="ja"><a href="https://twitter.com/$1/statuses/$2"></a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>')
        .replace(/https:\/\/www\.facebook\.com\/(\w+)\/posts\/(\d+)$/, '<div id="fb-root"></div><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/en_US/all.js#xfbml=1"; fjs.parentNode.insertBefore(js, fjs); }(document, "script", "facebook-jssdk"));</script><div class="fb-post" data-href="https://www.facebook.com/$1/posts/$2"></div>')
        .replace(/http:\/\/instagram\.com\/p\/(.+)\/?$/, '<span class="instagram"><iframe src="//instagram.com/p/$1/embed/" width="612" height="710" frameborder="0" scrolling="no" allowtransparency="true"></iframe></span>');
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(embed_tag) ? embed_tag : false;
    }

  });

}(jQuery));