## 함수 조합의 원리와 응용

[메인 화면으로](../)

### 함수형 프로그래밍이란?
`순수 함수`와 `선언형 프로그래밍`의 토대 위에 `함수 조합`과 `모나드 조합`으로 코드를 설계하고 구현하는 기법  
함수형 프로그래밍은 다음 세 가지 수학 이론에 기반을 두고 있다.
```bash
    # 람다 수학: 조합 논리와 카테고리 이론의 토대가 되는 논리 수학
    # 조합 논리: 함수 조합의 이론적 배경
    # 카테고리 이론: 모나드 조합과 고차 타입의 이론적 배경
```

### 제네릭 함수

**타입스크립트의 제네릭 함수 구문**  
타입스크립트에서 제네릭 타이은 함수와 인터페이스, 클래스, 타입 별칭에 적용할 수 있다.
```typescript
    /* 기본 함수 */
    function g1<T>(a: T) : void {}
    function g2<T, Q>(a: T, b: Q): void {}
    /* 화살표 함수 */
    const g3 = <T>(a: T): void => {}
    const g4 = <T, Q>(a: T, b: Q): void => {}
    /* 타입 별칭(type alias) */
    /* 타입 별칭은 기존 존재하던 타입에 별칭을 부여하는 것. */
    type Type1<T> = (T) => void
    type Type2<T, Q> = (T, Q) => void
    type Type2<T, Q, R> = (T, Q) => R
```

**함수의 역할**  
수학에서 함수는 값 `x`에 수식을 적용해 `y`를 만드는 역할을 하는데 함수를 `f`라고 하면 아래와 같이 표기가 가능
```bash
    x ~> f ~> y
```
수학에서는 이런한 관계를 일대일 관계라고 하고, 이런 동작을 하는 함수 `f`를 `매핑` 줄여서 `맵`이라고 표현  
타입스크립트에서 함수의 시그니처를 다음처럼 표현할수 있음
```typescript
    type MapFunc<T, R> = (T) => R
```

**아이덴티티 함수**  
맵 함수의 가장 단순한 형태는 입력값 `x`를 가공 없이 바로 반환하는 것 즉 입출력 타입이 같은 것입니다.  
함수형 프로그래밍에서 이러한 역할을 하는 함수를 `identity`혹은 간단히 `I`라는 단어로 표현 함
```typescript
    /* 기본 구조 */
    type MapFunc<T, R>  = (T) => R
    type IdentityFunc<T> = MapFunc<T, T>
    /* example */
    const numberIdentity: IdentityFunc<number> = (x: number): number => x
    const stringIdentity: IdentityFunc<string> = (x: string): string => x
    const arrayIdentity: IdentityFunc<any[]> = (x: any): any => x
```

### 고차 함수와 커리
함수에서 매개변수의 개수를 `애리티(arity)`라고 한다.  
`f()`는 `arity`가 0개, `f(a)`는 `arity`가 1개  
만약 함수 `f, g, h`가 모두 `애리티`가 1이라면 아래와 같이 연결해서 사용이 가능하다
```bash
    # x ~> f ~> g ~> h ~> y // 표기
    # y = h(g(f(x))) // 프로그래밍 식
```
함수형 프로그래밍에서는 `compose`나 `pipe`라는 이름의 함수를 사용해 `compose(h, g, f)` 혹은 `pipe(f, g, h)`형태로  
함수를 조합해 새로운 함수를 만들 수 있다.

**고차 함수란?**  
타입스크립트에서 함수는 변수에 담긴 함수 표현식이고 이떄 함수 표현식이란 일종의 값이다.  
따라서 함수는 반환 될 수 있으며 함수를 반환하는 함수를 `고차 함수`라고 한다.  
단순히 값을 반환하는 함수를 `1차함수`  
`1차 함수`를 반환하면 `2차 함수`  
`2차 함수`를 반환하면 `3차 함수`라고 한다.  
이를 함수 시그니처로 표현하면 아래와 같다.

```typescript
    type FirstOrderFunc<T, R> = (T) => R
    type SecondOrderFunc<T, R> = (T) => FirstOrderFunc<T, R>
    type ThirdOrderFunc<T, R> = (T) => SecondOrderFunc<T, R>
    /* 실제 사용 */
    /* 1차 */
    const inc: FirstOrderFunc<number, number> = (x: number): number => x + 1
    console.log(inc(1)) // 1
    /* 2차 */
    const add: SecondOrderFunc<number, number> = 
    (x: number): FirstOrderFunc<number, number> =>
    (y: number): number => x + y
    console.log(add(1)(2)) // 3
    /* 3차 */
    const add2: ThirdOrderFunc<number, number> = 
    (x: number): SecondOrderFunc<number, number> =>
    (y: number): FirstOrderFunc<number, number> =>
    (z: number): number => x + y + z
    console.log(add2(1)(2)(3)) // 6
```

**부분 적용 함수와 커리**  
함수 호출 연산자를 연속해서 사용하는 것을 커리라고 한다.`f()()`  
`부분 적용 함수`는 함수 호출 연산자를 덜 사용하여 아직 함수인 상태를 의미한다.  
`const A = () => () => () `일 때 `A()`인 상태  
이 `부분 적용 함수`는 `고차 함수`에 적용할 수 있다.
```typescript
    /* 
        add2 = SecondOrderFunc
        add3 = ThirdOrderFunc
    */
    const add1: FirstOrderFunc<number, number> = add2(1)
    // add1은 1차 함수이므로 아래와 같이 호출할 수 있으며
    add1(2) // 3
    add2(1)(2) // 3
    
    const add_two: SecondOrderFunc<number, number> = add3(1)
    const add_one: FirstOrderFunc<number, number> = add_two(2)
    add_one(3) // 6
    add_two(2)(3)
```

**클로저**  
클로저는 `지속되는 유효 범위`를 의미한다.  
내부 함수에서 외부 함수의 변수를 접근할 때 외부 함수의 호출이 끝난 후에도  
해당 스코프를 메모리에서 가지고 있는 것이다.
```typescript
    function add(x: number): (number) => number { // 외부 스코프 유효 범위
        return function(y: number): number { // 내부 스코프 유효 범위
            return x + y
        }
    }
    const add1 = add(1)
    add1(3) // 4 -> 메모리에서 스코프 해제
```
위 코드를 보면 `add(1)`가 외부 함수를 호출하고 내부 함수를 반환한다. 이 시점에서 외부 함수는 더이상 역할이 없다.  
하지만 x는 리턴된 내부 함수에서는 그 의미를 알 수없기에 우리는 상위 스코프를 메모리에 유지해야한다.  
이런 변수를 `자유 변수`라고 부른다.  
결국 `JS가비지 컬렉션`에서 해당 스코프가 더이상 참조되지 않는다고 생각했을 때 비로소 해당 스코프를 메모리에서 해제한다.
```typescript
    const makeNames = () : () => string => {
        const names = ['A', 'B', 'C']
        let index = 0
        return (): string => {
            if(index===names.length)
                index = 0
            return names[index++]
        }
    }
    const makeName: ()=> string = makeNames()
    console.log(
        [1, 2, 3, 4].map(n=>makeName())
    ) // makename 함수를 사용하는 한 names 배열은 메모리에서 해제되지 않는다.
```

### 함수 조합
함수 조합은 작은 기능을 구현한 함수를 여러 번 조합해 더 의미 있는 함수를 만들어 내는 프로그램 설계 기법  
`compose`와 `pipe`라는 이름의 함수를 제공하거나 만들 수 있음.
```typescript
    const f = <T>(x: T): string => `f(${x})`
    const g = <T>(x: T): string => `g(${x})`
    const h = <T>(x: T): string => `h(${x})`
```
compose와 pipe를 활용하여 `y = h(g(f(x)))` 해당 수식을 만들어 보자.

**compose 함수**
작성될 compose 함수는 가변 인수 스타일로 함수들의 배열을 입력받은 후 함수들을 조합해 매개변수 x를 입력받는 `1차 함수`를 반환합니다.
```typescript
    // 구현 예시
    /* 
        아래 코드 설명
        1차 함수는 Function배열을 받고 Function을 Return
        1차 함수에서 Return되는 Function의 타입은 
        (x: T)을 받고 ( (T) => R ) 을 Return하는 타입
     */
    const compose = 
    <T, R>(...functions: readonly Function[]): Function 
    => (x:T) : (T) => R 
    => {
        const deepCopiedFunctions = [...functions] // 함수 깊은 복사.
        // 2 방법 중 하나로..
        return deepCopiedFunctions.reverse().reduce((value, func)=> func(value), x);
        return deepCopiedFunctions.reduceRight((value, func)=> func(value), x);
    }
    const composedFGH = compose(h, g, f); 
    composedFGH('x') // h(g(f(x))),  type = (x: T): T => R
    
    const inc = x => x + 1
    const composedCalcul = compose(inc, inc, inc)
    composedCalcul(1) // 4
```

**pipe 함수**  
pipe함수는 compose함수와 반대로 할당되는 것 말고는 동일하다
```typescript
    // 구현 예시
    const pipe = 
    <T, R>(...functions: readonly Function[]): Function 
    => (x:T) : (T) => R 
    => {
        const deepCopiedFunctions = [...functions] // 함수 깊은 복사.
        return deepCopiedFunctions.reduce((value, func)=> func(value), x);
    }
    const pipeFGH = pipe(f, g, h); 
    pipeFGH('x') // h(g(f(x)))
```

**부분 함수와 함수 조합**  
고차 함수의 부분 함수는 함수 조합에 사용될 수 있다.
```typescript
    const add = x => y => x + y
    const inc = add(1)
    const add3 = pipe(inc, add(2)) // 3
```

**포인트가 없는 함수**  
함수 조합을 고려해 설계한 함수를 `포인트가 없는 함수`라고 한다.
`map으로 구현`
```typescript
    //타입 추론 사용한 map
    const map = f => a => a.map(f)
    //타입 추론 미사용 map
    const map = <T, R>(f: (T)=>R) => (a: T[]): R[] => a.map(f)
    //해체
    function map<T, R>(f: (T)=>R): Function {
        return function(a: T[]): R[] {
            return a.map(f);
        }
    }

```
밑의 예시 코드로 `map` 사용법을 알아보자
```typescript
    const square = value => value * value // f
    const squaredMap = map(square) // # 포인트가 없는 함수
    //const squareMap = a => map(square)(a) # 포인트가 있는 함수

    const fourSquare = pipe(
        squaredMap,
        squaredMap
    );
    // 아래의 [3, 4]가 a 이다
    fourSquare([3, 4]) // [81, 256] <- [(3*3) * (3*3), (4*4) * (4*4)]
    /*  - process - 
        1. squaredMap(squaredMap([3, 4]))
        2. [3, 4].map(square) -> [9, 16]
        3. squaredMap([9, 16])
        4. [9, 16].map(square) -> [81, 256]
     */
```
`reduce로 구현`
```typescript
    //타입 추론 사용한 reduce
    const reduce = (f, initValue) => a => a.reduce(f, initValue)
    //타입 추론 미사용 reduce
    const reduce = 
    <T>(f: (sum: T, value: T) => T, initValue: T) => 
    (a: T[]): T => a.reduce(f, initvalue)

    //해체
    function reduce<T>(f: (sum: T, value: T) => T, initValue: T): Function {
        return function(a: T[]): T {
            return a.reduce(f, initValue)
        }
    }

```
밑의 예시 코드로 `reduce` 사용법을 알아보자
```typescript
    const sum = (result, value) => result + value
    const sumArray = reduce(sum, 0)
    //피타 고라스 정리 / 밑변의 제곱 + 높이의 제곱 = 빗변의 제곱
    const pitagoras = pipe(
        squaredMap,
        sumArray,
        Math.sqrt
    )
    pitagoras([3, 4]) // 5
    /*  - process - 
        1. Math.sqrt(sumArray(squaredMap([3, 4])))
        2. [3, 4].map(square) -> [9, 16]
        3. sumArray([9, 16]) -> 25
        4. Math.sqrt(25) -> 5
     */
```
