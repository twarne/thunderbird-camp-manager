import React, { Component } from 'react';
import './YesNo.css';

class YesNo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var selected = event.target.value === 'yes';
    var target = {
      name: this.props.name,
      value: selected
    };

    this.setState({ selected: selected }, () => this.props.onChange({ target: target }));
  }

  static getDerivedStateFromProps(props, state) {
    var derivedState = {};
    if ('selected' in props) {
      derivedState.selected = props.selected;
    } else {
      derivedState.selected = false;
    }
    return derivedState;
  }

  render() {
    return (
      <div className="YesNoGroup">
        <label htmlFor={this.props.name} className="YesNoLabel">
          {this.props.question}
        </label>
        <div className="YesNo">
          <input defaultValue="yes" checked={this.state.selected} type="radio" onChange={this.handleChange} />
          Yes
          <input defaultValue="no" checked={!this.state.selected} type="radio" onChange={this.handleChange} />
          No
        </div>
      </div>
    );
  }
}

export default YesNo;
