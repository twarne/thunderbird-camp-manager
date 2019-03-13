import React from 'react';
import StyledTextInput from '../StyledTextInput';
import YesNo from '../YesNo';
import './index.css';

const YesNoExplain = props => {
  return (
    <div className="YesNoExplain">
      <YesNo
        name={props.yesNoName}
        selected={props.selected}
        question={props.question}
        onChange={props.onChange}
        readOnly={props.readOnly}
        className="YesNo"
      />
      {(!props.readOnly || props.selected) && (
        <StyledTextInput
          name={props.explainName}
          value={props.explainValue}
          placeholder={props.explainPlaceholder}
          title={props.explain}
          onChange={props.onChange}
          readOnly={props.readOnly}
          inputWidth={props.inputWidth}
          className="Explain"
        />
      )}
    </div>
  );
};

export default YesNoExplain;
