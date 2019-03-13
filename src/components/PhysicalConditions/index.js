import React, { Component } from 'react';
import YesNoExplain from '../YesNoExplain';
import StyledTextArea from '../StyledTextArea';

import '../Common/index.css';

class PhysicalConditions extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleChange = this.handleChange.bind(this);

    if (!('hasRecurringIllness' in this.props.physicalConditions)) {
      this.props.physicalConditions.hasRecurringIllness = false;
    }
    if (!('hasSurgery' in this.props.physicalConditions)) {
      this.props.physicalConditions.hasSurgery = false;
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value }, () => this.props.onChange(this.state));
  }

  render() {
    return (
      <div className="Section">
        <h2 className="SectionHeading">Physical Conditions that Limit Activity</h2>
        <div className="SectionForm-stack">
          <YesNoExplain
            yesNoName="hasRecurringIllness"
            question="Does the participant have a chronic or recurring illness?"
            explainName="recurringIllness"
            explainValue={this.props.physicalConditions.recurringIllness}
            explain="If yes, please explain."
            explainPlaceholder="Recurring illnesses"
            selected={this.props.physicalConditions.hasRecurringIllness}
            onChange={this.handleChange}
            readOnly={this.props.readOnly}
            inputWidth="40"
          />
          <YesNoExplain
            yesNoName="hasSurgery"
            question="Has the participant had surgery or a serious illness in the past year?"
            explainName="surgery"
            explainValue={this.props.physicalConditions.surgery}
            explain="If yes, please explain."
            explainPlaceholder="Surgery or illness"
            selected={this.props.physicalConditions.hasSurgery}
            onChange={this.handleChange}
            readOnly={this.props.readOnly}
            inputWidth="40"
          />
          <StyledTextArea
            name="restrictions"
            value={this.props.physicalConditions.retrictions}
            placeholder="Physical restrictions"
            title="Identify any other limits, restrictions, or disabilities that could prevent the participant from fully particpating in the event or activity."
            onChange={this.handleChange}
            inputRows="10"
            inputColumns="50"
            readOnly={this.props.readOnly}
          />
        </div>
      </div>
    );
  }
}

export default PhysicalConditions;
