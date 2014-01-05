/**
* Images
*/

module("images", {
  setup: function() {
    $.fn.mediumInsert.settings.editor = new MediumEditor('.editable');
    $.fn.mediumInsert.settings.imagesUploadScript = 'examples/upload.php';
    $.fn.mediumInsert.images.$el = $('#qunit-fixture');
  }
});


// init

test('init calls setImageEvents()', function() {
  var stub1 = this.stub($.fn.mediumInsert.images, 'setImageEvents');

  $.fn.mediumInsert.images.init();

  ok(stub1.called, 'setImageEvents() called');
});

test('init calls setDragAndDropEvents()', function() {
  var stub1 = this.stub($.fn.mediumInsert.images, 'setDragAndDropEvents');

  $.fn.mediumInsert.images.init();

  ok(stub1.called, 'setDragAndDropEvents() called');
});

test('init calls preparePreviousImages()', function() {
  var stub1 = this.stub($.fn.mediumInsert.images, 'preparePreviousImages');

  $.fn.mediumInsert.images.init();

  ok(stub1.called, 'preparePreviousImages() called');
});

test('existing images have an edit menu after init', function() {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert-images"><img src="test/fixtures/image.png"></img></div>');

  $.fn.mediumInsert.images.init();

  $(document).one('mouseenter', '.mediumInsert-images', function() {
    ok($('.mediumInsert-imageRemove', $el).length > 0, 'remove icon showed on mouseenter');
    ok($('.mediumInsert-imageResizeSmaller', $el).length > 0, 'resize smaller icon showed on mouseenter');
  });

  $('.mediumInsert-images', $el).mouseenter();
});

// add

asyncTest('add inits file upload', function () {
  var selectFile,
      $el = $('#qunit-fixture').html('<div class="mediumInsert-placeholder"></div>');

  this.stub($.fn.mediumInsert.images, 'uploadFiles', function () {
    ok(1, 'uploadFiles called');
    $.fn.mediumInsert.images.uploadFiles.restore();
    start();
  });

  selectFile = $.fn.mediumInsert.images.add($('.mediumInsert-placeholder', $el));

  selectFile.change();
});


// uploadFiles

test('uploadFiles creates progress bar', function () {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert-placeholder"></div>');

  $.fn.mediumInsert.images.uploadFiles($('.mediumInsert-placeholder', $el), [{ type: 'image/png' }]);

  equal($('progress', $el).length, 1, 'progress bar created');
});

asyncTest('uploadFiles calls uploadCompleted', function () {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert-placeholder"></div>');

  this.stub($.fn.mediumInsert.images, 'uploadCompleted', function () {
    ok(1, 'uploadCompleted called');
    start();
  });

  $.fn.mediumInsert.images.uploadFiles($('.mediumInsert-placeholder', $el), [{ type: 'image/png' }]);
});

// setImageEvents

asyncTest('setImageEvents creates mouseenter event on image', function () {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert" id="mediumInsert-0" contenteditable="false">'+
    '<div class="mediumInsert-placeholder">'+
      '<span class="mediumInsert-images"><img src="test/fixtures/image.png" draggable="true"></span>'+
    '</div>'+
  '</div>');

  $.fn.mediumInsert.images.setImageEvents();

  $(document).one('mouseenter', '.mediumInsert-images', function () {
    ok($('.mediumInsert-imageRemove', $el).length > 0, 'remove icon showed on mouseenter');
    ok($('.mediumInsert-imageResizeSmaller', $el).length > 0, 'resize smaller icon showed on mouseenter');
    start();
  });

  $('.mediumInsert-images', $el).mouseenter();
});

asyncTest('setImageEvents creates mouseleave event on image', function () {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert" id="mediumInsert-0" contenteditable="false">'+
    '<div class="mediumInsert-placeholder">'+
      '<span class="mediumInsert-images">'+
        '<img src="test/fixtures/image.png" draggable="true">'+
        '<a class="mediumInsert-imageRemove"></a>'+
        '<a class="mediumInsert-imageResizeSmaller"></a>'+
      '</span>'+
    '</div>'+
  '</div>');

  $.fn.mediumInsert.images.setImageEvents();

  $(document).one('mouseleave', '.mediumInsert-images', function () {
    equal($('.mediumInsert-imageRemove', $el).length, 0, 'remove icon remoaved on mouseleave');
    equal($('.mediumInsert-imageResizeSmaller', $el).length, 0, 'resize smaller icon removed on mouseleave');
    start();
  });

  $('.mediumInsert-images', $el).mouseleave();
});

asyncTest('setImageEvents creates click event on imageResizeSmaller', function () {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert" id="mediumInsert-0" contenteditable="false">'+
    '<div class="mediumInsert-placeholder">'+
      '<span class="mediumInsert-images">'+
        '<img src="test/fixtures/image.png" draggable="true">'+
        '<a class="mediumInsert-imageRemove"></a>'+
        '<a class="mediumInsert-imageResizeSmaller"></a>'+
      '</span>'+
    '</div>'+
  '</div>');

  $.fn.mediumInsert.images.setImageEvents();

  $(document).one('click', '.mediumInsert-imageResizeSmaller', function () {
    equal($('.mediumInsert', $el).hasClass('small'), true, 'image resized to smaller size');
    start();
  });

  $('.mediumInsert-imageResizeSmaller', $el).click();
});

asyncTest('setImageEvents creates click event on imageResizeBigger', function () {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert small" id="mediumInsert-0" contenteditable="false">'+
    '<div class="mediumInsert-placeholder">'+
      '<span class="mediumInsert-images">'+
        '<img src="test/fixtures/image.png" draggable="true">'+
        '<a class="mediumInsert-imageRemove"></a>'+
        '<a class="mediumInsert-imageResizeBigger"></a>'+
      '</span>'+
    '</div>'+
  '</div>');

  $.fn.mediumInsert.images.setImageEvents();

  $(document).one('click', '.mediumInsert-imageResizeBigger', function () {
    equal($('.mediumInsert', $el).hasClass('small'), false, 'image resized to bigger size');
    start();
  });

  $('.mediumInsert-imageResizeBigger', $el).click();
});

asyncTest('setImageEvents creates click event on imageRemove', function () {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert small" id="mediumInsert-0" contenteditable="false">'+
    '<div class="mediumInsert-placeholder">'+
      '<span class="mediumInsert-images">'+
        '<img src="test/fixtures/image.png" draggable="true">'+
        '<a class="mediumInsert-imageRemove"></a>'+
        '<a class="mediumInsert-imageResizeBigger"></a>'+
      '</span>'+
    '</div>'+
  '</div>');

  $.fn.mediumInsert.images.setImageEvents();

  $(document).one('click', '.mediumInsert-imageRemove', function () {
    equal($('.mediumInsert-image', $el).length, 0, 'image removed');
    equal($('.mediumInsert', $el).hasClass('small'), false, 'small class removed');
    start();
  });

  $('.mediumInsert-imageRemove', $el).click();
});


// setDragAndDropEvents

asyncTest('setDragAndDropEvents set dragover event to body', function () {
  $.fn.mediumInsert.images.setDragAndDropEvents();

  $(document).one('dragover', 'body', function () {
    ok($('body').hasClass('hover'), '.hover added to body');
    start();
  });

  $('body').trigger('dragover');
});

asyncTest('setDragAndDropEvents set dragend event to body', function () {
  $.fn.mediumInsert.images.setDragAndDropEvents();

  $('body').addClass('hover');

  $(document).one('dragend', 'body', function () {
    equal($('body').hasClass('hover'), false, '.hover removed from body');
    start();
  });

  $('body').trigger('dragend');
});

asyncTest('setDragAndDropEvents set dragover event to .mediumInsert', function () {
  $('#qunit-fixture').html('<div class="mediumInsert" id="mediumInsert-0" contenteditable="false"></div>');

  $.fn.mediumInsert.images.setDragAndDropEvents();

  $(document).one('dragover', '.mediumInsert', function () {
    ok($('.mediumInsert').hasClass('hover'), '.hover added to .mediumInsert');
    equal($('.mediumInsert').attr('contenteditable'), 'true', 'conteneditable set to true on .mediumInsert');
    start();
  });

  $('.mediumInsert').trigger('dragover');
});

asyncTest('setDragAndDropEvents set dragleave event to .mediumInsert', function () {
  $('#qunit-fixture').html('<div class="mediumInsert hover" id="mediumInsert-0" contenteditable="true"></div>');

  $.fn.mediumInsert.images.setDragAndDropEvents();

  $(document).one('dragleave', '.mediumInsert', function () {
    equal($('.mediumInsert').hasClass('hover'), false, '.hover removed from .mediumInsert');
    equal($('.mediumInsert').attr('contenteditable'), 'false', 'conteneditable set to false on .mediumInsert');
    start();
  });

  $('.mediumInsert').trigger('dragleave');
});

asyncTest('setDragAndDropEvents set drop event to .mediumInsert', function () {
  var $event;

  $('#qunit-fixture').html('<div class="mediumInsert hover" id="mediumInsert-0" contenteditable="true"></div>');

  this.stub($.fn.mediumInsert.images, 'uploadFiles', function () {
    ok(1, 'uploadFiles called');
    $.fn.mediumInsert.images.uploadFiles.restore();
    start();
  });

  $.fn.mediumInsert.images.setDragAndDropEvents();

  $event = $.Event("drop");
  $event.originalEvent = { dataTransfer: { files: ['test'] }};
  $('.mediumInsert').trigger($event);
});

