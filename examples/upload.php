<?php
/*
 * jQuery File Upload Plugin PHP Example 5.14
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

error_reporting(E_ALL | E_STRICT);
require('vendors/UploadHandler.php');
$upload_handler = new UploadHandler(array(
    'upload_dir' => 'uploads/',
    'upload_url' => 'uploads/',
));