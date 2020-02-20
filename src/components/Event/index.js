import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { CssBaseline, AppBar, Typography, Toolbar } from '@material-ui/core';
import { useTheme, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { withFirebase } from '../Firebase';
import EventDetails from '../EventDetails';
import NavHeader from '../NavHeader';
import styles from '../Common';

import * as ROUTES from '../../constants/routes';

const Event = props => {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (props.match.params.eventKey) {
      props.firebase.loadEventDetails(props.match.params.eventKey).then(eventDoc => {
        console.log(eventDoc);
        setLoading(false);
        if (eventDoc.docs.length > 0) {
          setEvent(eventDoc.docs[0].data());
        } else {
          setEvent(null);
        }
      });
    }
  }, []);

  const { classes } = props;
  const theme = useTheme();

  console.log(props.location);
  return (
    <React.Fragment>
      <CssBaseline />
      <NavHeader title={event ? event.title : loading ? 'Loading...' : 'Event not found!'} />
      {event && (
        <React.Fragment>
          <EventDetails event={event} />
          <div className="formLink">
            <Link
              to={{
                pathname: ROUTES.REGISTRATION.replace(':eventKey', event.key),
                state: { event: event }
              }}
            >
              Register
            </Link>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

Event.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withFirebase(withStyles(styles)(Event));
