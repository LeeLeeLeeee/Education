import { createAction } from 'redux-actions'

export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'

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
export const addTodo = createAction(ADD_TODO, todo => todo)


const initialState = {
    allIds: [],
    byPerson: {

    },
    byIds: {

    }
};

export default function(state = initialState, action){
    const param = action.payload || false;
    switch(action.type){
        case ADD_TODO:
            if(!!param.person){
                param.completed = false;
                return {
                    ...state,
                    allIds: [
                        ...allIds, 
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
            }else{
                alert('사용자 먼저 선택해주세요.');
                return state;
            };
        case DELETE_TODO:
            return {
                ...state,
                allIds: state.allIds.filter(todo=> todo.id !== param.id),
                byPerson: {
                    ...byPerson,
                    [param.person]: state.byPerson.filter(todo=> todo.id !== param.id)
                }
            }

        case TOGGLE_TODO:

    }
}