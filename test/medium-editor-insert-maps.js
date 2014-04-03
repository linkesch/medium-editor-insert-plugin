/**
* Images
*/

module("images", {
  setup: function() {
    $.fn.mediumInsert.settings.editor = new MediumEditor('.editable');
    $.fn.mediumInsert.settings.addons = {
      images: {
        imagesUploadScript: 'examples/upload.php'
      }
    };
    $.fn.mediumInsert.settings.enabled = true;
    $.fn.mediumInsert.getAddon('maps').$el = $('#qunit-fixture');
    $.fn.mediumInsert.insert.$el = $('#qunit-fixture');
  }
});


// init

test('init() sets addon\'s $el', function () {
  var maps = $.fn.mediumInsert.getAddon('maps');
  maps.$el = null;
  maps.init();

  deepEqual(maps.$el, $.fn.mediumInsert.insert.$el, 'addon\'s $el is set');
});



// add

test('add() adds comming soon text', function () {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert-placeholder"></div>'),
      $placeholder =  $('.mediumInsert-placeholder', $el);

  $.fn.mediumInsert.getAddon('maps').add($placeholder);
  equal($placeholder.html(), '<div class="mediumInsert-maps">Map - Coming soon...</div>', 'Coming soon added');
});
