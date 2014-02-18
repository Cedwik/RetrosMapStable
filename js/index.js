/*

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.rece ivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


var map;
var watchID = null;

function initialize() {
var mapOptions = {zoom: 13};
map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	 // On place les marqueurs ici 
	var LatLngMarker = new google.maps.LatLng(48.8552205,  2.3331135);
	
	var marker = new google.maps.Marker({
		position: LatLngMarker,
		map: map,
		title:"Le Procope"
	});
	  
	  
  // Try HTML5 geolocation
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
		
		// On entre les coordonnées du centre de la carte dans une variable
		  var pos = new google.maps.LatLng(48.51181, 2.20324);
		
		// On crée une petite infobulle pour montrer précisément l'endroit ou on est
		  var infowindow = new google.maps.InfoWindow({
			map: map,
			position: pos,
			content: 'Vous êtes ici'
		  });
		
		// Puis on centre sur le point
		  map.setCenter(pos);
		  
		  // on appelle les fonctions qui préviennent que la géolocalisation marche ou pas (si ça marche elle n'affiche rien) 
		}, function() {
		  handleNoGeolocation(true);
		});
	  }   else {
		// Browser doesn't support Geolocation
		handleNoGeolocation(false);
		};

	};
  


// Affiche l'erreur, et affiche une page avec une coordonnée fixe 
function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }
  // fin des tests pour identifier l'erreur
  
  // on dessine maintenant la nouvelle carte et on la centre sur la position fixe
  var options = {
    map: map,
    position: new google.maps.LatLng(48.51181, 2.20324),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);


// la fonction pour récupérer notre position actuelle et recentrer la carte 
function findMyLocation() {
	    navigator.geolocation.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			
			// sert a afficher les informations récupérées par le gps pour les afficher sous forme de texte
			var element = document.getElementById('geolocation');
			element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
								'Longitude: '          + position.coords.longitude             + '<br />' +
								'Altitude: '           + position.coords.altitude              + '<br />' +
								'Accuracy: '           + position.coords.accuracy              + '<br />' +
								'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
								'Heading: '            + position.coords.heading               + '<br />' +
								'Speed: '              + position.coords.speed                 + '<br />' +
								'Timestamp: '          + position.timestamp                    + '<br />';
			// change l'infobulle pour la centrer sur notre position
			var infowindow = new google.maps.InfoWindow({
				map: map,
				position: pos,
				content: 'Vous êtes ici'
			});
			map.setCenter(pos);
			
		});

};




// ICI LA FONCTION POUR ACTUALISER LA POSITION REGULIEREMENT
function WatchPosition () {
		var options = { timeout: 10000, enableHighAccuracy: true };
        watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
};
			
			function onSuccess(position) {
					var positionWatch = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					alert('ça marche !'); 
					map.setCenter(positionWatch);
					      var infowindow = new google.maps.InfoWindow({
							map: map,
							position: positionWatch,
							content: 'Vous êtes ici'
						  });
			};
			
			function onError(error) {
				alert('code: '    + error.code    + '\n message: ' + error.message + '\n');
			};
			

	 function clearWatch() {
        if (watchID != null) {
            navigator.geolocation.clearWatch(watchID);
            watchID = null;
			alert('NSA : "ok pardon on arrete :(" ');
        } else {
			alert('Pour désactiver le WatchPosition, faudrait peut être l activer avant...');
		};
	};
