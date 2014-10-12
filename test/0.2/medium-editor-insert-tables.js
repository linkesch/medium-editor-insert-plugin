/**
 * Tables
 */

module("tables", {
  setup : function () {
    $.fn.mediumInsert.settings.editor = new MediumEditor('.editable');
    $.fn.mediumInsert.settings.addons = {
      images : {
        imagesUploadScript : 'examples/upload.php'
      }
    };
    $.fn.mediumInsert.settings.enabled = true;
    this.addon = $.fn.mediumInsert.getAddon('tables');
    this.addon.$el = $('#qunit-fixture');
    $.fn.mediumInsert.insert.$el = $('#qunit-fixture');
  }
});

// init

test('init() sets addon\'s $el', function () {
  this.addon.$el = null;
  this.addon.init();

  deepEqual(this.addon.$el, $.fn.mediumInsert.insert.$el, 'addon\'s $el is set');
});


// insertButton

test('insertButton() returns html', function () {
  equal(this.addon.insertButton().match(/button/).length, 1, 'expected button returned');
});

test('insertButton() returns html with fontawesome', function () {
  equal(this.addon.insertButton('fontawesome').match(/fa\-table/).length, 1, 'expected button returned');
});

test('insertButton() returns html with override icon', function () {
  equal(this.addon.insertButton({'table' : 'TEST-ICON'}).match(/TEST-ICON/).length, 1, 'expected overriden button returned');
});


// add

test('add() appends input to buttons', function () {
  $('#qunit-fixture').html('<div class="mediumInsert" contenteditable="false" id="mediumInsert-6">'+
    '<div class="mediumInsert-buttons"></div>'+
    '<div class="mediumInsert-placeholder"></div>'+
  '</div>');

  this.addon.add($('.mediumInsert-placeholder'));

  equal($('.mediumInsert-tableDemoBox').length, 1, 'input for table dimensions inserted');
});

test('add() uses default dimensions', function () {
  $('#qunit-fixture').html('<div class="mediumInsert" contenteditable="false" id="mediumInsert-6">'+
    '<div class="mediumInsert-buttons"></div>'+
    '<div class="mediumInsert-placeholder"></div>'+
  '</div>');

  this.addon.options.defaultRows = 3;
  this.addon.options.defaultCols = 4;
  this.addon.add($('.mediumInsert-placeholder'));

  equal($('input.mediumInsert-tableRows').val(), '3');
  equal($('input.mediumInsert-tableCols').val(), '4');
});


// setEmbedButtonEvents

test('demoTable updates', function () {
  $('#qunit-fixture').html('<div class="mediumInsert" contenteditable="false" id="mediumInsert-6">'+
    '<div class="mediumInsert-buttons"></div>'+
    '<div class="mediumInsert-placeholder"></div>'+
  '</div>');

  this.addon.add($('.mediumInsert-placeholder'));

  $('input.mediumInsert-tableRows').val(3);
  $('input.mediumInsert-tableCols').val(5);
  $('input.mediumInsert-tableCols').trigger('keyup');

  equal($('table.mediumInsert-demoTable').find('tr').length, 3);
  equal($('table.mediumInsert-demoTable').find('td').length, 15);
});


// setEnterActionEvents

test('setEnterActionEvents() returns false if editor is disabled', function () {
  $.fn.mediumInsert.settings.enabled = false;

  equal(this.addon.setEnterActionEvents(), false, 'false returned');
});

test('setEnterActionEvents() appends table', function () {
  this.addon.init();
  $('#qunit-fixture').html('<div class="mediumInsert" contenteditable="false" id="mediumInsert-6">'+
    '<div class="mediumInsert-buttons"></div>'+
    '<div class="mediumInsert-placeholder"></div>'+
  '</div>');

  this.addon.add($('.mediumInsert-placeholder'));

  $('button.mediumInsert-tableReadyButton').trigger('click');

  ok($('table.mediumInsert-table').length > 0);
});

// removeToolbar

test('removeToolbar() removes input for entering url', function () {
  $('#qunit-fixture').html('<div class="mediumInsert-tableDemoBox"></div>');

  this.addon.removeToolbar();

  equal($('.mediumInsert-tableDemoBox').length, 0, '.mediumInsert-tableDemoBox removed');
});
