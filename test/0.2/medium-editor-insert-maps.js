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
    this.addon = $.fn.mediumInsert.getAddon('maps');
    this.addon.$el = $('#qunit-fixture');
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


// insertButton

test('insertButton() returns html', function () {
  equal(this.addon.insertButton().match(/button/).length, 1, 'expected button returned');
});

test('insertButton() returns html with fontawesome', function () {
  equal(this.addon.insertButton('fontawesome').match(/fa\-map/).length, 1, 'expected button returned');
});

test('insertButton() returns html with override icon', function () {
  equal(this.addon.insertButton({'map' : 'TEST-ICON'}).match(/TEST-ICON/).length, 1, 'expected overriden button returned');
});
