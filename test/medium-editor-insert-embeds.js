/**
* Images
*/

module("embeds", {
  setup: function() {
    $.fn.mediumInsert.settings.editor = new MediumEditor('.editable');
    $.fn.mediumInsert.settings.addons = {
      images: {
        imagesUploadScript: 'examples/upload.php'
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



// add

test('add() adds embed block forms', function () {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert-placeholder"></div>'),
      $placeholder =  $('.mediumInsert-placeholder', $el);

  $.fn.mediumInsert.getAddon('embeds').add($placeholder);
  equal($placeholder.html(), '<div class="mediumInsert-embedsPlaceholder">' +
      '<div class="mediumInsert-embedsWire">' +
        '<div class="mediumInsert-embedsBox">' +
          '<input type="text" class="mediumInsert-embedsText" placeholder="type or paste url here">' +
          '<button class="mediumInsert-embedsButton">Embed</button>' +
        '</div>' +
      '</div>' +
    '</div>', 'Embed block added');
});


asyncTest('embed "Twitter" url', function () {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert" contenteditable="false">' +
    '<div class="mediumInsert-placeholder">' +
      '<div class="mediumInsert-embedsPlaceholder">' +
          '<div class="mediumInsert-embedsWire">' +
            '<div class="mediumInsert-embedsBox">' +
              '<input type="text" class="mediumInsert-embedsText" placeholder="type or paste url here">' +
              '<button class="mediumInsert-embedsButton">Embed</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
  );

  $.fn.mediumInsert.getAddon('embeds');

  equal($('.mediumInsert-embedsPlaceholder', $el).length, 1, 'embed placeholder removed');
  $(document).one('click', '.mediumInsert-embedsButton', function () {
    equal($('.mediumInsert-embedsPlaceholder', $el).length, 0, 'embed placeholder removed');
    ok($('.mediumInsert-placeholder', $el).length > 0, 'embed social service tags');
    start();
  });

  $('.mediumInsert-embedsText', $el).val('https://twitter.com/usako1225/status/300910402538192897/');
  $('.mediumInsert-embedsButton', $el).click();

  $('.mediumInsert-embedsText', $el).val('https://www.facebook.com/kensuu/posts/10152132714538568');
  $('.mediumInsert-embedsButton', $el).click();
});

asyncTest('embed "Facebook" url', function () {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert" contenteditable="false">' +
    '<div class="mediumInsert-placeholder">' +
      '<div class="mediumInsert-embedsPlaceholder">' +
          '<div class="mediumInsert-embedsWire">' +
            '<div class="mediumInsert-embedsBox">' +
              '<input type="text" class="mediumInsert-embedsText" placeholder="type or paste url here">' +
              '<button class="mediumInsert-embedsButton">Embed</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
  );

  $.fn.mediumInsert.getAddon('embeds');

  equal($('.mediumInsert-embedsPlaceholder', $el).length, 1, 'embed placeholder removed');
  $(document).one('click', '.mediumInsert-embedsButton', function () {
    equal($('.mediumInsert-embedsPlaceholder', $el).length, 0, 'embed placeholder removed');
    ok($('.mediumInsert-placeholder', $el).length > 0, 'embed social service tags');
    start();
  });

  $('.mediumInsert-embedsText', $el).val('https://www.facebook.com/kensuu/posts/10152132714538568');
  $('.mediumInsert-embedsButton', $el).click();
});

asyncTest('embed "Vimeo" url', function () {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert" contenteditable="false">' +
    '<div class="mediumInsert-placeholder">' +
      '<div class="mediumInsert-embedsPlaceholder">' +
          '<div class="mediumInsert-embedsWire">' +
            '<div class="mediumInsert-embedsBox">' +
              '<input type="text" class="mediumInsert-embedsText" placeholder="type or paste url here">' +
              '<button class="mediumInsert-embedsButton">Embed</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
  );

  $.fn.mediumInsert.getAddon('embeds');

  equal($('.mediumInsert-embedsPlaceholder', $el).length, 1, 'embed placeholder removed');
  $(document).one('click', '.mediumInsert-embedsButton', function () {
    equal($('.mediumInsert-embedsPlaceholder', $el).length, 0, 'embed placeholder removed');
    ok($('.mediumInsert-placeholder', $el).length > 0, 'embed social service tags');
    start();
  });

  $('.mediumInsert-embedsText', $el).val('http://vimeo.com/94923911');
  $('.mediumInsert-embedsButton', $el).click();
});

asyncTest('embed "Youtube" url', function () {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert" contenteditable="false">' +
    '<div class="mediumInsert-placeholder">' +
      '<div class="mediumInsert-embedsPlaceholder">' +
          '<div class="mediumInsert-embedsWire">' +
            '<div class="mediumInsert-embedsBox">' +
              '<input type="text" class="mediumInsert-embedsText" placeholder="type or paste url here">' +
              '<button class="mediumInsert-embedsButton">Embed</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
  );

  $.fn.mediumInsert.getAddon('embeds');

  equal($('.mediumInsert-embedsPlaceholder', $el).length, 1, 'embed placeholder removed');
  $(document).one('click', '.mediumInsert-embedsButton', function () {
    equal($('.mediumInsert-embedsPlaceholder', $el).length, 0, 'embed placeholder removed');
    ok($('.mediumInsert-placeholder', $el).length > 0, 'embed social service tags');
    start();
  });

  $('.mediumInsert-embedsText', $el).val('https://www.youtube.com/watch?v=rlNmYgNdOkM');
  $('.mediumInsert-embedsButton', $el).click();
});

asyncTest('embed "Instagram" url', function () {
  var $el = $('#qunit-fixture').html('<div class="mediumInsert" contenteditable="false">' +
    '<div class="mediumInsert-placeholder">' +
      '<div class="mediumInsert-embedsPlaceholder">' +
          '<div class="mediumInsert-embedsWire">' +
            '<div class="mediumInsert-embedsBox">' +
              '<input type="text" class="mediumInsert-embedsText" placeholder="type or paste url here">' +
              '<button class="mediumInsert-embedsButton">Embed</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
  );

  $.fn.mediumInsert.getAddon('embeds');

  equal($('.mediumInsert-embedsPlaceholder', $el).length, 1, 'embed placeholder removed');
  $(document).one('click', '.mediumInsert-embedsButton', function () {
    equal($('.mediumInsert-embedsPlaceholder', $el).length, 0, 'embed placeholder removed');
    ok($('.mediumInsert-placeholder', $el).length > 0, 'embed social service tags');
    start();
  });

  $('.mediumInsert-embedsText', $el).val('http://instagram.com/p/ivS5DStzJd/');
  $('.mediumInsert-embedsButton', $el).click();
});

