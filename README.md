jQuery insert plugin for MediumEditor
======================================

This plugin expands capabilities of [MediumEditor](https://github.com/daviferreira/medium-editor) (a clone of [medium.com](http://medium.com) WYSIWYG editor).

The plugins enables users to insert into the editor various types of content (depending on available addons).

Current available addons:

- images
- embeds (either through oEmbed proxy, such as [Iframely](https://iframely.com), or pre-defined parsers such as - Youtube, Vimeo, Twitter, Facebook, Instagram)
- tables (basic table creating)

More are coming soon...

[![Build Status](https://travis-ci.org/orthes/medium-editor-insert-plugin.png?branch=master)](https://travis-ci.org/orthes/medium-editor-insert-plugin)
[![Bower version](https://badge.fury.io/bo/medium-editor-insert-plugin.svg)](http://badge.fury.io/bo/medium-editor-insert-plugin)

---

This is a branch for a current working 0.* version. If you want to see, test or contribute to an upcoming **version 1.0**, go to [1.0 branch](https://github.com/orthes/medium-editor-insert-plugin/tree/1.0).

---

## Table of Contents

- [Demo](#demo)
- [Download](#download)
- [Usage](#usage)
- [Options](#options)
- [Methods](#methods)
- [Development & Contributing](#development)
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
<script src="bower_components/medium-editor-insert-plugin/dist/js/addons/medium-editor-insert-tables.min.js"></script>
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
      embeds: {
        oembedProxy: 'http://medium.iframe.ly/api/oembed?iframe=1'
      },
      tables: {}
    }
  });
});
```

After you have a working editor with the plugin, you will want to get a clean content of the editor without any additional unnecessary placeholders. This could be done by using the editor's ```serialize()``` function, which returns JSON object with elements contents.

```javascript
var allContents = editor.serialize();
var elContent = allContents["element-0"].value;
```

For styling the content in frontend (where it will be read only without editing posibilities) use this CSS:

```html
<link rel="stylesheet" href="bower_components/medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin-frontend.min.css">
```

## <a name="options"></a>Options

- **editor**: (MediumEditor) instance of MediumEditor
- **beginning**: (boolean) whether inserting at the very beginning of the editor should be possible (in other words, if the first placeholder for instering should be placed as the first element of the editor, or after the first parahraph). Default: *false*
- **addons**: (object) keys are names of used addons and values are objects of addons options. (NOTICE: Remember to use medium-editor-insert-plugin.all.min.js, which includes all addons, or separately load medium-editor-insert-plugin.min.js and medium-editor-insert-{ADDON-NAME}.min.js).
    - **images**:
        - **imagesUploadScript**: (string) relative path to a script that handles file uploads. Default: *upload.php*
        - **imagesDeleteScript**: (string) relative path to a script that handles file deleting. Default: *delete.php*
        - **useDragAndDrop**: (boolean) active or inactive image's drag and drop. Default: *true*
        - **formatData**: (function (file)) function that formats data before sending them to server while uploading an image
        - **uploadFile**: (function ($placeholder, file, that)) function uploading an image to a server
        - **deleteFile**: (function (file, that)) function deleting an image from a server
    - **embeds**:
        - **urlPlaceholder**: (string) placeholder displayed when entering URL to embed. Default: *Paste or type a link*
        - **oembedProxy**: (string) URL to oEmbed proxy endpoint, such as Iframely, Embedly or your own. You are welcome to use "http://medium.iframe.ly/api/oembed?iframe=1" for your dev and testing needs, courtesy of [Iframely](https://iframely.com). Default: none, which will make the plugin use pre-defined set of embed rules without making server calls.
    - **tables**:
        - **defaultRows**: (integer) default number of rows. Default: *2*
        - **defaultCols**: (integer) default number of columns. Default: *2*
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

## <a name="development"></a>Development & Contributing

[![Stories in Ready](https://badge.waffle.io/orthes/medium-editor-insert-plugin.svg?label=ready&title=Ready)](http://waffle.io/orthes/medium-editor-insert-plugin)

I'm happy when you not only use the plugin, but contribute your improvements, too. First of all, go to [waffle.io](http://waffle.io/orthes/medium-editor-insert-plugin) (that's the blue icon above),
where you'll find list of all work, that need to be done. Feel free to grab one issue, assign it to yourself and start working.

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

Please, test you're code to your best knowledge, especially if you're adding new features.


## <a name="author"></a>Author

Pavel Linkesch | [@linkesch](http://twitter.com/linkesch) | http://www.linkesch.sk
