import React, { Component } from 'react';
import StyledTextArea from './StyledTextArea';

class OtherAccomodations extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log('Other accomodations update: %s', event);
    console.log('Updating other accomodations: %s = %s', event.target.name, event.target.value);
    this.props.onChange({ otherConsiderations: event.target.value });
  }

  render() {
    return (
      <div className="Section">
        <h2 className="SectionHeading">Other Accomodations or Special Needs</h2>
        <form className="SectionForm">
          <StyledTextArea
            name="otherConsiderations"
            value={this.props.otherAccomodations.otherConsiderations}
            placeholder="Other considerations"
            title="Identify any other needs or considerations the participant has that the event or activity planner should be aware of."
            onChange={this.handleChange}
            inputRows="10"
            inputColumns="50"
          />
        </form>
      </div>
    );
  }
}

export default OtherAccomodations;
