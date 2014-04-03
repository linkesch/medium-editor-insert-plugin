/*!
 * medium-editor-insert-plugin v0.1.1 - jQuery insert plugin for MediumEditor
 *
 * Maps Addon
 *
 * https://github.com/orthes/medium-editor-images-plugin
 *
 * Copyright (c) 2013 Pavel Linkesch (http://linkesch.sk)
 * Released under the MIT license
 */

(function ($) {

  $.fn.mediumInsert.registerAddon('maps', {

    /**
    * Maps initial function
    * @return {void}
    */

    init: function () {
      this.$el = $.fn.mediumInsert.insert.$el;
    },

    insertButton: function(buttonLabels){
      var label = 'Map';
      if (buttonLabels == 'fontawesome') {
        label = '<i class="fa fa-map-marker"></i>';
      }
      return '<button data-addon="maps" data-action="add" class="medium-editor-action medium-editor-action-image mediumInsert-action">'+label+'</button>';
    },

    /**
    * Add map to placeholder
    * @param {element} placeholder Placeholder to add map to
    * @return {void}
    */

    add: function (placeholder) {
      var that = this;

      $.fn.mediumInsert.insert.deselect();

      placeholder.append('<div class="mediumInsert-maps">Map - Coming soon...</div>');
    }

  });

}(jQuery));