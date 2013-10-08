<?php 

if(empty($_FILES['file']))
{
  exit();
}

$destination = 'uploads/'. $_FILES['file']['name'];

move_uploaded_file($_FILES['file']['tmp_name'], $destination);

echo $destination;