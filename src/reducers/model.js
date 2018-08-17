import moment from 'moment';
import { findCurrWordsIndices } from '../helper/functions';

const modelsDefaultState = {
  modelTextArr: [],
  errIndices: [],
  currWordsIndices: [],
  typedText: '',
  typingStarted: false,
  typingFinished: false,
  startingTime: 0,
  timestampOfSetTypingText: null,
  numOfTotStrokes: 0,
  correctStroke: 0,
  correctStrokeInARow: 0,
  correctStrokeTimeArr: [],
  wrongStrokeTimeArr: [],
  netSpeed: 0,
  accuracy: 0
};

const modelReducer = (state = modelsDefaultState, action) => {
  switch (action.type) {
    case 'SET_DEFAULT_STATE':
      return {
        ...state,
        errIndices: [],
        currWordsIndices: findCurrWordsIndices('', state.modelTextArr),
        typedText: '',
        typingStarted: false,
        typingFinished: false,
        startingTime: 0,
        timestampOfSetTypingText: null,
        numOfTotStrokes: 0,
        correctStroke: 0,
        correctStrokeInARow: 0,
        correctStrokeTimeArr: [],
        wrongStrokeTimeArr: [],
        netSpeed: 0,
        accuracy: 0
      };

    case 'SET_MODEL_TEXT':
      return { ...state, modelTextArr: action.modelText.split('') };

    case 'SET_TYPING_STARTED':
      return {
        ...state,
        typingStarted: true,
        startingTime: moment().valueOf()
      };

    case 'SET_TYPING_FINISHED':
      return { ...state, typingFinished: true };

    // action: typedText, errIndices, isCorrectStroke, timeTakenForCorrectStroke, timeTakenForWrongStroke, netSpeed
    case 'SET_TYPING_TEXT':
      return {
        ...state,
        typedText: action.typedText,
        currWordsIndices: action.currWordsIndices,
        errIndices: action.errIndices,
        timestampOfSetTypingText: moment().valueOf(),
        numOfTotStrokes: state.numOfTotStrokes + 1,
        correctStroke: state.correctStroke + (action.isCorrectStroke ? 1 : 0),
        correctStrokeInARow: action.isCorrectStroke
          ? state.correctStrokeInARow + 1
          : 0,
        correctStrokeTimeArr: [
          ...state.correctStrokeTimeArr,
          action.timeTakenForCorrectStroke
        ].filter(Boolean),
        wrongStrokeTimeArr: [
          ...state.wrongStrokeTimeArr,
          action.timeTakenForWrongStroke
        ].filter(Boolean),
        netSpeed: action.netSpeed
      };

    case 'SET_ACCURACY':
      return {
        ...state,
        accuracy: state.correctStroke / state.numOfTotStrokes
      };

    default:
      return state;
  }
};

export default modelReducer;
