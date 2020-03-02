import React, { useState, useContext } from 'react';

import { Typography, Grid, TextField } from '@material-ui/core';
import RegistrationFormContext from '../Context';
import { useEffect } from 'react';

const EmergencyContactForm = props => {
  const [emergencyContact, setEmergencyContact] = useState({
    name: '',
    phoneNumber: '',
    secondaryPhoneNumber: ''
  });

  useEffect(() => {
    console.log("Effect: emergency contact");
    console.log(props.emergencyContact);
    setEmergencyContact(props.emergencyContact);
  }, [props.emergencyContact])

  const registrationFormContext = useContext(RegistrationFormContext);

  const handleEmergencyContactChange = event => {
    const updatedEmergencyContact = { ...emergencyContact };
    updatedEmergencyContact[event.target.name] = event.target.value;
    props.onChange(updatedEmergencyContact);
    setEmergencyContact(updatedEmergencyContact);
    registrationFormContext.updateReadyForNext(updatedEmergencyContact.name && updatedEmergencyContact.phoneNumber);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Emergency Contact
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="emergencyContact.name"
            name="name"
            label="Name"
            fullWidth
            autoComplete="name"
            value={emergencyContact.name}
            onChange={handleEmergencyContactChange}
            InputLabelProps={{ shrink: emergencyContact.name }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="emergencyContact.phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            autoComplete="phoneNumber"
            value={emergencyContact.phoneNumber}
            onChange={handleEmergencyContactChange}
            InputLabelProps={{ shrink: emergencyContact.phoeneNumber }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="emergencyContact.secondaryPhoneNumber"
            name="secondaryPhoneNumber"
            label="Secondary Phone Number"
            fullWidth
            value={emergencyContact.secondaryPhoneNumber}
            onChange={handleEmergencyContactChange}
            InputLabelProps={{ shrink: emergencyContact.secondaryPhoneNumber }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default EmergencyContactForm;
