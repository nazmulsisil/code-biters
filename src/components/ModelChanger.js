import React from 'react';
import { connect } from 'react-redux';
import { startResetAll } from '../actions/model';

const ModelChanger = props => {
  const modelChangeRequested = () => {
    props.startResetAll();
  };
  return <button onClick={modelChangeRequested}>Change Joke</button>;
};

const mapDispatchToProps = dispatch => {
  return {
    startResetAll: () => dispatch(startResetAll())
  };
};

export default connect(
  state => state,
  mapDispatchToProps
)(ModelChanger);
