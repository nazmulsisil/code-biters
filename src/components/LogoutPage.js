import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const LogoutPage = props => {
  return (
    <div>
      <button onClick={props.startLogout}>Log out</button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    startLogout: () => {
      dispatch(startLogout());
    }
  };
};

export default connect(
  undefined,
  mapDispatchToProps
)(LogoutPage);
