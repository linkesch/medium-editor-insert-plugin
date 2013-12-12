/**
* Initial loop
*/

module('initial loop');

test('initial loop calls init functions', function() {
  var stub1 = this.stub($.fn.mediumInsert.insert, 'init'),
      stub2 = this.stub($.fn.mediumInsert.images, 'init'),
      stub3 = this.stub($.fn.mediumInsert.maps, 'init'); 
      
  $('div').mediumInsert({
    images: true,
    maps: true
  });

  ok(stub1.called, 'insert.init() called');
  ok(stub2.called, 'images.init() called');
  ok(stub3.called, 'maps.init() called');
});


/**
* Insert
*/

module("insert", {
  setup: function() {
    $.fn.mediumInsert.settings.editor = new MediumEditor('.editable');
    $.fn.mediumInsert.settings.imagesUploadScript = 'examples/upload.php';
    $.fn.mediumInsert.settings.images = true;
    $.fn.mediumInsert.insert.$el = $('#qunit-fixture');
  }
});


// init

test('init sets el', function () {
  var $el = $('<div></div>'),
      stub1 = this.stub($.fn.mediumInsert.insert, 'setPlaceholders');
  
  $.fn.mediumInsert.insert.init($el);
  
  deepEqual($.fn.mediumInsert.insert.$el, $el, 'el is set');
});

test('init calls setPlaceholders()', function() {
  var stub1 = this.stub($.fn.mediumInsert.insert, 'setPlaceholders');
      
  $.fn.mediumInsert.insert.init($('div'));

  ok(stub1.called, 'setPlaceholders() called');
});


// setPlaceholders

test('setPlaceholders creates placeholders', function () {
  var $el = $('#qunit-fixture').html('<p></p><p></p>');

  $.fn.mediumInsert.insert.setPlaceholders($el);
  
  equal($('.mediumInsert', $el).length, 2, 'two placeholders created');
});

asyncTest('setPlaceholders creates click event on buttonShow', function () {
  var $el = $('#qunit-fixture').html('<p></p>');

  $.fn.mediumInsert.insert.setPlaceholders($el);
    
  $('.mediumInsert-buttonsShow', $el).click(function () {
    ok($('.mediumInsert-buttonsOptions', $el).is(':visible'), 'clicking on buttonsShow, shows buttons');
    start();
  }).click();
});

asyncTest('setPlaceholders creates click event on options', function () {
  var $el = $('#qunit-fixture').html('<p></p>'),
      stub;
      
  stub = this.stub($.fn.mediumInsert.images, 'add', function ($placeholder) {
    ok(stub.called, 'click on images-add calls images.add method');
    $.fn.mediumInsert.images.add.restore();
    start();
  });

  $.fn.mediumInsert.insert.setPlaceholders($el);

  $('.mediumInsert-buttonsOptions .action-images-add', $el).click();
});
