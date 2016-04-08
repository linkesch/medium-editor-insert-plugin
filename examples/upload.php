<?php

$dir = 'uploads';

if (file_exists('uploads') == false) {
	mkdir($dir, 0777);
}

$destination = $dir .'/'. $_FILES['file']['name'];

move_uploaded_file($_FILES['file']['tmp_name'], $destination);

echo $destination;
