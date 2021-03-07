import { createAction } from 'redux-actions';

export const SET_TYPE = 'FILTER/SET_TYPE';
export const SET_PERSON = 'FILTER/SET_NAME';

export const setType = createAction(SET_TYPE, todoType => todoType );
export const setPerson = createAction(SET_PERSON, person => person );

const initialState = {
    todoType: 'all',
    personType: ''
};

export default function(state = initialState, action){
    switch(action.type){
        case SET_TYPE:
            const todoType = action.payload;
            return {
                ...state,
                todoType
            };
        case SET_PERSON:
            const personType = action.payload;
            return {
                ...state,
                personType
            };
        default:
            return state;
    }
}