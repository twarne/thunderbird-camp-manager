import React, { useState, useEffect } from 'react';

import MUIDataTable from 'mui-datatables';

import * as ROLES from '../../constants/roles';
import * as DATA from '../../constants/data';

import { withAuthorization } from '../Session';
import { Typography, Grid, TextField, MenuItem } from '@material-ui/core';

const columns = [
  {
    name: 'name',
    label: 'Name',
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: 'ward',
    label: 'Ward',
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: 'shirtSize',
    label: 'T-Shirt Size',
    options: {
      filter: true
    }
  }
];

const LeadersPage = props => {
  const [loading, setLoading] = useState(true);
  const [permissionForms, setPermissionForms] = useState({});
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventKey, setSelectedEventKey] = useState('');

  useEffect(() => {
    console.log('Loading participants for %s', selectedEventKey);
    props.firebase.loadPermissionFormsForEvent(selectedEventKey).then(permissionFormsDoc => {
      const permissionForms = permissionFormsDoc.docs.map(formDoc => formDoc.data());
      console.log('Permission forms');
      console.log(permissionForms);
      setPermissionForms(permissionForms);
    });
  }, [selectedEvent]);

  const handleSelectEvent = event => {
    const selectedEventKey = event.target.value;
    console.log('Selected event key: ' + selectedEventKey);
    setSelectedEvent(event.target.value);
  };

  useEffect(() => {
    props.firebase.loadEvents().then(eventsDoc => {
      console.log(eventsDoc);
      const events = eventsDoc.docs.map(eventDoc => {
        const event = eventDoc.data();
        console.log('Ref: %s', eventDoc.ref);
        console.log(event);
        return { value: eventDoc.ref.path, label: event.title, key: eventDoc.ref.path };
      });
      setLoading(false);
      setEvents(events);
    });
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            Leaders
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {events && (
            <TextField
              id="event"
              select
              value={selectedEventKey}
              onChange={handleSelectEvent}
              helperText="Select event"
            >
              {events.map(item => (
                <MenuItem key={item.key} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Grid>

        {selectedEvent && (
          <Grid item xs={12}>
            <MUIDataTable title="Participants" columns={columns} data={permissionForms} />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

const authorizationCondition = authUser =>
  authUser &&
  authUser.roles &&
  (authUser.roles.includes(ROLES.WARD_LEADER) ||
    authUser.roles.includes(ROLES.WARD_LEADER) ||
    authUser.roles.includes(ROLES.ADMIN));

export default withAuthorization(authorizationCondition)(LeadersPage);
