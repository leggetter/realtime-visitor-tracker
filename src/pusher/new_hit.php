<?php
  require_once('../config.php');
  require_once('Pusher.php');
  
  $data = array(
    'lat' => $_POST['lat'],
    'lng' => $_POST['lng'],
    'locality' => $_POST['locality'],
    'page' => $_SERVER['HTTP_REFERER']
  );
  
  $pusher = new Pusher(APP_KEY, APP_SECRET, APP_ID);
  $pusher->trigger('visitor-hits', 'new_hit', $data);
  
  header('Content-type: application/json');
  echo( json_encode($data) );
?>