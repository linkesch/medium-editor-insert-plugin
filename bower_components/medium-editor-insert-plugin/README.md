# jQuery insert plugin for MediumEditor

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/orthes/medium-editor-insert-plugin?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) [![Build Status](https://travis-ci.org/orthes/medium-editor-insert-plugin.svg?branch=master)](https://travis-ci.org/orthes/medium-editor-insert-plugin) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/1f8565ed2e554e4fa952ec4da6a2080b)](https://www.codacy.com/app/orthes_3082/medium-editor-insert-plugin?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=orthes/medium-editor-insert-plugin&amp;utm_campaign=Badge_Grade) [![CDNJS](https://img.shields.io/cdnjs/v/medium-editor-insert-plugin.svg)](https://cdnjs.com/libraries/medium-editor-insert-plugin)

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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/312938?v=4" width="100px;" alt="Pavel Linkesch"/><br /><sub><b>Pavel Linkesch</b></sub>](http://linkesch.com)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=orthes "Code") [📖](https://github.com/orthes/medium-editor-insert-plugin/commits?author=orthes "Documentation") [🚧](#maintenance-orthes "Maintenance") [👀](#review-orthes "Reviewed Pull Requests") | [<img src="https://avatars2.githubusercontent.com/u/62333?v=4" width="100px;" alt="Jérémy Benoist"/><br /><sub><b>Jérémy Benoist</b></sub>](http://www.j0k3r.net)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=j0k3r "Code") [🚧](#maintenance-j0k3r "Maintenance") [👀](#review-j0k3r "Reviewed Pull Requests") | [<img src="https://avatars3.githubusercontent.com/u/39333?v=4" width="100px;" alt="Nazar Leush"/><br /><sub><b>Nazar Leush</b></sub>](https://github.com/nleush)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=nleush "Code") | [<img src="https://avatars1.githubusercontent.com/u/19343?v=4" width="100px;" alt="Andrey Sitnik"/><br /><sub><b>Andrey Sitnik</b></sub>](http://twitter.com/sitnikcode)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=ai "Code") | [<img src="https://avatars1.githubusercontent.com/u/79373?v=4" width="100px;" alt="Jeremy Epstein"/><br /><sub><b>Jeremy Epstein</b></sub>](http://greenash.net.au/)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=Jaza "Code") | [<img src="https://avatars2.githubusercontent.com/u/1228229?v=4" width="100px;" alt="Hikaru Tooyama"/><br /><sub><b>Hikaru Tooyama</b></sub>](https://github.com/vexus2)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=vexus2 "Code") | [<img src="https://avatars2.githubusercontent.com/u/594298?v=4" width="100px;" alt="Alexandr Subbotin"/><br /><sub><b>Alexandr Subbotin</b></sub>](https://twitter.com/asubbotin)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=KELiON "Code") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars3.githubusercontent.com/u/5272569?v=4" width="100px;" alt="Vinicius Patrinhani"/><br /><sub><b>Vinicius Patrinhani</b></sub>](https://github.com/patrinhani-ciandt)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=patrinhani-ciandt "Code") | [<img src="https://avatars2.githubusercontent.com/u/1790778?v=4" width="100px;" alt="Firas Bessadok"/><br /><sub><b>Firas Bessadok</b></sub>](http://firas.bessadok.com)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=fbessadok "Code") | [<img src="https://avatars2.githubusercontent.com/u/1101183?v=4" width="100px;" alt="Omnia G Helmi"/><br /><sub><b>Omnia G Helmi</b></sub>](http://omniagm.github.io/)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=OmniaGM "Code") | [<img src="https://avatars2.githubusercontent.com/u/4083642?v=4" width="100px;" alt="Daniel Huang"/><br /><sub><b>Daniel Huang</b></sub>](https://github.com/daniel-huang)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=daniel-huang "Code") | [<img src="https://avatars2.githubusercontent.com/u/610268?v=4" width="100px;" alt="Alex Xandra Albert Sim"/><br /><sub><b>Alex Xandra Albert Sim</b></sub>](https://bertzzie.com)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=bertzzie "Code") | [<img src="https://avatars3.githubusercontent.com/u/1891369?v=4" width="100px;" alt="Brandon Renfrow"/><br /><sub><b>Brandon Renfrow</b></sub>](https://github.com/brenfrow)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=brenfrow "Code") | [<img src="https://avatars3.githubusercontent.com/u/5192706?v=4" width="100px;" alt="BurnHavoc"/><br /><sub><b>BurnHavoc</b></sub>](https://github.com/BurnHavoc)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=BurnHavoc "Code") |
| [<img src="https://avatars2.githubusercontent.com/u/431361?v=4" width="100px;" alt="Enzo"/><br /><sub><b>Enzo</b></sub>](http://enzoz.me/)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=enzoz "Code") | [<img src="https://avatars0.githubusercontent.com/u/883073?v=4" width="100px;" alt="Jonathon Sim"/><br /><sub><b>Jonathon Sim</b></sub>](http://idealstack.io)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=jonathonsim "Code") | [<img src="https://avatars1.githubusercontent.com/u/8471513?v=4" width="100px;" alt="Kazuya Hara"/><br /><sub><b>Kazuya Hara</b></sub>](https://kazuyahara.com)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=KazuyaHara "Code") | [<img src="https://avatars2.githubusercontent.com/u/93555?v=4" width="100px;" alt="Miloš Hadžić"/><br /><sub><b>Miloš Hadžić</b></sub>](https://rightfold.io)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=miloshadzic "Code") | [<img src="https://avatars3.githubusercontent.com/u/1642674?v=4" width="100px;" alt="Siron"/><br /><sub><b>Siron</b></sub>](https://github.com/Siron)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=Siron "Code") | [<img src="https://avatars3.githubusercontent.com/u/1270102?v=4" width="100px;" alt="Sam Auciello"/><br /><sub><b>Sam Auciello</b></sub>](http://antha.site)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=olleicua "Code") | [<img src="https://avatars0.githubusercontent.com/u/28541?v=4" width="100px;" alt="Sean Cashin"/><br /><sub><b>Sean Cashin</b></sub>](https://github.com/scashin133)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=scashin133 "Code") |
| [<img src="https://avatars0.githubusercontent.com/u/1086365?v=4" width="100px;" alt="Yu Zhai"/><br /><sub><b>Yu Zhai</b></sub>](https://github.com/jackyzhai)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=jackyzhai "Code") | [<img src="https://avatars0.githubusercontent.com/u/1449414?v=4" width="100px;" alt="acekat"/><br /><sub><b>acekat</b></sub>](https://github.com/acekat)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=acekat "Code") | [<img src="https://avatars1.githubusercontent.com/u/18568266?v=4" width="100px;" alt="linpekka"/><br /><sub><b>linpekka</b></sub>](https://github.com/linpekka)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=linpekka "Code") | [<img src="https://avatars0.githubusercontent.com/u/12888685?v=4" width="100px;" alt="sainu"/><br /><sub><b>sainu</b></sub>](http://sa-inu.com/)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=sainuio "Code") | [<img src="https://avatars3.githubusercontent.com/u/1642706?v=4" width="100px;" alt="Murat Tasarsu"/><br /><sub><b>Murat Tasarsu</b></sub>](http://medya-t.com)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=tasarsu "Code") | [<img src="https://avatars1.githubusercontent.com/u/1912864?v=4" width="100px;" alt="Anil Kumar Maurya"/><br /><sub><b>Anil Kumar Maurya</b></sub>](http://anilmaurya.herokuapp.com)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=anilmaurya "Code") | [<img src="https://avatars3.githubusercontent.com/u/8297414?v=4" width="100px;" alt="Artem Shevtsov"/><br /><sub><b>Artem Shevtsov</b></sub>](https://github.com/artshevtsov)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=artshevtsov "Code") |
| [<img src="https://avatars0.githubusercontent.com/u/1327782?v=4" width="100px;" alt="Baptiste Gaillard"/><br /><sub><b>Baptiste Gaillard</b></sub>](https://github.com/bgaillard)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=bgaillard "Code") | [<img src="https://avatars3.githubusercontent.com/u/2744510?v=4" width="100px;" alt="Bernard Wolff"/><br /><sub><b>Bernard Wolff</b></sub>](https://github.com/bernardwolff)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=bernardwolff "Code") | [<img src="https://avatars0.githubusercontent.com/u/1719249?v=4" width="100px;" alt="Carl Scott"/><br /><sub><b>Carl Scott</b></sub>](http://gogocarl.blogspot.com)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=GoGoCarl "Code") | [<img src="https://avatars0.githubusercontent.com/u/1064889?v=4" width="100px;" alt="Chris Joe"/><br /><sub><b>Chris Joe</b></sub>](https://github.com/flamerohr)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=flamerohr "Code") | [<img src="https://avatars1.githubusercontent.com/u/13829339?v=4" width="100px;" alt="Daniel Wang"/><br /><sub><b>Daniel Wang</b></sub>](https://github.com/pvnr0082t)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=pvnr0082t "Code") | [<img src="https://avatars0.githubusercontent.com/u/968252?v=4" width="100px;" alt="Derrek Bertrand"/><br /><sub><b>Derrek Bertrand</b></sub>](http://derrekbertrand.com/)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=derrekbertrand "Code") | [<img src="https://avatars2.githubusercontent.com/u/1485056?v=4" width="100px;" alt="Gabi Maeztu"/><br /><sub><b>Gabi Maeztu</b></sub>](http://merqur.io)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=merqurio "Code") |
| [<img src="https://avatars1.githubusercontent.com/u/882228?v=4" width="100px;" alt="Hussein Jafferjee"/><br /><sub><b>Hussein Jafferjee</b></sub>](http://inssein.com)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=inssein "Code") | [<img src="https://avatars0.githubusercontent.com/u/433501?v=4" width="100px;" alt="Indra Santosa"/><br /><sub><b>Indra Santosa</b></sub>](http://indrasantosa.com)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=indrasantosa "Code") | [<img src="https://avatars0.githubusercontent.com/u/28841?v=4" width="100px;" alt="Ivan Paramonau"/><br /><sub><b>Ivan Paramonau</b></sub>](http://twitter.com/iparamonau)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=iparamonau "Code") | [<img src="https://avatars3.githubusercontent.com/u/19725964?v=4" width="100px;" alt="JK"/><br /><sub><b>JK</b></sub>](http://jerinisready.wordpress.com)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=jerinisready "Code") | [<img src="https://avatars0.githubusercontent.com/u/1831399?v=4" width="100px;" alt="Jeff Bellsey"/><br /><sub><b>Jeff Bellsey</b></sub>](http://futureground.net)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=jbellsey "Code") | [<img src="https://avatars0.githubusercontent.com/u/55442?v=4" width="100px;" alt="Kenzo Okamura"/><br /><sub><b>Kenzo Okamura</b></sub>](http://blog.oznek.com.br)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=oznek "Code") | [<img src="https://avatars3.githubusercontent.com/u/366564?v=4" width="100px;" alt="Matei Dorobantu"/><br /><sub><b>Matei Dorobantu</b></sub>](http://matei.dorobantu.me)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=mateid "Code") |
| [<img src="https://avatars1.githubusercontent.com/u/714146?v=4" width="100px;" alt="Max Kirchoff"/><br /><sub><b>Max Kirchoff</b></sub>](http://www.maxisnow.com)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=maxkirchoff "Code") | [<img src="https://avatars0.githubusercontent.com/u/8791672?v=4" width="100px;" alt="MrEcl"/><br /><sub><b>MrEcl</b></sub>](https://github.com/MrEcl)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=MrEcl "Code") | [<img src="https://avatars1.githubusercontent.com/u/2808250?v=4" width="100px;" alt="Raphaël Vercruyssen"/><br /><sub><b>Raphaël Vercruyssen</b></sub>](https://github.com/RifRaf44)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=RifRaf44 "Code") | [<img src="https://avatars2.githubusercontent.com/u/1658380?v=4" width="100px;" alt="Sebastian Zorn"/><br /><sub><b>Sebastian Zorn</b></sub>](http://dazorni.de)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=dazorni "Code") | [<img src="https://avatars0.githubusercontent.com/u/34696545?v=4" width="100px;" alt="tsbalzhanov"/><br /><sub><b>tsbalzhanov</b></sub>](https://github.com/tsbalzhanov)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=tsbalzhanov "Code") | [<img src="https://avatars3.githubusercontent.com/u/3633090?v=4" width="100px;" alt="bjrenfrow"/><br /><sub><b>bjrenfrow</b></sub>](https://github.com/bjrenfrow)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=bjrenfrow "Code") | [<img src="https://avatars1.githubusercontent.com/u/525103?v=4" width="100px;" alt="orhan"/><br /><sub><b>orhan</b></sub>](https://github.com/orhanveli)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=orhanveli "Code") |
| [<img src="https://avatars3.githubusercontent.com/u/6654724?v=4" width="100px;" alt="swolfod"/><br /><sub><b>swolfod</b></sub>](https://github.com/swolfod)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=swolfod "Code") | [<img src="https://avatars1.githubusercontent.com/u/6559757?v=4" width="100px;" alt="Eligijus Krėpšta"/><br /><sub><b>Eligijus Krėpšta</b></sub>](https://kodinu.lt)<br />[💻](https://github.com/orthes/medium-editor-insert-plugin/commits?author=keligijus "Code") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

[MIT](https://github.com/orthes/medium-editor-insert-plugin/blob/master/LICENSE)