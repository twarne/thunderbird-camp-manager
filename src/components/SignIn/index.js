import React  from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import PropTypes from 'prop-types';

import firebase from 'firebase';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { withStyles, CssBaseline } from '@material-ui/core';
import NavHeader from '../NavHeader';

import styles from '../Common';

const SignInPage = props => {
  const { firebase: _firebase, classes } = props;

  const signInSuccessCB = socialAuthUser => {
    // Create a user in your Firebase Realtime Database too
    if (socialAuthUser.additionalUserInfo.isNewUser) {
      _firebase.storeUser(socialAuthUser.user.uid, {
        name: socialAuthUser.user.displayName,
        email: socialAuthUser.user.email,
        roles: []
      }).then(() => props.history.push(ROUTES.HOME));
    } else {
      _firebase.user(socialAuthUser.user.uid).then(() => props.history.push(ROUTES.HOME));
    }

    return false;
  };

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: signInSuccessCB
    }
  };

    return (
      <React.Fragment>
        <CssBaseline />
        <NavHeader title="Sign In" />
        <main className={classes.layout}>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </main>
      </React.Fragment>
    );
};

SignInPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const ComposedSignInPage = compose(withRouter, withFirebase)(SignInPage);

export default withStyles(styles)(ComposedSignInPage);
