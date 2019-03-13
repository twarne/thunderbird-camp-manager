import React, { Component } from 'react';
import StyledTextArea from '../StyledTextArea';

import '../Common/index.css';

class OtherAccomodations extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange({ otherConsiderations: event.target.value });
  }

  render() {
    return (
      <div className="Section">
        <h2 className="SectionHeading">Other Accomodations or Special Needs</h2>
        <div className="SectionForm-stack">
          <StyledTextArea
            name="otherConsiderations"
            value={this.props.otherAccomodations.otherConsiderations}
            placeholder="Other considerations"
            title="Identify any other needs or considerations the participant has that the event or activity planner should be aware of."
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

export default OtherAccomodations;
