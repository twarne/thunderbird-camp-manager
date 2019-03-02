import React, { Component } from 'react';
import YesNoExplain from './YesNoExplain';
import YesNo from './YesNo';

class MedicalInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleChange = this.handleChange.bind(this);

    if (!('hasDietaryRestriction' in this.props.medicalInformation)) {
      this.props.medicalInformation.hasDietaryRestriction = false;
    }
    if (!('hasAllergies' in this.props.medicalInformation)) {
      this.props.medicalInformation.hasAllergies = false;
    }
    if (!('isTakingMedication' in this.props.medicalInformation)) {
      this.props.medicalInformation.isTakingMedication = false;
    }
    if (!('canSelfAdminister' in this.props.medicalInformation)) {
      this.props.medicalInformation.canSelfAdminister = false;
    }
  }

  handleChange(event) {
    console.log('Medical update: %s', event);
    console.log('Updating medical information: %s = %s', event.target.name, event.target.value);
    this.setState({ [event.target.name]: event.target.value }, () => this.props.onChange(this.state));
  }

  render() {
    return (
      <div className="Section">
        <h2 className="SectionHeading">Medical Information</h2>
        <form className="SectionForm">
          <YesNoExplain
            yesNoName="hasDietaryRestriction"
            question="Does the participant have any dietary restrictions?"
            explainName="dietaryRestrictions"
            explain="If yes, please explain the dietary restrictions."
            explainPlaceholder="Dietary restrictions"
            selected={this.props.medicalInformation.hasDietaryRestriction}
            onChange={this.handleChange}
          />
          <YesNoExplain
            yesNoName="hasAllergies"
            question="Does the participant have any allergies?"
            explainName="allergies"
            explain="If yes, please list the allergies."
            explainPlaceholder="Allergies"
            selected={this.props.medicalInformation.hasAllergies}
            onChange={this.handleChange}
          />
          <YesNoExplain
            yesNoName="isTakingMedication"
            question="Is the participant taking any medication or over-the-counter (OTC) drugs?"
            explainName="medications"
            explain="List all prescriptions or over-the-counter (OTC) medications the participant is taking."
            explainPlaceholder="Medications"
            selected={this.props.medicalInformation.isTakingMedication}
            onChange={this.handleChange}
          />
          <YesNo
            name="selfAdminister"
            question="If yes, can the participant self-administer his or her medication?"
            selected={this.props.medicalInformation.canSelfAdminister}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

export default MedicalInformation;
