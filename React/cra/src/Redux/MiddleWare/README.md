# Redux Pattern - 4.

###  프로젝트 목적
**1. Redux-thunk, Redux-saga로 Redux에서 비동기 구현**  
**2. fetch, axios을 각각 사용하며 해당 기능을 정리**  
**3. 외부에서 지원해주는 데이터 REST API 사용**  

### Notice
**fetch 정리**  
fetch는 Web자체적으로 지원해주는 API이다.  
자체적으로 `HTTP error`상태를 반환하지 않으며 첫 번째 콜백함수에서 `response`를 사용하여  
오류난 경우를 처리해줘야한다. 첫 번째 콜백함수는 `response`는 `json()`이라는 메소드를 가지고 있으며  
해당 메소드는 `Promise`를 사용한 비동기 방식으로 전달 받은 데이터를 `json`화 한다.
```javascript
    fetch(link, {
        method,
        body, // method가 post인 경우 body에 담아 전달
        headers,
    })
    .then((response) => {
        if(response.status === 404) // status check
            throw new Error('404 Error') // Create Error
        return response.json()
    })
    .then((data) => {
        // data!!
    })
    .catch((err) => {
        // error catch
    });
```

**axios**  
axios는 통신 라이브러리이다.  
fetch보다 조금 더 직관적이나 자체 지원 API가 아니기 때문에  
업그레이드가 빠른 언어의 사용에 있어서는 부적합하다고 판단하는 것 같다.  
요청을 중도 취소하거나 timeout시간을 쉽게 설정할 수 있는 장점이 있고 `error`도 자동으로 잡아준다.
하지만 대부분 `fetch`에서 지원해주기 때문에 필요에 따라서 사용하면 될 것 같다.
```javascript
 let axiosConfig = {
                method,
                headers,
                data,
                timeout:2000
            }
axios[method](link, axiosConfig)
.then(response=>{
    return response
})
.catch(err=>{
    new Error(err)
})
```

**Thunk**  
`thunk`는 `Redux`개발자가 만든 `Redux Async` 라이브러리다.  
해당 라이브러리를 `include`할 경우 `action`객체가 아닌 함수를 dispatch할 수 있다.  
또한 해당 함수는 `2차 고차 함수(함수를 반환 하는 함수)`로 `dispatch`를 가진 함수를 반환한다.  
```bash
    # 설치
    yarn add redux-thunk
```
```javascript
    //Component에서 dispatch할 함수 선언.
    export const fetchApi = (prop) => dispatch => {
        dispatch(request())
        asyncApi(prop, 'fetch')
        .then(data => dispatch(success(data)))
        .catch(err => dispatch(error(err)))
    }
    /*  아래와 같이 dispatch를 가진 함수를 리턴하는 함수이다.
        const fetchApi = function(prop){
            return function(dispatch){
                dispatch(request())
                asyncApi(prop, 'fetch')
                .then(data => dispatch(success(data)))
                .catch(err => dispatch(error(err)))
            }
        }
    */
```
```javascript
    // store에 연동
    import thunk from 'redux-thunk'
    applyMiddleware(thunk)
```
생성된 함수들은 `connect`를 이용하여 `action`들을 연결하듯 `Component`와 연결하거나  
`useDispatch()`Hook을 사용하여 `dispatch`해줍니다.
**Saga**  
`Saga`는 `제너레이터(function*)`을 이용한 `Redux Async` 라이브러리다.  
`제너레이터`는 함수를 `iterator`할 수 있게 만들어주며 `yield`를 만날 때마다  
상태가 `pause`되고 `next()`메서드를 해주면 다음 `yield`까지 넘어간다.  
Saga 기본 메서드
- `Saga`는 `Thunk`보다 더 많은 기능들을 지원하며 간단하게 몇 가지 메소드만 사용해보았다.
- `delay` : 지정 시간까지 await하게 해주는 함수
- `put`   : action을 dispatch해주는 함수.
- `call`  : `Promise`상태를 받으며 `Resolve`한 `Data`를 반환한다.
- `takeEvery` : 모든 비동기 이벤트를 동작시킨다
- `takeLatest` : 마지막 비동기 이벤트만 동작한다.


`Saga`는 `Redux`처럼 다양하며 강력한 기능을 제공한다. 따라서 현재는 기본적인 사용법만 정리하고  
추후에 다시 `Saga`를 정리하는 파트를 가져가야겠다.
```bash
    # 설치
    yarn add redux-saga
```
`reducer` 코드
```javascript
    /* counter api */
    const INCREASE_ASYNC = 'INCREASE_ASYNC';
    const DECREASE_ASYNC = 'DECREASE_ASYNC';

    export const increaseAsync = () => ({type:INCREASE_ASYNC})
    export const decreaseAsync = () => ({type:DECREASE_ASYNC})

    function* increaseSaga(){
        yield delay(1000)
        yield put(increase()) //dispatch
    }

    function* decreaseSaga(){
        yield delay(1000)
        yield put(decrease()) //dispatch
    }

    export function* counterSaga(){
        //action 타입과 saga function을 매칭해준다.
        yield takeEvery(INCREASE_ASYNC, increaseSaga)
        yield takeLatest(DECREASE_ASYNC, decreaseSaga)
    }

    /* rest api  */
    const FETCHAPI = 'FETCH';
    const AXIOSAPI = 'AXIOS';

    export const fetchAction = createAction(FETCHAPI, prop => prop)
    export const axiosAction = createAction(AXIOSAPI, prop => prop)
    // asyncApi는 Promise를 반환한다.
    function* fetchSagaApi(action){
        
        try {
            yield put(requestSaga())
            const data = yield call(asyncApi, action.payload, 'fetch') 
            yield put(successSaga(data))
        } catch (error) {
            console.log(error)
            yield put(errorSaga())
        }
    }

    function* axiosSagaApi(action){
        try {
            yield put(requestSaga())
            const data = yield call(asyncApi, action.payload, 'axios')
            yield put(successSaga(data))
        } catch (error) {
            yield put(errorSaga())
        }
    }

    export function* RestSaga(){    
        yield takeEvery(FETCHAPI, fetchSagaApi)
        yield takeEvery(AXIOSAPI, axiosSagaApi)
    }
```
`rootSaga`로 연동해줌
```javascript
    export function* rootSaga(){
        yield all([counterSaga(), RestSaga()]) // all은 각 Saga를 합쳐줌, 함수는 꼭 실행시켜야함.
    }
```
`store`에 연동해주는 구문
```javascript
const saga = createSagaMiddleWare();
export default createStore(rootReducer,applyMiddleware(saga)));
saga.run(rootSaga);
```
생성된 함수들은 `connect`를 이용하여 `action`들을 연결하듯 `Component`와 연결하거나  
`useDispatch()`Hook을 사용하여 `dispatch`해줍니다.

### Review
비동기 관련하여 `Redux`에서 가장 유명한 두 라이브러리를 사용해보았다.  
두 라이브러리 모두 각각의 장점이 있었다. `Thunk`는 간단한 패턴 하나만 더 추가되었기 때문에  
조금 더 빠르게 배울 수 있었고 사용하는 것 또한 어렵지 않았다. `Saga`는 적용해야할 것이 많았고  
내부 모듈도 적절한 곳에 사용해줘야했기 때문에 `Thunk`보단 배우는 것 그리고 적용하는 것 모두 어려웠다.  
하지만 `Saga`는 통신에서의 `기술 요구(Socket 같은..)`를 쉽게 사용할 수 있게 지원해주는 기능이 많다고하니  
해당 기능들을 사용해보는 파트도 만들어 좀더 깊게 학습해보아야겠다.


