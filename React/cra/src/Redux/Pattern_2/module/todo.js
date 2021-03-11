import { createAction } from 'redux-actions';
import clonedeep from 'lodash.clonedeep';

export const ADD_TODO       = 'TODO/ADD_TODO'
export const DELETE_TODO    = 'TODO/DELETE_TODO'
export const TOGGLE_TODO    = 'TODO/TOGGLE_TODO'
export const DELETE_PERSON  = 'TODO/DELETE_PERSON'

/* 
    createAction은 Action생성을 단순화 해주는 함수이다.
    -- parameter 없을 때.
    * before
    export const example = () => ({
        type: EXAMPLE
    });
    * after 
    export const example = createAction(EXAMPLE);

    -- parameter 있을 때.

    * before
    export const example = (param) => ({
        type: EXAMPLE,
        payload: param
    });
    * after 
    export const example = createAction(EXAMPLE, param => param);

*/
export const addTodo = createAction(ADD_TODO, param => param);
export const deleteTodo = createAction(DELETE_TODO, param => param);
export const toggleTodo = createAction(TOGGLE_TODO, param => param);
export const deleteTodoPerson = createAction(DELETE_PERSON, param => param);

const initialState = {
    allIds: [],
    byPerson: {},
    byIds: {}
};

let nextTodoId = 0

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
    const param = action.payload || {};
    let newState = '';
    switch(action.type){
        case ADD_TODO:
            param.id = (++nextTodoId);
            if(!!param.person){
                param.completed = false;
                newState = clonedeep(state);
                newState.allIds.push(param.id);
                newState.byPerson[param.person]
                ? newState.byPerson[param.person].push(param)
                : newState.byPerson[param.person] = [param];
                newState.byIds[param.id] = param;
                return newState;
            }else{
                alert('사용자 먼저 선택해주세요.');
                return state;
            };

        case DELETE_TODO:            
            newState = clonedeep(state);
            newState.allIds = newState.allIds.filter(id=> id !== +param);
            newState.byPerson[newState.byIds[param].person] = 
            newState.byPerson[newState.byIds[param].person]
            .filter(todo => todo.id !== +param );

            delete newState.byIds[param]
            return newState;

        case TOGGLE_TODO:
            newState = clonedeep(state);

            newState.byPerson[newState.byIds[param].person] = 
            newState.byPerson[newState.byIds[param].person]
            .map((item)=> {
                if(item === param) {
                    item.completed = !item.completed;
                    return item;
                }
                return item
            });
            newState.byIds[param].completed = !newState.byIds[param].completed;
            return newState;
        case DELETE_PERSON:
            newState = clonedeep(state);
            if(newState.byPerson[param]){
                newState.byPerson[param].forEach(todo=>{
                    delete newState.byIds[todo.id];
                    newState.allIds.splice(
                        newState.allIds.indexOf(todo.id),
                        1
                    );
                });
                delete newState.byPerson[param];
            }
            return newState;
        default:
            return state;
    }
}