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
1. 비구조화 할당
```typescript
    let obj = {}
    //...obj
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
```typescript
 //배열과 비슷하며 한 배열안에 동일한 타입이 있으면 배열, 여러 타입이 있으면 튜플이다.
 let arr : number[] = [1, 2, 3]; // Array
 let tuple : [boolean, number, string] = [true, 3, 'a'];
```

4. 제네릭 타입
```typescript
    //다양한 타입을 취급할 수 있게 해준다.
    class Container<T>{
        constructor(public value: T){ }
    }
    let numberContainer : Container<number> = new Container<number>(1);
    let stringContainer : Container<string> = new Container<string>('Hello world');
```

5. 대수 타입
```typescript
    type NumberOrString = number | string // number 또는 string 타입 가능
    type AnimalAndPerson = Animal & Person // Animal과 Person이 겹치는 부분의 타입.
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