import React from 'react';
import { connect } from 'react-redux';

const CurrStat = ({ model }) => {
  return (
    <div>
      <h3>Stats</h3>
      <p>netSpeed: {model.netSpeed}</p>
      <p>accuracy: {model.accuracy * 100}%</p>
    </div>
  );
};

export default connect(state => state)(CurrStat);
