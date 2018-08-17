import moment from 'moment';
import database from '../firebase/firebase';

export const resetFinishedResult = () => {
  return {
    type: 'RESET_FINISHED_RESULT'
  };
};

export const setFinishedResult = testSummary => {
  return {
    type: 'SET_FINISHED_RESULT',
    ...testSummary
  };
};
export const startSetFinishedResult = ({
  modelTextArr,
  startingTime,
  numOfTotStrokes,
  correctStroke,
  netSpeed,
  charStat
}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const testSummary = {
      speed: netSpeed,
      date: startingTime,
      duration: moment().valueOf() - startingTime,
      numOfCorrectStrokes: correctStroke,
      numOfTotalStrokes: numOfTotStrokes,
      numOfChar: modelTextArr.length,
      modelText: modelTextArr.join(''),
      charStat
    };
    return database
      .ref(`users/${uid}/tests`)
      .push(testSummary)
      .then(() => {
        dispatch(setFinishedResult(testSummary));
        dispatch(resetFinishedResult());
      });
  };
};
