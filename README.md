# jQuery insert plugin for MediumEditor

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/orthes/medium-editor-insert-plugin?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Build Status](https://travis-ci.org/orthes/medium-editor-insert-plugin.svg?branch=master)](https://travis-ci.org/orthes/medium-editor-insert-plugin)
[![Dependency Status](http://www.versioneye.com/user/projects/53f742dce09da3467d000389/badge.svg?style=flat)](http://www.versioneye.com/user/projects/53f742dce09da3467d000389)
[![Dependency Status](http://www.versioneye.com/user/projects/53f742e2e09da3dca800038f/badge.svg?style=flat)](http://www.versioneye.com/user/projects/53f742e2e09da3dca800038f)
[![Codacy Badge](https://www.codacy.com/project/badge/1f8565ed2e554e4fa952ec4da6a2080b)](https://www.codacy.com/public/orthes/mediumeditorinsertplugin)

This plugin expands capabilities of [MediumEditor](https://github.com/yabwe/medium-editor) (a clone of medium.com WYSIWYG editor) and it enables users to insert into the editor various types of content (depending on available addons).

Current available addons:

- **images**
- **embeds** (either through oEmbed proxy, such as [Iframely](https://iframely.com/), or pre-defined parsers such as - Youtube, Vimeo, Twitter, Facebook, Instagram)


## Demo

[http://orthes.github.io/medium-editor-insert-plugin](http://orthes.github.io/medium-editor-insert-plugin)


## Download

**Via npm:**

`npm install medium-editor-insert-plugin --save`

**Via bower:**

`bower install medium-editor-insert-plugin --save`

**Manual:**

[Download the latest release](https://github.com/orthes/medium-editor-insert-plugin/releases)


## Quick Start

The first step is to include the plugin with all its dependencies to your code:

```html
<!-- Font Awesome for awesome icons. You can redefine icons used in a plugin configuration -->
<link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">

<!-- CSS -->
<link rel="stylesheet" href="bower_components/medium-editor/dist/css/medium-editor.min.css">
<link rel="stylesheet" href="bower_components/medium-editor/dist/css/themes/default.css">
<link rel="stylesheet" href="bower_components/medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin.min.css">

<!-- JS -->
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/medium-editor/dist/js/medium-editor.js"></script>
<script src="bower_components/handlebars/handlebars.runtime.min.js"></script>
<script src="bower_components/jquery-sortable/source/js/jquery-sortable-min.js"></script>
<script src="bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget.js"></script>
<script src="bower_components/blueimp-file-upload/js/jquery.iframe-transport.js"></script>
<script src="bower_components/blueimp-file-upload/js/jquery.fileupload.js"></script>
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

## [Documentation](https://github.com/orthes/medium-editor-insert-plugin/wiki)

- [Getting Started](https://github.com/orthes/medium-editor-insert-plugin/wiki/v2.x-Getting-Started)
- [Configuration](https://github.com/orthes/medium-editor-insert-plugin/wiki/v2.x-Configuration)
- [Using with webpack](https://github.com/orthes/medium-editor-insert-plugin/wiki/v2.x-Using-with-webpack)
- [Server response](https://github.com/orthes/medium-editor-insert-plugin/wiki/v2.x-Server-response)
- [Custom addons](https://github.com/orthes/medium-editor-insert-plugin/wiki/v2.x-Custom-addons)
- [Upgrading from v0.3](https://github.com/orthes/medium-editor-insert-plugin/wiki/v2.x-Upgrading-from-v0.3)
- [Versioning](https://github.com/orthes/medium-editor-insert-plugin/wiki/Versioning)
- [Development & Contributing](https://github.com/orthes/medium-editor-insert-plugin/wiki/Development-&-Contributing)
- [License](https://github.com/orthes/medium-editor-insert-plugin/wiki/License)
- [Author & Contributors](https://github.com/orthes/medium-editor-insert-plugin/wiki/Author-&-Contributors)


## Sponsors

[creator5](http://www.creator5.com) | [Maker](https://maker.me/) | [Nusii](http://nusii.com)
-------- | ----- | -----
[![creator5](http://i.imgur.com/K9uiIuT.png)](http://www.creator5.com) | [![Maker](http://i.imgur.com/8t8wsM8.png)](http://maker.me) | [![nusii](http://i.imgur.com/tvdJ249.png)](http://nusii.com)
