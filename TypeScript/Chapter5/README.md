## 반복기와 생성기

[메인 화면으로](../)

### 반복기 이해하기.

**반복기와 반복기 제공자**  
`for...of` 구문은 타입에 무관하게 배열에 담긴 값을 차례로 얻는데 활용되며  
다른 언어에서도 `반복기`라는 주제로 흔히 찾아볼 수 있다.  
반복기의 특징은 아래와 같다.
```bash
    # next라는 이름의 메서드를 제공
    # next 메서드는 value와 done이라는 두 개의 속성을 가진 객체를 반환한다.
```
```typescript
    // 반복기 특징을 구현한 예제.
    const createRangeIterable = (from: number, to: number) : any => {
        let currentValue = from;
        return {
            next() { //next 메서드 생성
                const value = currentValue < to ? currentValue++ : undefined
                const done = value === undefined
                return {value, done}
            }
        }
    }

    const iterator = createRangeIterable(1, 3 + 1); // 반복기 생성
    while(true){
        const {value, done} = iterator.next(); // 반복기 실행
        if(done) break;
        console.log(value)
    }
```
**반복기를 사용하는 이유**  
반복기를 사용하면 값이 필요한 시점에 값을 생성할 수 있는 장점이 있으며  
이는 메모리를 적게 소모할 수 있게 해줌.

**[Symbol.iterator] 메서드**  
`for...of`반복기에서 사용하려면 `[Symbol.iterator]`메서드가 구현되어있어야 한다.  
따라서 위 예제를 아래와 같이 수정해야 `for...of`에서의 사용이 가능하다.
```typescript
    class class RangeIterable {
        constructor(public from: number, to: number) {}
        [Symbol.iterator](){
            const that = this
            let currentValue = that.from
            return {
                next() { //next 메서드 생성
                    const value = currentValue < to ? currentValue++ : undefined
                    const done = value === undefined
                    return {value, done}
                }
            }
        }
    }
    const iterator = new RangeIterable(1, 3 + 1)
    for(const value of iterator){
        console.log(value);
    }
```

**Iterable<T>, Iterator<T>**  
타입스크립트는 반복기 제공자에 `Iterable<T>, Iterator<T>`제네릭 인터페이스를 사용할 수 있다.
```typescript
    /* 기본 구조 */
    //클래스 타입
    class 구현클래스 implements Iterable<생성할 값의 타입> {}
    //[Symbol.iterator] 타입
    [Symbol.iterator](): Iterator<생성할 값의 타입> {}

    /* example */
    class StringIterable implements Iterable<string | undefined> {
        constructor(private strings: string[] = [], private currentIndex: number = 0) {}
        [Symbol.iterator](): Iterator<string | undefined> {
            const that = this
            let currentIndex = that.currentIndex,
                length = that.strings.length
            const iterator: Iterator<string | undefined> = {
                next(): {value: string | undefined, done: boolean} {
                    const value = currentIndex < length ? that.strings[currentIndex++] : undefined
                    const done = value === undefined
                    return {value, done}
                }
            }
            return iterator
        }
    }
    for(let value of new StringIterable(['hello','world','!']) )
        console.log(value);
```

### 생성기 이해하기
위의 반복기를 생성하는 것을 보면 알겠지만 반복기를 생성하면 코드의 복잡도가 증가한다.  
이런 문제를 해결하기위해 `반복기`를 쉽게 생성할 수 있는 `생성기`를 코드에서 제공한다. 
`function*`로 생성된 함수를 `생성기`라고 하며 해당 함수는 `yield`라는 키워드를 제공하며 해당 키워드는 `return`처럼 동작한다.  
`function*`는 `function`에 `*`를 붙인게 아니라 `function*`이 하나의 키워드이다.  
따라서 `arrow function`에서는 사용할 수없다.
```typescript
    function* generator(){
        console.log('generator start...');
        let value = 1;
        while(value < 4){
            yield value++
        }
        console.log('generator finish...');
    }
    for(const value of generator()){
        console.log(value)
    }
```

**setInterval 함수와 생성기의 유사성**  
생성기가 동작하는 방식을 `세미코루틴`이라고 하며 이는 멀티 스레드 방식으로 동작하는 것처럼 보여주는 방식이다.  
`setInterval`방식도 동일하다.
```typescript
    /* setInterval 기본 구조 */
    const interval = setInterval(콜백함수, 호출주기)
    clearInterval(interval) // setInterval 해제
```

**반복기 제공자의 메서드로 동작하는 생성기 구현**
```typescript
    class IterableUsingGenerator<T> implements Iterable<T> {
        constructor(private values: T[] = [], private currentIndex: number = 0) {}
        [Symbol.iterator] = function* (this : any) {
            while(this.currentIndex < this.values.length){
                yield this.values[this.currentIndex++]
            }
        }
    }

    for(let item of new IterableUsingGenerator([1,2,3])){
        console.log(item);
    }
```

**yield\* 키워드**
`yield`는 단순히 값을 대상으로 동작하지만  
`yield*`는 다른 생성기나 배열을 대상으로 동작한다.
```typescript
    function* gen12(){
        yield 1
        yield 2
    }

    function* gen12345(){
        yield* gen12()
        yield* [3, 4]
        yield 5
    } /* 1, 2, 3, 4, 5 */
```

**yield 반환값**
`yield`연산자는 값을 반환하며 해당 값은 반복기의 next메서드 호출 때 매개변수에 전달하는 값이다.
```typescript
    function* gen(){
        let count = 5
        let select = 0
        while(count--){
            select = yield `you select ${select}`
        }
    }
    const iter = gen();
    while(true){
        const {value, done} = iter.next(Math.random());
        if(done) break;
        console.log(value)
    } // 첫번 째는 무조건 0이며 나머지는 랜덤이다.

```