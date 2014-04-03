/**
* Medium Editor extensions
*/

module('medium editor extensions');

test('customize editor\'s serialize function', function () {
    var $el = $('#qunit-fixture').html('<div class="mediumInsert small" contenteditable="false" id="mediumInsert-0">'+
      '<div class="mediumInsert-buttons hide">'+
        '<div class="mediumInsert-buttonsIcon">→</div>'+
        '<a class="mediumInsert-buttonsShow">Insert</a>'+
        '<ul class="mediumInsert-buttonsOptions">'+
          '<li><button data-addon="images" data-action="add" class="mediumInsert-action action-images-add">Image</button></li>'+
          '<li><button data-addon="maps" data-action="add" class="mediumInsert-action action-maps-add">Map</button></li>'+
        '</ul>'+
      '</div>'+
      '<div class="mediumInsert-placeholder"><img></div>'+
    '</div>'+
    '<div class="mediumInsert" contenteditable="false" id="mediumInsert-0">'+
      '<div class="mediumInsert-buttons hide">'+
        '<div class="mediumInsert-buttonsIcon">→</div>'+
        '<a class="mediumInsert-buttonsShow">Insert</a>'+
        '<ul class="mediumInsert-buttonsOptions">'+
          '<li><button data-addon="images" data-action="add" class="mediumInsert-action action-images-add">Image</button></li>'+
          '<li><button data-addon="maps" data-action="add" class="mediumInsert-action action-maps-add">Map</button></li>'+
        '</ul>'+
      '</div>'+
      '<div class="mediumInsert-placeholder"></div>'+
    '</div>'),
        editor = new MediumEditor('#qunit-fixture');

    $el.mediumInsert({
      editor: editor
    });

    equal(editor.serialize()['qunit-fixture'].value, '<div class="mediumInsert small" id="mediumInsert-0"><img class="small"></div>', 'serialize() returner correct string');
});

asyncTest('extend editor\'s deactivate function to call plugins\'s disable', function() {
  var editor = new MediumEditor('#qunit-fixture'),
      stub = this.stub($.fn.mediumInsert.insert, 'disable', function () {
        $.fn.mediumInsert.insert.disable.restore();
        ok(true, 'disable() called');
        start();
      });

  $('#qunit-fixture').mediumInsert({
    editor: editor
  });

  editor.deactivate();
});

test('editor\'s deactivate returns false if editor is not active', function() {
  var editor = new MediumEditor('#qunit-fixture');

  $('#qunit-fixture').mediumInsert({
    editor: editor
  });

  editor.isActive = false;
  equal(editor.deactivate(), false, 'deactivate() returned false');
});

asyncTest('extend editor\'s activate function to call plugins\'s enable', function() {
  var editor = new MediumEditor('#qunit-fixture'),
      stub = this.stub($.fn.mediumInsert.insert, 'enable', function () {
        $.fn.mediumInsert.insert.enable.restore();
        ok(true, 'enable() called');
        start();
      });

  $('#qunit-fixture').mediumInsert({
    editor: editor
  });

  editor.deactivate();
  editor.activate();
});

test('editor\'s activate returns false if editor is active', function() {
  var editor = new MediumEditor('#qunit-fixture');

  $('#qunit-fixture').mediumInsert({
    editor: editor
  });

  editor.isActive = true;
  equal(editor.activate(), false, 'activate() returned false');
});


/**
* Initial loop
*/

module('initial loop');

test('initial loop calls init functions', function() {
  var stub1 = this.stub($.fn.mediumInsert.insert, 'init'),
      stub2 = this.stub($.fn.mediumInsert.getAddon('images'), 'init'),
      stub3 = this.stub($.fn.mediumInsert.getAddon('maps'), 'init');

  $('div').mediumInsert({
    addons: {
      images: {},
      maps: {}
    }
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
    $.fn.mediumInsert.settings.addons = {
      images: {
        imagesUploadScript: 'examples/upload.php'
      }
    };
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

test('init calls setPlaceholders() and setEvents()', function() {
  var stub1 = this.stub($.fn.mediumInsert.insert, 'setPlaceholders'),
      stub2 = this.stub($.fn.mediumInsert.insert, 'setEvents');

  $.fn.mediumInsert.insert.init($('div'));

  ok(stub1.called, 'setPlaceholders() called');
  ok(stub2.called, 'setEvents() called');
});


// disable

test('disable param calls disable function', function () {
  var $el = $('<div></div>'),
      stub = this.stub($.fn.mediumInsert.insert, 'disable');

  $el.mediumInsert('disable');

  ok(stub.called, 'disable() called');
});

test('disable deactivates the plugin', function () {
  var $el = $('#qunit-fixture').html('<p></p><div class="mediumInsert" contenteditable="false" id="mediumInsert-0"><div class="mediumInsert-buttons"><div class="mediumInsert-buttonsIcon">→</div><a class="mediumInsert-buttonsShow">Insert</a><ul class="mediumInsert-buttonsOptions"><li><button data-addon="images" data-action="add" class="mediumInsert-action action-images-add">Image</button></li><li><button data-addon="maps" data-action="add" class="mediumInsert-action action-maps-add">Map</button></li></ul></div><div class="mediumInsert-placeholder"></div></div>');

  $el.mediumInsert('disable');

  equal($.fn.mediumInsert.settings.enabled, false, 'plugin deactivated');
  ok($('.mediumInsert-buttons', $el).hasClass('hide'), 'hide insert buttons');
});


// enable

test('enable param calls enable function', function () {
  var $el = $('<div></div>'),
      stub = this.stub($.fn.mediumInsert.insert, 'enable');

  $el.mediumInsert('enable');

  ok(stub.called, 'enable() called');
});

test('enable activates the plugin', function () {
  var $el = $('#qunit-fixture').html('<p></p><div class="mediumInsert" contenteditable="false" id="mediumInsert-0"><div class="mediumInsert-buttons hide"><div class="mediumInsert-buttonsIcon">→</div><a class="mediumInsert-buttonsShow">Insert</a><ul class="mediumInsert-buttonsOptions"><li><button data-addon="images" data-action="add" class="mediumInsert-action action-images-add">Image</button></li><li><button data-addon="maps" data-action="add" class="mediumInsert-action action-maps-add">Map</button></li></ul></div><div class="mediumInsert-placeholder"></div></div>');

  $.fn.mediumInsert.settings.enabled = false;

  $el.mediumInsert('enable');

  equal($.fn.mediumInsert.settings.enabled, true, 'plugin activated');
  equal($('.mediumInsert-buttons', $el).hasClass('hide'), false, 'show insert buttons');
});


// setPlaceholders

test('setPlaceholders creates placeholders', function () {
  var $el = $('#qunit-fixture').html('<p></p><p></p>');

  $.fn.mediumInsert.insert.setPlaceholders();

  equal($('.mediumInsert', $el).length, 2, 'two placeholders created');
});

test('setPlaceholders returns false if no addon is selected', function () {
  $('div').mediumInsert({
    addons: []
  });

  equal($.fn.mediumInsert.insert.setPlaceholders(), false, 'setPlaceholders() returned false');
});

test('setPlaceholders adds empty paragraph at the end if the last placeholder is not empty', function () {
  var $el = $('#qunit-fixture').html('<p></p>'+
    '<div class="mediumInsert" contenteditable="false" id="mediumInsert-0">'+
      '<div class="mediumInsert-buttons hide">'+
        '<div class="mediumInsert-buttonsIcon">→</div>'+
        '<a class="mediumInsert-buttonsShow">Insert</a>'+
        '<ul class="mediumInsert-buttonsOptions">'+
          '<li><button data-addon="images" data-action="add" class="mediumInsert-action action-images-add">Image</button></li>'+
          '<li><button data-addon="maps" data-action="add" class="mediumInsert-action action-maps-add">Map</button></li>'+
        '</ul>'+
      '</div>'+
      '<div class="mediumInsert-placeholder"><img></div>'+
    '</div>');

  $.fn.mediumInsert.insert.setPlaceholders();
  equal($('#qunit-fixture p').length, 2, 'another paragraph created');
  equal($('#qunit-fixture p:last').html(), '<br>', 'created paragraph contains <br>');
  equal($('#qunit-fixture .mediumInsert').length, 2, 'another .mediumInsert created');
});


// setEvents

asyncTest('setEvents creates click event on buttonShow', function () {
  var $el = $('#qunit-fixture').html('<p></p><div class="mediumInsert" contenteditable="false" id="mediumInsert-0"><div class="mediumInsert-buttons"><div class="mediumInsert-buttonsIcon">→</div><a class="mediumInsert-buttonsShow">Insert</a><ul class="mediumInsert-buttonsOptions"><li><button data-addon="images" data-action="add" class="mediumInsert-action action-images-add">Image</button></li><li><button data-addon="maps" data-action="add" class="mediumInsert-action action-maps-add">Map</button></li></ul></div><div class="mediumInsert-placeholder"></div></div>');

  $.fn.mediumInsert.insert.setEvents();

  $('.mediumInsert-buttonsShow', $el).click(function () {
    ok($('.mediumInsert-buttonsOptions', $el).is(':visible'), 'clicking on buttonsShow, shows buttons');
    start();
  }).click();
});

asyncTest('setEvents creates click event on options', function () {
  var $el = $('#qunit-fixture').html('<p></p><div class="mediumInsert" contenteditable="false" id="mediumInsert-0"><div class="mediumInsert-buttons"><div class="mediumInsert-buttonsIcon">→</div><a class="mediumInsert-buttonsShow">Insert</a><ul class="mediumInsert-buttonsOptions"><li><button data-addon="images" data-action="add" class="mediumInsert-action action-images-add">Image</button></li><li><button data-addon="maps" data-action="add" class="mediumInsert-action action-maps-add">Map</button></li></ul></div><div class="mediumInsert-placeholder"></div></div>'),
      stub;

  stub = this.stub($.fn.mediumInsert.getAddon('images'), 'add', function ($placeholder) {
    ok(stub.called, 'click on images-add calls images.add method');
    $.fn.mediumInsert.getAddon('images').add.restore();
    start();
  });

  $.fn.mediumInsert.insert.setEvents();

  $('.mediumInsert-buttonsOptions .action-images-add', $el).click();
});
