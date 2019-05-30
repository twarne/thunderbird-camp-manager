import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import moment from 'moment';

import styles from '../Common';

const ParticipantDetails = props => {
  const { classes, form, onPaidChange } = props;

  const dateOfBirthM = moment(form.fullData.participant.dateOfBirth);
  const age = moment().diff(dateOfBirthM, 'years');
  const formattedDateOfBirth = age <= 18 ? dateOfBirthM.format('M/D/YYYY') : dateOfBirthM.format('M/D');

  return (
    <React.Fragment>
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom>
            {form.name}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption">Birthdate</Typography>
          <Typography variant="body1">{formattedDateOfBirth}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption">Phone number</Typography>
          <Typography variant="body1">{form.fullData.participant.phoneNumber}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption">Address</Typography>
          <Typography variant="body1">{form.fullData.participant.address}</Typography>
          <Typography variant="body1">{`${form.fullData.participant.city}, ${
            form.fullData.participant.state
          }`}</Typography>
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
            {form.hasDietaryRestriction ? form.fullData.medicalInformation.dietaryRestriction : 'None'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption">Physical Restrictions</Typography>
          <Typography variant="body1">
            {form.hasPhysicalRestrictions ? form.fullData.physicalConditions.restrictions : 'None'}
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
                onChange={onPaidChange}
                value={form.paid ? 'yes' : 'no'}
              />
            }
            label={'Paid?'}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

ParticipantDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired
};

export default withStyles(styles)(ParticipantDetails);
