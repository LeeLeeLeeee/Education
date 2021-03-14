import { combineReducers } from 'redux';
import person from './thunk/person'
import sagaPerson, { counterSaga, RestSaga } from './saga/personSaga'

import { all, fork } from 'redux-saga/effects';


export default combineReducers({person, sagaPerson});

export function* rootSaga(){
    yield all([counterSaga(), RestSaga()])
    //yield all([fork(counterSaga),fork(RestSaga)])
}



