import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import PropTypes from 'prop-types';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { withStyles, AppBar, Toolbar, Typography, Grid, ButtonBase, CssBaseline, Paper } from '@material-ui/core';

import styles from '../Common';

const SignInPage = props => {
  const { classes } = props;

  const googleSignIn = event => {
    console.log('Logging in with Google');
    props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        if (socialAuthUser.additionalUserInfo.isNewUser) {
          return props.firebase.storeUser(socialAuthUser.user.uid, {
            name: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            roles: []
          });
        } else {
          return props.firebase.user(socialAuthUser.user.uid);
        }
      })
      .then(() => {
        props.history.push(ROUTES.HOME);
      });

    event.preventDefault();
  };

  const fbSignIn = event => {
    console.log('Logging in with Facebook');
    props.firebase
      .doSignInWithFB()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        if (socialAuthUser.additionalUserInfo.isNewUser) {
          return props.firebase.storeUser(socialAuthUser.user.uid, {
            name: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            roles: []
          });
        } else {
          return props.firebase.user(socialAuthUser.user.uid);
        }
      })
      .then(() => {
        props.history.push(ROUTES.HOME);
      });

    event.preventDefault();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
            Sign in
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="body1" gutterBottom>
            Please sign in to continue:
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <ButtonBase onClick={googleSignIn}>
                <img src="/img/btn_google_signin_dark_normal_web.png" alt="Sign in with Google" />
              </ButtonBase>
            </Grid>
            <Grid item xs={6}>
              <ButtonBase onClick={fbSignIn}>
                <div className={classes.fbLogin}>
                  <img src="/img/fb_f.png" alt="Sign in with Facebook" className={classes.fbLogo} />
                  <span variant="button" className={classes.fbText}>
                    Login with Facebook
                  </span>
                </div>
              </ButtonBase>
            </Grid>
          </Grid>
        </Paper>
      </main>
    </React.Fragment>
  );
};

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Google</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

SignInPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const ComposedSignInPage = compose(
  withRouter,
  withFirebase
)(SignInPage);

export default withStyles(styles)(ComposedSignInPage);
