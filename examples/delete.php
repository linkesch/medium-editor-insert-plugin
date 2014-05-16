<?php

/**
 * WARNING!
 *
 * This file serves only for demonstration purposes. For using in production, please remember to think about security.
 */

if(empty($_POST['file']))
{
  exit();
}

if(file_exists($_POST['file']))
{
  unlink($_POST['file']);
}
