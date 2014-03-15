/**
* Images
*/

module("images", {
  setup: function() {
    $.fn.mediumInsert.settings.editor = new MediumEditor('.editable');
    $.fn.mediumInsert.settings.imagesUploadScript = 'examples/upload.php';
    $.fn.mediumInsert.settings.enabled = true;
    $.fn.mediumInsert.maps.$el = $('#qunit-fixture');
    $.fn.mediumInsert.insert.$el = $('#qunit-fixture');
  }
});


// init

test('init() sets addon\'s $el', function () {
  $.fn.mediumInsert.maps.$el = null;
  $.fn.mediumInsert.maps.init();

  deepEqual($.fn.mediumInsert.maps.$el, $.fn.mediumInsert.insert.$el, 'addon\'s $el is set');
});



// add

test('add() adds comming soon text', function () {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert-placeholder"></div>'),
      $placeholder =  $('.mediumInsert-placeholder', $el);

  $.fn.mediumInsert.maps.add($placeholder);
  equal($placeholder.html(), '<div class="mediumInsert-maps">Map - Coming soon...</div>', 'Coming soon added');
});
