exportCsvHelper = {
  exportVenues: function() {
    var fields = ['Name', 'City', 'Street', 'Distance', 'Latitude', 'Longitude'];
    var data = [];
    _.each(Session.get("venues"), function(c) {
      data.push([
        c.venueName,
        c.city,
        c.street,
        c.distance,
        c.lat,
        c.lng
      ]);
    });
    var csv = Papa.unparse({fields: fields, data: data});
    this._downloadCSV(csv);
  },
  _downloadCSV: function(csv) {
    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
    a.download = "venues.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};
