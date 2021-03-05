import { createStore } from 'redux';
import rootReducer from './module/index';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구

export default createStore(rootReducer, composeWithDevTools());