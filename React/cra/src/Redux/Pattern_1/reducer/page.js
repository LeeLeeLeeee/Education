/* Reducer */

import { TOGGLE } from '../action/page/type';

const initialState = {
    toggle : false
}

export default function(state = initialState, action){
    switch(action.type){
        case TOGGLE: {
            return {
                ...state,
                toggle: !state.toggle
            };
        }
        default:
            return state;
    }
}