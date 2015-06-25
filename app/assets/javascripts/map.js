$(document).ready(function() {

  //Set mapbox map view
  L.mapbox.accessToken = $('#map-data').data('token')
  var map         = L.mapbox.map('map', 'fredblock.mfga25ge');
  var markerLayer = L.mapbox.featureLayer().addTo(map);
  var home        = [39.750081, -104.999703];
  var geolocate   = document.getElementById('geolocate');
  var popup       = L.popup();
  map.setView(home, 13);

  // L.control.locate({
  //     drawCircle: true,
  //     setView: true,
  //     locateOptions:{maxZoom:14}
  // }).addTo(map);


  // var geojsonData = $('#map-data').data('geojson')

  // markerLayer.setGeoJSON(geojsonData);



  function createPoints(coordinates){
    var url = '/maps.json'
    if (coordinates !== undefined) {
      url += '?lat=' + coordinates['lat'] + '&lon=' + coordinates['lng'];
    }
    $.get(url, function(data) {
      markerLayer.on('mouseover', function(e) {
      var marker  = e.layer;
      popUpAll(marker);
    });

    // markerLayer.on('mouseout', function(e) {
    //   e.layer.closePopup();
    // });

    // addRows(data)
    // mapHighlight(data)
    // addTags(popularHashes(data))

    markerLayer.setGeoJSON(data);
  });



  function popUpAll(marker){
    // debugger
    var popupContent = "<b>"          + marker.feature.properties.title +
                       "</b><br>"     + marker.feature.properties.venue_name +
                       "<br><a href=" + marker.feature.properties.url +
                       " class='btn btn-default' target='_blank'>details</a>"



    // var popupContent = '<a target="_blank" class="popup" href="#"> </a>'
    //                    + '<p> <img class="popup-pic" src="'
    //                    + marker.feature.properties.url + '"/> </p>'

    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: false,
        maxWidth: 220
    });

    marker.openPopup();
  }

  };



// This uses the HTML5 geolocation API, which is available on
// most mobile browsers and modern browsers, but not in Internet Explorer
// See this chart of compatibility for details:
// http://caniuse.com/#feat=geolocation
if (!navigator.geolocation) {
    geolocate.innerHTML = 'Geolocation is not available';
} else {
    geolocate.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        map.locate();
    };
}

map.on('locationfound', function(e) {
    map.setView(e.latlng, 13);
    markerLayer.clearLayers()
    createPoints(e.latlng);
  });


// If the user chooses not to allow their location
// to be shared, display an error message.
map.on('locationerror', function() {
    geolocate.innerHTML = 'Position could not be found';
});



function onMapClick(e){
      popup
          .setLatLng(e.latlng)
          .setContent("<p>...finding events around you...</p>")
          .openOn(map);
          markerLayer.clearLayers()
          createPoints(e.latlng);
  }

  map.on('click', onMapClick);

  // Create points on page load
  createPoints();



  // map.on('locationfound', function(e) {
  //   map.setView(e.latlng, 16);
  // });







  // markerLayer.on('mouseover', function(e) {
  //   var marker  = e.layer;
  //   var popupContent = '<a target="_blank" class="popup" href="#"> </a>' +
  //                     //  '<p> <img class="popup-pic" src="' + marker.feature.properties.thumbnail + '"/> <br>' +
  //                                       marker.feature.properties.title + "<br>Title: " +
  //                                       marker.feature.properties.venue_name + "<br>Venue: "
  //                               '</p>'
  //   // http://leafletjs.com/reference.html#popup
  //   marker.bindPopup(popupContent,{
  //       closeButton: false,
  //       maxWidth: 220
  //   });
  //
  //   marker.openPopup();
  //
  // });
  //
  // markerLayer.on('mouseout', function(e) {
  //   e.layer.closePopup();
  // });

});
