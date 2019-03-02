import React from 'react';
import './StyledTextInput.css';

const StyledTextInput = props => {
  return (
    <div className="StyledTextInput">
      <label htmlFor={props.name} className="StyledTextInputLabel">
        {props.title}
      </label>
      <input
        className="StyledTextInputInput"
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        size={props.inputWidth}
      />
    </div>
  );
};

export default StyledTextInput;
