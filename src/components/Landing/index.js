import React from 'react';
import { withAuthorization } from '../Session';
import NavHeader from '../NavHeader';
import { Grid, Link, withStyles, Paper } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import styles from '../Common';

import * as Routes from '../../constants/routes';

const LandingPage = props => {
  const { authUser, classes } = props;

  return (
    <React.Fragment>
      <NavHeader />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Grid container spacing={24}>
            <Grid item xs={10}>
              <Link component={RouterLink} to={Routes.REGISTRATION_WITH_EVENT('ywcamp2019')}>
                Young Women's Camp 2019 Registration
              </Link>
            </Grid>
            {authUser && (
              <Grid item xs={10}>
                <Link component={RouterLink} to={Routes.LEADERS_WITH_EVENT('ywcamp2019')}>
                  Young Women's Camp Leaders
                </Link>
              </Grid>
            )}
          </Grid>
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default withAuthorization(authUser => true)(withStyles(styles)(LandingPage));
