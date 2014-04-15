/**
* Videos
*/

module("videos", {
  setup: function() {
    $.fn.mediumInsert.settings.editor = new MediumEditor('.editable');
    $.fn.mediumInsert.settings.addons = {
      videos: {}
    };
    $.fn.mediumInsert.settings.enabled = true;
    $.fn.mediumInsert.getAddon('videos').$el = $('#qunit-fixture');
    $.fn.mediumInsert.insert.$el = $('#qunit-fixture');
  }
});


// init

test('init calls setVideoEvents()', function() {
  var stub1 = this.stub($.fn.mediumInsert.getAddon('videos'), 'setVideoEvents');

  $.fn.mediumInsert.getAddon('videos').init();

  ok(stub1.called, 'setVideoEvents() called');
});


test('init calls preparePreviousVideos()', function() {
  var stub1 = this.stub($.fn.mediumInsert.getAddon('videos'), 'preparePreviousVideos');

  $.fn.mediumInsert.getAddon('videos').init();

  ok(stub1.called, 'preparePreviousVideos() called');
});

test('existing images have an edit menu after init', function() {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert-video"><div>Stub for video</div></div>');

  $.fn.mediumInsert.getAddon('videos').init();

  $(document).one('mouseenter', '.mediumInsert-video', function() {
    ok($('.mediumInsert-videoRemove', $el).length > 0, 'remove icon showed on mouseenter');
  });

  $('.mediumInsert-video', $el).mouseenter();
});

asyncTest('blur of video input hides it', function() {
  var $el = $('#qunit-fixture').html('<div>'+
    '<div class="medium-editor-toolbar-form-anchor js-medium-insert-video" id="medium-editor-toolbar-form-video" style="display: block;">'+
      '<form class="mediumInsert-video-form">'+
        '<input type="text" value="" placeholder="Paste or type a link to video"> <a href="#">×</a>'+
        '</form>'+
      '</div>'+
    '</div>'+
  '<div class="mediumInsert-placeholder"></div>');

  $.fn.mediumInsert.getAddon('videos').init();

  $(document).one('blur', '.mediumInsert-video-form input', function() {
    ok($(".js-medium-insert-video").length === 0, 'video form removed');
    start();
  });

  $('.mediumInsert-video-form input', $el).blur();
});

asyncTest('form submitting with empty should alert message', function() {
  var $el = $('#qunit-fixture').html('<div>'+
    '<div class="medium-editor-toolbar-form-anchor js-medium-insert-video" id="medium-editor-toolbar-form-video" style="display: block;">'+
      '<form class="mediumInsert-video-form">'+
        '<input type="text" value="" placeholder="Paste or type a link to video"> <a href="#">×</a>'+
        '</form>'+
      '</div>'+
    '</div>'+
  '<div class="mediumInsert-placeholder"></div>');

  var stub = this.stub(window, "alert");

  $el.on('submit', '.mediumInsert-video-form', function() {
    ok(stub.called, 'alert shown');
    start();
  });

  $.fn.mediumInsert.getAddon('videos').init();

  $('.mediumInsert-video-form', $el).submit();
});


asyncTest('form submitting with correct youtube url should create object', function() {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert-buttons">'+
    '<div class="medium-editor-toolbar-form-anchor js-medium-insert-video" id="medium-editor-toolbar-form-video" style="display: block;">'+
      '<form class="mediumInsert-video-form">'+
        '<input type="text" value="" placeholder="Paste or type a link to video"> <a href="#">×</a>'+
      '</form>'+
    '</div>'+
  '</div>'+
  '<div class="mediumInsert-placeholder"></div>');

  $el.on('submit', '.mediumInsert-video-form', function() {
    equal($('object', $el).length, 1, 'object was created');
  });

  $.fn.mediumInsert.getAddon('videos').setVideoEvents();

  $('.mediumInsert-video-form', $el).find('input').val('http://www.youtube.com/watch?v=eKAIf_qZgls').end().submit();
});

asyncTest('setVideoEvents creates mouseleave event on video', function () {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert" id="mediumInsert-0" contenteditable="false">'+
    '<div class="mediumInsert-placeholder">'+
      '<span class="mediumInsert-video">'+
        '<div>stub for video</div>'+
        '<a class="mediumInsert-videoRemove"></a>'+
      '</span>'+
    '</div>'+
  '</div>');

  $.fn.mediumInsert.getAddon('videos').setVideoEvents();

  $(document).one('mouseleave', '.mediumInsert-video', function () {
    equal($('.mediumInsert-imageRemove', $el).length, 0, 'remove icon removed on mouseleave');
    start();
  });

  $('.mediumInsert-video', $el).mouseleave();
});

asyncTest('setVideoEvents creates click event on videoRemove', function () {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert small" id="mediumInsert-0" contenteditable="false">'+
    '<div class="mediumInsert-placeholder">'+
      '<span class="mediumInsert-video">'+
        '<div>stub for video</div>'+
        '<a class="mediumInsert-videoRemove"></a>'+
      '</span>'+
    '</div>'+
  '</div>');

  $.fn.mediumInsert.getAddon('videos').setVideoEvents();

  $(document).one('click', '.mediumInsert-videoRemove', function () {
    equal($('.mediumInsert-video', $el).length, 0, 'video removed');
    start();
  });

  $('.mediumInsert-videoRemove', $el).click();
});