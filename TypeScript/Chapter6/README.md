## Promise와 Async/Await

[메인 화면으로](../)

### Promise 이해하기 

**Promise란?**  
ES5에서 정식 기능으로 채택된 비동기 처리 클래스.  
`Promise`의 콜백 함수는 `resolve`, `reject`를 매개 변수로 가진다.
```javascript
    /* 기본 구조 */
    const promise = new Promise(콜백 함수)
    // 콜백함수 = (resolve, reject) => {}
    /* 
        Typescript 형태 
        Promise<T>
    */
    const numPromise: Promise<number> = new Promise<number>(콜백함수)
```

**Promise**  
```javascript
    Promise()
    //속성
    Promise.length
    Promise.prototype// 생성자의 프로토타입
    //메서드
    Promise.all(iterable)
    Promise.race(iterable)
    Promise.reject()
    Promise.reslove()
    // Promise 프로토타입
    Promise.prototype.catch()
    Promise.prototype.then()
    Promise.prototype.finally()
```

**resolve, reject 메서드**  
```javascript
    //할당 식.
    let AsyncObj = new Promise((reslove, reject)=>{
        /* 성공 */
        resolve(value);
        /* 실패 */
        reject(err);
    })
    AsyncObj
    .then((value)=>{
        /* 
            resolve일 경우
            넘어온 value 사용 가능
         */
        
    }).catch((err)=>{
        /* 
            reject일 경우
            err 사용 가능 
        */
    }).finally(()=>{
        /* 
            값과 상관 없이
        */
    })
    //바로 사용할 경우 아래처럼도 가능하다.
    Promise.resolve().then()
    Promise.reject().catch()
```
**then-체인**  
then 반환 값이 Promise면 해당 Promise를 수행한 값을 반환 함.
```javascript
    Promise.resolve(1)
        .then((value:number)=>{
            console.log(value);
            return Promise.resolve(true)
        })
        .then((value:number)=>{
            console.log(value);
        })
```

**Promise.all 메서드**  
한`Array`에 담긴 `Promise`가 모두 `fullfilled`인 로직을 작성해야할 때 사용.  
`Array.every`의 역할과 비슷
```javascript
    const getAllResolvedResult = <T>(promises: Promise<T>[]) => Promise.all(promises)

    getAllResolvedResult<any>( [Promise.resolve(true), Promise.resolve('hello')] )
        .then(result => console.log(result) )
    /* Promise 반환 값중 reject가 발견되면 then은 실행하지 않고 바로 catch로 감. */
    getAllResolvedResult<any>( [Promise.reject(new Error('error')), Promise.resolve('hello')] )
        .then(result => console.log(result) )
        .catch(error => console.log(error.message) )

```

**Promise.all 메서드**  
한`Array`에 담긴 `Promise`중에서 가장 먼저 완료된 상태로 `Promise 상태`를 반환
`Array.some`의 역할과 비슷
```javascript
    const getRaceResolvedResult = <T>(promises: Promise<T>[]) => Promise.race(promises)

    function setTimeoutPromise(time, param, type){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                if(type==='resolve')
                    resolve(param);
                else
                    reject(param);
            }, time)
        })    
    };

    /* Promise fullfilled만 확인하고 then으로 */
    getRaceResolvedResult<any>( [setTimeoutPromise(1000, 'a', 'reject'), Promise.resolve('aa')] )
        .then(result => console.log(result) )
        .catch(error => console.log('error : '+ error) )

    /* Promise reject만 확인하고 catch로 */
    getRaceResolvedResult<any>( [setTimeoutPromise(1000, 'a', 'resolve'), Promise.reject('aa')] )
        .then(result => console.log(result) )
        .catch(error => console.log('error : '+ error) )
```

### async와 await 구문  

```javascript
    /* 기본 형식 */
    const test = async () => {
        const value = await Promise.resolve(1)
        console.log(value)
    }
```

**await 키워드**  
피연산자의 값을 반환해주며 피연산자가 `Promise`면 then메서드를 호출해 얻은 값을 반환해 줌.

**async 키워드**  
await 키워드는 async키워드가 사용된 곳에서만 사용할 수있다.
```javascript
    /* 기본 형식 */
    // arrow
    const test1 = async () => {}
    // function
    async function test() {}
```
**async 함수의 두 가지 성질**
1. 일반 함수처럼 사용할 수 있다.
2. Promise 객체로 사용할 수 있다.
```javascript
    // async 함수를 Promise처럼 사용한 경우
    async function test1() {
        const value = await 'hello'
        console.log(valule)
    }
    async function test2() {
        const value = await '안녕'
        console.log(value)
    }

    test1()
    .then(()=> test2())

    //async 함수는 반환 값은 Promise객체이기 때문에 then 인자로 받아야한다.
    async function test3(){
        return [1, 2, 3]
    }
    test3.then(arr=> console.log(arr)) // [1, 2, 3]
```

**async 예외처리**
async함수에서 error발생 시 catch로 처리해줘야 한다.
```javascript
    const asyncException = async () => {
        throw new Error('error')
    }

    asyncException()
        .catch(err => console.log('error:' + err))
```

**async 함수와 Promise.all**
```javascript
    const getPromiseAll = async(asyncArr) => {
        return await Promise.all(
            asyncArr
        )
    }
    getPromiseAll.then(result => result);
```



