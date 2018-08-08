import React from 'react';
import { connect } from 'react-redux';

const Model = ({ model }) => {
  return (
    <div className="model">
      <p className="model__text">
        {model.modelTextArr.map((char, i) => {
          let main = 'model__char';
          let err =
            model.errIndices && model.errIndices.includes(i)
              ? ' model__char--err'
              : '';
          let curr =
            model.currWordsIndices && model.currWordsIndices.includes(i)
              ? ' model__char--curr'
              : '';
          const className = main + curr + err;

          return (
            <span className={className} key={char + i}>
              {char}
            </span>
          );
        })}
      </p>
    </div>
  );
};

export default connect(state => state)(Model);
