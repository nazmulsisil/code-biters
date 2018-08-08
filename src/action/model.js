const r = require('chance')();

export const setModelTextArr = () => {
  const modelTextArr = r.paragraph({ sentences: 4 });
  return {
    type: 'SET_MODEL_TEXT',
    modelTextArr: modelTextArr
  };
};

export const setErrorModelCharacterIndex = () => {
  return {
    type: 'SET_ERROR_MODEL_CHARACTER_INDEX'
  };
};

export const setTypingText = (typedText, mistake) => {
  return {
    type: 'SET_TYPING_TEXT',
    typedText,
    mistake
  };
};
