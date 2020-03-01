import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTheme, withStyles } from '@material-ui/core/styles';
import { Paper, Stepper, Step, StepLabel, Button, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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

const STEP_LABELS = {
  participant: 'Participant Information',
  emergencyContact: 'Emergency Contact',
  medicalInformation: 'Medical Information',
  physicalConditions: 'Physical Conditions',
  otherAccomodations: 'Other Accomodations',
  permission: 'Permission',
  youthIPRelease: 'Youth Release',
  parentIPRelease: 'Parent Release',
  rappellingRelease: 'Rappelling Release'
};

const StepContent = props => {
  switch (props.step) {
    case 'participant':
      return (
        <ParticipantInformationForm
          participant={props.permissionForm.participant}
          onChange={props.onChange('participant')}
          classes={props.classes}
          updateReadyForNext={props.updateReadyForNext}
          includeShirtSize={props.event && props.event.includeShirtSize}
        />
      );
    case 'emergencyContact':
      return (
        <EmergencyContactForm
          emergencyContact={props.permissionForm.emergencyContact}
          onChange={props.onChange('emergencyContact')}
          classes={props.classes}
          updateReadyForNext={props.updateReadyForNext}
        />
      );
    case 'medicalInformation':
      return (
        <MedicalInformationForm
          medicalInformation={props.permissionForm.medicalInformation}
          onChange={props.onChange('medicalInformation')}
          classes={props.classes}
          updateReadyForNext={props.updateReadyForNext}
        />
      );
    case 'physicalConditions':
      return (
        <PhysicalConditionsForm
          physicalConditions={props.permissionForm.physicalConditions}
          onChange={props.onChange('physicalConditions')}
          classes={props.classes}
          updateReadyForNext={props.updateReadyForNext}
        />
      );
    case 'otherAccomodations':
      return (
        <OtherAccomodationsForm
          otherAccomodations={props.permissionForm.otherAccomodations}
          onChange={props.onChange('otherAccomodations')}
          classes={props.classes}
          updateReadyForNext={props.updateReadyForNext}
        />
      );
    case 'permission':
      return (
        <PermissionForm
          key={'permission'}
          permissions={props.permissionForm.permission}
          releaseText={STRINGS.PERMISSION}
          includeParticipant={true}
          participantSigRef={props.permissionParticipantSigRef}
          includeParent={true}
          parentSigRef={props.permissionParentSigRef}
          onChange={props.onChange('permission')}
          classes={props.classes}
          updateReadyForNext={props.updateReadyForNext}
        />
      );
    case 'youthIPRelease':
      return (
        <PermissionForm
          key={'youthIPRelease'}
          permissions={props.permissionForm.youthIPRelease}
          releaseText={STRINGS.YOUTH_RELEASE}
          includeParticipant={true}
          participantSigRef={props.youthIPParticipantSigRef}
          onChange={props.onChange('youthIPRelease')}
          classes={props.classes}
          updateReadyForNext={props.updateReadyForNext}
        />
      );
    case 'parentIPRelease':
      return (
        <PermissionForm
          key={'parentIPRelease'}
          permissions={props.permissionForm.parentIPRelease}
          releaseText={STRINGS.PARENT_RELEASE}
          includeParent={true}
          parentSigRef={props.parentIPParentSigRef}
          onChange={props.onChange('parentIPRelease')}
          classes={props.classes}
          updateReadyForNext={props.updateReadyForNext}
        />
      );
    case 'rappellingRelease':
      return (
        <PermissionForm
          key={'rappellingRelease'}
          permissions={props.permissionForm.rappellingRelease}
          releaseText={STRINGS.RAPPELLING_RELEASE}
          includeParticipant={true}
          participantSigRef={props.rappellingReleaseParticipantSigRef}
          includeParent={true}
          parentSigRef={props.rappellingReleaseParentSigRef}
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
  const [steps, setSteps] = useState(['participant']);

  const permissionParticipantSigRef = useRef(null);
  const permissionParentSigRef = useRef(null);

  const youthIPParticipantSigRef = useRef(null);
  const parentIPParentSigRef = useRef(null);

  const rappellingReleaseParticipantSigRef = useRef(null);
  const rappellingReleaseParentSigRef = useRef(null);

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

  const onEventRefChange = onChange('eventRef');

  useEffect(() => {
    if (props.match.params.eventKey) {
      props.firebase.loadEventDetails(props.match.params.eventKey).then(eventDoc => {
        console.log(eventDoc);
        onEventRefChange(eventDoc.docs[0].ref);
        setEvent(eventDoc.docs[0].data());
      });
    }
  }, [props.firebase, props.match.params.eventKey, onEventRefChange]);

  useEffect(() => {
    let requiredSteps = ['participant'];
    if (event && event.registration) {
      if (event.registration.emergencyContact) {
        requiredSteps.push('emergencyContact');
      }
      if (event.registration.medicalInformation) {
        requiredSteps.push('medicalInformation');
      }
      if (event.registration.physicalConditions) {
        requiredSteps.push('physicalConditions');
      }
      if (event.registration.otherAccomodations) {
        requiredSteps.push('otherAccomodations');
      }
      if (event.registration.permissions) {
        requiredSteps = requiredSteps.concat(event.registration.permissions);
      }
    }
    setSteps(requiredSteps);
  }, [event]);

  console.log('Registration Props');
  console.log(props);
  console.log(steps);

  const { classes } = props;
  const theme = useTheme();

  const lgMediaQuery = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <React.Fragment>
      <NavHeader title={event ? `${event.title} Registration` : 'Loading...'} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Registration
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(key => (
              <Step key={key}>
                <StepLabel>{lgMediaQuery && STEP_LABELS[key]}</StepLabel>
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
                  step={steps[activeStep]}
                  permissionForm={permissionForm}
                  onChange={onChange}
                  classes={classes}
                  updateReadyForNext={updateReadyForNext}
                  event={event}
                  permissionParticipantSigRef={permissionParticipantSigRef}
                  permissionParentSigRef={permissionParentSigRef}
                  youthIPParticipantSigRef={youthIPParticipantSigRef}
                  parentIPParentSigRef={parentIPParentSigRef}
                  rappellingReleaseParticipantSigRef={rappellingReleaseParticipantSigRef}
                  rappellingReleaseParentSigRef={rappellingReleaseParentSigRef}
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

export default withFirebase(withStyles(styles)(Registration));
