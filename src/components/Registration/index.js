import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withTheme, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import { withFirebase } from '../Firebase';

import ParticipantInformationForm from '../ParticipantInformationForm';
import EmergencyContactForm from '../EmergencyContactForm';
import MedicalInformationForm from '../MedicalInformationForm';
import PhysicalConditionsForm from '../PhysicalConditionsForm';
import OtherAccomodationsForm from '../OtherAccomodationsForm';
import PermissionForm from '../PermissionForm';

import * as STRINGS from '../../constants/strings';
import styles from '../Common';
import NavHeader from '../NavHeader';

const steps = [
  'Participant Information',
  'Emergency Contact',
  'Medical Information',
  'Physical Conditions',
  'Other Accomodations',
  'Permission',
  'Youth Release',
  'Parent Release',
  'Rappelling Release'
];

const StepContent = props => {
  const permissionFormRef = useRef(null);
  const youthIPReleaseRef = useRef(null);
  const parentIPReleaseRef = useRef(null);
  const rappellingReleaseRef = useRef(null);

  switch (props.step) {
    case 0:
      return (
        <ParticipantInformationForm
          participant={props.permissionForm.participant}
          onChange={props.onChange('participant')}
          classes={props.classes}
          updateReadyForNext={props.updateReadyForNext}
        />
      );
    case 1:
      return (
        <EmergencyContactForm
          emergencyContact={props.permissionForm.emergencyContact}
          onChange={props.onChange('emergencyContact')}
          classes={props.classes}
          updateReadyForNext={props.updateReadyForNext}
        />
      );
    case 2:
      return (
        <MedicalInformationForm
          medicalInformation={props.permissionForm.medicalInformation}
          onChange={props.onChange('medicalInformation')}
          classes={props.classes}
          updateReadyForNext={props.updateReadyForNext}
        />
      );
    case 3:
      return (
        <PhysicalConditionsForm
          physicalConditions={props.permissionForm.physicalConditions}
          onChange={props.onChange('physicalConditions')}
          classes={props.classes}
          updateReadyForNext={props.updateReadyForNext}
        />
      );
    case 4:
      return (
        <OtherAccomodationsForm
          otherAccomodations={props.permissionForm.otherAccomodations}
          onChange={props.onChange('otherAccomodations')}
          classes={props.classes}
          updateReadyForNext={props.updateReadyForNext}
        />
      );
    case 5:
      return (
        <PermissionForm
          key={'permission'}
          ref={permissionFormRef}
          permissions={props.permissionForm.permission}
          releaseText={STRINGS.PERMISSION}
          includeParticipant={true}
          includeParent={true}
          onChange={props.onChange('permission')}
          classes={props.classes}
          updateReadyForNext={props.updateReadyForNext}
        />
      );
    case 6:
      return (
        <PermissionForm
          key={'youthIPRelease'}
          ref={youthIPReleaseRef}
          permissions={props.permissionForm.youthIPRelease}
          releaseText={STRINGS.YOUTH_RELEASE}
          includeParticipant={true}
          onChange={props.onChange('youthIPRelease')}
          classes={props.classes}
          updateReadyForNext={props.updateReadyForNext}
        />
      );
    case 7:
      return (
        <PermissionForm
          key={'parentIPRelease'}
          ref={parentIPReleaseRef}
          permissions={props.permissionForm.parentIPRelease}
          releaseText={STRINGS.PARENT_RELEASE}
          includeParent={true}
          onChange={props.onChange('parentIPRelease')}
          classes={props.classes}
          updateReadyForNext={props.updateReadyForNext}
        />
      );
    case 8:
      return (
        <PermissionForm
          key={'rappellingRelease'}
          ref={rappellingReleaseRef}
          permissions={props.permissionForm.rappellingRelease}
          releaseText={STRINGS.RAPPELLING_RELEASE}
          includeParticipant={true}
          includeParent={true}
          onChange={props.onChange('rappellingRelease')}
          classes={props.classes}
          updateReadyForNext={props.updateReadyForNext}
        />
      );
    default:
      throw new Error('Unknown step');
  }
};

const Registration = props => {
  const [activeStep, setActiveStep] = useState(0);
  const [permissionForm, setPermissionForm] = useState({
    eventRef: null,
    participant: {},
    emergencyContact: {},
    medicalInformation: {
      hasDietaryRestriction: false,
      dietaryRestriction: '',
      hasAllergies: false,
      allergies: '',
      isTakingMedication: false,
      medication: '',
      canSelfAdminister: false,
      allowedOTCs: []
    },
    physicalConditions: {},
    otherAccomodations: {},
    permission: {},
    youthIPRelease: {},
    parentIPRelease: {},
    rappellingRelease: {}
  });
  const [event, setEvent] = useState(null);
  const [readyForNext, setReadyForNext] = useState(false);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      console.log('Ready to save');
      console.log(permissionForm);
      props.firebase.storePermissionForm(permissionForm);
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onChange = form => updatedValue => {
    console.log('Handling event from %s form', form);
    console.log(updatedValue);
    const updatedPermissionForm = { ...permissionForm };
    updatedPermissionForm[form] = updatedValue;
    setPermissionForm(updatedPermissionForm);
  };

  const updateReadyForNext = isReadyForNext => {
    setReadyForNext(isReadyForNext);
  };

  useEffect(() => {
    if (props.match.params.eventKey) {
      props.firebase.loadEventDetails(props.match.params.eventKey).then(eventDoc => {
        console.log(eventDoc);
        onChange('eventRef')(eventDoc.docs[0].ref);
        setEvent(eventDoc.docs[0].data());
      });
    }
  }, []);

  console.log('Registration Props');
  console.log(props);

  const { classes, theme } = props;

  return (
    <React.Fragment>
      <NavHeader title={event ? `${event.title} Registration` : 'Loading...'} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Registration
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{useMediaQuery(theme.breakpoints.up('lg')) && label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for registering!
                </Typography>
                <Typography variant="subtitle1">
                  If you have any questions, please contact the activity leader for your ward.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <StepContent
                  step={activeStep}
                  permissionForm={permissionForm}
                  onChange={onChange}
                  classes={classes}
                  updateReadyForNext={updateReadyForNext}
                />
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={!readyForNext}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
};

Registration.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withTheme()(withFirebase(withStyles(styles)(Registration)));
