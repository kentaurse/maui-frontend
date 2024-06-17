import { combineReducers } from 'redux';

const isRunning = (state = {}, action) => {
  switch ((action.type).split('_')[(action.type).split('_').length - 1]) {
    case 'PENDING':
      return { ...state, [action.originalType]: true };
    case 'FAIL':
    case 'SUCCESS':
      return { ...state, [action.originalType]: false };
    default:
      return state;
  }
};

const isDone = (state = {}, action) => {
  switch ((action.type).split('_')[(action.type).split('_').length - 1]) {
    case 'PENDING':
    case 'FAIL':
      return { ...state, [action.originalType]: false };
    case 'SUCCESS':
      return { ...state, [action.originalType]: true };
    default:
      return state;
  }
};

const doneAt = (state = {}, action) => {
  switch ((action.type).split('_')[(action.type).split('_').length - 1]) {
    case 'SUCCESS':
      return { ...state, [action.originalType]: (new Date()).toString() };
    default:
      return state;
  }
};

export default combineReducers({
  isRunning,
  isDone,
  doneAt,
});
