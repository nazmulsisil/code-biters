import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Model from './components/Model';
import Typing from './components/Typing';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import './firebase/firebase';
import { firebase } from './firebase/firebase';
import CurrStat from './components/CurrStat';
import { startResetAll } from './actions/model';
import ModelChanger from './components/ModelChanger';
import LoginPage from './components/LoginPage';
import LogoutPage from './components/LogoutPage';
import UserInfo from './components/UserInfo';
import { login, logout } from './actions/auth';

const store = configureStore();

// store.subscribe(() => {
//   console.log(store.getState());
// });

store.dispatch(startResetAll());

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const uid = user.uid;
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;

    store.dispatch(login(uid, displayName, email, photoURL));
  } else {
    store.dispatch(logout());
  }
});

const jsx = (
  <Provider store={store}>
    <div className="container">
      <LoginPage />
      <LogoutPage />
      <UserInfo />
      <ModelChanger />
      <Model />
      <Typing />
      <CurrStat />
    </div>
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
