import React, { useEffect, useState } from 'react';
import NavHeader from '../NavHeader';
import { Grid, Link, withStyles, Paper, List, ListItem } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import styles from '../Common';

import _ from 'lodash';

import * as Routes from '../../constants/routes';
import { withFirebase } from '../Firebase';

const LandingPage = props => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState({});

  const { classes } = props;

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

  useEffect(() => {
    console.log('Loading all events');
    props.firebase.loadEvents().then(eventsDoc => {
      console.log(eventsDoc);
      const events = eventsDoc.docs
        .map(eventDoc => {
          console.log('Ref: %s', eventDoc.ref);
          console.log(eventDoc);
          return eventDoc;
        })
        .reduce((map, event) => {
          console.log(event);
          if (event) {
            map[event.ref.path] = { eventDoc: event, eventData: event.data() };
          }
          return map;
        }, {});
      console.log('Loaded events');
      console.log(events);
      setLoading(false);
      setEvents(events);
    });
  }, []);

  return (
    <React.Fragment>
      <NavHeader />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Grid container spacing={24}>
            {!loading && (
              <List className={classes.root}>
                {Array.from(_.values(events)).map(item => (
                  <ListItem key={item.eventDoc.ref.path} divider>
                    <Grid container spacing={24}>
                      <Grid item xs={10}>
                        <Link component={RouterLink} to={Routes.REGISTRATION_WITH_EVENT(item.eventData.key)}>
                          {item.eventData.title} Registration
                        </Link>
                      </Grid>
                      {authUser && (
                        <Grid item xs={10}>
                          <Link component={RouterLink} to={Routes.LEADERS_WITH_EVENT(item.eventData.key)}>
                            {item.eventData.title} Leaders
                          </Link>
                        </Grid>
                      )}
                    </Grid>
                  </ListItem>
                ))}
              </List>
            )}
          </Grid>
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default withFirebase(withStyles(styles)(LandingPage));
