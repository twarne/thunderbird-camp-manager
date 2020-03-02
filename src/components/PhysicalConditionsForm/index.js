import React, { useState, useEffect, useContext } from 'react';
import { FormGroup, FormControlLabel, Switch, Typography, TextField } from '@material-ui/core';
import RegistrationFormContext from '../Context';

const PhysicalConditionsForm = props => {
  const [physicalConditions, setPhysicalConditions] = useState({
    hasRecurringIllness: false,
    recurringIllness: '',
    hasSurgery: false,
    surgery: '',
    restrictions: ''
  });

  const registrationFormContext = useContext(RegistrationFormContext);
  registrationFormContext.updateReadyForNext(true);

  useEffect(() => {
    console.log('Effect: physical conditions');
    console.log(props.physicalConditions);
    setPhysicalConditions(props.physicalConditions);
  }, [props.physicalConditions]);

  const handleChange = event => {
    console.log('Physical conditions change');
    console.log(event);
    const updatedPhysicalConditions = { ...physicalConditions };
    updatedPhysicalConditions[event.target.name] = event.target.value;
    updatedPhysicalConditions.recurringIllness = updatedPhysicalConditions.hasRecurringIllness
      ? updatedPhysicalConditions.recurringIllness
      : '';
    updatedPhysicalConditions.surgery = updatedPhysicalConditions.hasSurgery ? updatedPhysicalConditions.surgery : '';
    props.onChange(updatedPhysicalConditions);
    setPhysicalConditions(updatedPhysicalConditions);
  };

  const handleSwitchChange = switchName => event => {
    console.log('Physical conditions switch change (%s)', switchName);
    console.log(event);
    handleChange({ target: { name: switchName, value: event.target.checked } });
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Physical Conditions
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={physicalConditions.hasRecurringIllness ? true : false}
              onChange={handleSwitchChange('hasRecurringIllness')}
              name="hasRecurringIllness"
              value={physicalConditions.hasRecurringIllness}
            />
          }
          label="Does the participant have a chronic or recurring illness?"
        />
        <TextField
          required
          id="recurringIllness"
          name="recurringIllness"
          label="Chronic or recurring illnesses"
          disabled={!physicalConditions.hasRecurringIllness}
          fullWidth
          autoComplete="recurringIllness"
          onChange={handleChange}
          value={physicalConditions.recurringIllness}
          InputLabelProps={{ shrink: physicalConditions.recurringIllness ? true : false }}
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={physicalConditions.hasSurgery ? true : false}
              onChange={handleSwitchChange('hasSurgery')}
              name="hasSurgery"
              value={physicalConditions.hasSurgery}
            />
          }
          label="Has the participant had surgery or a serious illness in the past year?"
        />
        <TextField
          required
          id="surgery"
          name="surgery"
          label="Recent surgery or serious illnesses"
          disabled={!physicalConditions.hasSurgery}
          fullWidth
          autoComplete="surgery"
          onChange={handleChange}
          value={physicalConditions.surgery}
          InputLabelProps={{ shrink: physicalConditions.surgery ? true : false }}
        />
      </FormGroup>
      <FormGroup>
        <TextField
          id="restrictions"
          name="restrictions"
          label="Restrictions"
          fullWidth
          multiline
          autoComplete="restrictions"
          helperText="Identify any other limits, restrictions, or disabilities that could prevent the participant from fully particpating in the event or activity."
          onChange={handleChange}
          value={physicalConditions.restrictions}
          InputLabelProps={{ shrink: physicalConditions.restrictions ? true : false }}
        />
      </FormGroup>
    </React.Fragment>
  );
};

export default PhysicalConditionsForm;
