import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import styles from "../Common";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  withStyles,
  Grid
} from "@material-ui/core";

import * as ROLES from "../../constants/roles";
import { withFirebase } from "../Firebase";

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
      <AppBar color="default" className={classes.appBar}>
        <Toolbar>
          <Grid container direction="row">
            <Grid item xs={3}>
              <Typography
                variant="h4"
                color="inherit"
                noWrap
                className={classes.grow}
              >
                {title ? title : "Thunderbird Youth"}
              </Typography>
            </Grid>
            {props.children}
            {authUser && (
              <Grid item xs={1}>
                <Button
                  onClick={props.firebase.doSignOut}
                  className={classes.button}
                >
                  Logout
                </Button>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

NavHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withFirebase(withStyles(styles)(NavHeader));
