module('core', {
    setup: function () {
        $('#qunit-fixture').html('<div class="editable"></div>');
        this.$el = $('.editable');
    }
});

test('mediumInsert() inits the plugin', function () {
    this.$el.mediumInsert();

    ok(this.$el.hasClass('medium-editor-insert-plugin'), '.medium-editor-insert-plugin class added');
});

test('mediumInsert() does nothing if there is no addon selected', function () {
  this.$el.mediumInsert({
    addons: false
  });

  equal(this.$el.html(), '', 'editor is empty');
});

test('mediumInsert() adds empty paragraph if there is no content', function () {
  this.$el.mediumInsert();

  equal(this.$el.find('p').length, 1, 'paragraph created');
});

test('mediumInsert() wraps <br> into paragraph', function () {
  this.$el.html('<br>');

  this.$el.mediumInsert();

  equal(this.$el.find('p').length, 1, 'paragraph created');
  equal(this.$el.find('br').length, 1, 'only 1 br exists');
});

test('mediumInsert() wraps text content into paragraph', function () {
  this.$el.html('text');

  this.$el.mediumInsert();

  equal(this.$el.find('p').length, 1, 'paragraph created');
});

test('mediumInsert() adds empty paragraph at the end if the last placeholder is not empty', function () {
  this.$el.html('<p></p>'+
    '<div class="mediumInsert" contenteditable="false" id="mediumInsert-0">'+
      '<div class="mediumInsert-buttons hide">'+
        '<div class="mediumInsert-buttonsIcon">→</div>'+
        '<a class="mediumInsert-buttonsShow">Insert</a>'+
        '<ul class="mediumInsert-buttonsOptions">'+
          '<li><button data-addon="images" data-action="add" class="mediumInsert-action action-images-add">Image</button></li>'+
          '<li><button data-addon="maps" data-action="add" class="mediumInsert-action action-maps-add">Map</button></li>'+
          '<li><button data-addon="embeds" data-action="add" class="mediumInsert-action action-embeds-add">Embed</button></li>'+
        '</ul>'+
      '</div>'+
      '<div class="mediumInsert-placeholder"><img></div>'+
    '</div>');

  this.$el.mediumInsert();

  equal(this.$el.find('p').length, 2, 'another paragraph created');
  equal(this.$el.find('p:last').html(), '<br>', 'created paragraph contains <br>');
  equal(this.$el.find('.mediumInsert').length, 2, 'another .mediumInsert created');
});

test('mediumInsert() add placeholders after blocks', function () {
  this.$el.html('<h3></h3><p></p>');

  this.$el.mediumInsert();

  equal(this.$el.find('.mediumInsert').length, 2, 'two placeholders created');
  ok(this.$el.find('h3').next().hasClass('mediumInsert'), 'placeholder created after h3');
  ok(this.$el.find('p').next().hasClass('mediumInsert'), 'placeholder created after p');
});

test('mediumInsert() adds placeholder at the beginning if it is set in settings', function () {
  this.$el.html('<h3></h3><p></p>');

  this.$el.mediumInsert({
    beginning: true
  });

  equal(this.$el.find('.mediumInsert').length, 3, 'three placeholders created');
  ok(this.$el.children().first().hasClass('mediumInsert'), 'placeholder at the begining was created');
});

test('mediumInsert() adds placeholder after keyup', function () {
  this.$el.html('<p>Test</p>');

  this.$el.mediumInsert();

  equal(this.$el.find('.mediumInsert').length, 1, '1 placeholder created');

  this.$el.append('<p>Test2</p>');
  this.$el.keyup();

  equal(this.$el.find('.mediumInsert').length, 2, 'another placeholder created');
});

test('mediumInsert() add editor\'s placeholder if editor is empty', function () {
  this.$el.html('<p><br></p>');

  this.$el.mediumInsert();
  this.$el.blur();

  ok(this.$el.hasClass('medium-editor-placeholder'), 'editor\'s placeholder added');
});
