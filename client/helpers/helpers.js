FoursquareApiHelper = function(search, map, markers) {
  var ll = Session.get("latLng");
  params = {
    client_id: '0T4U35ZMWOIS5ZSAF1YCFGLDOCPARFGML0044QPEKCROK5IH',
    client_secret: 'CDVGKK5XRUZYLIO24LH1WCT3ZYNTBXQ1QJXKYVOHM0CVAE2M',
    ll: ll.lat + ", " + ll.lng,
    v: '20140806',
    query: search,
    limit: 10
  };
  HTTP.call('GET', 'https://api.foursquare.com/v2/venues/search', {
    params: params
  }, function(error, response) {
    var queryResult;
    if (error) {
      return console.log(error);
    } else {
      queryResult = response.data.response.venues;
      console.log(queryResult);
      queryResult = queryResult.map(function(venue) {
        var obj = {
          street: venue.location.address,
          lat: venue.location.lat,
          lng: venue.location.lng,
          city: venue.location.city,
          venueName: venue.name,
          distance: venue.location.distance / 1000
        };
        return obj;
      });
      Requests.insert({
        ownerId: Meteor.userId(),
        search: search,
        date: moment().format('MMM DD YYYY, h:mm a'),
        lat: ll.lat,
        lng: ll.lng,
        venues: queryResult
      });
      Session.set("venues", queryResult);
      queryResult.forEach(function(el) {
        var marker = new google.maps.Marker({
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(el.lat, el.lng),
          map: map.instance,
          labelContent: el.name
        });
        markers.push(marker);
      });
      return;
    }
  });
};
