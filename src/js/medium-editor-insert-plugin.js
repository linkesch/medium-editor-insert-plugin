/*!
 * medium-editor-insert-plugin v0.1.1 - jQuery insert plugin for MediumEditor
 *
 * Addon Initialization
 *
 * https://github.com/orthes/medium-editor-images-plugin
 *
 * Copyright (c) 2013 Pavel Linkesch (http://linkesch.sk)
 * Released under the MIT license
 */

(function ($) {
  /*
  * Private storage of registered addons
  */
  var addons = {};

  /**
  * Extend MediumEditor's serialize function to get rid of unnecesarry Medium Editor Insert Plugin stuff
  * @return {object} content Object containing HTML content of each element
  */

  MediumEditor.prototype.serialize = function () {
    var i, j,
        elementid,
        content = {},
        $clone, $inserts, $insert, $insertData, html;
    for (i = 0; i < this.elements.length; i += 1) {
      elementid = (this.elements[i].id !== '') ? this.elements[i].id : 'element-' + i;

      $clone = $(this.elements[i]).clone();
      $inserts = $('.mediumInsert', $clone);
      for (j = 0; j < $inserts.length; j++) {
        $insert = $($inserts[j]);
        $insertData = $('.mediumInsert-placeholder', $insert).children();
        if ($insertData.length === 0) {
          $insert.remove();
        } else {
          $insert.removeAttr('contenteditable');
          $('img[draggable]', $insert).removeAttr('draggable');
          if ($insert.hasClass('small')) {
            $insertData.addClass('small');
          }
          $('.mediumInsert-buttons', $insert).remove();
          $insertData.unwrap();
        }
      }

      html = $clone.html().trim();
      content[elementid] = {
        value: html
      };
    }
    return content;
  };

  /**
  * Extend MediumEditor's deactivate function to call $.fn.mediumInsert.insert.disable function
  * @return {void}
  */

  MediumEditor.prototype.deactivate = function () {
    var i;
    if (!this.isActive) {
      return false;
    }
    this.isActive = false;

    if (this.toolbar !== undefined) {
      this.toolbar.style.display = 'none';
    }

    document.documentElement.removeEventListener('mouseup', this.checkSelectionWrapper);

    for (i = 0; i < this.elements.length; i += 1) {
      this.elements[i].removeEventListener('keyup', this.checkSelectionWrapper);
      this.elements[i].removeEventListener('blur', this.checkSelectionWrapper);
      this.elements[i].removeAttribute('contentEditable');
    }

    $.fn.mediumInsert.insert.$el.mediumInsert('disable');
  };

  /**
  * Extend MediumEditor's activate function to call $.fn.mediumInsert.insert.enable function
  * @return {void}
  */

  MediumEditor.prototype.activate = function () {
    var i;
    if (this.isActive) {
      return false;
    }

    if (this.toolbar !== undefined) {
      this.toolbar.style.display = 'block';
    }

    this.isActive = true;
    for (i = 0; i < this.elements.length; i += 1) {
      this.elements[i].setAttribute('contentEditable', true);
    }
    this.bindSelect();

    $.fn.mediumInsert.insert.$el.mediumInsert('enable');
  };

  /**
  * Medium Editor Insert Plugin
  * @param {object} options Options for the plugin
  * @param {void}
  */

  $.fn.mediumInsert = function (options) {

    if (typeof options === 'string' && $.fn.mediumInsert.insert[options]) {
      $.fn.mediumInsert.insert[options]();
    } else {
      $.fn.mediumInsert.settings = $.extend($.fn.mediumInsert.settings, options);



      /**
      * Initial plugin loop
      */

      return this.each(function () {

        $('p', this).bind('dragover drop', function (e) {
          e.preventDefault();
          return false;
        });

        $.fn.mediumInsert.insert.init($(this));

        for (var i in $.fn.mediumInsert.settings.addons) {
          var addonOptions = $.fn.mediumInsert.settings.addons[i];
          addonOptions.$el = $.fn.mediumInsert.insert.$el;
          addons[i].init(addonOptions);
        }
      });
    }
  };


  /**
  * Settings
  */
  $.fn.mediumInsert.settings = {
    enabled: true,
    addons: {
      images: {}
    }
  };

  /**
  * Register new addon
  */
  $.fn.mediumInsert.registerAddon = function(name, addon){
    addons[name] = addon;
  };

  /**
  * Get registered addon
  */
  $.fn.mediumInsert.getAddon = function(name){
    return addons[name];
  };


  /**
  * Addon Initialization
  */

  $.fn.mediumInsert.insert = {

    /**
    * Insert initial function
    * @param {element} el Parent container element
    * @return {void}
    */

    init: function ($el) {
      this.$el = $el;
      this.setPlaceholders();
      this.setEvents();
    },

    /**
    * Deselect selected text
    * @return {void}
    */

    deselect: function () {
      document.getSelection().removeAllRanges();
    },

    /**
    * Disable the plugin
    * @return {void}
    */

    disable: function () {
      $.fn.mediumInsert.settings.enabled = false;

      $.fn.mediumInsert.insert.$el.find('.mediumInsert-buttons').addClass('hide');
    },

    /**
    * Enable the plugin
    * @return {void}
    */

    enable: function () {
      $.fn.mediumInsert.settings.enabled = true;

      $.fn.mediumInsert.insert.$el.find('.mediumInsert-buttons').removeClass('hide');
    },

    /**
    * Method setting placeholders
    * @return {void}
    */

    setPlaceholders: function () {
      var that = this,
          $el = $.fn.mediumInsert.insert.$el,
          editor = $.fn.mediumInsert.settings.editor,
          buttonLabels = (editor && editor.options) ? editor.options.buttonLabels : '',
          insertBlock = '<ul class="mediumInsert-buttonsOptions medium-editor-toolbar medium-editor-toolbar-active">';

      if (Object.keys($.fn.mediumInsert.settings.addons).length === 0) {
        return false;
      }

      for (var i in $.fn.mediumInsert.settings.addons) {
        insertBlock += '<li>' + addons[i].insertButton(buttonLabels) + '</li>';
      }
      insertBlock += '</ul>';
      insertBlock = '<div class="mediumInsert" contenteditable="false">'+
        '<div class="mediumInsert-buttons">'+
          '<a class="mediumInsert-buttonsShow">+</a>'+
          insertBlock +
        '</div>'+
        '<div class="mediumInsert-placeholder"></div>'+
      '</div>';

      if ($el.is(':empty')) {
        $el.html('<p><br></p>');
      }

      $el.keyup(function () {
        var i = 0,
            $lastChild = $el.children(':last');

        if ($lastChild.hasClass('mediumInsert') && $lastChild.find('.mediumInsert-placeholder').children().length > 0) {
          $el.append('<p><br></p>');
        }

        $el.children('p').each(function () {
          if ($(this).next().hasClass('mediumInsert') === false) {
            $(this).after(insertBlock);
            $(this).next('.mediumInsert').attr('id', 'mediumInsert-'+ i);
          }
          i++;
        });

      }).keyup();
    },


    /**
    * Set events on placeholders
    * @return {void}
    */

    setEvents: function () {
      var that = this,
          $el = $.fn.mediumInsert.insert.$el;

      $el.on('selectstart', '.mediumInsert', function (e) {
        e.preventDefault();
        return false;
      });

      $el.on('blur', function () {
        var $clone = $(this).clone(),
            cloneHtml;

        $clone.find('.mediumInsert').remove();
        cloneHtml = $clone.html().replace(/^\s+|\s+$/g, '');

        if (cloneHtml === '' || cloneHtml === '<p><br></p>') {
          $(this).addClass('medium-editor-placeholder');
        }
      });


      $el.on('click', '.mediumInsert-buttons a.mediumInsert-buttonsShow', function () {
        var $options = $(this).siblings('.mediumInsert-buttonsOptions'),
            $placeholder = $(this).parent().siblings('.mediumInsert-placeholder');

        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
          $options.hide();

          $('a', $options).show();
        } else {
          $(this).addClass('active');
          $options.show();

          $('a', $options).each(function () {
            var aClass = $(this).attr('class').split('action-')[1],
                plugin = aClass.split('-')[0];
            if ($('.mediumInsert-'+ plugin, $placeholder).length > 0) {
              $('a:not(.action-'+ aClass +')', $options).hide();
            }
          });
        }

        that.deselect();
      });

      $el.on('mouseleave', '.mediumInsert', function () {
        $('a.mediumInsert-buttonsShow', this).removeClass('active');
        $('.mediumInsert-buttonsOptions', this).hide();
      });

      $el.on('click', '.mediumInsert-buttons .mediumInsert-action', function () {
        var addon = $(this).data('addon'),
            action = $(this).data('action'),
            $placeholder = $(this).parents('.mediumInsert-buttons').siblings('.mediumInsert-placeholder');

        if (addons[addon] && addons[addon][action]) {
          addons[addon][action]($placeholder);
        }

        $(this).parents('.mediumInsert').mouseleave();
      });
    }

  };

}(jQuery));
