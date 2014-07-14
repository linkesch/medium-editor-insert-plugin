/**
* Images
*/

module("images", {
  setup: function() {
    $.fn.mediumInsert.settings.editor = new MediumEditor('.editable');
    $.fn.mediumInsert.settings.addons = {
      images: {
        imagesUploadScript: 'examples/upload.php',
        $el: $('#qunit-fixture')
      }
    };
    $.fn.mediumInsert.settings.enabled = true;
    $.fn.mediumInsert.getAddon('images').$el = $('#qunit-fixture');
    $.fn.mediumInsert.getAddon('images').options = $.fn.mediumInsert.getAddon('images').default;
    $.fn.mediumInsert.insert.$el = $('#qunit-fixture');
  }
});


// init

test('init calls setImageEvents()', function() {
  var stub1 = this.stub($.fn.mediumInsert.getAddon('images'), 'setImageEvents');

  $.fn.mediumInsert.getAddon('images').init();

  ok(stub1.called, 'setImageEvents() called');
});

test('init calls setDragAndDropEvents()', function() {
  var stub1 = this.stub($.fn.mediumInsert.getAddon('images'), 'setDragAndDropEvents');

  $.fn.mediumInsert.getAddon('images').init();

  ok(stub1.called, 'setDragAndDropEvents() called');
});

test('init calls preparePreviousImages()', function() {
  var stub1 = this.stub($.fn.mediumInsert.getAddon('images'), 'preparePreviousImages');

  $.fn.mediumInsert.getAddon('images').init();

  ok(stub1.called, 'preparePreviousImages() called');
});

test('init does not calls setDragAndDropEvents() when it is deactive', function() {
  $.fn.mediumInsert.getAddon('images').options.useDragAndDrop = false;
  var stub1 = this.stub($.fn.mediumInsert.getAddon('images'), 'setDragAndDropEvents');

  $.fn.mediumInsert.getAddon('images').init();

  ok(!stub1.called, 'setDragAndDropEvents() called');
});

test('existing images have an edit menu after init', function() {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert-images"><img src="test/fixtures/image.png"></img></div>');

  $.fn.mediumInsert.getAddon('images').init();

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

  this.stub($.fn.mediumInsert.getAddon('images'), 'uploadFiles', function () {
    ok(1, 'uploadFiles called');
    $.fn.mediumInsert.getAddon('images').uploadFiles.restore();
    start();
  });

  selectFile = $.fn.mediumInsert.getAddon('images').add($('.mediumInsert-placeholder', $el));

  selectFile.change();
});


// uploadCompleted

test('uploadCompleted adds image to placeholder', function () {
  var $placeholder;

  $('#qunit-fixture').html('<div class="mediumInsert-placeholder"><progress class="progress"></progress></div>');
  $placeholder = $('#qunit-fixture .mediumInsert-placeholder');

  $.fn.mediumInsert.getAddon('images').uploadCompleted({ responseText: 'img.png' }, $placeholder);

  equal($('figure img', $placeholder).attr('src'), 'img.png', 'image added to placeholder');
  equal($('progress', $placeholder).length, 0, 'progressbar removed');
});

test('uploadCompleted shows error message if there was a problem uploading a file', function () {
  var $placeholder;

  $('#qunit-fixture').html('<div class="mediumInsert-placeholder"><progress class="progress"></progress></div>');
  $placeholder = $('#qunit-fixture .mediumInsert-placeholder');

  $.fn.mediumInsert.getAddon('images').uploadCompleted({ responseText: '' }, $placeholder);

  equal($('.mediumInsert-error', $placeholder).length, 1, 'error message added to placeholder');
  equal($('figure', $placeholder).length, 0, 'no image added to placeholder');
  equal($('progress', $placeholder).length, 0, 'progressbar removed');
});

test('uploadCompleted triggers input event', function () {
  var $placeholder;

  $('#qunit-fixture').html('<div class="mediumEditor" data-medium-element="true"><div class="mediumInsert-placeholder"></div></div>');
  $placeholder = $('#qunit-fixture .mediumInsert-placeholder');

  var stub1 = this.stub();
  var stub2 = this.stub();
  $('.mediumEditor').on('input', stub1).on('keyup', stub2);

  $.fn.mediumInsert.getAddon('images').uploadCompleted({ responseText: 'img.png' }, $placeholder);

  ok(stub1.called, 'input was triggered');
  ok(stub2.called, 'keyup was triggered');
});


// uploadFiles

test('uploadFiles creates progress bar', function () {
  var that = $.fn.mediumInsert.getAddon('images'),
      $el = $('#qunit-fixture').html('<div class="mediumInsert-placeholder"></div>');

  that.uploadFiles($('.mediumInsert-placeholder', $el), [{ type: 'image/png' }], that);

  equal($('progress', $el).length, 1, 'progress bar created');
});

asyncTest('uploadFiles calls uploadFile', function () {
  var that = $.fn.mediumInsert.getAddon('images'),
      $el = $('#qunit-fixture').html('<div class="mediumInsert-placeholder"></div>');

  this.stub(that, 'uploadFile', function () {
    ok(1, 'uploadFile called');
    that.uploadFile.restore();
    start();
  });

  that.uploadFiles($('.mediumInsert-placeholder', $el), [{ type: 'image/png' }], that);
});


// uploadFile

asyncTest('options.uploadFile make ajax call', function () {
  var that = $.fn.mediumInsert.getAddon('images');

  this.stub(jQuery, 'ajax', function () {
    ok(1, 'ajax call made');
    jQuery.ajax.restore();
    start();
  });

  that.options.uploadFile($('#qunit-fixture'), 'img.png', that);
});

asyncTest('uploadFile calls options.uploadFile', function () {
  var that = $.fn.mediumInsert.getAddon('images');

  this.stub(that.options, 'uploadFile', function () {
    ok(1, 'options.uploadFile call made');
    that.options.uploadFile.restore();
    start();
  });

  that.uploadFile($('#qunit-fixture'), 'img.png', that);
});

// deleteFile

asyncTest('options.deleteFile make ajax call', function () {
  var that = $.fn.mediumInsert.getAddon('images');

  this.stub(jQuery, 'ajax', function () {
    ok(1, 'ajax call made');
    jQuery.ajax.restore();
    start();
  });

  that.options.deleteFile('img.png', that);
});

asyncTest('deleteFile calls options.deleteFile', function () {
  var that = $.fn.mediumInsert.getAddon('images');

  this.stub(that.options, 'deleteFile', function () {
    ok(1, 'options.deleteFile call made');
    that.options.deleteFile.restore();
    start();
  });

  that.deleteFile('img.png', that);
});


// setImageEvents

asyncTest('setImageEvents creates mouseenter event on image', function () {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert" id="mediumInsert-0" contenteditable="false">'+
    '<div class="mediumInsert-placeholder">'+
      '<span class="mediumInsert-images"><img src="test/fixtures/image.png" draggable="true"></span>'+
    '</div>'+
  '</div>');

  $.fn.mediumInsert.getAddon('images').setImageEvents();

  $(document).one('mouseenter', '.mediumInsert-images', function () {
    ok($('.mediumInsert-imageRemove', $el).length > 0, 'remove icon showed on mouseenter');
    ok($('.mediumInsert-imageResizeSmaller', $el).length > 0, 'resize smaller icon showed on mouseenter');
  });

  $('.mediumInsert-images', $el).mouseenter();

  $el = $('#qunit-fixture').html('<div class="mediumInsert small" id="mediumInsert-0" contenteditable="false">'+
    '<div class="mediumInsert-placeholder">'+
      '<span class="mediumInsert-images"><img src="test/fixtures/image.png" draggable="true"></span>'+
    '</div>'+
  '</div>');

  $(document).one('mouseenter', '.mediumInsert-images', function () {
    ok($('.mediumInsert-imageRemove', $el).length > 0, 'remove icon showed on mouseenter');
    ok($('.mediumInsert-imageResizeBigger', $el).length > 0, 'resize bigger icon showed on mouseenter');
    start();
  });

  $('.mediumInsert-images', $el).mouseenter();
});

asyncTest('setImageEvents mouseenter event on image does nothing if the plugin is disabled', function () {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert" id="mediumInsert-0" contenteditable="false">'+
    '<div class="mediumInsert-placeholder">'+
      '<span class="mediumInsert-images"><img src="test/fixtures/image.png" draggable="true"></span>'+
    '</div>'+
  '</div>');

  $el.mediumInsert('disable');
  $.fn.mediumInsert.getAddon('images').setImageEvents();

  $(document).one('mouseenter', '.mediumInsert-images', function () {
    equal($('.mediumInsert-imageRemove', $el).length, 0, 'remove icon doesn\'t show on mouseenter');
    equal($('.mediumInsert-imageResizeSmaller', $el).length, 0, 'resize smaller icon doesn\'t showed on mouseenter');
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

  $.fn.mediumInsert.getAddon('images').setImageEvents();

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

  $.fn.mediumInsert.getAddon('images').setImageEvents();

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

  $.fn.mediumInsert.getAddon('images').setImageEvents();

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

  $.fn.mediumInsert.getAddon('images').setImageEvents();

  $(document).one('click', '.mediumInsert-imageRemove', function () {
    equal($('.mediumInsert-image', $el).length, 0, 'image removed');
    equal($('.mediumInsert', $el).hasClass('small'), false, 'small class removed');
    start();
  });

  $('.mediumInsert-imageRemove', $el).click();
});

asyncTest('setImageEvents creates click event on imageRemove which calls delete function', function () {
  var that = $.fn.mediumInsert.getAddon('images'),
      $el = $('#qunit-fixture').html('<div class="mediumInsert small" id="mediumInsert-0" contenteditable="false">'+
    '<div class="mediumInsert-placeholder">'+
      '<span class="mediumInsert-images">'+
        '<img src="test/fixtures/image.png" draggable="true">'+
        '<a class="mediumInsert-imageRemove"></a>'+
        '<a class="mediumInsert-imageResizeBigger"></a>'+
      '</span>'+
    '</div>'+
  '</div>');

  this.stub(that, 'deleteFile', function () {
    ok(1, 'deleteFile called');
    that.deleteFile.restore();
    start();
  });

  that.setImageEvents();

  $('.mediumInsert-imageRemove', $el).click();
});


// setDragAndDropEvents

asyncTest('setDragAndDropEvents set dragover event to body', function () {
  $.fn.mediumInsert.getAddon('images').setDragAndDropEvents();

  $(document).one('dragover', 'body', function () {
    ok($('body').hasClass('hover'), '.hover added to body');
    start();
  });

  $('body').trigger('dragover');
});

asyncTest('setDragAndDropEvents set dragend event to body', function () {
  $.fn.mediumInsert.getAddon('images').setDragAndDropEvents();

  $('body').addClass('hover');

  $(document).one('dragend', 'body', function () {
    equal($('body').hasClass('hover'), false, '.hover removed from body');
    start();
  });

  $('body').trigger('dragend');
});

asyncTest('setDragAndDropEvents set dragover event to .mediumInsert', function () {
  $('#qunit-fixture').html('<div class="mediumInsert" id="mediumInsert-0" contenteditable="false"></div>');

  $.fn.mediumInsert.getAddon('images').setDragAndDropEvents();

  $(document).one('dragover', '.mediumInsert', function () {
    ok($('.mediumInsert').hasClass('hover'), '.hover added to .mediumInsert');
    equal($('.mediumInsert').attr('contenteditable'), 'true', 'conteneditable set to true on .mediumInsert');
    start();
  });

  $('.mediumInsert').trigger('dragover');
});

asyncTest('setDragAndDropEvents set dragleave event to .mediumInsert', function () {
  $('#qunit-fixture').html('<div class="mediumInsert hover" id="mediumInsert-0" contenteditable="true"></div>');

  $.fn.mediumInsert.getAddon('images').setDragAndDropEvents();

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

  this.stub($.fn.mediumInsert.getAddon('images'), 'uploadFiles', function () {
    ok(1, 'uploadFiles called');
    $.fn.mediumInsert.getAddon('images').uploadFiles.restore();
    start();
  });

  $.fn.mediumInsert.getAddon('images').setDragAndDropEvents();

  $event = $.Event("drop");
  $event.originalEvent = { dataTransfer: { files: ['test'] }};
  $('.mediumInsert').trigger($event);
});
