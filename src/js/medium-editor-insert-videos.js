(function ($) {

  var services = {
    dailymotion: {
      pattern: /^((http:\/\/)?(www\.)?dailymotion\.com\/video\/)([a-z0-9]+)(_(.*)?)$/,
      replace: 'http://www.dailymotion.com/swf/$4'
    },
    vimeo: {
      pattern: /^((http:\/\/)?(www\.)?vimeo\.com\/)(\d+)(.*)?$/,
      replace: 'http://vimeo.com/moogaloop.swf?clip_id=$4&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;color=&amp;fullscreen=1'
    },
    youtube: {
      pattern: /^((http(s)?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|v\/)?)([a-zA-Z0-9-]+)(.*)?$/,
      replace: 'http://www.youtube.com/v/$7&amp;fs=1'
    }
  };

  function parseVideoUrl(url){
    for (var serviceName in services) {
      var service = services[serviceName];
      var movieUrl = url.replace(service.pattern, service.replace);
      if (url != movieUrl) {
        return movieUrl;
      }
    }
    throw 'Could not parse url';
  }

  function getEmbedCode(url, width, height) {
    var movieUrl = parseVideoUrl(url);

    return '<object width="' + width + '" height="' + height + '">' +
      "\n" + '  <param name="allowfullscreen" value="true" />' +
      "\n" + '  <param name="allowscriptaccess" value="always" />' +
      "\n" + '  <param name="movie" value="' + movieUrl + '" />' +
      "\n" + '  <embed src="' + movieUrl + '" ' +
      "\n" + '    type="application/x-shockwave-flash" ' +
      "\n" + '    allowfullscreen="true" ' +
      "\n" + '    allowscriptaccess="always" ' +
      "\n" + '    width="' + width + '" ' +
      "\n" + '    height="' + height + '"></embed>' +
      "\n" + '</object>';
  }

  $.fn.mediumInsert.registerAddon('videos', {

    /**
    * Images initial function
    * @return {void}
    */

    init: function (options) {
      if (options && options.$el) {
        this.$el = options.$el;
      }
      this.options = $.extend(this.default, options);

      this.setVideoEvents();
      this.preparePreviousVideos();
    },

    insertButton: function(buttonLabels){
      var label = 'Video';
      if (buttonLabels == 'fontawesome') {
        label = '<i class="fa fa-youtube-play"></i>';
      }
      return '<button data-addon="videos" data-action="add" class="medium-editor-action medium-editor-action-image mediumInsert-action">'+label+'</button>';
    },

    /**
    * Videos default options
    */
    default: {
      width: 400,
      height: 300
    },

    /**
    * Make existing videos interactive
    */
    preparePreviousVideos: function () {
      this.$el.find('.mediumInsert-video').each(function() {
        var $parent = $(this).parent();

       $parent.html('<div class="mediumInsert-placeholder" draggable="true">' + $parent.html() + '</div>');
      });
    },

    add: function ($placeholder) {
      var that = this;

      var formHtml = '<div class="medium-editor-toolbar-form-anchor js-medium-insert-video" id="medium-editor-toolbar-form-video" style="display: block;"><form class="mediumInsert-video-form"><input type="text" value="" placeholder="Paste or type a link to video"> <a href="#">×</a></form></div>';
      $(formHtml).appendTo($placeholder.prev());
      setTimeout(function(){
        $placeholder.prev().find('input').focus();
      }, 50);

      $.fn.mediumInsert.insert.deselect();
    },

    /**
    * Set image events displaying remove and resize buttons
    * @return {void}
    */

    setVideoEvents: function () {
      var options = this.options;

      this.$el.on('submit', '.mediumInsert-video-form', function(e) {
        var url = $(this).find('input').val(),
            $placeholder = $(this).closest('.mediumInsert-buttons').next();
        try {
          var code = getEmbedCode(url, options.width, options.height),
              html = '<div class="mediumInsert-video">'+ code + '</div>';
          $placeholder.append(html).parents('.mediumInsert').mouseleave();
        }
        catch (ex) {
          //[TODO] make something better
          window.alert(ex);
        }
        $(this).find('input').blur();
        e.preventDefault();
        return false;
      });

      this.$el.on('mouseenter', '.mediumInsert-video', function () {
        var positionTop,
            positionLeft;

        if ($.fn.mediumInsert.settings.enabled === false) {
          return;
        }

        $object = $(this);

        $(this).append('<a class="mediumInsert-videoRemove"></a>');

        positionTop = $object.position().top + parseInt($object.css('margin-top'), 10);
        positionLeft = $object.position().left + $object.width() -30;
        $('.mediumInsert-videoRemove', this).css({
          'right': 'auto',
          'top': positionTop,
          'left': positionLeft
        });
      });

      this.$el.on('blur', '.mediumInsert-video-form input', function () {
        $(".js-medium-insert-video").remove();
      });

      this.$el.on('mouseleave', '.mediumInsert-video', function () {
        $('.mediumInsert-videoRemove', this).remove();
      });

      this.$el.on('click', '.mediumInsert-videoRemove', function () {
        if ($(this).parent().siblings().length === 0) {
          $(this).parent().parent().parent().removeClass('small');
        }
        $(this).parent().remove();

        $.fn.mediumInsert.insert.deselect();
      });
    }
  });
}(jQuery));
