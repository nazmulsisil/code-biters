import moment from 'moment';
import {
  findCurrWordsIndices,
  findErrIndices,
  calcAvgOfArr,
  calcWPM
} from '../helper/functions';

export const setModelText = (data = 'Loading...') => {
  return {
    type: 'SET_MODEL_TEXT',
    modelText: data
  };
};

export const setTypingText = (
  typedText,
  {
    modelTextArr,
    typedText: prevTypedText,
    correctStrokeInARow,
    timestampOfSetTypingText,
    numOfTotStrokes,
    typingStarted,
    startingTime,
    correctStrokeTimeArr
  }
) => {
  // destructuring the state obj
  const currWordsIndices = findCurrWordsIndices(typedText, modelTextArr);
  const errIndices = findErrIndices(typedText, modelTextArr);

  // Stroke is counted only if something changed or length increased
  const isStroke = prevTypedText.length <= typedText.length;

  // if stroke happened, loop through modelTextArr to see if the char is equal to the changed char(the char that is not equal to prevTypedText)
  const isCorrectStroke = !!(isStroke
    ? modelTextArr.find((char, i) => {
        return typedText[i] !== prevTypedText[i]
          ? typedText[i] === char
          : false;
      })
    : null);

  // timeTakenForCorrectStroke accounts only if correctStrokeInARow > 2
  const timeTakenForCorrectStroke =
    isCorrectStroke && correctStrokeInARow >= 5
      ? moment().valueOf() - timestampOfSetTypingText
      : null;

  const timeTakenForWrongStroke =
    !isCorrectStroke && numOfTotStrokes > 0
      ? moment().valueOf() - timestampOfSetTypingText
      : null;

  /////////////////////////////////
  // net speed calculation: seems not optimized, need to do it later
  const duration = typingStarted ? moment().valueOf() - startingTime : 0;
  const recoveryTime =
    correctStrokeTimeArr.length > 4
      ? calcAvgOfArr(correctStrokeTimeArr) * errIndices.length
      : Infinity;
  const preNetSpeed = (duration + recoveryTime) / typedText.length;
  // let's assume you will need to at least type double correct to error
  const multiplier = Math.min(
    correctStrokeTimeArr.length / (errIndices.length * 0.5),
    1
  );
  const netSpeed = calcWPM(preNetSpeed) * multiplier;
  ////////////////////////////////

  return {
    type: 'SET_TYPING_TEXT',
    typedText,
    currWordsIndices,
    errIndices,
    isCorrectStroke,
    timeTakenForCorrectStroke,
    timeTakenForWrongStroke,
    netSpeed
  };
};

export const setTypingStarted = () => {
  return {
    type: 'SET_TYPING_STARTED'
  };
};

export const setTypingFinished = () => {
  return {
    type: 'SET_TYPING_FINISHED'
  };
};

export const setAccuracy = () => {
  return { type: 'SET_ACCURACY' };
};

export const setDefaultState = () => {
  return {
    type: 'SET_DEFAULT_STATE'
  };
};

///////// THUNK /////////////////////////////////////

export const startSetTypingStarted = () => {
  return dispatch => {
    dispatch(setTypingStarted());
  };
};

export const startSetTypingFinished = () => {
  return dispatch => {
    dispatch(setTypingFinished());
  };
};

export const startSetTypingText = (typedText, model) => {
  return dispatch => {
    dispatch(setTypingText(typedText, model));
  };
};

export const startSetAccuracy = () => {
  return dispatch => {
    dispatch(setAccuracy());
  };
};

export const startResetAll = () => {
  return (dispatch, getState) => {
    dispatch(setModelText());
    // dispatch(setTypingText('', getState().model));

    //
    return fetch(`http://api.icndb.com/jokes/random`)
      .then(data => {
        return data.json();
      })
      .then(res => {
        dispatch(setModelText(res.value.joke));
        dispatch(setDefaultState());
      });
  };
};
