import React, { Component } from 'react';
import './PermissionAndMedicalInformation.css';
import ParticipantInformation from './ParticipantInformation';
import MedicalInformation from './MedicalInformation';
import PhysicalConditions from './PhysicalConditions';
import OtherAccomodations from './OtherAccomodations';
import Permission from './Permission';

class PermissionAndMedicalReleaseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      participantInformation: {
        participant: {},
        address: {},
        emergencyContact: {}
      },
      medicalInformation: {},
      physicalConditions: {},
      otherAccomodations: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleParticipantInformationChange = this.handleParticipantInformationChange.bind(this);
    this.handleMedicalInformationChange = this.handleMedicalInformationChange.bind(this);
    this.handlePhysicalConditionsChange = this.handlePhysicalConditionsChange.bind(this);
    this.handleOtherAccomodationsChange = this.handleOtherAccomodationsChange.bind(this);
    this.saveForm = this.saveForm.bind(this);
  }

  handleChange(event) {}

  handleParticipantInformationChange(updatedParticipantInformation) {
    console.log('Updating participant information');
    this.setState({ participantInformation: updatedParticipantInformation });
  }

  handleMedicalInformationChange(updatedMedicalInformation) {
    console.log('Updating medical information');
    console.log(updatedMedicalInformation);
    this.setState({ medicalInformation: updatedMedicalInformation });
  }

  handlePhysicalConditionsChange(updatedPhysicalConditions) {
    console.log('Updating physical conditions');
    this.setState({ physicalConditions: updatedPhysicalConditions });
  }

  handleOtherAccomodationsChange(updatedOtherAccomodations) {
    console.log('Updating other accomodations');
    this.setState({ otherAccomodations: updatedOtherAccomodations });
  }

  saveForm(event) {
    console.log(this.state);
  }

  render() {
    return (
      <div className="PermissionAndMedicalInformationForm">
        <ParticipantInformation
          participant={this.state.participantInformation.participant}
          address={this.state.participantInformation.address}
          emergencyContact={this.state.participantInformation.emergencyContact}
          onChange={this.handleParticipantInformationChange}
        />
        <MedicalInformation
          medicalInformation={this.state.medicalInformation}
          onChange={this.handleMedicalInformationChange}
        />
        <PhysicalConditions
          physicalConditions={this.state.physicalConditions}
          onChange={this.handlePhysicalConditionsChange}
        />
        <OtherAccomodations
          otherAccomodations={this.state.otherAccomodations}
          onChange={this.handleOtherAccomodationsChange}
        />
        <Permission />
        <button type="submit" onClick={this.saveForm}>
          Save
        </button>
      </div>
    );
  }
}

export default PermissionAndMedicalReleaseForm;
