var checkUserLoggedIn, userAuthenticated;

checkUserLoggedIn = function() {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    return Router.go('/');
  } else {
    return this.next();
  }
};

userAuthenticated = function() {
  if (!Meteor.loggingIn() && Meteor.user()) {
    return Router.go('/dashboard');
  } else {
    return this.next();
  }
};

Router.onBeforeAction(checkUserLoggedIn, {
  except: ['index', 'signup', 'login', 'recover-password', 'reset-password']
});

Router.onBeforeAction(userAuthenticated, {
  only: ['index', 'signup', 'login', 'recover-password', 'reset-password']
});
