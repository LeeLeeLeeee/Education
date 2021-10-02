# Redux Pattern - 2.

***프로젝트 목적***  
**1. Ducks패턴을 활용해보기.**  
**2. 간단한 TODO 페이지 작업 인원별 TODOLIST**  

한 파일안에 Action, Action생성, Reducer 모두 넣어서 작성하는 패턴  
같은 목적을 가진 로직들을 한 파일로 처리하기 때문에 폴더 구조 및 파일이 단순해짐  
하지만 코드의 양이 많아지면서 코드의 가독성을 해칠 수 있음.


### 폴더 구조
**Container[F]**
> Redux Store와 Component를 연동하는 폴더.

**Component[F]**
> 이벤트가 실제 Dispatch되는 폴더

**module[F]**
> Redux 모듈이 들어있는 폴더

**index.js[f]**
> Provider로 Container에 store 전달

**store.js[f]**
> Store에 Reducer 연동
---

### Notice

##### * Ducks Pattern
**덕스 패턴 파일**
```javascript
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
```

##### * Deep Copy Way
**객체를 깊은 복사하는 방법**
1. JSON Stringfy => JSON parse
2. lodash.clonedeep 함수
3. immer.js 
4. Spread 연산자.

```javascript
     //1. JSON way
     let A = {'a':'b'};
     let B = JSON.stringfy(A);
     B = JSON.parse(B);

     //2. lodash.clonedeep way
     let A = {'a': 'b'};
     let B = clonedeep(A);

    //3 . immer way
    // import produce from 'immer'
    let A = {'a': 'b'};
    let B = produce(A, draft => draft);
    /* 파라미터를 하나만 던질 경우 상태를 업데이트해주는 함수가 됨. */
    let A = {'a': 'b'};
    let Fn = produce(draft => draft);
    let B = Fn(A);

    //4. Spread Operator Way.
    let A = {'a': 'b'};
    let B = {...A};

```
##### * Selector
**Store의 State를 정제하여 가져오기**
프로젝트를 진행하면서 State 상태를 정제해야하는 일이 많아진다.
종종 데이터를 Component에서 정제하게 되면 코드가 점점 복잡해지고
불필요한 코드도 늘어나게 되었던 것 같다. 이를 해결하기 위한 좋은 방법이 될 것 같다.
하지만 Selector를 사용함에 있어 어느정도에 규약은 스스로 정해야할 것 같다.

```javascript
    // selector.js
    export const getTodoState = store => store.todo;

    export const getTodoList = store =>
        getTodoState(store) ? getTodoState(store).allIds : [];

    export const getTodoById = (store, id) => 
        getTodoState(store) ? { ...getTodoState(store).byIds[id]} : {}

    export const getTodos = store =>
        getTodoList(store).map(id=> getTodoById(store, id));

    export const getTodoByName = (store, name) =>
        getTodoState(store).byPerson ?
            getTodoState(store).byPerson[name] ? 
            [...getTodoState(store).byPerson[name]] 
            : []
        : [];

    export const getCountByPerson = (store, name) => getTodoByName(store, name).length

    export const getTodosByFilter = (store, typeFilter, nameFilter = '' ) => {
        const todoList = nameFilter !== '' ?
        getTodoByName(store, nameFilter) :
        getTodos(store);

        switch(typeFilter){
            case typeInterface.COMPLETE:
                return todoList.filter(todo => todo.completed);
            case typeInterface.INCOMPLETE:
                return todoList.filter(todo => !todo.completed);
            case typeInterface.ALL:
                return todoList;
        }   
    }

    // Container/index.js
    const mapStateToProps = (state) => {
        const { todoType, personType } = state.filter;
        const todo = getTodosByFilter(state, todoType, personType);
        const user = state.person;
        const userTodoCnt = {};
        user.forEach(name=> userTodoCnt[name] = getCountByPerson(state, name))
        
        return {
            state_todo: {
                todoType,
                todo,
                personType
            },
            state_person: {
                user,
                personType,
                userTodoCnt
            }
        }
    }

```
##### * createAction 
**createAction은 Action생성을 단순화 해주는 함수이다.**
```javascript
    //-- parameter 없을 때.
    //* before
    export const example = () => ({
        type: EXAMPLE
    });
    //* after 
    export const example = createAction(EXAMPLE);

    //-- parameter 있을 때.

    //* before
    export const example = (param) => ({
        type: EXAMPLE,
        payload: param
    });
    //* after 
    export const example = createAction(EXAMPLE, param => param);
```
---


### Review
Ducks 패턴으로 작업을 하는 경우 불필요한 파일이 줄어들면서 작업 시간이 확실히 단축된 느낌을 받았다.
하지만 이건 어디까지나 학습용 사이트이기 때문에 규모가 커질 수록 Ducks 패턴이 힘을 쓸 수 있을 지는 의문이다.
