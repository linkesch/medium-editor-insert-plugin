jQuery insert plugin for MediumEditor
======================================

This plugin expands capabilities of [MediumEditor](https://github.com/daviferreira/medium-editor) (a clone of [medium.com](http://medium.com) WYSIWYG editor).

The plugins enables users to insert into the editor various types of content (depending on available addons).

Current available addons:

- images
- embeds (it can embed various social services - Youtube, Twitter, Facebook, Instagram, Vimeo)

More are coming soon...

[![Build Status](https://travis-ci.org/orthes/medium-editor-insert-plugin.png?branch=master)](https://travis-ci.org/orthes/medium-editor-insert-plugin)
[![Bower version](https://badge.fury.io/bo/medium-editor-insert-plugin.svg)](http://badge.fury.io/bo/medium-editor-insert-plugin)


## Table of Contents

- [Demo](#demo)
- [Download](#download)
- [Usage](#usage)
- [Options](#options)
- [Methods](#methods)
- [Development](#development)
- [Contributing](#contributing)
- [Author](#author)


## <a name="demo"></a>Demo

http://orthes.github.io/medium-editor-insert-plugin


## <a name="download"></a>Download

- Bower: ```bower install medium-editor-insert-plugin --save```
- Manual: [Download the latest release](https://github.com/orthes/medium-editor-insert-plugin/archive/master.zip)


## <a name="usage"></a>Usage

The first step is to add all prerequisites (MediumEditor and jQuery):

```html
<link rel="stylesheet" href="bower_components/medium-editor/dist/css/medium-editor.min.css">
<link rel="stylesheet" href="bower_components/medium-editor/dist/css/themes/default.css">
<script src="bower_components/medium-editor/dist/js/medium-editor.min.js"></script>
<script src="bower_components/jquery/jquery.min.js"></script>
```

Now you have two possibilites. You can load all addons at once:

```html
<link rel="stylesheet" href="bower_components/medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin.min.css">
<script src="bower_components/medium-editor-insert-plugin/dist/js/medium-editor-insert-plugin.all.min.js"></script>
```

Or if you for some reason want, you can load only addons that you want separately. In this case, don't forget to load medium-editor-insert-plugin.min.js, which is the main plugin file, that initializes addons:

```html
<link rel="stylesheet" href="bower_components/medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin.min.css">
<script src="bower_components/medium-editor-insert-plugin/dist/js/addons/medium-editor-insert-plugin.min.js"></script>
<script src="bower_components/medium-editor-insert-plugin/dist/js/addons/medium-editor-insert-images.min.js"></script>
<script src="bower_components/medium-editor-insert-plugin/dist/js/addons/medium-editor-insert-embeds.min.js"></script>
```

Initialize MediumEditor as you normally would:

```html
<script>var editor = new MediumEditor('.editable');</script>
```

Finally, you can initialize the insert plugin with images and embed addon:

```javascript
$(function () {
  $('.editable').mediumInsert({
    editor: editor,
    addons: {
      images: {},
      embeds: {}
    }
  });
});
```

After you have a working editor with the plugin, you will want to get a clean content of the editor without any additional unnecessary placeholders. This could be done by using the editor's ```serialize()``` function, which returns JSON object with elements contents.

```javascript
var allContents = editor.serialize();
var elContent = allContents["element-0"].value;
```


## <a name="options"></a>Options

- **editor**: (MediumEditor) instance of MediumEditor
- **addons**: (object) keys are names of used addons and values are objects of addons options. (NOTICE: Remember to use medium-editor-insert-plugin.all.min.js, which includes all addons, or separately load medium-editor-insert-plugin.min.js and medium-editor-insert-{ADDON-NAME}.min.js).
    - **images**:
        - **imagesUploadScript**: (string) relative path to a script that handles file uploads. Default: *upload.php*
        - **imagesDeleteScript**: (string) relative path to a script that handles file deleting. Default: *delete.php*
        - **useDragAndDrop**: (boolean) active or inactive image's drag and drop. Default: *true*
        - **formatData**: (function (file)) function that formats data before sending them to server while uploading an image
        - **uploadFile**: (function ($placeholder, file, that)) function uploading an image to a server
        - **deleteFile**: (function (file, that)) function deleting an image from a server
    - **embeds**:
        - **urlPlaceholder**: (string) placeholder displayed when entering URL to embed. Default: *type or paste url here*
- **enabled**: (boolean) plugin's state: Default *true*.


## <a name="methods"></a>Methods

- **enable**: enables the plugin. It's connected to Medium Editor's own activate function, so if the editor is activated, so is the plugin. (The plugin is enabled automatically. Use it only if you previously disabled the plugin.)
- **disable**: disables the plugin. It's connected to Medium Editor's own deactivate function, so if the editor is deactivated, so is the plugin.
- **registerAddon**: create new addon, like images or maps or embeds. Your addon object should contain `init(options)` method to initialize your addon and `insertButton` method that contains code of button in list of available addons.
- **getAddon**: simple getter for available addons.

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
