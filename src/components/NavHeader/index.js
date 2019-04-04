import React from 'react';
import PropTypes from 'prop-types';

import { withAuthorization } from '../Session';
import styles from '../Common';
import { CssBaseline, AppBar, Toolbar, Typography, Button, withStyles } from '@material-ui/core';

import * as ROLES from '../../constants/roles';

const NavHeader = props => {
  const { authUser, classes, title } = props;

  const isLeader =
    authUser &&
    authUser.roles &&
    (authUser.roles.includes(ROLES.WARD_LEADER) ||
      authUser.roles.includes(ROLES.STAKE_LEADER) ||
      authUser.roles.includes(ROLES.ADMIN));

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h4" color="inherit" noWrap className={classes.grow}>
            {title ? `Thunderbird Youth - ${title}` : 'Thunderbird Youth'}
          </Typography>
          {authUser && (
            <Button onClick={props.firebase.doSignOut} className={classes.button}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

NavHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withAuthorization(authUser => true)(withStyles(styles)(NavHeader));
