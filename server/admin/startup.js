Meteor.startup(function() {
  var checkUser, createServiceConfiguration, i, id, len, results, user, users;
  process.env.MAIL_URL = "Insert your own MAIL_URL from your email provider here.";
  createServiceConfiguration = function(service, clientId, secret) {
    var config;
    ServiceConfiguration.configurations.remove({
      service: service
    });
    config = {
      generic: {
        service: service,
        clientId: clientId,
        secret: secret
      },
      facebook: {
        service: service,
        appId: clientId,
        secret: secret
      },
      twitter: {
        service: service,
        consumerKey: clientId,
        secret: secret
      }
    };
    switch (service) {
      case 'facebook':
        return ServiceConfiguration.configurations.insert(config.facebook);
      case 'twitter':
        return ServiceConfiguration.configurations.insert(config.twitter);
      default:
        return ServiceConfiguration.configurations.insert(config.generic);
    }
  };

  createServiceConfiguration('google', '510011154166-h5647amdnu8e1sl17n5iuli45981k9kh.apps.googleusercontent.com', 'GHoHeJVZLwS9GnVhA5PYIm78');
});
