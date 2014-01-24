jQuery insert plugin for MediumEditor
======================================

This plugin expands capabilities of [MediumEditor](https://github.com/daviferreira/medium-editor) which is a clone of [medium.com](http://medium.com) WYSIWYG editor.

The plugin is next, completely rewritten version of previous "images plugin". Now inserting images is only one of the plugin's addons. More addons (inserting files and maps) are coming soon...

[![Build Status](https://travis-ci.org/orthes/medium-editor-insert-plugin.png?branch=master)](https://travis-ci.org/orthes/medium-editor-insert-plugin)


## Table of Contents

- [Demo](#demo)
- [Available Addons](#addons)
- [Usage](#usage)
- [Options](#options)
- [Methods](#methods)
- [Development](#development)
- [Contributing](#contributing)
- [Author](#author)


## <a name="demo"></a>Demo

http://orthes.github.io/medium-editor-insert-plugin


## <a name="addons"></a>Available Addons

Current available addons:

- images

More are coming soon...


## <a name="usage"></a>Usage

The first step is to add all prerequisites (MediumEditor and jQuery):

```html
<link rel="stylesheet" href="medium-editor/css/medium-editor.css">
<script src="medium-editor/js/medium-editor.min.js"></script>
<script src="bower_components/jquery/jquery.min.js"></script>
```

Now you have two possibilites. You can load all addons at once:

```html
<link rel="stylesheet" href="medium-editor-insert-plugin/css/medium-editor-insert-plugin.css">
<script src="medium-editor-insert-plugin/js/medium-editor-insert-plugin.all.min.js"></script>
```

Or if you for some reason want, you can load only addons that you want separately. In this case, don't forget to load medium-editor-insert-plugin.min.js, which is the main plugin file, that initializes addons:

```html
<link rel="stylesheet" href="medium-editor-insert-plugin/css/medium-editor-insert-plugin.css">
<script src="medium-editor-insert-plugin/js/addons/medium-editor-insert-plugin.min.js"></script>
<script src="medium-editor-insert-plugin/js/addons/medium-editor-insert-images.min.js"></script>
```

Initialize MediumEditor as you normally would:

```html
<script>var editor = new MediumEditor('.editable');</script>
```

Finally, you can initialize the insert plugin with images addon:

```javascript
$(function () {
  $('.editable').mediumInsert({
    editor: editor,
    images: true
  });
});
```


## <a name="options"></a>Options

- **editor**: (MediumEditor) instance of MediumEditor
- **imagesUploadScript**: (string) relative path to a script that handles file uploads. Default: *upload.php*
- **images**: (boolean) whether to use images addon: Default *true*. (NOTICE: Remember to use medium-editor-insert-plugin.all.min.js, which includes all addons, or separately load medium-editor-insert-plugin.min.js and medium-editor-insert-images.min.js)
- **maps**: (boolean) whether to use maps addon: Default *false*. (NOTICE: Remember to use medium-editor-insert-plugin.all.min.js, which includes all addons, or separately load medium-editor-insert-plugin.min.js and medium-editor-insert-maps.min.js)
- **enabled**: (boolean) plugin's state: Default *true*.
- **imagesPlugin**: (object) options for images addon
  - **formatData**: (function) function that formats data before sending them to server while uploading an image 


## <a name="methods"></a>Methods

- **enable**: enables the plugin. It's connected to Medium Editor's own activate function, so if the editor is activated, so is the plugin. (The plugin is enabled automatically. Use it only if you previously disabled the plugin.)
- **disable**: disables the plugin. It's connected to Medium Editor's own deactivate function, so if the editor is deactivated, so is the plugin.

Use example:

```javascript
$('.editable').mediumInsert('disable');
```
 

## <a name="development"></a>Development

The plugin uses [Grunt](http://gruntjs.com/) for automating development tasks and [Bower](http://bower.io/) for package management. To install all the necessities for development run these commands:

```
npm install
bower install
```

These are available Grunt tasks:

- **js**: runs jshint, uglify and copy
- **css**: runs compass
- **test**: runs jshint and qunit
- **watch**: watches for modifications on script/scss files and runs js/css task


## <a name="contributing"></a>Contributing

I'm happy when you not only use the plugin, but contribute your improvements, too. To do that, you need to meet only two requirements:

1. Use the same coding style as the plugin
2. Write QUnit tests (if you're adding a new funcionality) and test your changes with **grunt test**


## <a name="author"></a>Author

Pavel Linkesch | [@linkesch](http://twitter.com/linkesch) | http://www.linkesch.sk

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/orthes/medium-editor-insert-plugin/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

