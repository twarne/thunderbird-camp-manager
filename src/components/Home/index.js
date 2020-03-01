import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import { withAuthorization } from '../Session';
import styles from '../Common';

import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import { withStyles, CssBaseline, AppBar, Toolbar, Typography, Grid, Button, Paper } from '@material-ui/core';

const HomePage = props => {
  const { classes, authUser } = props;

  const isAuthorized = authUser =>
    authUser &&
    authUser.roles &&
    (authUser.roles.includes(ROLES.WARD_LEADER) ||
      authUser.roles.includes(ROLES.STAKE_LEADER) ||
      authUser.roles.includes(ROLES.ADMIN));

  useEffect(() => {
    if (isAuthorized(authUser)) {
      props.history.push(ROUTES.LEADERS.replace(':eventKey', 'ywcamp2019'));
    }
  }, [authUser, props.history]);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
            Contact us
          </Typography>
          <Button onClick={props.firebase.doSignOut} className={classes.button}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Grid container spacing={24}>
            <Grid item xs={8}>
              <Typography variant="body1">
                Hi! Thanks for signing in. It looks like this is your first time, so please reach out to Tom Warne via
                email (twarne@gmail.com) or text (623-239-2866) to let him know which ward you're in so your account can
                be set up. Also, he'll want this code:
              </Typography>
              <Typography variant="subtitle1">{authUser.uid}</Typography>
              <Typography variant="h4">Thank you!</Typography>
            </Grid>
          </Grid>
        </Paper>
      </main>
    </React.Fragment>
  );
};

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withAuthorization(authUser => authUser)(withStyles(styles)(HomePage));
