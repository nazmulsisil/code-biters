import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import modelReducer from '../reducers/model';
import authReducer from '../reducers/auth';
import resultReducer from '../reducers/result';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  return createStore(
    combineReducers({
      model: modelReducer,
      result: resultReducer,
      auth: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
};

export default configureStore;
