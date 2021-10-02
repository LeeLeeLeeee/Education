import { applyMiddleware, createStore } from 'redux';
import rootReducer from './module/index';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구
import { createLogger } from 'redux-logger';
const logger = createLogger();
export default createStore(rootReducer,composeWithDevTools(applyMiddleware(logger)));