import React from 'react';
import { connect } from 'react-redux';
import {
  startSetTypingStarted,
  startSetTypingText,
  startSetAccuracy,
  startSetTypingFinished,
  startResetAll
} from '../actions/model';
import { startSetFinishedResult } from '../actions/result';

const Typing = props => {
  const textChanged = e => {
    if (!props.model.typingFinished) {
      const typedText = e.target.value;

      if (!props.model.typingStarted) {
        props.startSetTypingStarted();
      }

      props.startSetTypingText(typedText, props.model);
      props.startSetAccuracy();
    }
  };

  const onKeyDown = e => {
    if (e.keyCode === 27) {
      props.startResetAll();
    }

    if (props.model.typedText.length >= props.model.modelTextArr.length) {
      if (e.keyCode === 13 || props.model.errIndices.length === 0) {
        props.startSetTypingFinished();
        props.startSetFinishedResult(props.model);
      }
    }
  };
  return (
    <div className="typing">
      <textarea
        className="typing__input"
        type="text"
        name="userText"
        id="userText"
        rows="8"
        onChange={textChanged}
        onKeyDown={onKeyDown}
        autoFocus={true}
        value={props.model.typedText}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    startSetTypingStarted: () => {
      return dispatch(startSetTypingStarted());
    },
    startSetTypingText: (typedText, model) => {
      return dispatch(startSetTypingText(typedText, model));
    },
    startSetAccuracy: () => {
      return dispatch(startSetAccuracy());
    },
    startSetTypingFinished: () => {
      return dispatch(startSetTypingFinished());
    },
    startResetAll: () => {
      return dispatch(startResetAll());
    },
    startSetFinishedResult: modelState => {
      return dispatch(startSetFinishedResult(modelState));
    }
  };
};

export default connect(
  state => state,
  mapDispatchToProps
)(Typing);
