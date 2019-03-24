import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import moment from 'moment';

const SHIRT_SIZES = [
  { key: 'shirt_size_small', value: 'Small', label: 'Small' },
  { key: 'shirt_size_medium', value: 'Medium', label: 'Medium' },
  { key: 'shirt_size_large', value: 'Large', label: 'Large' },
  { key: 'shirt_size_xlarge', value: 'X-Large', label: 'X-Large' }
];

const WARDS = [
  { key: 'ward_ar', value: 'Arrowhead Ranch', label: 'Arrowhead Ranch' },
  { key: 'ward_mr', value: 'Mountain Ridge', label: 'Mountain Ridge' },
  { key: 'ward_sv', value: 'Sierra Verde', label: 'Sierra Verde' },
  { key: 'ward_sm', value: 'Sonoran Mountain', label: 'Sonoran Mountain' },
  { key: 'ward_st', value: 'Stetson Valley', label: 'Stetson Valley' },
  { key: 'ward_th', value: 'Thunderbird Hills', label: 'Thunderbird Hills' }
];

const ParticipantInformationForm = props => {
  const [participant, setParticipant] = useState({});

  useEffect(() => {
    props.updateReadyForNext(false);
  }, []);

  useEffect(() => {
    console.log('Effect: participant');
    console.log(props.participant);
    setParticipant(props.participant);
    props.updateReadyForNext(
      props.participant.name &&
        props.participant.dateOfBirth &&
        props.participant.phoneNumber &&
        props.participant.address &&
        props.participant.city &&
        props.participant.state &&
        props.participant.shirtSize &&
        props.participant.ward
    );
  }, [props.participant]);

  const handleSelectChange = targetName => {
    return event => {
      console.log('Select change %s', targetName);
      console.log(event);
      handleParticipantChange({ target: { name: targetName, value: event.target.value } });
    };
  };

  const handleParticipantChange = event => {
    console.log('Handling participant change');
    const updatedParticipant = { ...participant };
    console.log('Initial value');
    console.log(updatedParticipant);
    updatedParticipant[event.target.name] = event.target.value;
    if (
      event.target.name === 'dateOfBirth' &&
      event.target.value &&
      event.target.value.match(/[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/)
    ) {
      const dateOfBirth = moment(updatedParticipant.dateOfBirth);
      const eventDate = moment(props.eventStartDate);
      const age = eventDate.diff(dateOfBirth, 'years');
      updatedParticipant.age = age;
    }
    console.log('Updated value');
    console.log(updatedParticipant);
    props.onChange(updatedParticipant);
    setParticipant(updatedParticipant);
  };

  console.log('-------');
  console.log('Permission form | Participant');
  console.log(participant);
  console.log('-------');

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Participant Information
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="participant.name"
            name="name"
            label="Name"
            fullWidth
            autoComplete="name"
            onChange={handleParticipantChange}
            value={participant.name}
            InputLabelProps={{ shrink: participant.name }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="participant.dateOfBirth"
            name="dateOfBirth"
            label="Birthdate"
            fullWidth
            autoComplete="birthDate"
            onChange={handleParticipantChange}
            value={participant.dateOfBirth}
            InputLabelProps={{ shrink: participant.dateOfBirth }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            autoComplete="phoneNumber"
            onChange={handleParticipantChange}
            value={participant.phoneNumber}
            InputLabelProps={{ shrink: participant.phoneNumber }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="secondaryPhoneNumber"
            name="secondaryPhoneNumber"
            label="Secondary Phone Number"
            fullWidth
            onChange={handleParticipantChange}
            value={participant.secondaryPhoneNumber}
            InputLabelProps={{ shrink: participant.secondaryPhoneNumber }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="address"
            onChange={handleParticipantChange}
            value={participant.address}
            InputLabelProps={{ shrink: participant.address }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="city"
            onChange={handleParticipantChange}
            value={participant.city}
            InputLabelProps={{ shrink: participant.city }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="state"
            name="state"
            label="State"
            fullWidth
            onChange={handleParticipantChange}
            value={participant.state}
            InputLabelProps={{ shrink: participant.state }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="shirtSize"
            select
            value={participant.shirtSize}
            onChange={handleSelectChange('shirtSize')}
            helperText="Please select your t-shirt size"
            required
          >
            {SHIRT_SIZES.map(item => (
              <MenuItem key={item.key} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            id="ward"
            select
            value={participant.ward}
            onChange={handleSelectChange('ward')}
            helperText="Please select your ward"
            required
          >
            {WARDS.map(item => (
              <MenuItem key={item.key} value={item.label}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ParticipantInformationForm;
