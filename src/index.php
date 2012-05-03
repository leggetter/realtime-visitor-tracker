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
  <script src="js/StyledMarker.js"></script>
  
  <a href="https://github.com/leggetter/realtime-visitor-tracker"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://a248.e.akamai.net/camo.github.com/7afbc8b248c68eb468279e8c17986ad46549fb71/687474703a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub"></a>
</body>
</html>