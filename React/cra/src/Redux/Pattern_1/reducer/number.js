/* Reducer */

import { INCREASE, DECREASE, UPDATE } from '../action/number/type';

const initialState = {
    number : 0
}

export default function(state = initialState, action){
    switch(action.type){
        case INCREASE: {
            return {
                ...state,
                number: state.number+1
            };
        }
        case DECREASE: {
            return {
                ...state,
                number: state.number-1
            };
        }
        case UPDATE: {
            const { num } = action.payload;
            return {
                ...state,
                number: num
            };
        }
        default:
            return state;
    }
}