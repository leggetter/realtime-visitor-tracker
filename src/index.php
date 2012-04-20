<?php
  require_once('config.php');
?>

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Realtime Visitor Tracker Example</title>
  <meta name="description" content="Realtime Visitor Tracker Example" />
  <link rel="stylesheet" href="css/styles.css?v=1.0" />
  <!--[if lt IE 9]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
</head>
<body>
  
  <div id="map"></div>
  
  <script>
    var APP_KEY = '<?php echo(APP_KEY); ?>';
  </script>
  <script src="http://js.pusher.com/1.12/pusher.min.js"></script>
  <script src="http://maps.googleapis.com/maps/api/js?sensor=true"></script>
  <script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
  <script src="js/tracker.js"></script>
  <script src="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/styledmarker/src/StyledMarker.js"></script>
</body>
</html>