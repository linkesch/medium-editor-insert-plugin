
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
