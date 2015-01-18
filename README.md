# jQuery insert plugin for MediumEditor

**ATTENTION! This branch is a development branch for version 1.0. If you're looking for a usable version of the plugin, please go to master branch, where you'll find version 0.***

[![Build Status](https://travis-ci.org/orthes/medium-editor-insert-plugin.png?branch=1.0)](https://travis-ci.org/orthes/medium-editor-insert-plugin)
[![Dependency Status](http://www.versioneye.com/user/projects/545a6ed837be08a20d000005/badge.svg?style=flat)](http://www.versioneye.com/user/projects/545a6ed837be08a20d000005)
[![Dependency Status](http://www.versioneye.com/user/projects/545a6f0b37be081d6900002d/badge.svg?style=flat)](http://www.versioneye.com/user/projects/545a6f0b37be081d6900002d)
[![Codacy Badge](https://www.codacy.com/project/badge/1f8565ed2e554e4fa952ec4da6a2080b)](https://www.codacy.com/public/orthes/mediumeditorinsertplugin)


## Download

* Bower (recommended): ```bower install medium-editor-insert-plugin#1.0 --save```
* Manual: [Download the latest release](https://github.com/orthes/medium-editor-insert-plugin/releases)


## Usage

Version 1.0 has a little more dependencies than the previous one. If you downloaded the plugin via Bower, all dependencies were downloaded automatically for you. If you prefer manual download, please, remember to download the dependencies, too.

List of dependencies:
- [jQuery](http://jquery.com): >=1.9.0
- [MediumEditor](https://github.com/daviferreira/medium-editor): ~2.0
- [Handlebars](http://handlebarsjs.com): ~2.0.0
- [jQuery File Upload Plugin](https://github.com/blueimp/jQuery-File-Upload): ~9.9.0
- [jQuery Sortable](https://github.com/johnny/jquery-sortable): ~0.9.12

The first step is to include all the dependencies to your code:

```html
<!-- CSS -->
<link rel="stylesheet" href="bower_components/medium-editor/dist/css/medium-editor.min.css">
<link rel="stylesheet" href="bower_components/medium-editor/dist/css/themes/default.css" id="medium-editor-theme">
<!-- Font Awesome for awesome icons. You can redefine icons used in a plugin configuration -->
<link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">

<!-- JS -->
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/medium-editor/dist/js/medium-editor.js"></script>
<script src="bower_components/handlebars/handlebars.runtime.min.js"></script>
<script src="bower_components/jquery-sortable/source/js/jquery-sortable-min.js"></script>
<!-- Unfortunately, jQuery File Upload Plugin has a few more dependencies itself -->
<script src="bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget.js"></script>
<script src="bower_components/blueimp-file-upload/js/jquery.iframe-transport.js"></script>
<script src="bower_components/blueimp-file-upload/js/jquery.fileupload.js"></script>
```

Now, when the dependecies are set we can include the plugin:

```html
<!-- CSS -->
<link rel="stylesheet" href="bower_components/medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin.min.css">

<!-- JS -->
<script src="bower_components/medium-editor-insert-plugin/dist/js/medium-editor-insert-plugin.min.js"></script>
```

Initialize MediumEditor as you normally would:

```javascript
var editor = new MediumEditor('.editable');
```

Finally, you can initialize the insert plugin:

```javascript
$(function () {
    $('.editable').mediumInsert({
        editor: editor
    });
});
```


### Getting clean content

After you have a working editor with the plugin, you will want to get a **clean content** from the editor without any additional plugin related stuff. This could be done by using the editor's serialize() function which returns JSON object with elements contents.

```javascript
var allContents = editor.serialize();
var elContent = allContents["element-0"].value;
```

For styling the content in frontend (where it will be read only without editing posibilities) use this CSS:

```html
<link rel="stylesheet" href="bower_components/medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin-frontend.min.css">
```


## Options

```javascript
$('.editable').mediumInsert({
    editor: null, // (MediumEditor) Instance of MediumEditor
    enabled: true, // (boolean) If the plugin is enabled
    addons: { // (object) Addons configuration
        images: { // (object) Image addon configuration
            label: '<span class="fa fa-camera"></span>', // (string) A label for an image addon
            uploadScript: 'upload.php', // (string) A relative path to an upload script
            deleteScript: 'delete.php', // (string) A relative path to a delete script
            preview: true, // (boolean) Show an image before it is uploaded (only in browsers that support this feature)
            styles: { // (object) Available image styles configuration
                wide: { // (object) Image style configuration. Key is used as a class name added to an image, when the style is selected (.medium-insert-images-wide)
                    label: '<span class="fa fa-align-justify"></span>', // (string) A label for a style
                    added: function ($el) {}, // (function) Callback function called after the style was selected. A parameter $el is a current active paragraph (.medium-insert-active)
                    removed: function ($el) {} // (function) Callback function called after a different style was selected and this one was removed. A parameter $el is a current active paragraph (.medium-insert-active)
                },
                left: {
                    label: '<span class="fa fa-align-left"></span>'
                },
                right: {
                    label: '<span class="fa fa-align-right"></span>'
                },
                grid: {
                    label: '<span class="fa fa-th"></span>'
                }
            }
        },
        embeds: { // (object) Embeds addon configuration
            label: '<span class="fa fa-youtube-play"></span>', // (string) A label for an embeds addon
            placeholder: 'Paste a YouTube, Vimeo, Facebook, Twitter or Instagram link and press Enter', // (string) Placeholder displayed when entering URL to embed
            oembedProxy: 'http://medium.iframe.ly/api/oembed?iframe=1' // (string/null) URL to oEmbed proxy endpoint, such as Iframely, Embedly or your own. You are welcome to use "http://medium.iframe.ly/api/oembed?iframe=1" for your dev and testing needs, courtesy of Iframely. *Null* will make the plugin use pre-defined set of embed rules without making server calls.
        }
    }
});
```

Adding a new image style is as easy as this:

```javascript
$('.editable').mediumInsert({
    // ...
    addons: {
        images: {
            // ...
            slideshow: {
                label: '<span class="fa fa-play"></span>',
                added: function ($el) {
                    // Initialize slideshow
                    $el.cycle({
                       slides: 'figure'
                    });
                },
                removed: function ($el) {
                    // Destroy slideshow
                    $el.cycle('destroy');
                }
            }
        }
    }
});
```

## Methods

- **enable**: Enables the plugin. It's connected to Medium Editor's own activate function, so if the editor is activated, so is the plugin. (The plugin is enabled automatically. Use it only if you previously disabled the plugin.)
- **disable**: Disables the plugin. It's connected to Medium Editor's own deactivate function, so if the editor is deactivated, so is the plugin.

Usage:

```javascript
$('.editable').mediumInsert('disable');
```

## Contributing

[![Stories in Ready](https://badge.waffle.io/orthes/medium-editor-insert-plugin.svg?label=ready&title=Ready)](http://waffle.io/orthes/medium-editor-insert-plugin)

If you're a developer and you want to help, I'm very happy to hear that. First of all, go to [waffle.io](http://waffle.io/orthes/medium-editor-insert-plugin) (that's the blue icon above),
where you'll find list of all work that need to be done. Feel free to grab one issue, assign it to yourself and start working.

The plugin uses [Grunt](http://gruntjs.com/) for automating development tasks and [Bower](http://bower.io/) for package management. To install all the necessities for development run these commands:

```
npm install
bower install
```

These are available Grunt tasks:

- **js**: runs jshint, uglify and handlebars
- **css**: runs sass, autoprefixer, csso and usebanner
- **test**: runs jshint and qunit
- **watch**: watches for modifications on script/scss files and runs js/css task

Please, test you're code to your best knowledge, especially if you're adding new features.

If you want to make sure, that your code runs smoothly in all browsers, you can use [Test'em](https://github.com/airportyh/testem) to run tests in all browsers at the same time.


## Contributors

This plugin is brought to you thanks to these great contributors from all around the world:

```
215	Pavel Linkesch
 10	Andrey Sitnik
  8	Nazar Leush
  6	tooyama
  6	Jeremy
  4	Alexandr Subbotin
  3	OmniaGM
  3	Firas Bessadok
  2	Sam Auciello
  2	Noris
  2	Miloš Hadžić
  2	Jonathon Sim
  2	Enzo Z
  2	DanielHuangZH
  2	Brandon Renfrow
  1	zh-daniel-huang
  1	bjrenfrow
  1	Max
  1	Ivan Paramonau
  1	Indra Santosa
  1	Hussein Jafferjee
```


## Lincense

The plugin is free and released under MIT license.


## Author

Pavel Linkesch | [@linkesch](http://twitter.com/linkesch) | http://www.linkesch.sk