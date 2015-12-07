MarkerSetHelper = function(markers, map) {
  var venues;
  if (markers.length > 0) {
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
  }
  markers = [];
  venues = Session.get("venues");
  venues.forEach(function(el) {
    var marker = new google.maps.Marker({
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(el.lat, el.lng),
      map: map.instance,
      labelContent: el.name
    });
    markers.push(marker);
  });
  return markers;
};
