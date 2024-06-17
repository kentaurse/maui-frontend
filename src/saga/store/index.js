 import {
  createStore,
  compose,
  applyMiddleware,
} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
// import { createLogger } from 'redux-logger';

import createRootReducer from '../reducers';
import rootSaga from '../sagas';

export default function configureStore(initialState = {}, history) {
  const sagaMiddleware = createSagaMiddleware();
  // const loggerMiddleware = createLogger();
  const composeEnhancers =
    typeof window === 'object' &&
    /* eslint-disable no-underscore-dangle */
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;
  const middleware = composeEnhancers(applyMiddleware(
    sagaMiddleware,
    // loggerMiddleware,
    routerMiddleware(history)
  ));

  const store = createStore(
    createRootReducer(history),
    initialState,
    middleware
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
