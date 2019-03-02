import React, { Component } from 'react';
import StyledTextInput from './StyledTextInput';

class ParticipantInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      participant: {},
      address: {},
      emergencyContact: {}
    };
    this.handleParticipantChange = this.handleParticipantChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleEmergencyContactChange = this.handleEmergencyContactChange.bind(this);
  }

  handleParticipantChange(event) {
    var participant = { ...this.state.participant };
    console.log('Updating participant: %s = %s', event.target.name, event.target.value);
    participant[event.target.name] = event.target.value;
    this.setState({ participant }, () => this.props.onChange(this.state));
  }

  handleAddressChange(event) {
    var address = { ...this.state.address };
    console.log('Updating address: %s = %s', event.target.name, event.target.value);
    address[event.target.name] = event.target.value;
    this.setState({ address }, () => this.props.onChange(this.state));
  }

  handleEmergencyContactChange(event) {
    var emergencyContact = { ...this.state.emergencyContact };
    console.log('Updating emergency contact: %s = %s', event.target.name, event.target.value);
    emergencyContact[event.target.name] = event.target.value;
    this.setState({ emergencyContact }, () => this.props.onChange(this.state));
  }

  render() {
    return (
      <div className="Section">
        <h2 className="SectionHeading">Participant Information</h2>
        <form className="SectionForm">
          <StyledTextInput
            id="participant.name"
            name="name"
            value={this.props.participant.name}
            placeholder="Participant Name"
            title="Participant"
            onChange={this.handleParticipantChange}
            inputWidth="35"
          />
          <StyledTextInput
            id="participant.dateOfBirth"
            name="dateOfBirth"
            value={this.props.participant.dateOfBirth}
            placeholder="Birthdate"
            title="Participant Date of Birth"
            onChange={this.handleParticipantChange}
          />
          <StyledTextInput
            id="participant.age"
            name="age"
            value={this.props.participant.age}
            placeholder="Age"
            title="Participant age"
            onChange={this.handleParticipantChange}
            inputWidth="4"
          />
          <StyledTextInput
            id="participant.primaryTelephoneNumber"
            name="primaryTelephoneNumber"
            value={this.props.participant.primaryTelephoneNumber}
            placeholder="Primary telephone number"
            title="Primary telephone number"
            onChange={this.handleParticipantChange}
            inputWidth="12"
          />
          <StyledTextInput
            id="participant.secondaryTelephoneNumber"
            name="secondaryTelephoneNumber"
            value={this.props.participant.secondaryTelephoneNumber}
            placeholder="Secondary telephone number"
            title="Secondary telephone number"
            onChange={this.handleParticipantChange}
            inputWidth="12"
          />
          <StyledTextInput
            id="address.streetAddress"
            name="streetAddress"
            value={this.props.address.streetAddress}
            placeholder="Street address"
            title="Address"
            onChange={this.handleAddressChange}
            inputWidth="50"
          />
          <StyledTextInput
            id="address.city"
            name="city"
            value={this.props.address.city}
            placeholder="City"
            title="City"
            onChange={this.handleAddressChange}
          />
          <StyledTextInput
            id="address.state"
            name="state"
            value={this.props.address.state}
            placeholder="State"
            title="State"
            onChange={this.handleAddressChange}
            inputWidth="4"
          />
          <StyledTextInput
            id="emergencyContact.name"
            name="name"
            value={this.props.emergencyContact.name}
            placeholder="Emergency contact name"
            title="Emergency Contact (parent or guardian)"
            onChange={this.handleEmergencyContactChange}
            inputWidth="35"
          />
          <StyledTextInput
            id="emergencyContact.primaryTelephoneNumber"
            name="primaryTelephoneNumber"
            value={this.props.emergencyContact.primaryTelephoneNumber}
            placeholder="Primary telephone number"
            title="Primary telephone number"
            onChange={this.handleEmergencyContactChange}
            inputWidth="12"
          />
          <StyledTextInput
            id="emergencyContact.secondaryTelephoneNumber"
            name="secondaryTelephoneNumber"
            value={this.props.emergencyContact.secondaryTelephoneNumber}
            placeholder="Secondary telephone number"
            title="Secondary telephone number"
            onChange={this.handleEmergencyContactChange}
            inputWidth="12"
          />
        </form>
      </div>
    );
  }
}

export default ParticipantInformation;
