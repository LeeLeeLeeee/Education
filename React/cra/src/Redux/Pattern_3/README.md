# Redux Pattern - 1.

###  프로젝트 목적
**1. ReduxToolKit을 사용한 패턴 구현.**  
**2. 간단한 TOGGLE 및 Counter Component 구현**  

ReduxToolkit에 내장되어 있는 기능들로 코드를 좀더 간편하게 구현 가능  
Redux측에서는 feature로 구별되는 폴더 구조를 지향하는 것 같음.  
ReduxToolkit에서는 `immer`로 불변성을 관리하며 `reselect`로 메모리제이션 기능을 지원함.

### 폴더 구조
- Container[F]
- feature[F]
- counter[F]
    - couter관련 reduce 및 api
- user[F]
    - user관련 reduce 및 api
- index[f]
- store[f]
### Notice

#### Redux Hook
**useSelector, useDispatch**  
redux에서 지원하는 HOOK이다.
```javascript
    let value = useSelector(state => 반환값) // store의 state값을 매개변수로 받는 callback 함수
    /* 
        useSelector는 반환한 값이 변경될 때마다 컴포넌트를 리렌더링한다.
        반환 값이 단일 값이면 상관없으나 객체일 경우
        Redux특성상 계속해서 신규 객체를 반환하므로 같은 객체여도 페이지를 리렌더링한다.
        이를 해결하기 위해 객체를 단일 값 단위로 나누거나
        react-redux에서 지원해주는 shallowEqual 함수를 두 번째 매개변수로 보낸다.
    */
    useSelector(state=> {}, shallowEqual)
    /* shallowEqual은 객체의 1 dept까지만 비교해주는 함수이다. */

    let dispatch = useDispatch() // store를 dispatch해주는 객체 반환
```
#### Redux-Toolkit API
**configureStore**  
`createStore`와 비슷한 API로 Store를 구성해주는 함수이다.  
reducer, MiddleWare, devTools를 세팅할 수 있다.
```javascript
    export default configureStore({
        reducer: {
            counter: counterReducer,
            user: userReducer
        },
        //getDefaultMiddleware는 기본 middleware 배열을 반환한다. 
        //[thunk, immutableStateInvariant, serializableStateInvariant]
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger) // 배열로 받을 수 있음
    })
```
**createAction**  
간단하게 Action을 생성해주는 모듈 
```javascript
    /* 기본 */
    const addTodo = createAction('todo/add')
    /* 사용 예시 */
    let action = addTodo(); // returns {type: 'todo/add'}
    //파라미터가 넘어올 경우 자동으로 payload에 들어감
    action = addTodo(3); //returns {type: 'todo/add', payload: 3}

    /* 파라미터가 넘어갈 때 추가적으로 수정하고 싶은 경우 */
    const addTodo = createAction("todos/add", function prepare(text) {
        return {
            payload: {
                text,
                createdAt: new Date().toISOString()
            }
        };
    });
    
```


**createReducer**    
간단하게 reducer를 생성해주는 모듈로 자체적으로 `immer`를 지원한다.  
또한 `switch...case`로 구현하던 패턴을 `addClass`패턴으로 생성할 수 있게한다.
```javascript
const initialState = { value: 0 }

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, value: state.value + 1 }
    case 'decrement':
      return { ...state, value: state.value - 1 }
    case 'incrementByAmount':
      return { ...state, value: state.value + action.payload }
    default:
      return state
  }
}
/* ver. addClass  */
const increment = createAction('counter/increment')
const decrement = createAction('counter/decrement')
const incrementByAmount = createAction('counter/incrementByAmount')

const counterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state, action) => {
      state.value++
    })
    .addCase(decrement, (state, action) => {
      state.value--
    })
    .addCase(incrementByAmount, (state, action) => {
      state.value += action.payload
    })
})
```
**createAsyncThunk**  
`redux-thunk`를 이용한 비동기 작업 함수 생성시켜주는 모듈.
```javascript
    export const insertUserAsync = createAsyncThunk(
        'user/success',
        async (nameParam) => {
            const name = await userCall(nameParam);
            return {
                name,
                createDt: Date.now()
            }
        }
    )
```
**createSlice**   
`action`과 `reducer`가 합쳐진 모듈이다.  
`immer`와 `redux-thunk`를 지원한다.
```javascript
    /* 기본 */
    export const counterSlice = createSlice({
        name: 'counter', /* action 앞에 붙을 타입 -> counter/[something] */
        initialState: { /* 초기 값 */
            value: 0,
            loading: false,
        },
        reducers: { /* reducer */
            increment: state => { state.value += 1 },
            decrement: state => { state.value -= 1 },
            incrementByAmount: (state, action) => {state.value += +action.payload},
            toggleLoading: state => { state.loading = !state.loading }
        }
    });

    /* 추가 기능 */
    const userSlice = createSlice({
        name: 'users',
        initialState: { loading: false, entity: [], filterValue: ''},
        reducers: {
            setFilterValue: (state, action) => { console.log(action.payload); state.filterValue = action.payload},
            userAdd: { /* payload를 가공하여 넣고 싶을 때 */
                reducer: (state, action) => { state.entity.push(action.payload) },
                prepare: (name) => {
                    return {
                        payload: {
                            name,
                            createDt: Date.now()
                        }
                    }
                }
            },
        },
        extraReducers:{ /* 비동기 reducer를 처리할 때. 자동으로 thunk를 지원해준다. */
            /* insertUserAsync는 createAsyncThunk로 만든 reducer */
            [insertUserAsync.pending]: (state, action)=>{ /* 대기 */
                state.loading = true
            },
            [insertUserAsync.fulfilled]: (state, action) => { /* 성공 */
                console.log('user -success')
                state.loading = false;
                state.entity.push(action.payload)
            },
            [insertUserAsync.rejected]: (state, action) => { /* 실패 */
                console.log('user -error')
                state.loading = false;
            }
        }
    })

```
**createSelector**  
`rselect`를 활용한 메모이제이션 기능을 사용할 수 있게 해준다.  
메모이제이션이란 상태 추출에 사용하는 값이 변경되지 않으면 다시 실행되지 않는 것이다.
```javascript
    /* 
        마지막 콜백 함수의 return값이 변수에 할당된다.
        해당 콜백 함수 이전의 함수들의 리턴 값들은 마지막 콜백 함수의 인자들로 구성되며
        선언 순서는 동일하다.
        메모이제이션 기능을 사용하였기 때문에 entity, filterValue가 변경되지 않는 한
        해당 Selector는 실행되지 않는다.
    */
    export const userFilter = createSelector(
    state => state.user.entity,
    state => state.user.filterValue,
    (user, filterValue) => user.filter(item => RegExp(filterValue).test(item.name) && filterValue !== '' )
    )

```
### Review
좋은 기능이 많은 것 같다. 해당 모듈을 기반으로 Redux의 Action, Reducer를 좀더 쉽게 생성할 수 있는 모듈을
스스로 구축해보는 것도 좋을 것 같다.

