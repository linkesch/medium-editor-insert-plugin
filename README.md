# jQuery insert plugin for MediumEditor
[![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors)

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/orthes/medium-editor-insert-plugin?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Build Status](https://travis-ci.org/orthes/medium-editor-insert-plugin.svg?branch=master)](https://travis-ci.org/orthes/medium-editor-insert-plugin)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1f8565ed2e554e4fa952ec4da6a2080b)](https://www.codacy.com/app/orthes_3082/medium-editor-insert-plugin?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=orthes/medium-editor-insert-plugin&amp;utm_campaign=Badge_Grade)
[![CDNJS](https://img.shields.io/cdnjs/v/medium-editor-insert-plugin.svg)](https://cdnjs.com/libraries/medium-editor-insert-plugin)

---

**HELP NEEDED!** Are you using the plugin in production? We're looking for contributors that use the plugin on daily basis and would help us move the project forward. Interested? Shoot us a message on [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/orthes/medium-editor-insert-plugin?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

---

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

<!-- 
OR YOU CAN USE CDN for a Quick Reference in Development Mode. [Dated Dec-2018 Latest Version] Recommented latest verions as moves on!

CSS 
<link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/medium-editor-insert-plugin/2.5.0/css/medium-editor-insert-plugin-frontend.min.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/medium-editor-insert-plugin/2.5.0/css/medium-editor-insert-plugin.min.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/medium-editor/5.23.3/css/medium-editor.min.css" />

JS
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.12/handlebars.runtime.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-sortable/0.9.13/jquery-sortable-min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery.ui.widget@1.10.3/jquery.ui.widget.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.iframe-transport/1.0.1/jquery.iframe-transport.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/blueimp-file-upload/9.28.0/js/jquery.fileupload.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/medium-editor/5.23.3/js/medium-editor.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/medium-editor-insert-plugin/2.5.0/js/medium-editor-insert-plugin.min.js"></script>
-->

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

[Maker](https://maker.me) | [nusii](https://nusii.com)
----- | -----
[![Maker](http://i.imgur.com/8t8wsM8.png)](https://maker.me) | [![nusii](http://i.imgur.com/tvdJ249.png)](https://nusii.com)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/312938?v=4" width="100px;" alt="Pavel Linkesch"/><br /><sub><b>Pavel Linkesch</b></sub>](http://linkesch.com)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=orthes "Code") [📖](https://github.com/orthes/medium-editor-insert-plugin/commits?author=orthes "Documentation") [🚧](#maintenance-orthes "Maintenance") [👀](#review-orthes "Reviewed Pull Requests") | [<img src="https://avatars2.githubusercontent.com/u/62333?v=4" width="100px;" alt="Jérémy Benoist"/><br /><sub><b>Jérémy Benoist</b></sub>](http://www.j0k3r.net)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=j0k3r "Code") [🚧](#maintenance-j0k3r "Maintenance") [👀](#review-j0k3r "Reviewed Pull Requests") | [<img src="https://avatars3.githubusercontent.com/u/39333?v=4" width="100px;" alt="Nazar Leush"/><br /><sub><b>Nazar Leush</b></sub>](https://github.com/nleush)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=nleush "Code") | [<img src="https://avatars1.githubusercontent.com/u/19343?v=4" width="100px;" alt="Andrey Sitnik"/><br /><sub><b>Andrey Sitnik</b></sub>](http://twitter.com/sitnikcode)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=ai "Code") | [<img src="https://avatars1.githubusercontent.com/u/79373?v=4" width="100px;" alt="Jeremy Epstein"/><br /><sub><b>Jeremy Epstein</b></sub>](http://greenash.net.au/)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=Jaza "Code") | [<img src="https://avatars2.githubusercontent.com/u/1228229?v=4" width="100px;" alt="Hikaru Tooyama"/><br /><sub><b>Hikaru Tooyama</b></sub>](https://github.com/vexus2)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=vexus2 "Code") | [<img src="https://avatars2.githubusercontent.com/u/594298?v=4" width="100px;" alt="Alexandr Subbotin"/><br /><sub><b>Alexandr Subbotin</b></sub>](https://twitter.com/asubbotin)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=KELiON "Code") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars3.githubusercontent.com/u/5272569?v=4" width="100px;" alt="Vinicius Patrinhani"/><br /><sub><b>Vinicius Patrinhani</b></sub>](https://github.com/patrinhani-ciandt)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=patrinhani-ciandt "Code") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!