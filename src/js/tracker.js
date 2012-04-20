;(function(){
    
    Pusher.log = function(msg) {
      if(window.console && window.console.log) {
        window.console.log(msg);
      }
    };
  
    var pusher = new Pusher(APP_KEY);
    pusher.connection.bind('state_change', function(state) {
      if( state.current === 'connected' ) {
        navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
      }
    });
    
    var channel = pusher.subscribe('visitor-hits');
    channel.bind('new_hit', newHitReceived);

    function newHitReceived(data) {
      var latLng = new google.maps.LatLng(data.lat, data.lng);
      
      var styleMaker = new StyledMarker({
        styleIcon: new StyledIcon(
          StyledIconTypes.BUBBLE,
          {
            color:"fff",
            text:data.locality
          }),
        position: latLng,
        map: map,
        animation: google.maps.Animation.DROP
      });
      
      var contentString = '' +
      '<div class="visitor-info">' +
        '<strong>Locality:</strong> ' + data.locality + '<br />' +
        '<strong>Lat/Lng:</strong> ' + data.lat + ', ' + data.lng + '<br />' +
        '<strong>Page:</strong> <a href="' + data.page + '">' + data.page.replace(/https?:\/\/[^/]*/, '') + '</a><br />' +
      '</div>';

      var infowindow = new google.maps.InfoWindow({content: contentString});
      google.maps.event.addListener(styleMaker, 'click', function() {
        infowindow.open(map, styleMaker);
      });
    }

    var visitorPosition = null;
    function positionSuccess(position) {
      visitorPosition = position;
      var lat = visitorPosition.coords.latitude;
      var lng = visitorPosition.coords.longitude;
      
      var location = new google.maps.LatLng(lat, lng);
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({location: location}, function(response, status) {
        geocodeResponse.call(this, response, status, location)
      });
      
      createMap();
    }
    
    function geocodeResponse(response, status, location) {
      var locality = null;
      if(status == google.maps.GeocoderStatus.OK) {
        locality = findLocality(response);
      }
      
      if(locality != null) {
        $.ajax({
          url: 'pusher/new_hit.php',
          type: 'post',
          data: {
            locality: locality.formatted_address,
            lat: visitorPosition.coords.latitude,
            lng: visitorPosition.coords.longitude
          },
          success: function(data, textStatus, jqXHR) {},
          error: function (jqXHR, textStatus, errorThrown) { alert('error'); }
        });
      }
    }
    
    function findLocality(addresses) {
      if(addresses.length == 0) {
        return null;
      }
      
      for(var addrIndex = 0, addrCount = addresses.length; addrIndex < addrCount; ++addrIndex) {
        var address = addresses[addrIndex];
        for(var typeIndex = 0, typeCount = address.types.length; typeIndex < typeCount; ++typeIndex) {
          if(address.types[typeIndex] == "locality") {
            return address;
          }
        }
      }
      
      return addresses[0];
    }

    function positionError(error) {
      alert('position error');
    }
    
    var map = null;
    function createMap() {
      var visitorLocation =
        new google.maps.LatLng(
          visitorPosition.coords.latitude,
          visitorPosition.coords.longitude);
          
      var mapOptions = {
        zoom: 2,
        center: visitorLocation,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      
      map = new google.maps.Map(document.getElementById("map"), mapOptions);
    }
    
})()