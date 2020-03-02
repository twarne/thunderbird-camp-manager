import React, { useState, useEffect, useContext } from 'react';
import { FormGroup, TextField, Typography } from '@material-ui/core';
import RegistrationFormContext from '../Context';

const OtherAccomodationsForm = props => {
  const [otherAccomodations, setOtherAccomodations] = useState({
    otherConsiderations: ''
  });

  const registrationFormContext = useContext(RegistrationFormContext);
  registrationFormContext.updateReadyForNext(true);

  useEffect(() => {
    console.log('Effect: other accomodations');
    console.log(props.otherAccomodations);
    setOtherAccomodations(props.otherAccomodations);
  }, [props.otherAccomodations]);

  const handleChange = event => {
    console.log('Other accomodations change');
    console.log(event);
    const updatedOtherAccomodations = { ...otherAccomodations };
    updatedOtherAccomodations[event.target.name] = event.target.value;
    props.onChange(updatedOtherAccomodations);
    setOtherAccomodations(updatedOtherAccomodations);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Other Accomodations
      </Typography>
      <FormGroup>
        <TextField
          id="otherConsiderations"
          name="otherConsiderations"
          label="Other Considerations"
          fullWidth
          multiline
          autoComplete="otherConsiderations"
          helperText="Identify any other needs or considerations the participant has that the event or activity planner should be aware of."
          onChange={handleChange}
          value={otherAccomodations.otherConsiderations}
          InputLabelProps={{ shrink: otherAccomodations.otherConsiderations ? true : false }}
        />
      </FormGroup>
    </React.Fragment>
  );
};

export default OtherAccomodationsForm;
