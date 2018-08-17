import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid, displayName, email, photoURL) => {
  return { type: 'LOGIN', uid, displayName, email, photoURL };
};

export const startLogin = () => {
  return dispatch => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export const startLogout = () => {
  return dispatch => {
    return firebase.auth().signOut();
  };
};
