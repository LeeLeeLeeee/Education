import { createActions, handleActions } from 'redux-actions';
import asyncApi from '../personAPI'
const actionTypeArr = ['REQUEST', 'SUCCESS', 'ERROR'];

export const {
    request,
    success,
    error,
} = createActions(...actionTypeArr,{
    prefix:'THUNK'
})

export const fetchApi = (prop) => dispatch => {
    dispatch(request())
    asyncApi(prop, 'fetch')
    .then(data => dispatch(success(data)))
    .catch(err => dispatch(error(err)))
}

export const axiosApi = (prop) => dispatch => {
    dispatch(request())
    asyncApi(prop, 'axios')
    .then(data => dispatch(success(data)))
    .catch(err => dispatch(error(err)))
}

const initialState = {
    loading : false, 
    persons : [],
    error : false,
    requestProcess: [],
}   

export default handleActions({
    [request]: (state, action) => ({...state, loading:true, error: false}),
    [success]: (state, action) => {
        let statex = Array.isArray(action.payload) 
                    ? {...state, loading: false, persons: [...action.payload]}
                    : {...state, loading: false, persons: [action.payload]}
        return statex
    },
    [error]: (state, action) => ({...state,   loading:false, error: true}),
},initialState)
