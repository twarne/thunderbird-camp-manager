import React from 'react';
import PropTypes from 'prop-types';

import styles from '../Common';
import { CssBaseline, AppBar, Toolbar, Typography, withStyles, Grid } from '@material-ui/core';

const NavHeader = props => {
  const { classes, title, menuOnly } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Grid container direction="row" alignItems="center" justify="space-between" spacing={menuOnly ? 4 : 4}>
            {menuOnly && props.children}
            <Grid item xs={!menuOnly && props.children ? 1 : 8}>
              <Typography variant="h4" color="inherit" noWrap className={classes.grow}>
                {title ? title : 'Thunderbird Youth'}
              </Typography>
            </Grid>
            {!menuOnly && props.children}
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

export default withStyles(styles)(NavHeader);
