<?php
 
require 'instagram.class.php';
 
$instagram = new Instagram(array(
  'apiKey'      => '',
  'apiSecret'   => '',
  'apiCallback' => ''
));
 
$token = $_GET["access_token"];
$instagram->setAccessToken($token);
 
$id = $_GET["mid"];
$result = $instagram->likeMedia($id);
 
echo $result->meta->code;
?>