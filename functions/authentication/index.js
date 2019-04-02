import functions from 'firebase-functions';

exports.onNewUser = functions.auth.user().onCreate(user => {
  console.info('New user login: %s', user.email);
});
