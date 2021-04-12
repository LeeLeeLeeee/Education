# TYPESCRIPT 📜

## Typescript 참고 및 실행 사이트
[🏷 코드 예제](https://drive.google.com/file/d/11zwjfjmZCWeBhirOJj7OG6ns7BMzw5Ni/view)  
[코드 테스트](https://www.typescriptlang.org/play?#code/Q)

## Typescript란?
간단하게 말하면 `Javascript`의 타입이 추가된 확장 버전이다.

## Javascript와 TypeScript의 차이
`Javascript`와 `Typescript`의 큰 차이는  
`Javascript`는 동적 타입 언어이고 `Typescript`정적 타입 언어라는 것이다.  
동적 타입 언어란 런타임 시 자료형이 지정되는 것이고 정적 타입 언어란 컴파일 시 자료형이 결정되는 것을 의미한다.
따라서 `Typescript`는 코드 구성 시점부터 자료형을 지정해주어야 한다.

## 주요 문법
**ES6**
`ES6`란 `ECMAScript`버전 6이라는 뜻으로 `2015`년에 만들어져 현재 많이 사용중인 버전이다.  
`ECMAScript`는 자바스크립트가 다양한 곳에서 공통적으로 적용되기 위한 표준 자바스크립트 코어 규격이다.  
`ES6`는 비교적 최신 규격이기 때문에 지원하지 않은 브라우저가 있으며 `ES6`문법을 사용할 경우 `Babel`같은  
트랜스파일러를 사용하여 `ES5`와 같은 안정 버전으로 낮추어 사용하자.
  
1. 구조 분해 할당  
   - 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게하는 표현식.
```typescript
    // 1. 객체
    const Person = {
        YHLEE : { name: '이영현' },
        YHKIM : { name: '김영현' },
        YHOH  : { name: '오영현' }
    }
    /* 기존 YHLEE 추출 표현식 */
    const YHLEE = Person.YHLEE // 혹은 Person.YHLEE
    /* 객체 구조 분해 할당 */
    const { YHLEE } = Person
    /* 구조 분해 할당은 Spread 연산자와 같이 쓸 수 있다. */
    /* Spread 연산자란 반복가능한 요소로 이루어진 구조를 확장시키는 것*/
    const { YHLEE, ...rest } = Person
    const { YHKIM, YHOH } = rest

    // 2. 배열
    const numArr = [1, 2, 3, 4]
    /* 기존  */
    const a = numArr[0]
    const b = numArr[1]
    const c = numArr[2]
    /* 배열 구조 분해 할당 */
    const [a, b, c, d] = numArr;
    /* Spread 연산자와 같이 사용 할 수 있다. */
    const [a, b, ...rest] = numArr;
    // rest => [3, 4]
```
2. 화살표 함수  
   - 화살표 함수는 함수 표현식을 단축시켜서 표현하는 방식으로서  
   코드를 간결하게 해준다 또한 `this, arguments, super`를 바인딩 하지 않기 때문에 생성자로서 사용될 수 없고
   `this`는 항상 상위 스코프의 `this`를 바라본다.
   > `this`는 기본적으로 자바스크립트에서는 호출한 곳을 기준으로 바인딩을 한다.
   즉 객체의 메소드로 선언되었을 때 `this`는 호출된 곳에 따라 변할 수 있다는 뜻이다.  
   하지만 `arrow function`는 `this`를 자신이 가지고 있지 않기 때문에 늘 상위 스코프의 `this`를 바라본다

```typescript
    /* 기본적인 표현식  */
    const fn = () => {};

    /* 괄호를 사용하지 않을 경우 우측 표현식을 리턴한다는 뜻 */
    const sumFunction = (a, b, ...rest) => a + b + rest.reduce((prev, cur) => prev + cur, 0)
    /*  위 표현은 아래와 같음

        const sumFunction = function(a, b, ...rest) {
            return a + b + rest.reduce((prev, cur) => prev + cur, 0)
        }
    */
    /* 기본 function과 arrow function의 this 바인딩 차이 */
    function Person(){
        this.age = 1;
        return {
            addAge: () => this.age++,
            printAge: () => this.age,
            printAgeFunc: function(){ return this.age }
        }
    }
    /* YHLEE Person객체 생성 */
    const YHLEE = new Person();
    YHLEE.addAge()
    YHLEE.printAge() //  2  
    YHLEE.printAgeFunc() // undefined 기본 함수의 this는 자신이 호출된 return `{}` 객체를 바인딩한다.


```
3. 클래스  
```typescript
    abstract class Animal {
        constructor(public name?: string, public age: number) {}
        abstract say(): string
    }
    class Cat extends Animal {
        say() { return '야옹' }
    }
    new Cat('야옹이', 4);
```
4. 모듈   
    - 모듈은 하나의 파일이다. 해당 모듈은 자신만의 `scope`단위를 가지고 있으며  
    최상위 `scope`에서 `Window`를 바인딩하지 않는다. 또한 여러 파일에서 호출되는 경우에도  
    단 한번만 파일을 로드한다.
```typescript
    // my.js export 부분
    export default function() {
        alert('My Name is YHLEE')
    }
    export const yell = () => { alert('Wowwwwww') }

    // app.js import 부분
    // default로 익명함수로 지정시 import하는 부분에서 이름을 지정하여 가져올 수 있음.
    import INTRODUCE, { yell } from './my'


    
```
5. 생성기(yield)
```typescript
    function* gen() {
        yield* [1, 2]
    }
    for(let value of gen()) { console.log(value) } //=> 1, 2
```

6. Promise와 async/await  
    - `Promise`는 동기 방식으로 코딩할 때 `콜백 지옥`이 나오는 것을 해결하기 위해 등장하였다.
```typescript
    // call-back Hell...
    // loadScript 라는 비동기 스크립트 로드 함수가 있다고 가정하자
    // A -> B -> C 순서로 문서들이 읽어져야할 때 Promise가 없을 경우 콜백 지옥이 발생한다.
    loadScript(A, function(){
        loadScript(B, function(){
            loadScript(C, function(){
                console.log('Complete!!')
            })
        })
    })
    // 위 내용에서 에러까지 같이 처리해줄 경우 코드의 가독성은 더욱 안좋아진다.

    // 위 loadScript를 Promise기반으로 만들면 아래처럼 좀더 가독성 좋게 처리할 수 있다.
    loadScript(A)
    .then(() => loadScript(B))
    .then(() => loadScript(C))
    .then(() => console.log('Complete')))
    .catch((error) => console.log('errorㅠㅠ'))

    //async
    async function get(){
        const num = (n) => new Promise((resolve, reject) => 
            setTimeout(()=>{
                resolve(n)
            }, n * 1000)
        )
        let value = [];
        value.push(await num(2)); // await은 Promise가 resolve될 때 까지 기다린다.
        value.push(await num(1));
        value.push(await num(3));
        return value;
    }
    get().then(value => console.log(value)); // => [1, 2, 3]
```

**타입스크립트 고유 문법**
1. 타입 주석과 타입 추론  
```typescript
    let n : number = 1; // (타입 주석) ":"를 기준으로 타입 설정
    let n = 1; // (타입 추론) Input 값을 분석해 왼쪽 타입을 지정
    // 타입 추론은 JS와 호환을 용이하게 해줌.
```

2. Interface  
    - 타입의 구조를 나타내며 `?`키워드로 선택 속성, 필수 속성을 선언할 수있다.
```typescript
    interface Person {
        name: string,
        age?: number
    }
```
3. Tuple  
   - 타입스크립트에는 튜플이라는 타입은 존재하지 않는다.  
   다만 한 배열에 여러 타입의 값이 있으면 튜플이라고 표현한다.
```typescript
 let arr : number[] = [1, 2, 3]; // Array
 let tuple : [boolean, number, string] = [true, 3, 'a'];
```

4. 제네릭 타입   
   - 제네릭 타입이란 데이터의 타입을 지정 타입으로 일반화한다는 것을 의미한다.
```typescript
    class Container<T>{
        constructor(public value: T){ }
    }
    let numberContainer : Container<number> = new Container<number>(1);
    let stringContainer : Container<string> = new Container<string>('Hello world');
```

5. 대수 타입
```typescript
    type NumberOrString = number | string // number 또는 string 타입 가능
    type AnimalAndPerson = Animal & Person // Animal과 Person에서 선언된 타입이 포함되어있어야 함.
```

## Chapter
[1.환경 구성](./Chapter1)  
[2.객체와 타입](./Chapter2)  
[3.함수와 메서드](./Chapter3)  
[4.배열과 튜플](./Chapter4)  
[5.반복기와 생성기](./Chapter5)  
[6.비동기 API](./Chapter6)  
[7.함수 조합의 원리와 응용](./Chapter7)  
[8.람다 라이브러리](./Chapter8)  
[9.제네릭 프로그래밍](./Chapter9)  
[10.모나드](./Chapter10)   
