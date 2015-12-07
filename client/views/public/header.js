Template.header.events({
  'click .logout': function(e, t) {
    return Meteor.logout(function(error) {
      if (error) {
        return alert(error.reason);
      }
    });
  }
});
