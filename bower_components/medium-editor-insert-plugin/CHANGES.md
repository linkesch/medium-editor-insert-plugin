
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
