/**
 * Images
 */

module("embeds", {
  setup : function () {
    $.fn.mediumInsert.settings.editor = new MediumEditor('.editable');
    $.fn.mediumInsert.settings.addons = {
      images : {
        imagesUploadScript : 'examples/upload.php'
      }
    };
    $.fn.mediumInsert.settings.enabled = true;
    this.addon = $.fn.mediumInsert.getAddon('embeds');
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
  equal(this.addon.insertButton('fontawesome').match(/fa\-code/).length, 1, 'expected button returned');
});


// add

test('add() appends input to buttons', function () {
  $('#qunit-fixture').html('<div class="mediumInsert" contenteditable="false" id="mediumInsert-6">'+
    '<div class="mediumInsert-buttons"></div>'+
    '<div class="mediumInsert-placeholder"></div>'+
  '</div>');

  this.addon.add($('.mediumInsert-placeholder'));

  equal($('.mediumInsert-buttons input.mediumInsert-embedsText').length, 1, 'input for embedding inserted');
});

test('add() uses placeholder translation', function () {
  $('#qunit-fixture').html('<div class="mediumInsert" contenteditable="false" id="mediumInsert-6">'+
    '<div class="mediumInsert-buttons"></div>'+
    '<div class="mediumInsert-placeholder"></div>'+
  '</div>');

  this.addon.options.urlPlaceholder = 'Example enter URL';
  this.addon.add($('.mediumInsert-placeholder'));

  equal($('.mediumInsert-embedsWire input').attr('placeholder'), 'Example enter URL', 'placeholder was replaced');
});


// setEmbedButtonEvents

asyncTest('setEmbedButtonEvents() calls on enter setEnterActionEvents()', function () {
  var e = $.Event("keypress"),
      that = this;

  e.keyCode = 13;

  $('#qunit-fixture').html('<input class="mediumInsert-embedsText">');

  this.stub(this.addon, 'setEnterActionEvents', function () {
    ok(1, 'setEnterActionEvents() called');
    that.addon.setEnterActionEvents.restore();
    start();
  });

  this.addon.setEmbedButtonEvents();
  $('.mediumInsert-embedsText').trigger(e);
});


// setEnterActionEvents

test('setEnterActionEvents() returns false if editor is disabled', function () {
  $.fn.mediumInsert.settings.enabled = false;

  equal(this.addon.setEnterActionEvents(), false, 'false returned');
});


test('setEnterActionEvents() returns false if editor is disabled', function () {
  $('#qunit-fixture').html('<input class="mediumInsert-embedsText">');

  equal(this.addon.setEnterActionEvents(), false, 'false returned');
});

test('setEnterActionEvents() returns false when wrong format of url is entered', function () {
  var that = this;

  $('#qunit-fixture').html('<input class="mediumInsert-embedsText" value="test">');

  this.stub(this.addon, 'convertUrlToEmbedTag', function () {
    that.addon.convertUrlToEmbedTag.restore();
    return false;
  });

  this.stub(window, 'alert', function () {
    window.alert.restore();
  });

  equal(this.addon.setEnterActionEvents(), false, 'false returned');
});

test('setEnterActionEvents() appends embedded data', function () {
  var that = this;

  $('#qunit-fixture').html('<div class="mediumInsert" contenteditable="false" id="mediumInsert-6">'+
    '<div class="mediumInsert-buttons"><input class="mediumInsert-embedsText" value="test"></div>'+
    '<div class="mediumInsert-placeholder"></div>'+
  '</div>');

  this.stub(this.addon, 'convertUrlToEmbedTag', function () {
    that.addon.convertUrlToEmbedTag.restore();
    return '<div id="insertedTag"></div>';
  });

  this.addon.currentPlaceholder = $('.mediumInsert-placeholder');
  this.addon.setEnterActionEvents();

  equal($('.mediumInsert .mediumInsert-embeds #insertedTag').length, 1, 'embedded data appended');
});

test('setEnterActionEvents() triggers input event', function () {
  var that = this;

  $('#qunit-fixture').html('<div class="mediumEditor" data-medium-element="true">'+
    '<div class="mediumInsert" contenteditable="false" id="mediumInsert-7">'+
      '<div class="mediumInsert-buttons"><input class="mediumInsert-embedsText" value="test"></div>'+
      '<div class="mediumInsert-placeholder"></div>'+
    '</div>'+
  '</div>');

  this.stub(this.addon, 'convertUrlToEmbedTag', function () {
    that.addon.convertUrlToEmbedTag.restore();
    return '<div id="insertedTag"></div>';
  });
  this.addon.currentPlaceholder = $('.mediumInsert-placeholder');

  var stub1 = this.stub();
  var stub2 = this.stub();
  $('.mediumEditor').on('input', stub1).on('keyup', stub2);

  this.addon.setEnterActionEvents();

  ok(stub1.called, 'input was triggered');
  ok(stub2.called, 'keyup was triggered');
});


// removeToolbar

test('removeToolbar() removes input for entering url', function () {
  $('#qunit-fixture').html('<div class="mediumInsert-embedsWire"></div>');

  this.addon.removeToolbar();

  equal($('.mediumInsert-embedsWire').length, 0, '.mediumInsert-embedsWire removed');
});



// convertUrlToEmbedTag

test('convertUrlToEmbedTag() returns false for nosupported url', function () {
  equal(this.addon.convertUrlToEmbedTag('http://www.google.com'), false, 'false returned');
});

test('convertUrlToEmbedTag() returns html for twitter', function () {
  var result = this.addon.convertUrlToEmbedTag('https://twitter.com/phpstorm/status/467987788659720192');

  equal(result.match(/twitter\-tweet/).length, 1, 'expected html returned');
});

test('convertUrlToEmbedTag() returns html for facebook', function () {
  var result = this.addon.convertUrlToEmbedTag('https://www.facebook.com/kensuu/posts/10152132714538568');

  equal(result.match(/fb\-root/).length, 1, 'expected html returned');
});

test('convertUrlToEmbedTag() returns html for instagram', function () {
  var result = this.addon.convertUrlToEmbedTag('http://instagram.com/p/ivS5DStzJd/');

  equal(result.match(/instagram/).length, 1, 'expected html returned');
});

test('convertUrlToEmbedTag() returns html for vimeo', function () {
  var result = this.addon.convertUrlToEmbedTag('http://vimeo.com/94923911');

  equal(result.match(/vimeo/).length, 1, 'expected html returned');
});

test('convertUrlToEmbedTag() returns html for youtube', function () {
  var result = this.addon.convertUrlToEmbedTag('https://www.youtube.com/watch?v=rlNmYgNdOkM');
  equal(result.match(/youtube/).length, 1, 'expected html returned');

  result = this.addon.convertUrlToEmbedTag('https://www.youtube.com/watch?v=_mkiGMtbrPM');
  equal(result.match(/youtube/).length, 1, 'expected html returned');
});
