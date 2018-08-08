import React from 'react';
import { connect } from 'react-redux';

const CurrStat = ({ model }) => {
  return (
    <div>
      <h3>Stats</h3>
      <p>Speed: {model.speed.toFixed(2)}</p>
      <p>Accuracy: {(model.accuracy * 100).toFixed(2) + '%'}</p>
      <p>correctStrokeSpeed: {model.correctStrokeSpeed}</p>
    </div>
  );
};

export default connect(state => state)(CurrStat);
