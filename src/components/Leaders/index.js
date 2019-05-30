import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';

import _ from 'lodash';

import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import { withAuthorization } from '../Session';

import styles from '../Common';
import ReportSelector from '../Reports';

import {
  Typography,
  Grid,
  TextField,
  MenuItem,
  Checkbox,
  TableRow,
  TableCell,
  Paper,
  withStyles
} from '@material-ui/core';
import moment from 'moment';
import NavHeader from '../NavHeader';
import ParticipantDetails from '../ParticipantDetails';

const LeadersPage = props => {
  const [loading, setLoading] = useState(true);
  const [permissionForms, setPermissionForms] = useState([]);
  const [events, setEvents] = useState({});
  const [event, setEvent] = useState({});
  const [selectedEventKey, setSelectedEventKey] = useState(null);
  const [detailUpdated, setDetailUpdated] = useState(false);

  useEffect(() => {
    if (props.match.params.eventKey) {
      setSelectedEventKey(props.match.params.eventKey);
    } else {
      props.firebase.loadEvents().then(eventsDoc => {
        const events = eventsDoc.docs
          .map(eventDoc => {
            return eventDoc;
          })
          .reduce((map, event) => {
            if (event) {
              map[event.ref.path] = { eventDoc: event, eventData: event.data() };
            }
            return map;
          }, {});
        setLoading(false);
        setEvents(events);
      });
    }
  }, []);

  const handleSelectEvent = event => {
    const selectedEventKey = event.target.value;
    setSelectedEventKey(event.target.value);
  };

  useEffect(() => {
    if (selectedEventKey) {
      props.firebase.loadEventDetails(selectedEventKey).then(eventDoc => {
        setLoading(false);
        if (eventDoc.docs.length > 0) {
          setEvent({ ...eventDoc.docs[0].data(), ref: eventDoc.docs[0].ref });
        } else {
          setEvent(null);
        }
      });
      props.history.push(ROUTES.LEADERS.replace(':eventKey', selectedEventKey));
    }
  }, [selectedEventKey]);

  const calculateAge = dateOfBirth => {
    const dateOfBirthM = moment(dateOfBirth);
    const eventDate = moment(new Date());
    const age = eventDate.diff(dateOfBirthM, 'years');
    return age;
  };

  const mapPermissionForm = formDoc => {
    const formData = formDoc.data();
    const age = calculateAge(formData.participant.dateOfBirth);
    const summaryData = {
      name: formData.participant.name,
      year: age <= 18 ? moment(formData.participant.dateOfBirth).year() : '(Not shown)',
      ward: formData.participant.ward,
      shirtSize: formData.participant.shirtSize,
      hasAllergies: formData.medicalInformation.hasAllergies,
      hasDietaryRestriction: formData.medicalInformation.hasDietaryRestriction,
      hasPhysicalRestrictions: formData.physicalConditions.restrictions ? true : false,
      paid: formData.paid ? true : false,
      phoneNumber: formData.participant.phoneNumber,
      address: {
        address: formData.participant.address,
        city: formData.participant.city,
        state: formData.participant.state
      },
      refPath: formDoc.ref.path,
      fullData: formData
    };
    return summaryData;
  };

  useEffect(() => {
    if (event.ref) {
      props.firebase.loadPermissionFormsForEvent(event.ref, props.authUser).then(permissionFormsDoc => {
        const permissionForms = permissionFormsDoc.docs.map(mapPermissionForm).sort((form1, form2) => {
          const name1 = form1.name.toUpperCase();
          const name2 = form2.name.toUpperCase();
          if (name1 < name2) {
            return -1;
          }
          if (name1 > name2) {
            return 1;
          }
          return 0;
        });
        setPermissionForms(permissionForms);
      });
    }
  }, [event, detailUpdated]);

  const handleCheckboxUpdate = (form, field) => (event, checked) => {
    const refPath = form.refPath;
    const updatedForm = { ...form.fullData };
    updatedForm[field] = checked;
    props.firebase.updatePermissionForm(refPath, updatedForm).then(() => {
      setDetailUpdated(true);
    });
  };

  const handleUpdate = (form, field) => event => {
    const refPath = form.refPath;
    const updatedForm = { ...form.fullData };
    updatedForm[field] = event.target.value;
    props.firebase.updatePermissionForm(refPath, updatedForm);
  };

  const renderParticipantDetails = (rowData, rowMeta) => {
    const form = permissionForms[rowMeta.dataIndex];
    return (
      <TableRow>
        <TableCell colSpan={100}>
          <ParticipantDetails form={form} onPaidChange={handleCheckboxUpdate(form, 'paid')} />
        </TableCell>
      </TableRow>
    );
  };

  const tableOptions = {
    expandableRows: true,
    renderExpandableRow: renderParticipantDetails
  };

  const renderBooleanCell = (value, tableMeta, updateValue) => {
    return (
      <React.Fragment>
        <Checkbox disabled={true} checked={value ? true : false} value={value ? 'Yes' : 'No'} />
      </React.Fragment>
    );
  };

  const renderAddress = (value, tableMeta, updateValue) => {
    return (
      <React.Fragment>
        <Typography variant="body1">{value.address}</Typography>
        <Typography variant="body1">{`${value.city}, ${value.state}`}</Typography>
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
      name: 'year',
      label: 'Birth Year',
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
        filter: true,
        display: event && event.includeShirtSize ? 'true' : 'excluded'
      }
    },
    {
      name: 'hasAllergies',
      label: 'Allergies',
      options: {
        filter: true,
        sort: true,
        customBodyRender: renderBooleanCell,
        display: event && event.registration && event.registration.medicalInformation ? 'true' : 'excluded'
      }
    },
    {
      name: 'hasDietaryRestriction',
      label: 'Dietary Restrictions',
      options: {
        filter: true,
        sort: true,
        customBodyRender: renderBooleanCell,
        display: event && event.registration && event.registration.medicalInformation ? 'true' : 'excluded'
      }
    },
    {
      name: 'hasPhysicalRestrictions',
      label: 'Physical Restrictions',
      options: {
        filter: true,
        sort: true,
        customBodyRender: renderBooleanCell,
        display: event && event.registration && event.registration.physicalConditions ? 'true' : 'excluded'
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
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      options: {
        filter: true,
        display: false
      }
    },
    {
      name: 'address',
      label: 'Address',
      options: {
        filter: false,
        display: false,
        customBodyRender: renderAddress
      }
    }
  ];

  const { classes, authUser } = props;

  const hasReports = event && event.reports && event.reports.length > 0;

  return (
    <React.Fragment>
      <NavHeader title={event ? event.title : 'Loading...'} />
      <Grid container spacing={24}>
        {!props.match.params.eventKey && (
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Grid container spacing={24}>
                <Grid item xs={8}>
                  <Typography variant="subtitle1">Select Event</Typography>
                </Grid>
                <Grid item xs={8}>
                  {!loading && (
                    <TextField
                      id="event"
                      select
                      value={selectedEventKey || ''}
                      onChange={handleSelectEvent}
                      helperText="Select event"
                    >
                      {Array.from(_.values(events)).map(item => (
                        <MenuItem key={item.eventDoc.ref.path} value={item.eventData.key}>
                          {item.eventData.title}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </main>
        )}

        {props.match.params.eventKey && (
          <React.Fragment>
            {permissionForms && hasReports && (
              <Grid item xs={12}>
                <ReportSelector authUser={authUser} event={event} permissionForms={permissionForms} />
              </Grid>
            )}

            {permissionForms && (
              <Grid item xs={12}>
                <MUIDataTable title="Participants" columns={columns} data={permissionForms} options={tableOptions} />
              </Grid>
            )}
          </React.Fragment>
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
