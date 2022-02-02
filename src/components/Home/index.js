import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import { withAuthorization } from '../Session';
import styles from '../Common';

import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import { withStyles, CssBaseline, Typography, Grid, Paper } from '@material-ui/core';
import NavHeader from '../NavHeader';

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
      props.history.push(ROUTES.LEADERS.replace(':eventKey', 'trek2022'));
    }
  }, [authUser, props.history]);

  return (
    <React.Fragment>
      <CssBaseline />
      <NavHeader title="Thunderbird Park Youth" />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="body1">
                Hi! Thanks for signing in. It looks like this is your first time, so please reach out to Tom Warne via
                email (twarne@gmail.com) or text (623-239-2866) so your account can be set up. Also, he'll want this
                code:
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
