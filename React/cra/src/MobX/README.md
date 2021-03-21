## Mobx Project
`Mobx`는 상태관리 라이브러리다. `Redux`와 동일하게 `React`에 의존하지 않으며  
순수 `JS`, `Vue`, `Angular`에서 사용할 수 있는 라이브러리이다.


### MobX의 주요 개념들

**Observable State**  
뜻 그래도 관찰받고 있는 `state`를 의미한다. Mobx에서는 `Observeable`한 `state`를  
계속 주시하고 있어서 변경되면 바로 알 수있다.

**Computed Value**  
`state`혹은 다른 `Computed Value`을 기반으로 연산한 값을 의미합니다.  
주로 성능 최적화를 위하여 많이 사용하며 어떤 값을 연산할 때 연산에 기반하는 값이  
바뀔때만 새로 연산하고 바뀌지 않았다면 `memorized`된 값들을 사용한다.

**Reactions**  
`Computed Value`와 비슷하다, 다만 `Computed Value`의 경우는 우리가 특정 값을  
연산해야 될 때 에만 처리가 되는 반면에, `Reactions`는 지정한 `Observable state`가 바뀔 때마다 처리가 된다.

**Actions**  
`State`를 변경하는 모든 함수를 의미한다.

**autorun**  
`autorun`함수 내부에서 코드가 실행될 때 의존하는 `state`를 모두 `Observe`한다.

**reaction과 auotorun의 차이**  
`reaction`은 `observe`하기 위한 `observable` 변수를 직접 선언해주어야하고  
`autorun`은 함수 내부에 선언된 참조 변수를 자신이 스스로 `observe`한다.
```javascript
    class Person {
        name = ''
        constructor(name) {
            this.name = name;
            makeAutoObservable(this)
        }
        changeName(name) {
            this.name = name
        }
    }
    let Lee = Person('lee')
    //reaction이 userGroup을 바라볼 때
    reaction(
        ()=> Lee.name,
        name => console.log(`Change name to ${name}`)
    )
    //autorun이 userGroup을 바라볼 때
     autorun(console.log(`Change name to ${Lee.name}`))
```


### MobX의 함수 및 기능 정리

**makeObservable과 makeAutoObservable**  
`MobX`의 `action, observable, computed, flow`등 타입을 쉽게 선언할 수 있게 해주는 함수들이다.  
`makeAutoObservable`은 아래와 같이 타입을 분배해준다.  
- `function` `action, flow`중에 하나를 판단하고 `generator, async`이면 `flow`타입을 가져간다.
- `get function`  `computed`타입을 지정한다.
- `field` `observable`타입으로 지정한다.

```javascript
    //makeObservable
    class Doubler {
        value // observable
        constructor(value) {
            makeObservable(this, {
                value: observable,
                double: computed,
                increment: action,
                fetch: flow
            })
            this.value = value
        }
        get double() { // computed
            return this.value * 2
        }

        increment() { // action
            this.value++
        }

        *fetch() { // flow
            const response = yield fetch("/api/value")
            this.value = response.json()
        }
    }
    //makeAutoObservable
    class Doubler {
        value // observable
        constructor(value) {
            this.value = value
            makeObservable(this)
        }
        get double() { // computed
            return this.value * 2
        }

        increment() { // action
            this.value++
        }

        *fetch() { // flow
            const response = yield fetch("/api/value")
            this.value = response.json()
        }
    }
```

**MobX 상속과 action.bound**
`MobxX`용 `Class`를 상속할 때 `override`되는 경우의 코드  
`action.bound`타입으로 작성하면 자동으로 해당 `this`를 `bind`해준다.
```javascript
    class Parent {
        arrowAction = () => {}

        action() {}
        boundAction() {}

        constructor() {
            makeObservable(this, {
                arrowAction: action,
                action: action,
                boundAction: action.bound
            })
        }
    }

    class Child extends Parent {
        // TypeError : instance는 rededine할 수 없어서  error
        arrowAction = () => {}

        // OK!
        action() {}
        boundAction() {}

        constructor() {
            super()
            makeObservable(this, {
                arrowAction: override,
                action: override,
                boundAction: override
            })
        }
    }
```

**observable와 observer**  
우선 `decorator`를 지원하기 위해 아래와 같이 config설정을 변경한다.
```bash    
    # npm i --save-dev @babel/plugin-proposal-class-properties
    # npm i --save-dev @babel/plugin-proposal-decorators
    # create-react-app 프로젝트일 경우 npm eject로 설정파일 모두 보여지게 해야함.
    # npm eject 
    # package.json의 babel 옵션 아래와 같이 변경
    #"plugins": [
    #    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    #    ["@babel/plugin-proposal-class-properties", { "loose": false }]
    #]
```

- `observable` 
```javascript
    @observable [variable] // @decorator
    observable(value)
    //Object (observable.object)
    const person = observable({
        name: 'John',
        age: 42,
        showAge: false,
        
        //computed property
        get labelText(){
            return this.showAge
        }

        setAge: action(function(){
            this.age = 21
        })
    })
    //Array (observable.array)
    // [method] => clear(), replace(newItem), remove(value) 
    let todos = observable([
        { title: "Spoil tea", completed: true },
        { title: "Make coffee", completed: false }
    ]);
    //Map (observable.map)
    // [method] => toJSON(), merge(values), replace(values)
    const mapObserve = observe(new Map('a'))
```
[Document of Map](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Map)
- `observer`
 
```javascript
    /* Function Component */
    const Component = observer(function(props){ // 화살표 함수 가능
        /* Code... Something */
        return (
            /* JSX */
        )
    })

    /* Class Component */
    // 1. Decorator
    @observer
    class Component extends React.Component {
        constructor(props){
            /* Initial Something... */
        }
        render(){
            return (
                /* JSX */
            )
        }
    }
    
```  

**Intercept와 Observe**  
`observe`되고 있는 `vairable`의 `middleware` 정도로 생각하면 될 것 같다.  
다만 `nested observables`를 지원하지 않기 때문에 공식문서에서 추천하지 않은 방법이다.  
`intercept`는 `observable`의 값이 변경되기 전에 실행된다.  
즉 `null`혹은 `pattern match`를 확인하여 변경할 것인지 아닌지 설정할 수있다.  
`Observe`는 `reaction`과 동일하며 값의 변경이 있는 후 실행된다.

**action, reaction, autorun!!**  
- `action`
```javascript
    // reaction은 첫번 째 콜백함수의 반환 값이 변경되는 것을 바라본다. => 여러개를 선언할 경우 []로 지정
    // autorun은 함수 내부에서 의존하는 observable 변수를 바라본다.

    //action은 observable을 변경해주는 단위로서의 역할을 할 수 있다.
    const state = observable(1)
    /* reaction */
    reaction(
        ()=> [state],
        state => console.log('reaction-- ' + state)
    )
    /* autorun */
    autorun(()=> console.log('autorun-- ' + state))

    (NoActionFunc() => {
        state++;
        state++;
        /* 
            # console.log
            reaction--1
            autorun--1
            > ComponentDidUpdate
            reaction--2
            autorun--2
            > ComponentDidUpdate
        */
    })()
      
    //runInAction은 action을 바로 발생 시킨다.
    runInAction(()=>{
        state++;
        state++;
        /* 
            # console.log 
                reaction --2
                autorun --2
                > ComponentDidUpdate
         */
    })
    /* runInAction사용 안하고 바로 실행시킬 경우 아래처럼 함수를 실행시켜야함. */
    (action(()=>{
        state++;
        state++;
         /* 
            # console.log 
                reaction --2
                autorun --2
                > ComponentDidUpdate
         */
    }))()
```

**Store 생성 및 전달**
`Store`의 생성은 자동 생성으로  `make(Auto)Observer`아니면 `useLocalObservable`가 있고  
사용자 스스로 `decorator`와 각 함수들로 작성해도 무방하다.  
`Store`를 전달하는 방법은 `Decorator`, `Prop`, `Context`가 있다.

- Store생성
```javascript
    //Store를 생성
    //1. Class
    //// makeObserver, makeAutoObserver (위 예시 참고)
    //2. Function
    //// useLocalObservable
    const TimerView = observer(() => {
        //useLocalObservable은 useState(()=> observable({/* something */}))인 Component Hook이다.
        //Function Component의 경우 함수가 계속 재호출 되니까 useState로 그 상태를 유지해줘야함.
        const timer = useLocalObservable(() => ({
            secondsPassed: 0,
            increaseTimer() {
                this.secondsPassed++
            }
        }))
        useEffect(()=>{
            reaction(
                () => timer.secondsPassed,
                second => console.log(second)
            )
            const interval = setInterval(timer.increaseTimer, 1000)
            return () => clearInterval(interval)
        },[])
        return <span>Seconds passed: {timer.secondsPassed}</span>
    })
```
- Store전달
```javascript
    //person이라는 Store가 있다고 가정
    // 1. Prop
    <SomethingComponent store={person} />
    // => SomethingComponent에서 매개변수로 전달 받아서 사용.

    // 2. Decorator
    <Provider store={person}>
            <SomethingComponent />
    </Provider> 

    // SomthingComponent.js === start
    @inject(store => store.person)
    class SomethingComponent extends React.Component {
        store
        constructor(props){
            super(props)
            this.sore = props.person
        }
    }
    // SomthingComponent.js === end

    // 3. Context
    const RootContext = createContext()
    <RootContext.Provider value={person}>
        <SomethingComponent />
    </RootContext.Provider>

     // SomthingComponent.js === start

     // => 1. Consumer
    class SomethingComponent extends React.Component {
        render(){
            return(
                <RootContext.Consumer>
                    {value => /* JSX */}
                </RootContext.Consumer>
            )
        }
    }
    // => 2. Hook
    function SomethingComponent {
        const store = useContext(RootContext).person
        return (
            /* JSX */
        )
    }
    // SomthingComponent.js === end
```

**When**  
`When`은 `when(debugName?, predicate: () => boolean, effect: () => void, scope?)`으로 구성된다.  
`predicate`의 함수가 `true`를 반환하면 `effect`함수를 한 번 실행한다.  
```javascript
    class Person {
        personList = []
        constructor() {
            when(
                () => this.personList.length > 2,
                () => console.log('정원 초과!! 서비스를 종료합니다.')
            )
        }
        addPersonList(name){
            personList.push(name)
        }
    }
    const group = new Person();
    group.addPersonList('Lee')
    group.addPersonList('Young')
    group.addPersonList('AAA') // 정원 초과!! 서비스를 종료합니다.
```

