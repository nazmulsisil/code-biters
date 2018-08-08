import React from 'react';
import { connect } from 'react-redux';
import { setTypingText } from '../action/model';

const Typing = ({ dispatch, model }) => {
  const textChanged = e => {
    const typedText = e.target.value;
    let indexOfLastChange;
    let change;
    let mistake = null;

    for (let i = 0, len = typedText.length; i < len; i++) {
      if (model.typedText[i] !== typedText[i]) {
        change = typedText[i];
        indexOfLastChange = i;
        break;
      }
    }

    if (typedText.length > model.typedText.length && change) {
      mistake = change !== model.modelTextArr[indexOfLastChange];
    }

    dispatch(setTypingText(typedText, mistake));
  };
  return (
    <div className="typing">
      <textarea
        className="typing__input"
        type="text"
        name="userText"
        id="userText"
        rows="15"
        onChange={textChanged}
      />
    </div>
  );
};

export default connect(state => state)(Typing);
