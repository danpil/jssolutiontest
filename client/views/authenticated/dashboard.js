Template.dashboard.onCreated(function() {
  this.subscribe("requests");
  var self = this;
  self.markers = [];
  GoogleMaps.ready('map', function(map) {
    google.maps.event.addListener(map.instance, 'click', function(event) {
      Session.set("latLng", {lat: event.latLng.lat(), lng: event.latLng.lng()});
    });
    self.map = map;
  });
});

Template.dashboard.onRendered(function () {
});

Template.dashboard.helpers({
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(35.68, 139.75),
        zoom: 8
      };
    }
  },
  venues: function() {
    var venues = Session.get('venues');
    if (venues) {
      return venues;
    } else {
      return false;
    }
  },
  requests: function() {
    var requests = Requests.find({});
    if (requests) {
      return requests;
    } else {
      return false;
    }
  }
});

Template.dashboard.events({
  "keypress #inputSearch": function(e, t) {
    var params;
    if (e.keyCode === 13) {
      if (!Session.get("latLng")) {
        Bert.alert( 'Select a location!', 'danger' );
        return;
      }
      if (t.markers.length > 0) {
        t.markers.forEach(function(marker) {
          marker.setMap(null);
        });
      }
      t.markers = [];
      FoursquareApiHelper(t.$('#inputSearch').val(), t.map, t.markers);
    }
  },
  "click .request": function(e, t) {
    var domElement = e.currentTarget;
    var data = domElement.dataset;
    var request = Requests.findOne({_id: data.id});
    Session.set("venues", request.venues);
    t.markers = MarkerSetHelper(t.markers, t.map);
  },
  "click a": function(e, t) {
    e.stopPropagation();
    var domElement = e.currentTarget;
    var data = domElement.dataset;
    Requests.remove({_id: data.id});
  }
});
