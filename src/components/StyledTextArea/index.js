import React from 'react';
import './index.css';

const StyledTextArea = props => {
  return (
    <div className="StyledTextArea">
      <label htmlFor={props.name} className="StyledTextAreaLabel">
        {props.title}
      </label>
      {props.readOnly ? (
        <span id={props.name}>{props.value}</span>
      ) : (
        <textarea
          className="StyledTextAreaInput"
          id={props.name}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          rows={props.inputRows}
          cols={props.inputColumns}
        />
      )}
    </div>
  );
};

export default StyledTextArea;
