jQuery images plugin for MediumEditor
======================================

This plugin expands capabilities of [MediumEditor](https://github.com/daviferreira/medium-editor) which is a clone of [medium.com](http://medium.com) WYSIWYG editor.


Demo
----

http://orthes.github.io/medium-editor-images-plugin


Screenshots
-----------

**The plugin adds space between every paragraph to upload images.**

![Editor 01](http://www.linkesch.sk/uploads/creator5/1_890d6ad67afe18a7e4a4c48f17c97d151f63a49b/image/editor01.png)

**You can use native HTML5 drag & drop, too.**

![Editor 02](http://www.linkesch.sk/uploads/creator5/1_890d6ad67afe18a7e4a4c48f17c97d151f63a49b/image/editor02.png)

**Added image looks like this and it could be deleted or resized. There are two size possibilities. The first is full width:**

![Editor 03](http://www.linkesch.sk/uploads/creator5/1_890d6ad67afe18a7e4a4c48f17c97d151f63a49b/image/editor03.png)

**The second possible size is 33% aligned left:**

![Editor 04](http://www.linkesch.sk/uploads/creator5/1_890d6ad67afe18a7e4a4c48f17c97d151f63a49b/image/editor04.png)

**There are possible multiple uploads, too.**

![Editor 05](http://www.linkesch.sk/uploads/creator5/1_890d6ad67afe18a7e4a4c48f17c97d151f63a49b/image/editor05.png)
![Editor 06](http://www.linkesch.sk/uploads/creator5/1_890d6ad67afe18a7e4a4c48f17c97d151f63a49b/image/editor06.png)
![Editor 08](http://www.linkesch.sk/uploads/creator5/1_890d6ad67afe18a7e4a4c48f17c97d151f63a49b/image/editor08.png)


Usage
-----

The first step is to add MediumEditor itself:

```html
<link rel="stylesheet" href="medium-editor/css/medium-editor.css">
<script src="medium-editor/js/medium-editor.js"></script>
```

Next add jQuery:

```html
<script src="medium-editor-images-plugin/js/jquery-1.10.2.min.js"></script>
```

Now you can add the plugin:

```html
<link rel="stylesheet" href="medium-editor-images-plugin/css/medium-editor-images-plugin.css">
<script src="medium-editor-images-plugin/js/medium-editor-images-plugin.js"></script>
```

Initialize MediumEditor as you normally would:

```html
<script>var editor = new MediumEditor('.editable');</script>
```

Finally, you can initialize the images plugin:

```javascript
$(function () {
  $('.editable').mediumImages();
});
```


Options
-------

- **uploadScript**: relative path to a script that handles file uploads. Default: *upload.php*


Author
------

Pavel Linkesch | [@linkesch](http://twitter.com/linkesch) | http://www.linkesch.sk