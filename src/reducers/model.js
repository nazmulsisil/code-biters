import moment from 'moment';
const r = require('chance')();

const defaultText =
  "Thousands of pupils have been out on Dhaka's roads stopping traffic and checking vehicles and drivers. It is not clear who attacked them but local media blamed a student group linked to the ruling party."; // r.paragraph({ sentences: 1 });

const modelsDefaultState = {
  modelTextArr: defaultText.split(''),
  errIndices: [],
  currWordsIndices: 0,
  typedText: '',
  typingStarted: false,
  startingTime: 0,
  duration: 0,
  speed: 0,
  stroke: 0,
  accuracy: 0,
  correctStroke: 0,
  lastTwoCorrectCounter: 0,
  timeTakenForCorrectStrokeArr: [],
  lastTimeStampOfSetTypingTextRequest: null,
  correctStrokeSpeed: 0
};

const modelReducer = (state = modelsDefaultState, action) => {
  switch (action.type) {
    case 'SET_MODEL_TEXT':
      return { ...state, modelTextArr: action.modelTextArr };

    case 'SET_TYPING_TEXT':
      const currWordsIndices = findCurrWordsIndices(
        action.typedText,
        state.modelTextArr
      );

      const errIndices = findErrIndices(action.typedText, state.modelTextArr);

      // Calculate:
      // typing duration,
      // countable strokes, to be counted need to increased length of typed text,
      // correctStroke
      const duration =
        moment().valueOf() -
        (state.typingStarted ? state.startingTime : moment().valueOf());

      let stroke = state.stroke;
      let correctStroke = state.correctStroke;
      let timeTakenForCorrectStroke = null;
      let lastTwoCorrect = state.lastTwoCorrectCounter;

      if (action.mistake !== null) {
        correctStroke = state.correctStroke + 1;
        stroke = state.stroke + 1;

        if (action.mistake === true) {
          lastTwoCorrect = 0;
          correctStroke = state.correctStroke; // correctStroke was increased 3 lines ago, so now its reverted
        } else if (action.mistake === false) {
          lastTwoCorrect = state.lastTwoCorrectCounter + 1;

          if (lastTwoCorrect > 2) {
            timeTakenForCorrectStroke =
              moment().valueOf() -
              (state.typingStarted
                ? state.lastTimeStampOfSetTypingTextRequest
                : moment().valueOf());
          }
        }
      }

      return {
        ...state,
        typedText: action.typedText,
        currWordsIndices,
        errIndices,
        typingStarted: true,
        startingTime: state.typingStarted
          ? state.startingTime
          : moment().valueOf(),
        duration,
        speed:
          state.typedText.length /
          5 /
          ((duration + state.correctStrokeSpeed * state.errIndices.length) /
            60000),
        stroke,
        correctStroke,
        accuracy: correctStroke / stroke,
        lastTimeStampOfSetTypingTextRequest: moment().valueOf(),
        timeTakenForCorrectStrokeArr: timeTakenForCorrectStroke
          ? [...state.timeTakenForCorrectStrokeArr, timeTakenForCorrectStroke]
          : state.timeTakenForCorrectStrokeArr,
        correctStrokeSpeed:
          state.timeTakenForCorrectStrokeArr.reduce((a, b) => a + b, 0) /
          state.timeTakenForCorrectStrokeArr.length,
        lastTwoCorrectCounter: lastTwoCorrect
      };

    default:
      return state;
  }
};

export default modelReducer;

// Helper functions
const findCurrWordsIndices = (typedText, modelTextArr) => {
  const currIndices = [];

  // Push Index numbers of current word
  for (let i = typedText.length, len = modelTextArr.length; i < len + 1; i++) {
    if (modelTextArr[i] !== ' ') currIndices.push(i);
    else {
      currIndices.push(i);
      break;
    }
  }

  for (let i = typedText.length - 1; i >= 0; i--) {
    if (modelTextArr[i] !== ' ') currIndices.push(i);
    else break;
  }

  return currIndices;
};

// Helper function
const findErrIndices = (typedText, modelTextArr) => {
  const errIndices = [];

  // push index numbers of wrong typed chars
  for (let i = 0, len = typedText.length; i < len; i++) {
    if (typedText[i] !== modelTextArr[i]) {
      errIndices.push(i);
    }
  }

  return errIndices;
};
