import React from 'react';
import StyledTextInput from './StyledTextInput';
import YesNo from './YesNo';
import './YesNo.css';

const YesNoExplain = props => {
  return (
    <div className="YesNoExplain">
      <YesNo name={props.yesNoName} selected={props.selected} question={props.question} onChange={props.onChange} />
      <StyledTextInput
        name={props.explainName}
        value={props.explainValue}
        placeholder={props.explainPlaceholder}
        title={props.explain}
        onChange={props.onChange}
      />
    </div>
  );
};

export default YesNoExplain;
