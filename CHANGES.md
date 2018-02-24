
2.5.0 / 2018-02-24
==================

  * Use relative path for uploaded image, instead of absolute (#455)
  * DeleteScript can now be a callback (#428)
  * Fix embeds caption (#437)
  * Fix backspace not triggering delete event (#427)
  * Fix insert plugin stripping plain text (#413)

2.4.1. / 2017-04-11
==================

  * Ability to add upload failed callback to options #377

2.4.0. / 2016-08-08
==================

  * Add storeMeta option (#333)
  * Remove progressbar on serialize (#375)
  * Encode/decode data-embed-code attribute (#374)
  * Remove default upload url from the code (#373)
  * Fix editor being submitted by clicking on the plugin buttons (#366)
  * Fix button position (#359)

2.3.3 / 2016-07-20
==================

  * Fix buttons and toolbars positions when editor is initialized inside absolute positioned container (#356)
  * Use buttons instead of links to avoid medium-editor conflicts (#355)

2.3.2 / 2016-04-26
==================

  * Fix UMD (#320)

2.3.1 / 2016-04-19
==================

  * Fix UMD dependencies (#314)
  * Fix extending editor's functions (#310, #316)

2.3.0 / 2016-04-12
==================

  * Add auto embedding urls as soon as they are pasted
  * Add UMD wrapper and publish to NPM
  * Fix deleting images when backspace/delete is pressed
  * Re-enable facebook and twitter embedding without oEmbed
  * Fix cursor position after image upload

2.2.4 / 2016-04-05
==================

  * Change dependency versioning to enable minor releases of medium-editor

2.2.3 / 2016-04-04
==================

  * Fix performance when uploading images
  * Update editor's `updatePlaceholder` function
  * Fix initializing plugin when editor's placeholder is turned off

2.2.2 / 2016-02-27
==================

  * Fix serializing html with embed codes containing scripts

2.2.1 / 2016-02-05
==================

  * Fix when `uploadCompleted()` is called - wait until uploaded image replaces preview
  * Fix uploading high quality images
  * Fix bug when an image toolbar action effects all instances of the editor (when using multiple editors on the same page)

2.2.0 / 2016-01-11
==================

  * Add ```fileDeleteOptions``` option to images

2.1.1 / 2015-11-23
==================

  * Fix context for sorting function
  * Add support for editor's ```elementsContainer``` option

2.1.0 / 2015-10-27
==================

  * Add support for ```editableInput``` event
  * Add support for textarea
  * Add ```deleteMethod``` option

2.0.1 / 2015-06-11
==================

  * Fix ```hideButtons``` function

2.0.0 / 2015-06-09
==================

  * **This version works for MediumEditor ```v4.12.0``` and up, because in ```v4.12.0``` MediumEditor changed the way to retrieve extension**
  * Remove deprecated images options: ```uploadScript``` and ```formData```. Use ```fileUploadOptions``` instead.
  * Add ```video-vimeo``` and ```video-youtube``` classes to embedded videos to allow css customization

1.7.0 / 2015-05-11
==================

  * Version bump to 1.7.0, because 1.6.2 added file type and size validation which should cause a minor version bump, not only a patch

1.6.2 / 2015-05-11
==================

  * Fix file type and file size validation
  * Add a rotate animation on button
  * Speed up Travis build

1.6.1 / 2015-04-30
==================

  * Fix initializing plugin without addons
  * Trigger the input event after swapping out the preview image for the real one
  * Change default formData to null

1.6.0/ 2015-04-16
==================

  * Add option ```captions``` (boolean) to images and embeds to enable/disable captions. Captions are enabled by default.
  * Expose option ```fileUploadOptions``` in images to enable file upload configuration
  * Use medium-editor like placeholders for embeds and captions (using ```:after``` CSS pseudo-element instead of actual DOM element)
  * Add support for right click on placeholders (both in embeds and captions) to enable pasting via context menu
  * Deprecate ```uploadScript``` and ```formData``` options in images. Use ```fileUploadOptions``` instead.

1.5.2 / 2015-04-15
==================

  * Remove contenteditable attr and overlay div from embeds on ```serialize```
  * Remove contenteditable attr from figure and figcaption in images on ```serialize```
  * Simplify button positioning

1.5.1 / 2015-04-13
==================

  * Don't add empty paragraph on image deletion, when empty paragraph already exists
  * Fix clicking on placeholder in FF
  * Hide editor's placeholder on image upload
  * Use https for instagram and vimeo
  * Ensure core is ```enabled``` when ```selectEmbed``` or ```selectImage``` are called

1.5.0 / 2015-04-02
==================

  * Update medium-editor to v4.1.1
  * Add support for editor's new ```destroy``` and ```setup``` methods and removed ```activatePlaceholder``` method
  * Add ```formData``` option to images (see [jQuery-File-Upload docs](https://github.com/blueimp/jQuery-File-Upload/wiki/Options#formdata))
  * Add ```uploadCompleted``` callback to images
  * Trigger ```input``` event also when preview image is inserted to the DOM
  * Disable embed toolbars when ```styles```, or ```actions``` options are empty
  * Make sure that after removing caption placeholder, caret is placed inside the caption
  * Hide buttons when toolbar actions are triggered
  * Don't auto remove grid style when removing images
