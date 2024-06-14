import { all } from 'redux-saga/effects';
import workflowSaga from './workflowSaga';

export default function* sagaIndex() {
  yield all([
    workflowSaga(),
  ]);
}
