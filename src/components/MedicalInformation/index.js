import React, { Component } from 'react';

import StyledMultiSelect from '../StyledMultiSelect';
import YesNoExplain from '../YesNoExplain';
import YesNo from '../YesNo';

import '../Common/index.css';

const OTC_MEDICATIONS = {
  Acetaminophen: {
    name: 'Acetaminophen (Tylenol)',
    value: 'Acetaminophen'
  },
  Ibuprofen: {
    name: 'Ibuprofen (Advil)',
    value: 'Ibuprofen'
  },
  'Calcium Carbonate': { name: 'Calcium Carbonate (Tums)', value: 'Calcium Carbonate' },
  'Bismuth Subsalicylate': {
    name: 'Bismuth Subsalicylate (Pepto-Bismol)',
    value: 'Bismuth Subsalicylate'
  },
  Diphenhydramine: { name: 'Diphenhydramine (Benadryl)', value: 'Diphenhydramine' },
  'Hydrocortisone cream': { name: 'Hydrocortisone cream', value: 'Hydrocortisone cream' }
};

class MedicalInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasDietaryRestriction: false,
      hasAllergies: false,
      isTakingMedication: false,
      canSelfAdminister: false,
      allowedOTCs: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMedicationChange = this.handleMedicationChange.bind(this);

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
    this.setState({ [event.target.name]: event.target.value }, () => this.props.onChange(this.state));
  }

  handleMedicationChange(selectedMedications) {
    this.setState({ allowedOTCs: selectedMedications }, () => this.props.onChange(this.state));
  }

  render() {
    return (
      <div className="Section">
        <h2 className="SectionHeading">Medical Information</h2>
        <div className="SectionForm-stack">
          <YesNoExplain
            yesNoName="hasDietaryRestriction"
            question="Does the participant have any dietary restrictions?"
            explainName="dietaryRestrictions"
            explainValue={this.props.medicalInformation.dietaryRestrictions}
            explain="If yes, please explain the dietary restrictions."
            explainPlaceholder="Dietary restrictions"
            selected={this.props.medicalInformation.hasDietaryRestriction}
            onChange={this.handleChange}
            readOnly={this.props.readOnly}
            inputWidth="40"
          />
          <YesNoExplain
            yesNoName="hasAllergies"
            question="Does the participant have any allergies?"
            explainName="allergies"
            explainValue={this.props.medicalInformation.allergies}
            explain="If yes, please list the allergies."
            explainPlaceholder="Allergies"
            selected={this.props.medicalInformation.hasAllergies}
            onChange={this.handleChange}
            readOnly={this.props.readOnly}
            inputWidth="40"
          />
          <YesNoExplain
            yesNoName="isTakingMedication"
            question="Is the participant taking any medication or over-the-counter (OTC) drugs?"
            explainName="medications"
            explainValue={this.props.medicalInformation.medications}
            explain="List all prescriptions or over-the-counter (OTC) medications the participant is taking."
            explainPlaceholder="Medications"
            selected={this.props.medicalInformation.isTakingMedication}
            onChange={this.handleChange}
            readOnly={this.props.readOnly}
            inputWidth="40"
          />
          <YesNo
            name="canSelfAdminister"
            question="If yes, can the participant self-administer his or her medication?"
            selected={this.props.medicalInformation.canSelfAdminister}
            onChange={this.handleChange}
            readOnly={this.props.readOnly}
            className="YesNo"
          />
          <StyledMultiSelect
            name="otcMedications"
            title="Can the activity leaders administer the following to your child?"
            options={OTC_MEDICATIONS}
            selectedOptions={this.props.medicalInformation.allowedOTCs}
            onChange={this.handleMedicationChange}
            readOnly={this.props.readOnly}
          />
        </div>
      </div>
    );
  }
}

export default MedicalInformation;
