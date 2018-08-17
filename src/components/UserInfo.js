import React from 'react';
import { connect } from 'react-redux';

export const UserInfo = props => {
  return (
    <dl>
      <h3>{props.auth.displayName}</h3>
      <div>Num of tests taken: </div>
      <div>Lifetime avg speed: </div>
      <div>Lifetime avg accuracy: </div>
      <div>Total characters typed:</div>
      <div>Total typing duration: </div>
      <div>Worst ten( 10 ) keys: </div>
      <div>Best five( 5 ) keys: </div>
      <div>Typing speed graph: </div>
      <div>Typing accuracy graph: </div>
    </dl>
  );
};

export default connect(state => state)(UserInfo);
