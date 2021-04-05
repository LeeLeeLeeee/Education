## 모나드

[메인 화면으로](../)


### 모나드 이해하기
모나드 수학의 `카테고리 이론`이라는 분야에서 사용되는 용어입니다.  
프로그래밍에서 모나드는 일종의 `코드 설계 패턴`으로서 몇 개의 인터페이스를 구현한 `클래스`입니다.  
모나드는 몇 가지 공통적인 특징이 있습니다.  

**타입 클래스란?**  
모나드를 이해하는 첫 걸음은 `타입 클래스`가 왜 필요한지 아는 것으로 부터 시작된다.  
다음 2차 고차 함수 `callMap`은 두 번째 고차 매개변수가 `b`가 `map`이라는 메서드를 가졌다는  
가정으로 구현되었습니다.
```typescript
    const callMap = fn => b => b.map(fn)
```
따라서 다음과 같은 코드를 사용하면 작성자의 의도대로 실행됩니다.
```typescript
    callMap(a => a+1)([1])
```
하지만 다음처럼 작성자의 의도를 이해하지 못한 코드는 비정상 종료합니다.
```typescript
    callMap(a => a+1)(1) // ERROR!
```
이를 방지하기 위해 매개변수 `b`는 반드시 `map`메서드가 있는 타입이라고 타입을 제한해야 합니다.
```typescript
    const callMap = <T, U>(fn: (T) => U) => <T extends {map(fn)}>(b: T) => b.map(fn)
```
이렇게 하면 코드를 작성하는 시점에서 해당 오류를 발견할 수 있습니다.  
이 내용은 이전에서 다루었던 내용입니다.  
그런데 하스켈 언어는 상당한 발상의 전한을 했습니다. 보통 객체지향 언어라면  
`Number`라는 클래스를 만들고 `map`이라는 메서드를 구현하는 식으로 설계하겠지만, 모나드 방식 설계는  
반드시 `map`과 `of`라는 이름의 메서드가 있는 `Modad<T>`클래스를 만듭니다.
```typescript
    class Monad<T> {
        constructor(public value: T) {}
        static of<U>(value: U) : Monad<U> { return new Monad<U>(value)}
        map<U>(fn: (x: T) => U): Monad<U> { return new Monad<U>(fn(this.value))}
    }
```
이처럼 `Monad<T>`와 같은 클래스를 타입 클래스라고 합니다.  타입 클래스는 다음처럼 함수를 만들 때 특별한  
특별한 타입으로 제약하지 않아도 됩니다.
```typescript
    const callMonad = (fn) => (b) => Monad.of(b).map(fn).value
```
`Monad<T>`와 같은 타입 클래스 덕분에 `callMonad`처럼 타입에 따른 안정성을 보장하면서도  
코드의 재사용성이 뛰어난 범용 함수를 쉽게 만들 수 있습니다.
```typescript
    callMonad((a: number)=> a + 1)(1) // 2
    callMonad((a: number[])=> a.map(value => value+1))([1,2,3]) // [2,3,4]
    /* - process - */
    /* 1. callMonad는 아래의 구조와 같다 */
        callMonad = function(fn){
            return function(b){
                Monad.of(b).map(fn).value
            }
        }
    /* 2. fn과 b에는 각각의 값이 들어간다. */
        /* fn */(a: number[]) => a.map(value => value + 1 )
        /* b */[1,2,3]
        /* => */  Monad.of([1,2,3]).map((a:number[])=> a.map(value => value + 1)).value
    /* 
        3. Monad 생성
        Monad.of은 정적 메소드이며 Monad객체가 없어도 사용될 수 있다.
        해당 메소드는 타입 추론한 타입을 가지는 Monad객체를 생성한다.
        
        4. Monad.map 호출
        생성된 Monad객체는 map 메서드를 사용할 수 있으며 map 메서드는 
        of 메서드에서 추론한 타입을 매개변수로 받고 값을 반환하는 function을 받으며
        반환하는 값의 타입을 가지는 새로운 Monad 객체를 반환한다.
    */
```

**고차 타입이란?**  
앞서 본 `Monad<T>`는 타입 `T`를 `Monad<T>`타입으로 변환했다가 때가 되면 다시 타입 `T`로 변환해줍니다.  
`Monad<T>`처럼 타입 `T`를 한 단계 더 높은 타입으로 변환하는 용도의 타입을 `고차 타입`이라고 합니다.

**카테고리 이론이란?**  
카테고리 이론은 1940년대에 시작된 수학의 한 분야로, 함수형 프로그래밍 언어의 중요한 이론적인 배경이 되었습니다.  
수학에서 `집합`은 프로그래밍에서 `타입`입니다. 수학에서 카테고리는 `집합의 집합`으로 이해할 수 있습니다.  
따라서 프로그래밍에서 카테고리는 `타입의 타입`, 즉 `고차 타입`으로 이해할 수 있습니다.


**판타지 랜드**  
모나드는 원래 카테고리 이론에서 사용되는 용어였지만, 함수형 프로그래밍 언어의 최고봉인 하스켈 언어의  
`Prelude`라는 표준 라이브러리에서 사용되는 용어이기도 합니다. 모나드는 `모나드 룰`이라고 하는 코드 설계 원칙에 맞춰  
구현된 클래스를 의미합니다.
모나드는 다음 네 가지 요소를 구현한 것임을 알 수 있습니다. 즉 어떤 클래스가 다음 네가지 조건을 모두 만족한다면  
해당 클래스는 모나드 입니다.
```bash
    # 펑터(Functor): map이라는 인스턴스 메서드를 가지는 클래스
    # 어플라이(Apply): 펑터이면서 ap라는 인스턴스 메서드를 가지는 클래스
    # 애플리커티프(Applicative): 어플라이이면서 of라는 클래스 메서드를 가지는 클래스
    # 체인(Chain): 애플리커티브이면서 chain이라는 메서드를 가지는 클래스
```

**모나드 룰**  
어떤 클래스 이름이 `M`이고 해당 클래스의 인스턴스를 `m`이라고 할 때 모나드는 앞서 언급한 `애플리커티브`와 `체인`의  
기능을 가지고 있고, 다음과 같은 두 가지 법칙을 만족하게 구현한 클래스입니다.  
- 모나드룰 왼쪽 법칙과 오른쪽 법칙

|구분|의미|
|:---|:---|
|왼쪽 법칙|M.of(a).chain(f) == f(a) |
|오른쪽 법칙|M.chain(M.of) == m|


### Identity 모나드 이해와 구현  

**값 컨테이너 구현용 IValuable\<T\>인터페이스 구현**  
어떤 타입 `T`가 있을 때 배열 `T[]`는 같은 타입의 아이템을 여러 개 가진 컨테이너입니다.  
보통 컨테이너란 용어는 이처럼 흔히 `배열`을 의미합니다. 하지만 위에서 본 `Monad`처럼 배열이  
아닌 단지 한 개의 값만 가지는 컨테이너 클래스를 생각해 볼 수 있습니다. 이 컨테이너 클래스는 `number`와 같은  
구체적인 타입의 값을 가지는 것이 아니라, 모든 타입 `T`의 값을 가질 수 있는 제네릭 컨테이너 클래스를 생각할 수 있습니다.  
이제 다음과 같은 `IValuable<T>`인터페이스를 구현하는 `Identity<T>`를 구현해보겠습니다.
```typescript
    interface IValuable<T> {
        value(): T
    }
```

**클래스 이름이 왜 Identity인가?**  
함수형 프로그래밍에서 `identity`는 항상 다음처럼 구현하는 특별한 함수이다.
```typescript
    const identity = <T>(value: T): T => value
```
`Identity`는 앞서본 `map, ap, of, chain`과 같은 기본 메서드만 구현한 모나드입니다.  
카테고리 이론에서 자신의 타입에서 다른 타입으로 갔다가 돌아올 때 값이 변경되지 않는 카테고리를  
`Identity`라고 부릅니다. 다음 코드에서 `Identity<number>`타입은 `chain`메서드를 통해  
자기 자신의 타입인 `Identity<number>`로 돌아올 수 있는데, 이런 의미에서 `Identity`라고 명명하였다.
```typescript
    Identity.of(1).chain(Identity.of) // Identity.of(1)
```

**값 컨테이너로서의 `Identity<T>` 구현하기**  
```typescript
    class Identity<T> implements IValueable<T> {
        constructor(private _value: T) {}
        value() {return this._value}
    }
```
**`ISetoid<T>`인터페이스와 구현**  
판타지랜드 규격에서 `setoid`는 `equals`라는 이름의 메서드를 제공하는 인터페이스를 의미하며,  
타입스크립트로는 다음처럼 구현할 수 있습니다.
```typescript
    /* ISetoid가 IValuable를 상속하는 이유는 값을 가져야 하기 때문이다. */
    interface ISetoid<T> implements IValueable<T> {
        equals<U>(value: U): boolean
    }
```
이제 `Identity<T>`에 `ISetoid<T>`를 구현해보자.
```typescript
    class Identity<T> implements ISetoid<T> {
        constructor(private _value: T) {}
        value() { return this._value }
        equals<U>(that: U): boolean {
            if(that instanceof Identity)
                return this.value() === that.value()
            return false
        }
    }
    /* test code */
    const   one = new Identity(1), 
            anotherOne = new Identity(1),
            two = new Identity(2)
    one.equals(anotherOne) // true
    one.equals(two) // false
    one.equals(1) // false
    one.equals(null) // false
``` 
**`IFunctor<T>` 인터페이스 구현**  
판타지랜드 규격에서 펑터는 `map`이라는 메서드를 제공하는 인터페이스입니다.  
다음 코드는 `타입스크립트 언어의 특성`을 구려해 구현한 것으로, 카테고리 이론에서 펑터는 `엔도 펑터`라는  
특별한 성질을 만족시켜야 합니다.
```typescript
    interface IFunctor<T>{
        map<U>(fn: (x: T) => U)
    }
    /* 
        map 메서드의 반환 타입을 생략한 이유는 타입스크립트에서 엔도펑터를 구현할 수 있게 하는 구문을
        제공하지 않기 때문입니다.
    */
```
**엔도 펑터란?**  
특정 카테고리에서 출발해도 도착 카테고리는 다시 출발 카테고리가 되게 하는 펑터를 의미한다.  
다음 `Identity<T>`의 `map`메서드의 구현 내용은 `엔도펑터`로 동작하게 하는 코드이다.  
비록 `T`가 `U`로 바뀔 수는 있지만, 카테고리는 여전히 `Identity`에 머물게 하는 것입니다.
```typescript
    class Identity<T> implements ISetoid<T>, IFunctor<T> {
        constructor(private _value: T) {}
        // IValuable
        value() {return this._value}
        // ISetoid
          equals<U>(that: U): boolean {
            if(that instanceof Identity)
                return this.value() === that.value()
            return false
        }
        // IFunctor
        map<U>(fn: (x: T) => U) {
            return new Identity<U>(fn(this.value()))
        }
    }
```

**`IApply<T>` 인터페이스 구현**  
판타지랜드 규격에서 어플라이는 자신은 펑터이면서 동시에 ap라는 메서드를 제공하는 인터페이스입니다.  
```typescript
    interface IApply<T> extends IFunctor<T>{
        ap<U>(b: U)
    }
```
그런데 `IApply`를 구현하는 컨테이너는 값 컨테이너로서뿐만 아닐 고차 함수 컨테이너로서도 동작합니다.  
해당 내용을 코드로 구현해보겠습니다.  
다음 코드에서는 `Identity`는 `add`라는 `2차 고차 함수`를 값으로 가지고 있습니다.  
그리고 `add`는 2차 고차 함수이므로 `ap`메서드를 두 번 호출해 함수를 동작 시키고 있습니다.
```typescript
    const add = x => y => x + y
    const id = new Identity(add)
    id.ap(1).ap(2).value() // 3
```
`Identity`에 `IApply`를 구현해보겠습니다. 기존 내용은 생략합니다.
```typescript
    class Identity<T> implements ISetoid<T>, IFunctor<T>, IApply<T> {
        ap<U>(b: U) {
            const f = this.value()
            if(f instanceof Function)
                return Identity.of<U>((f as Function)(b))
        }
    }
    
```

**`IApplicative<T>` 인터페이스와 구현**  
판타지랜드 규격에서 애플리커티브(applicative)는 그 자신이 `어플라이`면서 `of`라는 클래스 메서드를  
추가로 제공하는 인터페이스입니다. 근데 아직 타입스크립트 `인터페이스`에서는 `정적메소드`를 구현하지 못해서  
아래처럼 `주석`처리 하였습니다.
```typescript
    interface IApplicative<T> {
        static of(value: T)
    }
    /* Identity<T>에 적용 */
    class Identity<T> implements ISetoid<T>, IFunctor<T>, IApply<T>, IApplicative<T> {
        static of<T>(value: T): Identity<T> { return new Identity<T>(value) }

    }

```

**`IChain<T>` 인터페이스와 구현**  
판타지랜드 규격에서 `체인`은 그 자신이 `어플라이`이면서 `chain`이라는 메서드를 구현하는 인터페이스 입니다.  
```typescript
    interface IChain<T> extends IApply<T> {
        /* chain은 U타입을 반환하지 않을 수도 있으므로 chain메서드에 반환 타입은 지정하지 않음. */
        chain<U>(fn: (T) => U)
    }
```

체인의 `chain`메서드는 펑터의 `map`과 달리 `엔도펑터`로 구현해야 할 의무가 없습니다.  
따라서 다음 코드에서 `chain`은 `map`과 함수 시그니처는 같지만 구현 내용은 조금 다릅니다.
```typescript
    class Identity<T> implements ISetoid<T>, IChain<T>, IApplicative<T> {
        chain<U>(fn: (T) => U): U {
            return fn(this.value())
        }
    }
```
아래 예시를 보면 `map`과 `chain`의 차이를 알 수 있습니다.
```typescript
    // map은 Identity카테고리를 반환하기 때문에 value 가능
    Identity.of(1).map(value => `the count is ${value}`).value() 
    // chain은 value를 사용하기 위해 Identity 카테고리를 반환해야합니다.
    Identity.of(1).chain(value => Identity.of(`the count is ${value}`)).value()
```




이제 모나드`Identity`구현이 끝났습니다. `모나드 룰`을 대입하여 `모나드`인지 확인해보겠습니다.

- 왼쪽 법칙(`M.of(a).chain(f) == f(a)`) 
```typescript
    const a = 1
    const f = a => a * 2
    Identity.of(a).chain(f) === f(a) // true
```

- 오른쪽 법칙(`M.chain(M.of) == m`)
```typescript
    const m = Identity.of(1)
    m.chain(Identity.of).equals(m) // true
```
생성한 `Identity`는 위 법칙을 모두 만족하므로 정상적인 `모나드`라고 할 수 있다.