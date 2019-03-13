import React from 'react';

import StyledTextInput from '../StyledTextInput';

class EmergencyContact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleEmergencyContactChange = this.handleEmergencyContactChange.bind(this);
  }

  handleEmergencyContactChange(event) {
    var emergencyContact = { ...this.state.emergencyContact };
    emergencyContact[event.target.name] = event.target.value;
    this.setState({ emergencyContact }, () => this.props.onChange(this.state.emergencyContact));
  }

  render() {
    return (
      <div className="Section">
        <h2 className="SectionHeading">Emergency Contact</h2>
        <div className="SectionForm-wrap">
          <StyledTextInput
            id="emergencyContact.name"
            name="name"
            value={this.props.emergencyContact.name}
            placeholder="Emergency contact name"
            title="Emergency Contact (parent or guardian)"
            onChange={this.handleEmergencyContactChange}
            inputWidth="35"
            readOnly={this.props.readOnly}
          />
          <StyledTextInput
            id="emergencyContact.primaryTelephoneNumber"
            name="primaryTelephoneNumber"
            value={this.props.emergencyContact.primaryTelephoneNumber}
            placeholder="Primary telephone number"
            title="Primary telephone number"
            onChange={this.handleEmergencyContactChange}
            inputWidth="12"
            readOnly={this.props.readOnly}
          />
          <StyledTextInput
            id="emergencyContact.secondaryTelephoneNumber"
            name="secondaryTelephoneNumber"
            value={this.props.emergencyContact.secondaryTelephoneNumber}
            placeholder="Secondary telephone number"
            title="Secondary telephone number"
            onChange={this.handleEmergencyContactChange}
            inputWidth="12"
            readOnly={this.props.readOnly}
          />
        </div>
      </div>
    );
  }
}

export default EmergencyContact;
