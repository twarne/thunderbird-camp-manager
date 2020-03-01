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
  }, [props.firebase]);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar >
        <Toolbar>
          <Grid container direction="row" alignItems="center" justify="space-between">
            <Grid item xs={2}>
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
