import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import fetch from './fetch';
import workflow from './workflow';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  fetch,
  workflow,
});

export default createRootReducer
