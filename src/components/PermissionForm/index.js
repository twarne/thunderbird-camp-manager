import React from 'react';
import { Redirect } from 'react-router-dom';
import SignaturePad from 'react-signature-canvas';

import { withFirebase } from '../Firebase';

import EmergencyContact from '../EmergencyContact';
import EventDetails from '../EventDetails';
import MedicalInformation from '../MedicalInformation';
import OtherAccomodations from '../OtherAccomodations';
import ParticipantInformation from '../ParticipantInformation';
import PhysicalConditions from '../PhysicalConditions';

import * as ROUTES from '../../constants/routes';

import './index.css';
import '../Common/index.css';

class PermissionFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      participantInformation: {
        participant: {},
        address: {}
      },
      emergencyContact: {},
      medicalInformation: {
        allowedOTCs: []
      },
      physicalConditions: {},
      otherAccomodations: {},
      submitted: false,
      signed: false,
      loading: true
    };

    this.handleParticipantInformationChange = this.handleParticipantInformationChange.bind(this);
    this.handleEmergencyContactChange = this.handleEmergencyContactChange.bind(this);
    this.handleMedicalInformationChange = this.handleMedicalInformationChange.bind(this);
    this.handlePhysicalConditionsChange = this.handlePhysicalConditionsChange.bind(this);
    this.handleOtherAccomodationsChange = this.handleOtherAccomodationsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.storeForm = this.storeForm.bind(this);
  }

  handleParticipantInformationChange(updatedParticipantInformation) {
    this.setState({ participantInformation: updatedParticipantInformation });
  }

  handleEmergencyContactChange(updatedEmergencyContact) {
    this.setState({ emergencyContact: updatedEmergencyContact });
  }

  handleMedicalInformationChange(updatedMedicalInformation) {
    this.setState({ medicalInformation: updatedMedicalInformation });
  }

  handlePhysicalConditionsChange(updatedPhysicalConditions) {
    this.setState({ physicalConditions: updatedPhysicalConditions });
  }

  handleOtherAccomodationsChange(updatedOtherAccomodations) {
    this.setState({ otherAccomodations: updatedOtherAccomodations });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.submitted) {
      this.setState({ submitted: true });
    } else {
      const signatureData = this.sigPad.getTrimmedCanvas().toDataURL('image/png');
      this.storeForm(signatureData);
    }
  }

  storeForm(signatureData) {
    this.props.firebase.storeParticipant(this.state.participantInformation).then(participantRef => {
      const permissionForm = {
        eventRef: this.state.eventRef,
        participantRef: participantRef,
        emergencyContact: this.state.emergencyContact,
        medicalInformation: this.state.medicalInformation,
        physicalConditions: this.state.physicalConditions,
        otherAccomodations: this.state.otherAccomodations,
        signature: signatureData
      };

      this.props.firebase.storePermissionForm(permissionForm).then(this.setState({ participantRef, signed: true }));
    });
  }

  componentDidMount() {
    this.props.firebase.loadEventDetails(this.props.match.params.eventKey).then(eventDetails => {
      const eventSnapshot = eventDetails.docs[0];
      this.setState({ eventRef: eventSnapshot.ref, event: eventSnapshot.data(), loading: false });
    });
  }

  render() {
    if (this.state.signed) {
      return (
        <Redirect
          push
          to={{
            pathname: ROUTES.RELEASE_FORM.replace(':eventKey', this.state.event.key),
            state: { eventRefPath: this.state.eventRef.path, participantRefPath: this.state.participantRef.path }
          }}
        />
      );
    }
    if (this.state.loading) {
      return (
        <div>
          <h2>Loading event details...</h2>
        </div>
      );
    }
    return (
      <div className="PermissionForm">
        <h1>{this.state.event.title}</h1>
        <form onSubmit={this.handleSubmit}>
          <EventDetails event={this.state.event} />
          <ParticipantInformation
            participant={this.state.participantInformation.participant}
            address={this.state.participantInformation.address}
            onChange={this.handleParticipantInformationChange}
            readOnly={this.state.submitted}
            eventStartDate={this.state.event.startDate.toDate()}
          />
          <EmergencyContact
            emergencyContact={this.state.emergencyContact}
            onChange={this.handleEmergencyContactChange}
            readOnly={this.state.submitted}
          />
          <MedicalInformation
            medicalInformation={this.state.medicalInformation}
            onChange={this.handleMedicalInformationChange}
            readOnly={this.state.submitted}
          />
          <PhysicalConditions
            physicalConditions={this.state.physicalConditions}
            onChange={this.handlePhysicalConditionsChange}
            readOnly={this.state.submitted}
          />
          <OtherAccomodations
            otherAccomodations={this.state.otherAccomodations}
            onChange={this.handleOtherAccomodationsChange}
            readOnly={this.state.submitted}
          />
          {!this.state.submitted ? (
            <input type="submit" value="Next" />
          ) : (
            <div>
              <SignaturePad
                ref={ref => {
                  this.sigPad = ref;
                }}
              />
              <input type="submit" value="Sign" />
            </div>
          )}
        </form>
      </div>
    );
  }
}

const PermissionForm = withFirebase(PermissionFormBase);

export default PermissionForm;
