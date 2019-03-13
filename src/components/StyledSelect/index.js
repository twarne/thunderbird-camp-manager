import React from 'react';
import Dropdown from 'react-dropdown';

import './index.css';

class StyledTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(event) {
    this.props.onChange({ target: { name: this.props.name, value: event.value } });
  }

  render() {
    return (
      <div className="StyledSelect">
        <label htmlFor={this.props.name} className="StyledSelectLabel">
          {this.props.title}
        </label>
        {this.props.readOnly ? (
          <span id={this.props.name} className="StyledSelectReadOnly">
            {this.props.value}
          </span>
        ) : (
          <Dropdown
            options={this.props.options}
            onChange={this.handleSelectChange}
            value={this.props.value ? this.props.value : this.props.defaultOption}
            placeholder={this.props.placeholder}
          />
        )}
      </div>
    );
  }
}

export default StyledTextInput;
