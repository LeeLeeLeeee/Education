## 제네릭 프로그래밍

[메인 화면으로](../)


### 제네릭 타입 이해하기
제네릭 타입은 인터페이스나 클래스, 함수, 타입 별칭 등에 사용할 수 있는 기능  
해당 심벌의 타입을 미리 지정하지 않고 다양한 타입에 대응하려고 할 때 사용합니다.
```typescript
    /* EXAMPLE */
    //interface
    interface IValueable<T> {
        value: T
    }

    //function
    function identity<T>(arg: T): T {return arg}

    //type alias
    type IValuable<T> = {
        value: T
    }

    //class 
    class Valueable<T>{
        constructor(public value: T) {}
    }
```

**제네릭 사용하기**  
```typescript
    interface IValueable<T> {
        value: T
    }

    class Valueable<T> implements IValueable<T> {
        constructor(public value: T) {}
    }

    const printValue = <T>(o: IValuable<T>): void => console.log(o.value)
    /* 타입 지정 */
    printValue(new Valueable<number>(1)) // 1
    printValue(new Valueable<string>('hello')) // hello
    /* 타입을 지정하지 않으면 제네릭이 타입을 추론한다. */
    printValue(new Valueable(1)) // 1
    printValue(new Valueable('hello')) // hello
```

### 제네릭 타입 제약
제네릭 타입 제약은 타입 변수에 적용할 수 있는 타입의 범위를 한정하는 기능을 한다.
```typescript
    /* 기본 구조 */
    <최종타입1 extends 타입1, 최종타입2 extends 타입2>(a: 최종타입1, b: 최종타입2)

    /* example - 1 */
    interface IValueable<T> {
        value: T
    }

    class Valueable<T> implements IValueable<T> {
        constructor(public value: T) {}
    }

    const printValuT = <Q, T extends IValueable<Q>>(o: T) => console.log(o.value)
    printValueT(new Valueable(1)) // 1
    printValueT({value: true}) // true
    /* example - 2 */
    interface Lengthwise {
        length: number;
    }

    function loggingIdentity<T extends Lengthwise>(arg: T): T {
        console.log(arg.length);
        return arg;
    }

    loggingIdentity(3);  // 에러, number는 .length 프로퍼티가 없습니다
    loggingIdentity({length: 10, value: 3}); // 성공
```

**new 타입 제약**  
프로그래밍 분야에서 `팩토리 함수`는 `new` 연산자를 사용해 객체를 생성하는 기능을 하는 함수를 의미합니다.  
```typescript
    /* 타입으로 명시한 T는 타입의 타입에 해당한다. */
    const create = <T>(type: T): T => new type()
    /* 하지만 타입스크립트 컴파일러는 해당 타입을 허용하지 않는다 */
    /* 타입의 타입을 제네릭으로 쓰고 싶을 경우 아래같이 사용해야한다. */
    //방법-1
    const create = <T extends {new(): T}>(type: T): T => new type()
    //방법-2
    const create = <T>(type: new() => T): T => new type()
```
결론적으로, `{new(): T}와 new() => T`는 같은 의미이다.  
`new`연산자를 `type`에 적용하면서 `type`의 생성자 쪽으로 매개변수를 전달해야할 때 다음처럼 `new(...args)`  
구문을 사용합니다.
```typescript
    const create = <T>(type: {new(...args): T}, ...args): T => new type(...args)
    /* example */
    class Point { constructor(public x: number, public y: number) {} }
    [
        create(Date),
        create(Point, 0, 0)
    ].forEach(s => console.log(s))
```
**인덱스 타입 제약**  
특정 키를 전달 받을 때 입력 값을 오타를 낼 경우가 종종 있다.  
해당 문제는 `extends keyof`이라는 키워드를 사용하여 코딩 중에 발견할 수 있다.  
```typescript
    function getProperty<T, K extends keyof T>(obj: T, key: K){
        return obj[key];
    }
    let x = {a: 1, b: 2, c: 3}
    getProperty(x, "a") // 성공
    getProperty(x, "xx") // error 
```

### 대수 데이터 타입
객체지향 프로그래밍 언어에서 ADT라는 용어는 `추상 데이터 타입`을 의미하지만  
함수형 언어에서는 `대수 데이터 타입`을 의미한다.  
대수 데이터 타입은 `합집합 타입`과 `교집합 타입`이 존재한다.

**합집합 타입**  
합집합 타입은 `or`의 의미인 `|`기호로 다양한 타입을 연결해서 만든 타입을 말한다.
```typescript
    type NumberOrString = number | string
    let ns : NumberOrString = 3
    ns = 'AAA'
```

**교집합 타입**  
교집합 타입은 `and`의 의미인 `&`기호로 다양한 타입을 연결해서 만든 타입을 말한다.  
두 객체를 통합해서 새로운 객체를 만드는 것.
```typescript
    const mergeObject = <T, U>(a: T, b: U): T & U => ({...a, ...b})

    type INameable = {name: string}
    type IAgeable  = {age : number}

    const nameAndAge: INameable & IAgeable = mergeObject({name: 'Jack'}, {age: 10});
    nameAndAge // {name: Jack, age: 10}
```

**식별 합집합**  
합집합 타입을 사용하다보면 어떤 타입의 변수인 지 확인할 수 없다.  
예를 들어 타입이 `array`인경우 `length`를 쓸 수 있지만 `number`인 경우 `length`를 지원해주지 않는다.  
이런 경우를 위해 합집합 타입을 작성할 때 식별할 수 있게 `tag`를 다는 것이다.
```typescript
    interface ISquare = {tag: 'square', size: number}
    interface IRectangle = {tag: 'rectangle', width: number, height: number}
    interface ICircle = {tag: 'circle', radius: number}
    type IShape = ISquare | IRectangle | ICircle
    const calcArea = (shape: IShape): number => {
        switch(shape.tag){
            case 'square': return shape.size ** 2;
            case 'rectangle': return shape.width * shape.height;
            case 'circle': return shape.radius ** 2 * Math.PI
            default:
                break;
        }
    }
```
**타입 가드**  
```typescript
    class Bird{ fly() {console.log(`I'm flying`)} }
    class Fish{ swim() {console.log(`I'm swimming`)} }
    /* 위와 같은 객체가 있을 때 합집합 타입으로 변경할 경우 문제가 있다. */
    const flyOrSwim = (o: Bird | Fish): void => {
        // o.fly() ???
    }
```
위와 같은 경우일 때 자바스크립트는 `instanceof`라는 연산자를 제공하는데, 이 연산자는  
다음처럼 두 개의 피연산자가 필요합니다.
```typescript
    객체 instanceof 타입 // boolean 타입의 값 반환
    // 따라서 아래와 같이 작업해줄 수 있다.
    const flyOrSwim = (o: Bird | Fish): void => {
        if(o instanceof Bird){
            (o as Bird).fly()
        } else if(o instanceof Fish ) {
            (o as Fish).swim()
        }
    }
```
그런데 타입스크립트에선 `instanceof`연산자는 자바스크립트와는 다르게 `타입 가드`기능이 있다.  
여기서 `타입 가드`는 타입을 변환하지 않은 코드 때문에 프로그램이 비정상으로 종료되는 상황을 보호해준다는 의미이다.  
```typescript
    const flyOrSwim = (o: Bird | Fish): void => {
        if(o instanceof Bird){
            //(o as Bird).fly()
            o.fly()
        } else if(o instanceof Fish ) {
            //(o as Fish).swim()
            o.swim()
        }
    }
```

**is 연산자를 활용한 사용자 정의 타입 가드 함수**  
개발자 코드에서 마치 `instanceof`처럼 동작하는 함수를 구현할 수 있다.  
즉 타입 가드기능을 하는 함수를 구현할 수 있다. 타입 기능을 하는 함수는  
다음처럼 함수의 반환 타입 부분에 `is`라는 연산자를 사용해야한다.
```typescript
    변수 is 타입
    /* example */
    const isFlyable = (o: Bird | Fish): o is Bird => {
        return o instanceof Bird
    }
    const isSwimmable = (o: Bird | Fish): o is Fish => {
        return o instanceof Fish
    }

    const flyOrSwim = (o: Bird | Fish): void => {
        if(isFlyable(o))
            o.fly()
        else if(isSwimmable(o)) 
            o.swim()
    }
```

### F-바운드 다형성
**this타입과 F-바운드 다형성**  
타입스크립트에서 `this`키워드는 타입으로도 사용된다.  
`this`가 타입으로 사용되면 객체지향 언어에서 의미하는 다형성 효과가 나는데  
일반적인 다형성과 구분하기 위해 `F-바운드 다형성`이라고 합니다.
```bash
    # 객체 지향에서 다형성
    # 1. 하나의 클래스나 메소드가 다양한 방식으로 동작이 가능
    # 2. 상속 받은 클래스의 메소드를 대체하는 오버라이딩
    # 3. 메소드가 매개변수에 따라 다르게 동작하는 오버로딩
```
- (1) F-바운드 타입
`F-바운드 타입`이란, 자신을 구현하거나 상속하는 `서브타입`을 포함하는 타입을 말한다.
다음 `IValueProvider`는 자신을 상속하는 타입이 포함되어 있지 않은 일반 타입이다.
```typescript
    interface IValueProvider<T> {
        value(): T
    }
```
다음 `IAddable`는 내가 아닌 나를 상속하는 타입을 반환하는 F-바운드 타입이다.
```typescript
    interface IAddable<T>{
        add(value: T): this
    }
```
다음 `IMultiplyable`또한 메서드 반환 타입이 `this`이므로 F-바운드 타입이다.
```typescript
    interface IAddable<T>{
        multiply(value: T): this
    }
```
위 인터페이스를 구현하는 `Calculator`와 `StringComposer`클래스를 구현해 가면서 `this`타입이 필요한 이유를 알아보자.
- (2) IValueProvider\<T\> 인터페이스 구현
다음 `Calculator`클래스는 `IValueProvider<T>`인터페이스를  구현하고 있다.  
```typescript
    class Calculator implements IValueProvider<number> {
        constructor(private _value: number = 0) {}
        value(): number {return this._value}
    }
```
같은 방식으로 `StringComposer`또한 `IValueProvider<T>`로 구현합니다.
```typescript
    class StringComposer implements IValueProvider<string> {
        constructor(private _value: string = '') {}
        value(): string {return this._value}
    }
```
- (3) IAddable\<T\>와 IMultiplyable\<T\> 인터페이스 구현
다음 `Calculator`클래스는 `IValueProvider<T>`외에도 `IAddable<T>`와 `IMultiplyable<T>`를 구현한다.
```typescript
    class Calculator implements IValueProvider<number>, IAddable<number>, IMultiplyable<number> {
        constructor(private _value: number = 0) {}
        value(): number {return this._value}
        add(value: number): this {
            this._value = this._value + value
            return this
        }
        multiply(value: number): this {
            this._value = this._value * value
            return this
        }
    }

    const value = (new Calculator(1))
                .add(2) //3
                .add(3) // 6
                .multiply(4) // 24
                .value()
    value // 24
```
위와 동일하게 `StringComposer`도 구성할 수 있다.
```typescript
    class StringComposer implements IValueProvider<string>, IAddable<string>, IMultiplyable<number> {
        constructor(private _value: string = '') {}
        value(): string {return this._value}
        add(value: string): this {
            this._value = this._value.concat(value)
            return this
        }
        multiply(repeat: number): this {
            const value = this.value()
            for(let index=0; index < repeat; index++){
                this.add(value)
            }
            return this
        }
    }

    const value = new StringComposer('hello')
    .add(' ') 
    .add('world') // hello world
    .multiply(2) // hello world hello world
    .value()
    value // hello world hello world
```
위에서 보는 것처럼 F-바운드 타입 `interface`는 자신을 구현하는 클래스에 따라 `this`가 변경된다.
이런 동작 방식을 `F-바운드 다형성`이라고 한다.

### nullable 타입과 프로그램 안정성

**nullable 타입이란?**  
`undefined`와 `null`의 타입은 서로 호환이된다.  
두 타입을 `nullable`타입이라고 하며 코드로는 다음처럼 표현할 수 있다.
```typescript
    type nullable = undefined | null
    const nullable: nullable = undefined;
```
이 `nullable`타입들은 프로그램이 동작할 때 프로그램을 비정상으로 종료시키는 주요 원인이되며  
즉 안정성을 해치는 타입들이다. 함수형 언어들은 이를 방지하기 위해 연산자나 클래스를 제공하기도 한다.

**옵션 체이닝 연산자**
```typescript
    interface IPerson = {
        name : string,
        age? : number
    }
    let person: IPerson
    console.log(person.name) // Error!
    /* 옵션 체이닝 연산자 */
    console.log(person?.name) // undefined
    /* dept가 깊어져도 이어서 할 수 있다 */
    person?.country?.street
```

**널 병합 연산자**  
체이닝 연산자를 진행하다 `undefined`상태가 되면 `??`연산자 우측의 값을 반환해주는 연산자다.
```typescript
    let street = person?.country?.street ?? "error"
    /* 연산 진행 중 없으면 error 반환 */
```
**nullable 타입의 함수형 방식 구현**  
함수형 프로그래밍 언어에는 `Maybe`나 `Option`라는 타입이 있습니다.  
이제 타입스크립트 언어로 `Option`타입을 구현해 보면서 프로그래밍에서 어떤 의미가 있는 지 알아보겠습니다.
```typescript
    class Option {
        private constructor() {}
        static Some<T>(value: T) { return new Some<T>(value)}
        static None = new None()
    }
```
위 클래스는 생성자가 `private`로 선언되어있으므로 `new`연산자로 `Option`클래스 인스턴스를 만들 수 없다.  
즉 `static`으로 선언된 `Some`과 `None`형태로만 생성할 수 있다.  
`Option.some`메서드는 `Some`이라는 클래스 인스턴스를 반환하고 `Option.None`은 `None`이라는 클래스를 반환한다.  
함수형 언어들은 보통 정상적인 값들은 `Some`에 `nullable`같은 비정상적인 값은 `None`타입으로 처리하는 경향이 있다.  
코드를 통해 더 알아보자.
- IValueable과 IFunctor 구현
```typescript
    /* 우선 IValueable<T>와 IFunctor<T> 인터페이스를 구현한다. */
    interface IValueable<T> {
        getOrElse(defaultValue: T)
    }
    interface IFunctor<T> {
        map<U>(fn: (value: T) => U)
    }
    /* 각각 getOrElse와 map을 제곡하여 이는 Some과 None에서 쓰인다. */
```
- Some 클래스 구현
`Some`클래스는 항상 `getOrElse`메서드를 통해 `Some`에 담긴 값을 얻어야 한다.  
`Some`클래스의 사용자는 또한 `value`값을 변경하려면 항상 `map`메서드를 사용해야한다.
```typescript
    class Some<T> implements IValueable<T>, IFunctor<T> {
        constructor(private value: T) {}
        getOrElse(defaultValue: T) {
            return this.value ?? defaultValue
        }
        map<U>(fn: (T)=> U){
            return new Some<U>(fn(this.value))
        }
    }
```
- None 클래스 구현
`Some`과는 다르게 `None`의 `map`메서드는 콜백 함수를 전혀 사용하지 않는다.  
`None`클래스는 `nullable`타입의 값을 의미하므로, `nullable`값들이 `map`의 콜백 함수에 동작하면  
프로그램이 비정상으로 종료될 수 있다.
```typescript
    class None<T> implements IValueable<nullable>, IFunctor<nullable> {
        getOrElse(defaultValue: T | nullable) {
            return defaultValue
        }
        map<U>(fn: (T) => U){
            return new None
        }
    }
```
- `Some`과 `None`클래스 사용
```typescript
    let m = Option.Some(1)
    //map메서드를  통해 2로 바뀌고 getOrElse로 인해 변수에는 2가 저장됨.
    let value = m.map(vlaue => value + 1).getOrElse(1)
    console.log(value) // 2
    /* 
        - process - 
        let m = Option.Some(1) 
            >> new Option<number> // value = 1 생성됨.
        m.map(value => value + 1) 
            >> (number) => number 타입 (T) => U 함수를 넘겨 받고
            >> 새로운 new Option<number> 타입을 반환 받음.
        m.getOrElse(1)
            >> 새로운 Option객체의 getOrElse 메소드 호출 defaultValue는 1
     */

    let n = Option.None
    value = n.map(value => value + 1).getOrElse(0)
    console.log(value) // 0
```

**Option 타입과 예외처리**  
Option타입은 부수 효과가 있는 `불순 함수`를 `순수 함수`로 변경하는데 효과적이다.  
`NaN`여부를 판별하는 예시로 알아보자
```typescript
    const parseNumber = (n: string): IFunctor<number> & IValuable<number> => {
        const value = parseInt(n)
        return isNaN(value) ? Option.None : Option.Some(value)
    }

    let value = paresNumber('1')
                .map(value => value + 1) // 2
                .map(value => value * 2) // 4
                .getOrElse(0)
    console.log(value) // 4

    let errValue = parseNumber('hello') // None반환
                    .map(value => value + 1) // function doesn't work
                    .map(value => value * 2) // function doesn't work
                    .getOrElse(0)
    console.log(errValue) // 0
```