import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Model from './components/Model';
import Typing from './components/Typing';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import CurrStat from './components/CurrStat';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <div className="container">
      <Model />
      <Typing />
      <CurrStat />
    </div>
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
