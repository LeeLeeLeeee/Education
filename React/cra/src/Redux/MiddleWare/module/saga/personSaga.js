import {  createAction, createActions, handleActions } from "redux-actions";
import { delay, put, call, takeEvery, takeLatest} from 'redux-saga/effects';
import asyncApi from '../personAPI'
const actionTypeArr = ['REQUEST_SAGA','SUCCESS_SAGA','ERROR_SAGA', 'INCREASE','DECREASE']

export const {
    requestSaga,
    successSaga,
    errorSaga,
    increase,
    decrease
} = createActions(...actionTypeArr, {
    prefix:'SAGA'
})
console.log(createActions(...actionTypeArr, {
    prefix:'SAGA'
}))
/* -- counter --  */

const INCREASE_ASYNC = 'INCREASE_ASYNC';
const DECREASE_ASYNC = 'DECREASE_ASYNC';
export const increaseAsync = () => ({type:INCREASE_ASYNC})
export const decreaseAsync = () => ({type:DECREASE_ASYNC})

function* increaseSaga(){
    yield delay(1000)
    yield put(increase())
}

function* decreaseSaga(){
    yield delay(1000)
    yield put(decrease())
}

export function* counterSaga(){    
    yield takeEvery(INCREASE_ASYNC, increaseSaga)
    yield takeLatest(DECREASE_ASYNC, decreaseSaga)
}

/* -- rest api -- */

const FETCHAPI = 'FETCH';
const AXIOSAPI = 'AXIOS';
export const fetchAction = createAction(FETCHAPI, prop => prop)
export const axiosAction = createAction(AXIOSAPI, prop => prop)

function* fetchSagaApi(action){
    try {
        
        yield put(requestSaga())
        const data = yield call(asyncApi, action.payload, 'fetch')
        
        yield put(successSaga(data))
    } catch (error) {
        console.log(error)
        yield put(errorSaga())
    }
}

function* axiosSagaApi(action){
    try {
        yield put(requestSaga())
        const data = yield call(asyncApi, action.payload, 'axios')
        yield put(successSaga(data))
    } catch (error) {
        yield put(errorSaga())
    }
}

export function* RestSaga(){    
    yield takeEvery(FETCHAPI, fetchSagaApi)
    yield takeEvery(AXIOSAPI, axiosSagaApi)
}


const initialState = {
    count: 0,
    loading : false, 
    persons : [],
    error : false,
};

export default handleActions({
    [increase] : (state, action) => ({...state, count: state.count+1}),
    [decrease] : (state, action) => ({...state, count: state.count-1}),
    [requestSaga]: (state, action) => ({...state, loading:true, error: false}),
    [successSaga]: (state, action) => {
        let statex = Array.isArray(action.payload) 
                    ? {...state, loading: false, persons: [...action.payload]}
                    : {...state, loading: false, persons: [action.payload]}
        return statex
    },
    [errorSaga]: (state, action) => ({...state,   loading:false, error: true}),

}, initialState);