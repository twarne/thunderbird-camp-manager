import React, { useState, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import PropTypes from 'prop-types';

import firebase from 'firebase';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { withStyles, AppBar, Toolbar, Typography, Grid, ButtonBase, CssBaseline, Paper } from '@material-ui/core';
import NavHeader from '../NavHeader';

import styles from '../Common';

const SignInPage = props => {
  const [authUser, setAuthUser] = useState(null);

  const { firebase: _firebase, classes } = props;

  useEffect(() => {
    //   _firebase.doSignOut();
  }, []);

  useEffect(() => {
    return props.firebase.onAuthUserListener(
      authUser => {
        setAuthUser(authUser);
      },
      () => {
        setAuthUser(null);
      }
    );
  }, [props.firebase]);

  const signInSuccessCB = socialAuthUser => {
    console.log('Sign in successful for user');
    console.log(socialAuthUser);
    // Create a user in your Firebase Realtime Database too
    if (socialAuthUser.additionalUserInfo.isNewUser) {
      console.log('New user!!');
      _firebase.storeUser(socialAuthUser.user.uid, {
        name: socialAuthUser.user.displayName,
        email: socialAuthUser.user.email,
        roles: []
      });
    } else {
      console.log('Known usesr');
      _firebase.user(socialAuthUser.user.uid);
    }

    return true;
  };

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: ROUTES.HOME,
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

  if (authUser) {
    return <Redirect to={ROUTES.HOME} />;
  } else {
    return (
      <React.Fragment>
        <CssBaseline />
        <NavHeader title="Sign In" />
        <main className={classes.layout}>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </main>
      </React.Fragment>
    );
  }
};

SignInPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const ComposedSignInPage = compose(withRouter, withFirebase)(SignInPage);

export default withStyles(styles)(ComposedSignInPage);
