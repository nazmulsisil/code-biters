import { createStore, combineReducers } from 'redux';
import modelReducer from '../reducers/model';

const configureStore = () => {
  return createStore(
    combineReducers({
      model: modelReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

export default configureStore;
