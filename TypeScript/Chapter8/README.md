## 람다 라이브러리

[메인 화면으로](../)

### 소개
함수형 유틸리티 라이브러리  
compose나 pipe같은 함수 조합을 쉽게 사용할 수있게 해줌

* 특징 
```bash
    # 타입스크립트 언어와 호환
    # compose와 pipe함수 제공
    # 자동 커리 기능 제공
    # 포인트가 없는 고차 도움 함수 제공
    # 조합 논리 함수 일부 제공
    # 하스켈 렌즈 라이브러리 기능 일부 제공
    # 자바스크립트 표준 모나드 규격과 호환
```

**ramda 패키지 구성**  
* 문서
[알파벳 순서로 분류](https://ramdajs.com/docs/)
[기능 위주로 분류](https://devdics.io/ramda)

**실습 프로젝트 구성**  
```bash
    # ramda
    npm i -S ramda
    npm i -D @types/ramda
    # library for create dummy data
    npm i -S chance
    npm i -D @types/chance
```

**패키지 불러오기**  
```typescript
    import * as R from 'ramda'
    // 배포 크기를 줄이려면 아래와 같이 필요한 것만 받기
    import { range } from 'ramda'
```

### 람다 기본 사용법

**R.range 함수**  
```typescript
    // (최소 <= value > 최대) 범위의 Array생성
    R.range(최소, 최대)
```
**R.tap 디버깅용 함수**  
`2차 고차 함수 형태`로 함수 조합 사용 시 오류나 디버깅을 위해 사용하며 현재 값을 파악할 수 있게 해줌.
```typescript
    R.tap(콜백함수)(값) // 자동 커리
    R.tap(콜백함수, 값)
    const numArr : number[] = R.range(1, 1 + 3)

    R.tap(n => console.log(n), numArr) //console => [1,2,3] , return => [1,2,3]
    R.tap(n => console.log(n))(numArr) //console => [1,2,3] , return => [1,2,3]
```
**포인트가 없는 함수**  
```typescript
    const dump = R.pipe( R.tap(n=> console.log(n)) )
    //R.tap은 2차 고차 함수로서 커리를 해야하지만 포인트가 없는 함수여서 바로 실행 됨.
    /*
        포인트가 있다면 아래 처럼 호출 되어야 함.
        const dump = a => R.pipe( R.tap(n=> console.log(n))(a) )
        dump(R.range(1, 10))()
    */
    dump(R.range(1, 10))
```
**자동 커리 이해하기**  
람다 라이브러리에서는 2차 고차 함수를 매개변수가 2개인 일반 함수 처럼 사용할 수있다.
```typescript
    R.add(1, 2) //auto curry
    R.add(1)(2)
```

**R.curryN 함수**
람다 라이브러리의 함수들은 `auto curry` 방식으로 동작할 수 있도록 매개변수 개수가 모두 정해져 있음  
따라서 가변인수를 `curry`하기 위해서는 `R.curryN`을 사용하면 된다.
```typescript
    /* 기본 타입 */
    R.curryN(N, 함수)
    /* example */
    const sum = (...numbers: number[]): number =>
        number.reduce((result:number, sum:number)=> result + sum, 0)

    const curriedSum = R.curryN(4, sum)
    curriedSum() // [Function] 부분 함수
    curriedSum(1) // [Function] 부분 함수
    curriedSum(1)(2)(3) // [Function] 부분 함수
    curriedSum(1)(2)(3)(4) //10 
```
**순수 함수**  
람다 라이브러리의 모든 함수는 `순수 함수`의 규칙을 따른다  
따라서 항상 입력 변수의 상태를 변화시키지 않고 새로운 값을 반환한다.
```typescript
    const originalArray: number[] = [1, 2, 3]
    const resultArray = R.pipe(
        R.map(R.add(1))
    )(originalArray) // [2, 3, 4]

```

### 배열에 담긴 수 다루기

**선언형 프로그래밍**  
보통 함수형 프로그래밍은 선언형 프로그래밍 방식으로 코드를 작성함.  
다음처럼 `단순 데이터`보다 `배열` 형태를 주로 사용합.  
```typescript
    /* 단순 데이터 */
    const value = 1;
    const newValue = R.inc(value) // 2
    /* 배열 */
    const newArr = R.pipe(
        R.map(R.inc)
    )([value]) // [2]
    /* newArr = R.pipe(value.map(R.inc)) */
```

```typescript
    /* R.tap디버깅 함수 이용하여 history 확인 */
    const numbers: number[] = R.range(1. 9 + 1)
    const incNumber = R.pipe(
        R.tap(a => console.log('before inc: ', a)),
        R.map(R.inc),
        R.tap(a => console.log('after inc:', a))
    )
    const newNumbers = incNumber(numbers)
    /* 
        output :
        before inc: [1, 2, 3, ... ,9]
        after inc: [2, 3, ... ,10]
        [2, 3, 4, ..., 10]
    */
```

**사칙 연산 함수**  
람다는 사칙 연산 함수를 제공한다.
```typescript
    R.add(a: number)(b: number) // a + b
    R.subtract(a: number)(b: number) // a - b
    R.multiply(a: number)(b: number) // a * b
    R.divide(a: number)(b: number) // a / b
```
위의 `R.inc`또한 람다의 사칙 연산 함수로 만든 것이다.
```typescript
    // 포인트가 있는 inc 함수
    const inc = (a: number): number => R.add(1)(a);
    // 포인트가 없는 inc 함수
    const inc = R.add(1)
    // 포인트가 있는 형태의 inc를 map에 적용
    R.map((n:number) => inc(n) )
    // 포인트가 없는 형태의 inc를 map에 적용
    R.map(inc) // R.map(R.add(1))
```

**R.addIndex**
`Array.map`은 `index`를 지원하지만 `ramda`의 `map`은 `index`매개변수를 기본적으로 지원하지 않는다.  
따라서 `R.map`이 `Array.map`처럼 동작하려면 `R.addIndex`함수를 사용해 새로운 함수를 만들어야 한다.
```typescript
    const indexMap = R.addindex(R.map)
    indexMap((value: number, index: number)=> R.add(number)(index))
    //indexMap(R.add) 위의 함수와 동일하다.

    const addIndex = R.pipe(
        R.addIndex(R.map)(R.add),
        //R.addIndex(R.map)((value: number, index: number) => R.add(value)(index))
        R.tap(a => console.log(a))
    )
```
**R.filp** 
매개변수의 위치를 바꿔주는 역할을 한다.  
```typescript
    //(a)(b) => (b)(a)
    const reverseSubtract = R.flip(R.subtract)
```

**사칙 연산 함수들의 조합**  
수학에서는 다음 형태의 공식을 자주 볼 수 있습니다.
> $f(x) = ax^2 + bx + c$

위 공식을 타입스크립트로 구현하면 아래와 같습니다.
```typescript
    type NumberToNuberFunc = (number) => number
    const f = (a: number, b: number, c: number): NumberToNuberFunc =>
        (x:number): number => a * x ** 2 + b * x + c
    const formula = f(1, 2, 3);
    formula(1) // 6
```
위 공식을 `ramda`로 구현해보겠습니다

```typescript
    const exp = (N: number) => (x: number): number => x ** N // 2차 고차 지수 함수 
    const square = exp(2)
    type NumberToNumber = (number) => number
    const f = (a: number, b: number, c: number): NumberToNumber =>
    (x: number): number => R.add(a * square(x) + b * x, c)
    /* 함수 곱셈 부분 multiply로 교체 */
    const f = (a: number, b: number, c: number): NumberToNuberFunc =>
    (x: number): number => R.add(R.multiply(a)(square(x) + R.multiply(b)(x), c ))
    /* 최종 + 부분까지 add로 변경 */
    const f = (a: number, b: number, c: number): NumberToNuberFunc =>
    (x: number): number => R.add(
        R.add(
            R.multiply(a)(square(x))
        )(R.multiply(b)(x)),
        c
    )
```
**2차 방정식의 해 구현**  
2차 방정식은 다음 조건을 만족하는 x를 구하는 것입니다.
> $ax^2 + bx + c = 0$

만약 a =1, b =2, c=1이라면 다음 인수분해 공식이 성립합니다.
> $x^2 + 2x + 1 = (x + 1)^2 $

위 예가 실제로 그런 지 코드로 증명해보겠습니다.
```typescript
    const quadratic = f(1, 2, 1)
    const input: number[] = R.range(1, 10 + 1)
    const quadraticResult = R.pipe(
        R.map(quadratic),
        R.tap(a => console.log(a)) // [4, 9, 16, .... , 121]
    )(input)
    /* (x + 1)^2 수식 구현 */
    const input: number[] = R.range(1, 10 + 1)
    const squareAferInc = R.pipe(
        R.inc, //( x + 1 )
        square //( x + 1 ) ** 2
    )
    const squareresult = R.pipe(
        R.map(squareAferInc),
        R.tap(a => console.log(a)) // [4, 9, 16, ... , 121]
    )(input)
```

### 서술자와 조건 연산
함수형 프로그래밍에서 `boolean`타입 값을 반환해 어떤 조건을 만족하는지를 판단하는 함수를 `서술자`라고 합니다.  

**수의 크기를 판단하는 서술자**  
```typescript
    R.lt.(a)(b): boolean // a < b [true]
    R.lte.(a)(b): boolean // a <= b [true]
    R.gt.(a)(b): boolean // a > b [true]
    R.gte.(a)(b): boolean //a >= b [true]

    R.pipe(
        R.filter(R.lte(3)), // 3 <= x
        //R.lte는 직관적으로 3 <= x로 느껴지지 않아서
        //R.filter(R.flip(R.gte(3)))처럼 사용하기도 한다.
        R.tap(n => console.log(n)) // [3, 4, 5, ... , 10]
    )(R.range(1, 10 + 1))
```

**R.allPass & R.anyPass**
`R.lt`나 `R.gt`처럼 `boolean`타입의 값을 반환하는 함수들은 `R.allPass`와 `R.anyPass`라는 로직 함수를 통해 결합할 수 있음
`allPass`는 조건이 모두 `true` / `anyPass`는 하나라도 `true`
```typescript
    type NumberToBooleanFunc = (n: number) => boolean
    const selectRange = (min: number, max: number): NumberToBooleanFunc => 
    R.allPass([
        R.lte(min), // min이 요소보다 작거나 같으면 true
        R.gt(max) // max가 요소보다 커야 true
    ])

    R.pipe(
        R.filter(selectRange[3, 6 + 1]),
        R.tap(a => console.log(a)) // [3, 4, 5, 6] -> min <= item > max
    )(R.range(1, 10 + 1))

```
**R.not 함수**  
입력값이 `true`면 `false` / `false`면 `true`를 반환해준다.
```typescript
    type NumberToBooleanFunc = (n: number) => boolean
    const selectRange = (min: number, max: number): NumberToBooleanFunc => 
    R.allPass([
        R.lte(min), // min이 요소보다 작거나 같으면 true
        R.gt(max) // max가 요소보다 커야 true
    ])
    const notRange = (min: number, max: number) => R.pipe(selectRange(min, max), R.not)
    R.pipe(
        R.filter(notRange([3, 6+1])),
        R.tap(a => console.log(a)) // [1,2,7,8,9,10]
    )(R.range(1, 10 + 1))
```
**R.ifElse 함수**  
`R.ifElse` 함수는 세 가지 매개변수를 포함하는데 첫 번째 서술자가 `true`면 두 번째 함수를, `false`면 세 번째 함수를 실행시킨다
```typescript
    R.ifElse(
        서술자,
        [true 함수],
        [false 함수]
    )
```
1 ~ 10까지 수에서 중간값 6보다 작은 수는 1씩 감소시키고, 같거나 큰 수는 1씩 증가시키는 것을 구현
```typescript
    const   input: number[] = R.range(1, 10 + 1),
            halfValue: number = input[input.length / 2]
    const subtractOrAdd = R.pipe(
        R.map(R.ifElse(
            R.lte(halfValue),// halfValue <= x
            R.inc,
            R.dec
        )),
        R.tap(a => console.log(a)) // [0, 1, 2, 3, 4, 7, 8, 9, 10, 11]
    )
    const result = subtractOrAdd(input)
```

### 문자열 다루기
```typescript
    //공백 제거
    R.trim(text)
    //대소문자 전환
    R.toUpper(text)
    R.toLower(text)
    //구분자를 사용해 문자열 배열로 변환, 반대로 JOIN도 지원함
    let strArr : string[] = R.split(구분자)(text)
```

**toCamelCase 함수 작성**
```typescript
    type StringToStringFunc = (string) => string
    const toCamelCase = (delim: string): StringToStringFunc => {
        const makefirstToCapital = (word: string) => {
            const characters = word.split('')
            return characters.map((c, index)=> index === 0 ? c.toUppercase() : c).join('')
        }

        //R.map의 콜백 함수에 index 매개변수 제공
        const indexedMap = R.addIndex(R.map)
        return R.pipe(
            R.trim,
            R.split(delim),
            R.map(R.toLower),
            //
            indexedMap((value: string, index: number) => index > 0 ? makefirstToCapital(value): value ),
            R.join('')
        ) as StringToStringFunc
    }
    toCamelCase(' ')('Hello world') // helloWorld
```

### chance 패키지로 객체 만들기
chance패키지는 그럴듯한 가짜 데이터를 만들어주는 라이브러리이다.  
`Iperson`타입은 주소를 표현하는 `ILocation` 타입의 `location`속성을 포함하며 `ILocation`은  
다시 좌표를 표현하는 `ICoordinates`타입의 `coordinates`속성을 포함한다.

**ICoordinates 객체 만들기**  
아래 방법을 이용하여 여러 데이터를 만들어보자.
```typescript
    const c = new Chance
    type ICoordinates = {
        latitude: number,
        longitude: number
    }

    const makeICoordinates = (latitude: number, longitude: number):
        ICoordinates => ({latitude, longitude})

    const makeRandomICoordinates = (): ICoordinates =>
        makeICoordinates(c.latitude(), c.longitude())

    makeRandomICoordinates()
```

### 렌즈를 활용한 객체의 속성 다루기

**렌즈란?**
하스켈 언어의 Control.Lens 라이브러리 내용 중 JS에서 동작할 수 있는 `getter`, `setter`기능만을  
람다 함수로 구현한 것입니다. 람다의 렌즈 기능을 활용하면 객체의 속성값을 얻거나 설정하는 작업을 쉽게 할 수 있음.
- `R.lens`함수로 객체의 특정 속성에 대한 렌즈를 만든다
- 렌즈를 `R.view`함수에 적용해 속성값을 얻는다.
- 렌즈를 `R.set`함수에 적용해 속성값이 바뀐 새로운 객체를 얻는다.
- 렌즈와 속성값을 바꾸는 함수를 `R.over`함수에 적용해 값이 바뀐 새로운 객체를 얻는다.

**R.prop과 R.assoc 함수**  
렌즈 기능을 이해하려면 두 함수를 알아야한다.  
`R.prop`는 객체의 특정 속성 값을 가져오는 함수로서, `getter`라고 함.  
`R.assoc`는 객체의 특정 속성 값을 변경하는 함수로 이를 `setter`라고 한다.

```typescript
    /* getter 사용 */
    const preson: IPerson = makeRandomIPerson()
    const name = R.pipe(
        R.prop('name'),
        R.tap(name => console.log(name))
    )(person)
    /* setter 사용 */
    const getName = R.pipe(
        R.prop('name'),
        R.tap(name => console.log(name))
    )
    const modifiedPerson = R.assoc('name', 'YHLEE')(person)
    getName(modifiedPerson)
```

**R.lens 함수**  
렌즈 기능을 사용하려면 일단 렌즈를 만들어야 합니다.  
렌즈는 `R.lens`, `R.prop`, `R.assoc`의 조합으로 만들 수 있습니다.
```typescript
    const makeLens = (propName: string) => R.lens(R.prop(propName), R.assoc(propName))
```

**R.view, R.set, R.over**  
렌즈를 만들었으면 `R.view`, `R.set`, `R.over`함수에 렌즈를 적용해서 다음과 같은  
게터와 세터 그리고 `setterUsingFunc`과 같은 함수를 만들 수 잇습니다.
```typescript
    const makeLens = (propName: string) => R.lens(R.prop(propName), R.assoc(propName))
    const getter = (lens) => R.view(lens)
    const setter = (lens) => <T>(newValue: T) => R.set(lens, newValue)
    const setterUsingFunc = (lens) => <T, R>(func: (T) => R) => R.over(lens, func)

    /* example */
    const nameLens = makeLens('name')
    const getName = getter(nameLens)
    const setName = setter(nameLens)
    const setNameUsingFunc = setterUsingFunc(nameLens)

    const person: IPerson = makeRandomIPerson()

    const name = getName(person)
    const newPerson = setName('YHLEE')(person)
    const anotherPerson = setNameUsingFunc(name => `Mr. ${name}`)(person)
```
**R.lensPath 함수**  
`peson.location.coordinates.longitude`같이 객체의 중첩 속성을 `path`라고 한다.  
이렇게 `path`가 길어지면 `R.lensPath`함수를 사용한다.  
```typescript
    
    const longitudeLens = R.lensPath(['location', 'coodinates', 'longitude'])
    const getLongitude = getter(longitudeLens)
    const setLongitude = setter(longitudeLens)
    const setLongitudeUsingFunc = setterUsingFunc(longitudeLens)
    /* 사용 방법은 위 코드와 동일 */
```
### 객체 다루기

**R.toPairs와 R.fromPairs**  
`R.toPairs`함수는 객체 소성들을 분해해 배열로 만들어 주며 이 때 타입은 `[string, any]`타입의 `튜플`임
```typescript
    const person: IPerson = makeRandomIPerson()
    const pairs: [string, any][] = R.toPairs(person)
```
`R.fromPairs`함수는 반대로 `[키: 값]`형태의 아이템을 가진 `배열`을 다시 객체로 만들어 줌.
```typescript
    const againPerson: IPerson = R.fromPairs(pairs) as IPerson
```
**R.keys와 R.values 함수 그리고 R.zipObj**  
`R.keys`함수는 객체 속성 이름만 `string[]`타입으로 반환  
`R.values`함수는 객체 속성 값만 `any[]`타입으로 반환  
`R.zipObj`함수는 `키 배열`과 `값 배열`를 결합하여 하나의 객체로 만든다.
```typescript
    const person: IPerson = makeRandomIPerson()
    /* R.keys */
    const keys: string[] = R.keys(person)
    /* R.values */
    const values: string[] = R.values(person)
    /* R.zipObj */
    const zippedPerson: IPerson = R.zipObj(keys, values) as IPerson
```

**R.merge**  
객체를 `merge`해주는 기능도 지원한다.  
- 얕은 복사 : 얕은 복사로 함 즉 속성 값이 단일 값인 것만 바꿔 줌
    - mergeLeft
    - mergeRight
- 깊은 복사 : 속성 값이 `object`일 경우와 `dept`가 깊은 경우 바꿔줌
    - mergeDeepLeft
    - mergeDeepRight

`-left`와 `-right`의 의미는 `merge`우선 순위를 의미한다.  
동일한 속성 값이 있을 때 `left`함수면 좌측 객체 값으로 `right`함수면 우측 객체 값으로 치환한다.
```typescript
    const   left  = {name : 'Y', gender: 'man' },
            right = {name : 'H', age: '14' }
    const person = R.mergeRight(left, right)
    person // {name: 'H', age: '14', gender: 'man' }
```

### 배열 다루기

**R.prepend, R.append**  
기존 배열에 요소를 추가할 때 사용
```typescript
    const array: number[] = [3, 4]
    const newArray = R.prepend(5)(array)
    array // [3, 4]
    newArray // [5, 3, 4]
    //append는 뒤에 추가하는 거
```
**R.flatten**  
배열의 구조가 복잡하게 구성되어 있으면, 배열을 대상으로 람다 기능을 적용하는 것은 어렵다.  
이런 경우 `R.flatten`를 사용해주면 평평한 배열로 변경해줄 수 있다.
```typescript
    //복잡한 구조의 array
    const complicatedArray = [[[1,1], [1,2]], [[2,1],[2,2]]]
    const simpleArray = R.flatten(complicatedArray);
    simpleArray // [1, 1, 1, 2, 2, 1, 2, 2]
```
**R.unnest**  
`R.unnest`도 `R.flatten`과 비슷하지만 조금 더 정교하게 배열을 가공해준다.
```typescript
    const complicatedArray = [[[1,1], [1,2]], [[2,1],[2,2]]]
    const stepOneArray = R.unnest(complicatedArray);
    stepOneArray // [ [1, 1], [1, 2], [2, 1], [2, 2] ]
    const stepTwoArray = R.unnest(stepOneArray);
    stepTwoArray // [1, 1, 1, 2, 2, 1, 2, 2]
```

**R.sort, R.sortBy, R.sortWith**  
`R.sort`는 `number[]`라면 적용할 수 있으며 배열을 내림차순 혹은 오름차순을 정렬할 수 있다.  
```typescript
    /* 기본 형식 */
    let 정렬된_배열 = R.sort(콜백함수)(배열)
    /* 콜백함수 형식 */
    /* 마이너스면 오름차순, 0이나 플러스값이면 내림차순 */
    (a: number, b: number): number => a - b
    
    /* example */
    type voidToNumberFunc = () => number
    const makeRandomNumber = (max: number): voidToNumberFunc =>
    (): number => Math.floor(Math.random * max)

    const array = R.range(1, 5 + 1).map(makeRandomNumber)
    const sortedArray = R.sort((a: number, b:number): number => a - b )(array)
```
`R.sortBy`는 `object[]`일 때 객체의 특정 속성값에 따라 정렬해주는 함수다.
```typescript
    const persons: IPerson[] = R.range(1, 5+1).map(makeRandomPerson)
    const sortedByName = R.sortBy(R.prop('name'))(persons)
```
`R.sortWith`는 `R.sortBy`가 오름 차순만 가능하기 때문에 나온 함수다.
```typescript
    const persons: IPerson[] = R.range(1, 5+1).map(makeRandomPerson)
    const sortedByName = R.sortWith([
        R.descend(R.prop('name'))
    ])(persons)
```

### 조합 논리 이해하기
함수형 프로그래밍의 가장 큰 이론적인 배경은 `람다 수학`과 `조합 논리학`, 그리고 `카테고리 이론`이다,  
`람다 수학`의 모든 이론을 컴퓨터 프로그래밍 언어로 표현할 수 없으므로 어떤 제한된 범위에서 람다 수학을 구현하기 위해 `조합 논리학`이 생겨났다.  

**조합자란?**  
특별한 형태의 고차 함수들을 결합해 새로운 조합자를 만들어내는 것.
|조합자 이름|의미|람다함수 이름|
|:---:|:---:|:---:|
|I|identity|R.identity|
|K|constant|R.always|
|T|thrush|R.applyTo|
|W|duplication|R.unnest|
|C|flip|R.flip|
|S|substitution|R.ap|

조합자들을 동작방식을 이해하는 것은 상당히 복잡하다.  
우선 `R.chain`함수를 통해 조합자들을 결합한다는 것이 어떤 의미인지 알아보자.  

**R.chain**  
람다 라이브러리는 `R.chain`이라는 함수를 제공한다.  
이 함수는 매개변수로 함수를 받으며 매개변수가 한 개일 때와 두 개일 때의 동작이 서로 다르다.  
```typescript
    R.chain(콜백 함수)
    R.chain(콜백 함수1, 콜백 함수2)

    const array = [1, 2, 3]
    /* 매개 변수 한 개일 때 */
    R.pipe(
        R.chain(n => [n, n]),
        R.tap(n => console.log(n)) // [1, 1, 2, 2, 3, 3]
    )(array)
    /* process */
    R.pipe(
        R.map(n => [n, n]), // [ [1,1], [2,2], [3,3] ]
        R.flatten // [1, 1, 2, 2, 3, 3]
    )

    /* 매개 변수 두 개일 때 */
    R.pipe(
        R.chain(R.append, R.head), // R.append(R.head(array))(array)
        R.tap(n => console.log(n)) // [1, 2, 3, 1]
    )(array)
```

**R.flip 조합자**  
2차 고차 함수의 매개변수 순서를 뒤집는 역할
```typescript
    const flip = cb => a => b => cb(b)(a)
    const reverseSubtract = flip(R.subtract)
    const newArray = R.pipe(
        R.map(reverseSubtract(10)), // value - 10
        R.tap(a => console.log(a)) // [-9, -8, ... , -1]
    )(R.range(1, 9 + 1))
```

**R.identity**  
다음처럼 가장 단순한 조합자이지만, 조합자의 구조상 반드시 함수가 있어야하는 곳에 위치할 때  
그 위력을 발휘합니다.
```typescript
    const array = [ [1], [2], [3] ]
    R.pipe(
        R.chain(R.identity),
        R.tap(a => console.log(a)) // [1, 2, 3]
    )(array)
    // 특정 값 이상일 경우 할인해주는 코드
    type NumberToNumFunc = (n: number) => number
    const applyDiscount = (minimum: number, discount: number): NumbertoNumFunc => 
        R.pipe(
            R.ifElse(
                /* 
                    우리가 원하는 로직 "minimum <= x"
                    따라서 flip 해주는 이유는 코드의 직관성을 위해 써주는 게 나을 것 같다.
                    flip을 하지 않으면 R.lte(minimum) 이렇게 해줘야함.
                */
                R.flip(R.gte)(minimum),
                R.flip(R.subtract)(discount), //[true] x - discount
                R.identity // [false] 넘어가기
            ),
            R.tap(amount => conole.log(amount))
        )
    const calcPrice = applyDiscount(5000, 500) // 5000원 이상 구매하면 500원 discount
    calcPrice(6000) //5,500
    calcPrice(4500) //4,500 
```

**R.always**  
다음처럼 두 개의 고차 매개변수 중 첫 번째 것을 반환한다.  
`R.always`는 두 개의 매개변수가 필요한 조합자에 마치 `R.identity`처럼 사용됩니다.  
비록 `R.always` 항상 첫 번째 매개변수값만 반환하지만, `R.flip(R.always)`는 반대로 항상 두 번째 매개변수값만 반환한다.
```typescript
    //always = x => y => x
    const alwaysSample = <T>(a: T) => (b: T) => R.always(a, b)
    const alwaysReverseSample = <T>(a: T) => (b: T) => R.flip(R.always)(a, b)
    alwaysSample(1)(2) // 1
    alwaysReverseSample(1)(2) // 2
```

**R.applyTo**  
`R.applyTo`는 값을 첫 번째 매개변수, 해당 값을 입력받는 콜백 함수를 두 번째 매개변수로 받아 동작한다.
```typescript
    //applyTo = value => cb => cb(value)
    const T = value => R.pipe(
        R.applyTo(value),
        R.tap(value => console.log(value))
    )

    const value100 = T(100)
    const sampleValue = value100(R.identity) // 100
    const add1Value = value100(R.add(1)) // 101
```

**R.ap 조합자**  
`R.ap`조합자는 콜백 함수들의 배열을 첫 번째 매개변수로, 배열을 두 번째 매개변수로 입력받는 2차 고차 함수입니다.  
```typescript
    const ap = ([콜백함수]) => 배열 => [콜백함수](배열)
```
콜백 함수가 한 개일 때는 마치 R.map함수처럼 동작합니다.
```typescript
    const callAndAppend = R.pipe(
        R.ap([R.multiply(2)]),
        R.tap(a => console.log(a))
    )
    const input = [1, 2, 3]
    const result = callAndAppend(input) // [2, 4, 6]
    /* 
        R.map(n => R.multiply(2)(n) )([1, 2, 3]) 
        ===
        R.ap(R.multiply(2))([1, 2, 3])
     */
```
콜백 함수가 두 개일 때는 마치 `R.chain(n => [n, n])`형태로 동작합니다.  
즉 각각 콜백 함수를 적용한 배열을 만든 후 연산이 끝나면 해당 배열을 통합해 한 개로 만들어 준다.
```typescript
    const callAndAppend = R.pipe(
        R.ap([R.multiply(2). R.add(10)]),
        R.tap(a => console.log(a))
    )
    const input = [1, 2, 3]
    callAndAppend(input) // [2, 4, 6, 11, 12, 13]
    /* 
        [ R.multiply => [2, 4, 6], R.add => [11, 12, 13] ] 
     */
```
이런 성질을 이용해 배열 복제한 뒤 통합한 배열을 만들어 보자.
```typescript
    const repeat = (N, cb) => R.range(1, N + 1).map(n => cb)
    const callAndAppend = R.pipe(
        R.ap(repeat(3, R.identity)),
        R.tap(a => console.log(a))
    )
    const input = [1, 2, 3]
    const result = callAndAppend(input) // [1, 2, 3, 1, 2, 3, 1, 2, 3]
```
