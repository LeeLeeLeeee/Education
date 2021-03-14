import { applyMiddleware, createStore } from 'redux';
import rootReducer, { rootSaga } from './module/index';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'
import createSagaMiddleWare from 'redux-saga';
const logger = createLogger();
const saga = createSagaMiddleWare();
export default createStore(rootReducer,composeWithDevTools(applyMiddleware(logger, thunk, saga)));
saga.run(rootSaga);