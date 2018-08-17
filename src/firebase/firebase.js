import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBfF-egL2MfuDX9eYFEIPdU22z1UhTalRU',
  authDomain: 'code-biters.firebaseapp.com',
  databaseURL: 'https://code-biters.firebaseio.com',
  projectId: 'code-biters',
  storageBucket: 'code-biters.appspot.com',
  messagingSenderId: '276368817626'
};
firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
