import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';

import _ from 'lodash';

import * as ROLES from '../../constants/roles';
import * as DATA from '../../constants/data';

import { withAuthorization } from '../Session';

import styles from '../Common';

import {
  Typography,
  Grid,
  TextField,
  MenuItem,
  Checkbox,
  TableRow,
  TableCell,
  FormControlLabel,
  Button,
  CssBaseline,
  AppBar,
  Toolbar,
  withStyles
} from '@material-ui/core';
import moment from 'moment';
import NavHeader from '../NavHeader';

const LeadersPage = props => {
  const [loading, setLoading] = useState(true);
  const [permissionForms, setPermissionForms] = useState([]);
  const [events, setEvents] = useState({});
  const [event, setEvent] = useState({});
  const [selectedEventKey, setSelectedEventKey] = useState(null);
  const [detailNeedsSave, setDetailNeedsSave] = useState(false);
  const [detailUpdated, setDetailUpdated] = useState(false);

  useEffect(() => {
    if (props.match.params.eventKey) {
      props.firebase.loadEventDetails(props.match.params.eventKey).then(eventDoc => {
        console.log(eventDoc);
        setLoading(false);
        if (eventDoc.docs.length > 0) {
          setEvent({ ...eventDoc.docs[0].data(), ref: eventDoc.docs[0].ref });
        } else {
          setEvent(null);
        }
      });
    }
  }, []);

  const loadEvent = () => {
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
      if (events.length > 0) {
        setSelectedEventKey(events[0].eventDoc.ref.path);
      }
    });
  };

  const handleSelectEvent = event => {
    const selectedEventKey = event.target.value;
    console.log('Selected event key: ' + selectedEventKey);
    setSelectedEventKey(event.target.value);
  };

  const calculateAge = dateOfBirth => {
    const dateOfBirthM = moment(dateOfBirth);
    const eventDate = moment(event.startDate.toDate());
    const age = eventDate.diff(dateOfBirthM, 'years');
    return age;
  };

  const mapPermissionForm = formDoc => {
    const formData = formDoc.data();
    const summaryData = {
      name: formData.participant.name,
      age: formData.participant.age || calculateAge(formData.participant.dateOfBirth),
      ward: formData.participant.ward,
      shirtSize: formData.participant.shirtSize,
      hasAllergies: formData.medicalInformation.hasAllergies,
      hasDietaryRestrictions: formData.medicalInformation.hasDietaryRestrictions,
      hasPhysicalRestrictions: formData.physicalConditions.hasPhysicalRestrictions,
      paid: formData.paid ? true : false,
      refPath: formDoc.ref.path,
      fullData: formData
    };
    return summaryData;
  };

  useEffect(() => {
    console.log('Loading participants');
    console.log(event);
    if (event.ref) {
      props.firebase.loadPermissionFormsForEvent(event.ref, props.authUser).then(permissionFormsDoc => {
        const permissionForms = permissionFormsDoc.docs.map(mapPermissionForm);
        console.log('Permission forms');
        console.log(permissionForms);
        setPermissionForms(permissionForms);
      });
    }
  }, [event, detailUpdated]);

  const handleCheckboxUpdate = (form, field) => (event, checked) => {
    console.log('Handling checkbox update');
    console.log(event);
    console.log(checked);
    const refPath = form.refPath;
    const updatedForm = { ...form.fullData };
    updatedForm[field] = checked;
    props.firebase.updatePermissionForm(refPath, updatedForm).then(() => {
      setDetailUpdated(true);
    });
  };

  const handleUpdate = (form, field) => event => {
    console.log('Handling data update');
    console.log(event);
    const refPath = form.refPath;
    const updatedForm = { ...form.fullData };
    updatedForm[field] = event.target.value;
    props.firebase.updatePermissionForm(refPath, updatedForm);
  };

  const renderParticipantDetails = (rowData, rowMeta) => {
    console.log('Row data');
    console.log(rowData);
    console.log('Row meta');
    console.log(rowMeta);
    const form = permissionForms[rowMeta.dataIndex];
    return (
      <TableRow>
        <TableCell colSpan={100}>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                {form.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption">Birthdate</Typography>
              <Typography variant="body1">{form.fullData.participant.dateOfBirth}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption">Allergies</Typography>
              <Typography variant="body1">
                {form.hasAllergies ? form.fullData.medicalInformation.allergies : 'None'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption">Dietary Restrictions</Typography>
              <Typography variant="body1">
                {form.hasDietaryRestrictions ? form.fullData.medicalInformation.dietaryRestrictions : 'None'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption">Physical Restrictions</Typography>
              <Typography variant="body1">
                {form.hasPhysicalRestrictions ? form.fullData.physicalConditions.physicalRestrictions : 'None'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption">Other Accomodations</Typography>
              <Typography variant="body1">
                {form.fullData.otherAccomodations.otherConsiderations
                  ? form.fullData.otherAccomodations.otherConsiderations
                  : 'None'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="paid"
                    checked={form.paid ? true : false}
                    onChange={handleCheckboxUpdate(form, 'paid')}
                    value={form.paid ? 'yes' : 'no'}
                  />
                }
                label={'Paid?'}
              />
            </Grid>
            {/** 
            <Grid item xs={6}>
              <TextField
                id="participantNotes"
                name="participantNotes"
                label="Notes"
                fullWidth
                multiline
                autoComplete="notes"
                helperText="Notes"
                onChange={handleUpdate(form, 'notes')}
                value={form.fullData.notes || ''}
                InputLabelProps={{ shrink: form.fullData.notes ? true : false }}
              />
            </Grid>
            <Grid item xs={6}>
              <Button onClick={handleSave} disabled={detailNeedsSave}>
                Save
              </Button>
            </Grid>
            */}
          </Grid>
        </TableCell>
      </TableRow>
    );
  };

  const tableOptions = {
    expandableRows: true,
    renderExpandableRow: renderParticipantDetails
  };

  const renderBooleanCell = (value, tableMeta, updateValue) => {
    console.log('Rendering boolean cell');
    console.log(tableMeta);
    console.log(permissionForms);
    return (
      <React.Fragment>
        <Checkbox disabled={true} checked={value ? true : false} value={value ? 'Yes' : 'No'} />
      </React.Fragment>
    );
  };

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
      name: 'age',
      label: 'Age',
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
    },
    {
      name: 'hasAllergies',
      label: 'Allergies',
      options: {
        filter: true,
        sort: true,
        customBodyRender: renderBooleanCell
      }
    },
    {
      name: 'hasDietaryRestrictions',
      label: 'Dietary Restrictions',
      options: {
        filter: true,
        sort: true,
        customBodyRender: renderBooleanCell
      }
    },
    {
      name: 'hasPhysicalRestrictions',
      label: 'Physical Restrictions',
      options: {
        filter: true,
        sort: true,
        customBodyRender: renderBooleanCell
      }
    },
    {
      name: 'paid',
      label: 'Paid',
      options: {
        filter: true,
        sort: true,
        customBodyRender: renderBooleanCell
      }
    }
  ];

  console.log(props);

  console.log('Participants:');
  console.log(permissionForms);

  const { classes } = props;

  return (
    <React.Fragment>
      <NavHeader title={event ? event.title : 'Loading...'} />
      <Grid container spacing={24}>
        {!props.match.params.eventKey && (
          <Grid item xs={12}>
            {!loading && (
              <TextField
                id="event"
                select
                value={selectedEventKey || ''}
                onChange={handleSelectEvent}
                helperText="Select event"
              >
                {Array.from(_.values(events)).map(item => (
                  <MenuItem key={item.eventDoc.ref.path} value={item.eventDoc.ref.path}>
                    {item.eventData.title}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Grid>
        )}

        {permissionForms && (
          <Grid item xs={12}>
            <MUIDataTable title="Participants" columns={columns} data={permissionForms} options={tableOptions} />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

LeadersPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const authorizationCondition = authUser =>
  authUser &&
  authUser.roles &&
  (authUser.roles.includes(ROLES.WARD_LEADER) ||
    authUser.roles.includes(ROLES.STAKE_LEADER) ||
    authUser.roles.includes(ROLES.ADMIN));

export default withAuthorization(authorizationCondition)(withStyles(styles)(LeadersPage));
