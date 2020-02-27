import React, { useEffect, useState } from 'react';

import { Grid, Link, withStyles, Paper, List, ListItem } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import * as Routes from '../../constants/routes';

const TrekLanding = props => {
  const event = props.event;
  console.log(event);

  return (
    <React.Fragment>
      <Grid container>
        <Grid container item>
          <Grid item xs={12} sm={6}>
            <h2>Trek 2020</h2>
          </Grid>
          <Grid item xs={12} sm={6}>
            <span>June 3-6, 2020</span>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs={12} sm={6}>
            <h2>Registration</h2>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Link component={RouterLink} to={Routes.REGISTRATION_WITH_EVENT(event.key)}>
              {event.title} Registration
            </Link>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs={12} sm={6}>
            <h2>Dates to Remember</h2>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ul>
              <li>March 24 - Stetson Valley Fireside</li>
              <li>March 25 - Arrowhead Ranch and Sierra Verde Fireside</li>
              <li>April 1 - Mountain Ridge Fireside</li>
              <li>April 8 - Thunderbird Hills Fireside</li>
              <li>April 15 - Sonoran Mountain Fireside</li>
              <li>May 30 - Equipment Check</li>
              <li>June 3-6 - Trek</li>
            </ul>
          </Grid>
        </Grid>
      </Grid>
      <div></div>
      <div>
        <h2>What to Pack</h2>
      </div>
      <div>
        <h2>What to Wear</h2>
      </div>
      <div>
        <h2>Physical Preparation</h2>
      </div>
      <div>
        <h2>Spiritual Preparation</h2>
      </div>
    </React.Fragment>
  );
};

export default TrekLanding;
