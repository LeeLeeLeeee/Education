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
   배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게하는 표현식.
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
```typescript
    const Fn = () => {};
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
```typescript
import, export
```
5. 생성기(yield)
```typescript
    function* gen() {
        yield* [1, 2]
    }
    for(let value of gen()) { console.log(value) } //=> 1, 2
```

6. Promise와 async/await
```typescript
    async function get(){
        let value = [];
        value.push(await Promise.resolve(1));
        value.push(await Promise.resolve(2));
        value.push(await Promise.resolve(3));
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
```typescript
    interface Person {
        name: string,
        age?: number
    }
```
3. Tuple
   - 타입스크립트에는 튜플이라는 타입은 존재하지 않는다.  
   다만 한 배열에 여러 타입의 값이 있으면 튜플이라고 생각한다.
```typescript
 //배열과 비슷하며 한 배열안에 동일한 타입이 있으면 배열, 여러 타입이 있으면 튜플이다.
 let arr : number[] = [1, 2, 3]; // Array
 let tuple : [boolean, number, string] = [true, 3, 'a'];
```

1. 제네릭 타입  
   - 제네릭 타입이란 데이터의 타입을 지정 타입으로 일반화한다는 것을 의미한다.
```typescript
    class Container<T>{
        constructor(public value: T){ }
    }
    let numberContainer : Container<number> = new Container<number>(1);
    let stringContainer : Container<string> = new Container<string>('Hello world');
```

1. 대수 타입
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