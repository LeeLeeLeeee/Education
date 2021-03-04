import { createAction } from 'redux-actions';
import clonedeep from 'lodash.clonedeep';

export const ADD_PERSON = 'PERSON/ADD_PERSON'
export const DELETE_PERSON = 'PERSON/DELETE_PERSON'

export const addPerson = createAction(ADD_PERSON, name => name)
export const deletePerson = createAction(DELETE_PERSON, name => name)


const initialState = [];

/* 
return {
        ...state,
        allIds: [
            ...state.allIds, 
            param.id
        ],
        byPerson: {
            ...state.byPerson,
            [param.person]: state.byPerson[param.person] // 등록된 사람이 있다면.
                ? state.byPerson[param.person].concat([param])
                : [param]
        },
        byIds: {
            ...state.byIds,
            [param.id]: param
        }
};
*/

export default function(state = initialState, action){
    const { name } = action.payload || { name : false };
    switch(action.type){
        case ADD_PERSON:
            return [...state, name]
        case DELETE_PERSON:         
            return state.filter( sname => sname !== name );
        default:
            return state;
    }
}