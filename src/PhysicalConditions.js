import React, { Component } from 'react';
import YesNoExplain from './YesNoExplain';
import StyledTextArea from './StyledTextArea';

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
    console.log('Physical conditions update: %s', event);
    console.log('Updating physical conditions: %s = %s', event.target.name, event.target.value);
    this.setState({ [event.target.name]: event.target.value }, () => this.props.onChange(this.state));
  }

  render() {
    return (
      <div className="Section">
        <h2 className="SectionHeading">Physical Conditions that Limit Activity</h2>
        <form onSubmit={this.handleSubmit}>
          <YesNoExplain
            yesNoName="hasRecurringIllness"
            question="Does the participant have a chronic or recurring illness?"
            explainName="recurringIllness"
            explain="If yes, please explain."
            explainPlaceholder="Recurring illnesses"
            yesNo={this.state.hasRecurringIllness}
            onChange={this.handleChange}
          />
          <YesNoExplain
            yesNoName="hasSurgery"
            question="Has the participant had surgery or a serious illness in the past year?"
            explainName="surgery"
            explain="If yes, please explain."
            explainPlaceholder="Surgery or illness"
            yesNo={this.state.hasSurgery}
            onChange={this.handleChange}
          />
          <StyledTextArea
            name="restrictions"
            value={this.state.retrictions}
            placeholder="Physical restrictions"
            title="Identify any other limits, restrictions, or disabilities that could prevent the participant from fully particpating in the event or activity."
            onChange={this.handleChange}
            inputRows="10"
            inputColumns="50"
          />
        </form>
      </div>
    );
  }
}

export default PhysicalConditions;
