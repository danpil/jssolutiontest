Template.table2.helpers({
  venues: function() {
    var venues = Session.get('venues');
    if (venues) {
      return venues;
    } else {
      return false;
    }
  },
  quantity: function() {
    var venues = Session.get('venues');
    return venues.length;
  }
});

Template.table2.events({
  "click .export-csv": function(e, t) {
    e.stopPropagation();
    exportCsvHelper.exportVenues();
  }
});
