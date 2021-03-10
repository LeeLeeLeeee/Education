## 배열과 튜플

[메인 화면으로](../)


### 배열 이해
**for - in**  
객체를 대상으로 사용, 배열도 객체이기 때문에 가능  
객체는 key, 배열은 index를 반환함.
```javascript
    let obj = {'a': 'b', 'c':'d'};
    let arr = [3, 2, 1];
    for(const index in arr){
        console.log(arr[index]) // 3, 2, 1
    }
    for(const key in obj){
        console.log(obj[key]) // b, d
    }
```

**for - of**  
`Iterator`타입만 가능 아이템 값을 직접 순회함.
```javascript
    for(const item in arr){
        console.log(item) // 3, 2, 1
    }
```
**제네릭 방식 타입**  
타입을 변수로 취급하는 것을 `제네릭 타입`이라고 함.
```javascript
    const arrayLength = (array: T[]): number => array.length
    /* 컴파일러가 T의 의미를 알 수 있게 T가 타입변수라고 알려주자 => */
    const arrayLength = <T>(array: T[]): number => array.length

    let numArr : number[] = [1,2,3];
    let strArr : string[] = ['a','b','c'];
    // 아래에서는 넘어온 매개변수로 타입을 추론한다.
    arrayLength(numArr) // 3 
    arrayLength(strArr) // 3
```
**제네릭 함수 타입 추론**  
```javascript
    /* 기본 구조 */
    함수이름<T>(매개변수)
    /* example */
    const identity = <T>(n: T): T => n
    identity<boolean>(true) //true
    identty(true) //true
```

**제네릭 함수와 함수 시그니처 오류**  
```javascript
    const normal = (cb : (number) => number): void => {}
    const error = (cb : (number, number?) => number): void => {} //error 발생
    const fixed = (cb : (a: number, number?) => number): void => {} //error 해결
    //함수 시그니처에서 오류가 나면 변수에 타입을 명시에 해결한다.
    //제네릭 함수도 동일
    const normal = (cb : (T) => number): void => {}
    const error = (cb : (T, number?) => number): void => {} //error 발생
    const fixed = (cb : (arg: T, number?) => number): void => {} //error 해결
```

### 선언형 프로그래밍과 배열

**선언형 프로그래밍 vs 명령형 프로그래밍**  

명령형 프로그래밍
```javascript
//1. 입력 데이터 얻기
//2. 입력 데이터 가공해 출력데이터 생성
//3. 출력 데이터 출력
for(;;){
    1. 
    2. 
    3. 
}
```

선언형 프로그래밍
```javascript
//1. 문제를 푸는 데 필요한 모든 데이터 배열에 저장
//2. 입력 데이터 배열을 가공해 출력 데이터 배열 생성
//3. 출력 데이터 배열에 담긴 아이템 출력
let arr = [1,2,3] 
arr.map().filter().map()....
```

### Map, Filer, Reduce

**Map**  
새로운 배열 반환
```javascript
    let arr = [1,2,3];
    let arr_2 = arr.map(item=>item+1);
    arr_2 // [2,3,4]
```
**Filter**  
배열 필터링
```javascript
    let arr = [1,2,3];
    let arr_2 = arr.filter(item=> item % 2 === 1);
    arr_2 // [1, 3]
```
**Reduce**  
배열 순회하며 리턴 값 반환
```javascript
    let arr = [1,2,3];
    /* 
        reduce(callback함수, initValue)
        callback함수의 인자는 순서대로 아래와 같음
        callback(prev, cur, index, arr)
        1. 이전 배열 return 값 (첫 시작일 경우 initValue)
        2. 배열의 현재 item
        3. 배열의 현재 index
        4. 배열 원본.
     */
    let sum = arr.reduce((prev, cur, index, arr)=>{
        return prev + cur
    }, 0)
    sum //6
```

### 순수 함수와 배열

**순수 함수란**  
함수형 프로그래밍에서 함수는 `순수 함수`라는 조건을 만족해야 함.  

```javascript
/* 순수 함수 조건 */
// 1. 함수 내부에 입출력 관련 코드가 없어야함.
// 2. 함수 내부에서 매개변숫값을 변경시키지 않는다.
// 3. 함수 내부에서 만들어진 결과를 즉시 반환
// 4. 함수 내부에 전역변수 정적 변수 사용하지 않는다.
// 5. 함수가 예외를 발생하지 않는다.
// 6. 비동기 방식으로 동작하는 코드가 없다.
/* example */
// 내부에서 매개 변수를 변경 => 순수 함수 x
function(arr){
    arr.push(1)
}
// 전역 변수를 참조 => 순수 함수 x
// 전역 변수를 참조하면 호출 되는 위치에 따라 같은 input이지만 return 값이 달라질 수 있음
var c = 5;
function(a, b){
    return a + b + c
}
```
**reaonly**  
순수함수 구현을 쉽게 하도록 `readonly`키워드를 제공함
```javascript
    function forcePure(arr: readonnly number[]){
        arr.push(1) // error
    }
```
**가변 인수 함수와 순수 함수**  
함수를 호출할 때 전달하는 인수의 개수를 제한하지 않는 것을 `가변 인수`라고 합니다.
```javascript
    /* 매개변수로 넘어온 배열을 합치는 순수 함수 mergeArray를 작성해보자. */
    /* 
        매개변수에 전개연산자를 쓰면 매개변수를 각각 배열에 담은 후 뿌려준다.
        T[][]는 "제네릭T타입의 배열로 이루어진 배열"이라는 뜻이다.
        number[] -> 숫자로 이루어진 배열 [1,2,3]
        number[][] -> 숫자로 이루어진 배열로 이루어진 배열 [ [1,2,3], [2,3,4] ]
     */
    const mergeArray = <T>(...arrays: readonly T[][]): T[] => {
        let result: T[] = []
        for(let index=0; index < arrays.length; index++){
            const array: T[] = arrays[index];
            result = [...result, ...array] //result요소와, array요소를 Spread로 뿌려줌.
        }
        return result;
    }

    const StringArray: string[] = mergeArray( ['Happy'], ['Sad'] ) // ['Happy', 'Sad']
```
**튜플**  
`javascript`에는 튜플의 개념이 없으며 단순히 여러 타입에 대응하는 배열 정도로 사용한다.
```javascript
    const tuple [boolean, string] = [true, 'the result OK!']
```