import React from 'react';
import _ from 'lodash';

import './index.css';

class StyledMultiSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOptions: [...props.selectedOptions]
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    if (target.checked) {
      this.setState(
        state => {
          const selectedOptions = [...state.selectedOptions, target.name];
          return { selectedOptions };
        },
        () => this.props.onChange(this.state.selectedOptions)
      );
    } else {
      this.setState(
        state => {
          const selectedOptions = state.selectedOptions.filter(item => item !== target.name);
          return { selectedOptions };
        },
        () => this.props.onChange(this.state.selectedOptions)
      );
    }
  }

  render() {
    return (
      <div className="StyledMultiSelect">
        <label className="StyledMultiSelectLabel">{this.props.title}</label>
        <div className="StyledMultiSelectList">
          {this.props.readOnly ? (
            <ul>
              {this.props.selectedOptions && this.props.selectedOptions.length ? (
                this.props.selectedOptions.map(option => {
                  return <li key={this.props.options[option].value}>{this.props.options[option].name}</li>;
                })
              ) : (
                <li>None</li>
              )}
            </ul>
          ) : (
            _.values(this.props.options).map(option => (
              <div key={option.value} className="StyledMultiSelectListItem">
                <label>
                  <input
                    type="checkbox"
                    checked={this.props.selectedOptions.includes(option.value)}
                    name={option.value}
                    onChange={this.handleChange}
                  />
                  {option.name}
                </label>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default StyledMultiSelect;
