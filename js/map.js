//variables pour initialiser la carte et le watchID (qui sert pour la géolocalisation en temps réel)
var map;
var watchID = null;
		
		
	function centerPos(controlDiv, map) {

		  // Set CSS styles for the DIV containing the control
		  // Setting padding to 5 px will offset the control
		  // from the edge of the map
		  controlDiv.style.padding = '5px';

		  // Set CSS for the control border
		  var controlUI = document.createElement('div');
		  controlUI.style.backgroundColor = 'white';
		  controlUI.style.borderStyle = 'solid';
		  controlUI.style.borderWidth = '6px';
		  controlUI.style.cursor = 'pointer';
		  controlUI.style.textAlign = 'center';
		  controlUI.title = 'Click to set the map to Home';
		  controlDiv.appendChild(controlUI);

		  // Set CSS for the control interior
		  var controlText = document.createElement('div');
		  controlText.style.fontFamily = 'Arial,sans-serif';
		  controlText.style.fontSize = '12px';
		  controlText.style.paddingLeft = '4px';
		  controlText.style.paddingRight = '4px';
		  controlText.innerHTML = '<b>Centrer</b>';
		  controlUI.appendChild(controlText);

		  // Setup the click event listeners: simply set the map to
		  // Chicago
		  google.maps.event.addDomListener(controlUI, 'click', function() {
			findMyLocation();
		  });

	}

// fonction initialize qui s'active dès le chargement de la page : affiche la carte, centrée sur la position du mobile, 
function initialize() {
		
		
		// Bout de code ajax qui va afficher les marqueurs et les rendre clicables
		$.ajax({
			type: 'GET',
			url: 'http://www.argosapps.fr/test_markers/liste_lieux_geo.php?&jsoncallback=?', //jsoncallback très important sinon requête ne va pas marcher
			dataType: 'JSONp',
			timeout: 8000,
			success: function(data) {
				
				$.each(data, function(i,item){
				$('#markers').append('<p> Lieu : ' + item.nom_lieu + ' Latitude : ' + item.latitude + ' longitude : ' + item.longitude + '</p>');
					var LatLngMarker = new google.maps.LatLng(item.latitude, item.longitude);
					var marker = new google.maps.Marker({
						position: LatLngMarker,
						map: map,
						title : item.nom_lieu
					});
					
					google.maps.event.addListener(marker, "click",  function (e) {												
						//closeIw(iw);
						//if (iw) {iw.setMap(null)};
						//	iw.close();
						var iw = new google.maps.InfoWindow({
							content : '<div class="iwContent"><a href=" ' + marker.title +'.html">' + marker.title + '</a> </div>',
							maxWidth : 800
						});					
						iw.open(map, marker); 
					});
					
				});
			},
			error: function(data) {
				alert('Buuuug');
			}
		});






google.maps.visualRefresh = true;
	
	var mapOptions = {zoom: 13, mapTypeId: google.maps.MapTypeId.TERRAIN, disableDefaultUI: true}; //
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  

  var posControlDiv = document.createElement('div');
  var posControl = new centerPos(posControlDiv, map);

  posControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(posControlDiv);
	
	
	
	 //On place les marqueurs ici 
	 
	 // google.maps.LatLng est une variable qui contient deux coordonnées latitude et longitude. On va l'utiliser a chaque fois afin que la position soit utilisable dans les fonctions de l'API maps 
	

	  
	  
  // Try HTML5 geolocation
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
		
		//On entre les coordonnées du centre de la carte dans une variable (ici ce sont des coordonnées aléatoires pour voir si la position s'actualise bien quand on appuie sur les boutons) 
		  var pos = new google.maps.LatLng(48.8808876, 2.3405177);
		
		//On crée une petite infobulle pour montrer précisément l'endroit ou on est
		  var infowindow = new google.maps.InfoWindow({
			map: map,
			position: pos,
			content: 'Vous êtes ici'
		  });
		
		//Puis on centre sur le point
		  map.setCenter(pos);
		  
		  //on appelle les fonctions qui préviennent que la géolocalisation marche ou pas (si ça marche elle n'affiche rien) 
		}, function() { //si ça marche, la fonction envoie la valeur true 
		  handleNoGeolocation(true);
		});
	  }   else {
		// Browser doesn't support Geolocation
		handleNoGeolocation(false);
		};
		
		

};
  


//Affiche l'erreur, et affiche une page avec une coordonnée fixe 
function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }
  //fin des tests pour identifier l'erreur
  
  //on dessine maintenant la nouvelle carte et on la centre sur la position fixe
  var options = {
    map: map,
    position: new google.maps.LatLng(48.51181, 2.20324),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}


//la fonction pour récupérer notre position actuelle et recentrer la carte 
function findMyLocation() {
	    navigator.geolocation.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			
			//sert a afficher les informations récupérées par le gps pour les afficher sous forme de texte
			var element = document.getElementById('geolocation');
			element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
								'Longitude: '          + position.coords.longitude             + '<br />' +
								'Altitude: '           + position.coords.altitude              + '<br />' +
								'Accuracy: '           + position.coords.accuracy              + '<br />' +
								'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
								'Heading: '            + position.coords.heading               + '<br />' +
								'Speed: '              + position.coords.speed                 + '<br />' +
								'Timestamp: '          + position.timestamp                    + '<br />';
								
			//change l'infobulle pour la centrer sur notre position
			var infowindow = new google.maps.InfoWindow({
				map: map,
				position: pos,
				content: 'Vous êtes ici mouahahaha'
			});
			map.setCenter(pos);
			
		});

};




// Watch : fonction pour activer la géolocalisation en temps réel 
function Watch () {
		
		var options = { //on définit les options de la fonction watchID, timeout : le temps avant que la position ne se rafraichisse (pas sur)  enableHighAccuracy : activer la géolocalisation précise 
			timeout: 10000,
			enableHighAccuracy : true
		};
        watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
};
			
			
			function onSuccess(position) { //si la récupération des coordonnées marche, on appelle cette fonction 
					var positionWatch = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					alert('ça marche !'); 
					// les 10 lignes ci dessus permettent d'afficher les coordonnées récupérées en texte 
					var element = document.getElementById('geolocation');
					element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
								'Longitude: '          + position.coords.longitude             + '<br />' +
								'Altitude: '           + position.coords.altitude              + '<br />' +
								'Accuracy: '           + position.coords.accuracy              + '<br />' +
								'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
								'Heading: '            + position.coords.heading               + '<br />' +
								'Speed: '              + position.coords.speed                 + '<br />' +
								'Timestamp: '          + position.timestamp                    + '<br />';
					
					map.setCenter(positionWatch);
					      var infowindow = new google.maps.InfoWindow({
							map: map,
							position: positionWatch,
							content: 'Vous êtes ici'
						  });
			};
			
			//fonction appellée si la récupération de coordonnées ne marche pas. c'est facultatif et ne sert surtout que pour le developpement 
			function onError(error) {
				alert('code: '    + error.code    + '\n message: ' + error.message + '\n');
			};

	//la fonction clearWatch désactive la géolocalisation en temps réel, si elle n'est pas activée quand on veut la désactiver un message s'affiche pour dire que la fonction n'est pas activée 
	 function clearWatch() {
        if (watchID != null) {
            navigator.geolocation.clearWatch(watchID);
            watchID = null;
			alert('NSA : "ok pardon on arrete :(" ');
        } else {
			alert('Pour désactiver le watchID, faut l\'activer !');
		};
	};	


// Voici l'écouteur qui va, une fois la page chargée, appeller la fonction initialize ci dessus 
google.maps.event.addDomListener(window, 'load', initialize);