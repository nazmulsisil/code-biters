import React from 'react';
import { connect } from 'react-redux';
import {
  startSetTypingStarted,
  startSetTypingText,
  startSetAccuracy,
  startSetTypingFinished,
  startResetAll
} from '../actions/model';

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
      if (e.keyCode === 13) {
        console.log('typing finished');
        props.startSetTypingFinished();
      }

      if (props.model.errIndices.length === 0) {
        props.startSetTypingFinished();
        console.log('typing finished');
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
    }
  };
};

export default connect(
  state => state,
  mapDispatchToProps
)(Typing);
