import React, { Component } from 'react';
import StyledTextInput from '../StyledTextInput';
import StyledSelect from '../StyledSelect';
import moment from 'moment';

import '../Common/index.css';

const SHIRT_SIZES = [
  { value: 'Small', label: 'Small' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Large', label: 'Large' },
  { value: 'X-Large', label: 'X-Large' }
];

const WARDS = [
  { value: 'Arrowhead Park', label: 'Arrowhead Park' },
  { value: 'Mountain Ridge', label: 'Mountain Ridge' },
  { value: 'Sierra Verde', label: 'Sierra Verde' },
  { value: 'Sonoran Mountain', label: 'Sonoran Mountain' },
  { value: 'Stetson Valley', label: 'Stetson Valley' },
  { value: 'Thunderbird Hills', label: 'Thunderbird Hills' }
];

class ParticipantInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      participant: {},
      address: {}
    };
    this.handleParticipantChange = this.handleParticipantChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  handleParticipantChange(event) {
    var participant = { ...this.state.participant };
    participant[event.target.name] = event.target.value;
    if (
      event.target.name === 'dateOfBirth' &&
      event.target.value &&
      event.target.value.match(/[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/)
    ) {
      const dateOfBirth = moment(participant.dateOfBirth);
      const eventDate = moment(this.props.eventStartDate);
      const age = eventDate.diff(dateOfBirth, 'years');
      participant.age = age;
    }
    this.setState({ participant }, () => this.props.onChange(this.state));
  }

  handleAddressChange(event) {
    var address = { ...this.state.address };
    address[event.target.name] = event.target.value;
    this.setState({ address }, () => this.props.onChange(this.state));
  }

  componentDidMount() {
    if (!this.props.participant.shirtSize) {
      this.handleParticipantChange({ target: { name: 'shirtSize', value: SHIRT_SIZES[0].value } });
    }
    if (!this.props.participant.ward) {
      this.handleParticipantChange({ target: { name: 'ward', value: WARDS[0].value } });
    }
  }

  render() {
    return (
      <div className="Section">
        <h2 className="SectionHeading">Participant Information</h2>
        <div className="SectionForm-wrap">
          <StyledTextInput
            id="participant.name"
            name="name"
            value={this.props.participant.name}
            placeholder="Participant Name"
            title="Participant"
            onChange={this.handleParticipantChange}
            inputWidth="35"
            readOnly={this.props.readOnly}
          />
          <StyledTextInput
            id="participant.dateOfBirth"
            name="dateOfBirth"
            value={this.props.participant.dateOfBirth}
            placeholder="Birthdate"
            title="Date of Birth"
            onChange={this.handleParticipantChange}
            readOnly={this.props.readOnly}
          />
          <StyledTextInput
            id="participant.age"
            name="age"
            value={this.props.participant.age}
            placeholder="Age"
            title="Age (at event)"
            onChange={this.handleParticipantChange}
            inputWidth="4"
            readOnly={true}
          />
          <StyledTextInput
            id="participant.primaryTelephoneNumber"
            name="primaryTelephoneNumber"
            value={this.props.participant.primaryTelephoneNumber}
            placeholder="Primary telephone number"
            title="Primary telephone number"
            onChange={this.handleParticipantChange}
            inputWidth="12"
            readOnly={this.props.readOnly}
          />
          <StyledTextInput
            id="participant.secondaryTelephoneNumber"
            name="secondaryTelephoneNumber"
            value={this.props.participant.secondaryTelephoneNumber}
            placeholder="Secondary telephone number"
            title="Secondary telephone number"
            onChange={this.handleParticipantChange}
            inputWidth="12"
            readOnly={this.props.readOnly}
          />
          <StyledTextInput
            id="address.streetAddress"
            name="streetAddress"
            value={this.props.address.streetAddress}
            placeholder="Street address"
            title="Address"
            onChange={this.handleAddressChange}
            inputWidth="50"
            readOnly={this.props.readOnly}
          />
          <StyledTextInput
            id="address.city"
            name="city"
            value={this.props.address.city}
            placeholder="City"
            title="City"
            onChange={this.handleAddressChange}
            readOnly={this.props.readOnly}
          />
          <StyledTextInput
            id="address.state"
            name="state"
            value={this.props.address.state}
            placeholder="State"
            title="State"
            onChange={this.handleAddressChange}
            inputWidth="4"
            readOnly={this.props.readOnly}
          />
          <StyledSelect
            id="shirtSize"
            name="shirtSize"
            value={this.props.participant.shirtSize}
            title="T-Shirt Size"
            placeholder="Select t-shirt size"
            onChange={this.handleParticipantChange}
            inputWidth="12"
            readOnly={this.props.readOnly}
            options={SHIRT_SIZES}
            defaultOption={SHIRT_SIZES[0]}
          />
          <StyledSelect
            id="ward"
            name="ward"
            value={this.props.participant.ward}
            title="Ward"
            placeholder="Select ward"
            onChange={this.handleParticipantChange}
            inputWidth="25"
            readOnly={this.props.readOnly}
            options={WARDS}
            defaultOption={WARDS[0]}
          />
        </div>
      </div>
    );
  }
}

export default ParticipantInformation;
