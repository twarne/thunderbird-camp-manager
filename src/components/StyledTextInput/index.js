import React from 'react';
import classNames from 'classnames';

import './index.css';

const StyledTextInput = props => {
  const divClassName = classNames('StyledTextInput', props.className);
  return (
    <div className={divClassName}>
      <label htmlFor={props.name} className="StyledTextInputLabel">
        {props.title}
      </label>
      {props.readOnly ? (
        <span id={props.name} className="StyledTextInputReadOnly">
          {props.value}
        </span>
      ) : (
        <input
          className="StyledTextInputInput"
          id={props.name}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          size={props.inputWidth}
          readOnly={props.readOnly}
        />
      )}
    </div>
  );
};

export default StyledTextInput;
