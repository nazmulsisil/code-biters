export const findCurrWordsIndices = (typedText, modelTextArr) => {
  if (modelTextArr.join('') === 'Loading...') return [];

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

export const findErrIndices = (typedText, modelTextArr) => {
  const errIndices = [];
  // push index numbers of wrong typed chars
  for (let i = 0, len = typedText.length; i < len; i++) {
    if (typedText[i] !== modelTextArr[i]) {
      errIndices.push(i);
    }
  }
  return errIndices;
};

export const calcWPM = msPerChar => {
  // 5 characters equals to one word
  return 60000 / (msPerChar * 5);
};

export const calcAvgOfArr = arr => {
  return arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 'NA';
};
