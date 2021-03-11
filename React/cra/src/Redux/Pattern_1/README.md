# Redux Pattern - 1.

***프로젝트 목적***  
**1. 기본적인 Redux 패턴을 적용해보기.**  
**2. 간단한 TOGGLE 및 Counter Component 구현**  

Action, Reducer, Store로 폴더를 구별하여 코드가 훨씬 간결해짐.  
다만 폴더 구조 및 파일의 수가 증가하면서 파일 구별의 어려움이 있을 것이라고 생각됨.  

### 폴더 구조
**Container[F]**
> Redux Store와 Component를 연동하는 폴더.

**Component[F]**
> 이벤트가 실제 Dispatch되는 폴더

**action[F]**
> Action 타입 및 생성

**reducer[F]**
> reducer 생성

**index.js[f]**
> Provider로 Container에 store 전달

**store.js[f]**
> Store에 Reducer 연동
---

### Notice
**mapStateToProps**
```typescript
    //mapStateToProps에서 store의 state를 가져오는 작업을 할 때 해당 작업을 모듈화 하는 작업을 할 때 좋을 것 같다.
    /* 
        VISIBILITY_FILTERS = {
              ALL: "all",
                COMPLETED: "completed",
                INCOMPLETE: "incomplete"
        }
        
        store의 상태
        const initialState = {
            allIds: [],
            byIds: {}
        };
    */
    import { VISIBILITY_FILTERS } from "";

    //store의 state를 가져옴
    export const getTodosState = store => store.todos;

    //state에 값이 있으면 ID
    export const getTodoList = store =>
    getTodosState(store) ? getTodosState(store).allIds : [];

    export const getTodoById = (store, id) =>
    getTodosState(store) ? { ...getTodosState(store).byIds[id], id } : {};

    /**
     * example of a slightly more complex selector
     * select from store combining information from multiple reducers
     */
    export const getTodos = store =>
    getTodoList(store).map(id => getTodoById(store, id));

    export const getTodosByVisibilityFilter = (store, visibilityFilter) => {
        const allTodos = getTodos(store);
        switch (visibilityFilter) {
            case VISIBILITY_FILTERS.COMPLETED:
            return allTodos.filter(todo => todo.completed);
            case VISIBILITY_FILTERS.INCOMPLETE:
            return allTodos.filter(todo => !todo.completed);
            case VISIBILITY_FILTERS.ALL:
            default:
            return allTodos;
        }
    };
```

**mapDispatchToProps**
```typescript
    // connect로 mapDispathToProps를 연결해줄 때의 방식들
    // 1. 기본 mapDispatchToProps 함수 생성 후 각 key에 맞는 reducer 매칭
    // 추가된 dept는 개인적으로 추가한 내용이며 각 컴포넌트에 맞게 구별해둠.
    const mapDispatchToProps = (dispatch) => ({
        listen_counter: {
            increase: () => dispatch(increase()),
            decrease: () => dispatch(decrease()),
            update: (num) => dispatch(update(num)),
        },
        listen_toggle: {
            toggle: () => dispatch(toggle()),
        },
    });
    // 2. bindActionCreators를 사용할 경우
    const mapDispatchToProps = dispatch => ({
        listen_counter: bindActionCreators(
            {
                increase,
                decrease,
                update
            },
            dispatch
        ),
        listen_toggle: bindActionCreators(
            { toggle },
            dispatch
        )
    });

    //3. 제일 간단한 방법, connect에 맞기기
    connect(mapStateToProps,{increase, decrease, update})(CounterApp)
```
**combineReducers**
```typescript
    //분리하여 작성한 reducer를 하나로 합쳐주는 함수
    export default combineReducers({reducer_1, reducer_2});
```

### Review
Reducer를 사용함에 있어 더 좋은 패턴을 찾는 것이 중요한 것 같다.  
우선 Container에만 Store를 붙인 후 각 Component에 뿌려주는 것은 좋은 것 같으며  
그에 따른 Dept의 추가또한 코드 식별성에 매우 도움이 되었다.
