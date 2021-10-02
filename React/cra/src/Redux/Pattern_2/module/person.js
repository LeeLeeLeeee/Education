import { createAction } from 'redux-actions';

export const ADD_PERSON = 'PERSON/ADD_PERSON'
export const DELETE_PERSON = 'PERSON/DELETE_PERSON'

export const addPerson = createAction(ADD_PERSON, name => name)
export const deletePerson = createAction(DELETE_PERSON, name => name)


const initialState = [];

export default function(state = initialState, action){
    const name = action.payload || '';
    switch(action.type){
        case ADD_PERSON:
            return [...state, name]
        case DELETE_PERSON:         
            return state.filter( sname => sname !== name );
        default:
            return state;
    }
}