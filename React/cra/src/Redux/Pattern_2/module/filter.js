import { createAction } from 'redux-actions';

export const SET_TYPE = 'FILTER/SET_TYPE';
export const SET_NAME = 'FILTER/SET_NAME';

export const setType = createAction(SET_TYPE, type => type );
export const setName = createAction(SET_NAME, name => name );

const initialState = {
    type: 'all',
    name: ''
};

export default function(state = initialState, action){
    switch(action.type){
        case SET_FILTER:
            const { type } = action.payload;
            return {
                ...state,
                type
            };
        case SET_NAME:
            const { name } = action.payload;
            return {
                ...state,
                name
            };
        default:
            return state;
    }
}