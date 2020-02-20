import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styles from '../Common';
import { CssBaseline, AppBar, Toolbar, Typography, Button, withStyles } from '@material-ui/core';

import * as ROLES from '../../constants/roles';
import { withFirebase } from '../Firebase';

const NavHeader = props => {
  const [authUser, setAuthUser] = useState(null);

  const { classes, title } = props;

  useEffect(() => {
    return props.firebase.onAuthUserListener(
      authUser => {
        setAuthUser(authUser);
      },
      () => {
        setAuthUser(null);
      }
    );
  }, []);

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
          {props.children}
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

export default withFirebase(withStyles(styles)(NavHeader));
