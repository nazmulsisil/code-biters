import moment from 'moment';

const resultsDefaultState = {
  speed: 0,
  date: null,
  duration: 0,
  numOfCorrectStrokes: 0,
  numOfTotalStrokes: 0,
  numOfChar: 0,
  modelText: '',
  charStat: {}
};

const resultReducer = (state = resultsDefaultState, action) => {
  switch (action.type) {
    case 'RESET_FINISHED_RESULT':
      return resultsDefaultState;
    case 'SET_FINISHED_RESULT':
      return {
        ...state,
        speed: action.speed,
        date: action.date,
        duration: action.duration,
        numOfCorrectStrokes: action.numOfCorrectStrokes,
        numOfTotalStrokes: action.numOfTotalStrokes,
        numOfChar: action.numOfChar,
        modelText: action.modelText,
        charStat: action.charStat
      };
    default:
      return state;
  }
};

export default resultReducer;
