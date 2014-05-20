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
    $.fn.mediumInsert.getAddon('embeds').$el = $('#qunit-fixture');
    $.fn.mediumInsert.insert.$el = $('#qunit-fixture');
  }
});

// init

test('init() sets addon\'s $el', function () {
  var embeds = $.fn.mediumInsert.getAddon('embeds');
  embeds.$el = null;
  embeds.init();

  deepEqual(embeds.$el, $.fn.mediumInsert.insert.$el, 'addon\'s $el is set');
});


asyncTest('embed some SNS service url', function () {
  var $el = $('#qunit-fixture').html('<div class="medium-editor-toolbar-form-anchor mediumInsert-embedsWire" style="display: block;"><input type="text" value="" placeholder="type or paste url here" class="mediumInsert-embedsText"></div>');

  $.fn.mediumInsert.getAddon('embeds');

  $(document).one('keypress', '.mediumInsert-embedsText', function () {
    equal($('.mediumInsert-embedsWire', $el).length, 0, 'embed wire removed');
    start();
  });

  var e = $.Event("keypress");
  e.keyCode = 13;
  $('.mediumInsert-embedsText', $el).val('https://twitter.com/phpstorm/statuses/467987788659720192').trigger(e);
  $('.mediumInsert-embedsText', $el).val('https://www.facebook.com/kensuu/posts/10152132714538568').trigger(e);
  $('.mediumInsert-embedsText', $el).val('http://instagram.com/p/ivS5DStzJd/').trigger(e);
  $('.mediumInsert-embedsText', $el).val('http://vimeo.com/94923911').trigger(e);
  $('.mediumInsert-embedsText', $el).val('https://www.youtube.com/watch?v=rlNmYgNdOkM').trigger(e);
});

