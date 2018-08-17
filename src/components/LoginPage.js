import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = props => {
  return (
    <div>
      <button onClick={props.startLogin}>Log in</button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    startLogin: () => {
      console.log('try login');
      dispatch(startLogin());
    }
  };
};

export default connect(
  undefined,
  mapDispatchToProps
)(LoginPage);
