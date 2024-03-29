Template.index.events({
  'click .btn-facebook': function() {
    return Meteor.loginWithFacebook({
      requestPermissions: ['email']
    }, function(error) {
      if (error) {
        return console.log(error.reason);
      }
    });
  },
  'click .btn-google': function() {
    return Meteor.loginWithGoogle({
      requestPermissions: ['email']
    }, function(error) {
      if (error) {
        return console.log(error.reason);
      }
    });
  }
});
