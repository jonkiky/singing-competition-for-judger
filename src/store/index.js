import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';


const loggerMiddleware = createLogger();

const store = createStore(
  applyMiddleware(ReduxThunk, loggerMiddleware),
);

export default store;
