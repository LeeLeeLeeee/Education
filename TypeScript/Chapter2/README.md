## 객체와 타입

[메인 화면으로](../)

### 변수 선언

**타입 주석**  
```typescript
    let 변수이름: 타입 [= 초기값] // let은 추후에 할당에도 무관.
    const 변수이름: 타입 = 초기값 // const는 선언과 동시에 할당해야함.
```
**let, const, var 변수 차이**  
|구분|var|let|const|
|----|----|----|----|
|스코프 레벨|함수|블럭|블럭|
|호이스팅 에러|x|o|o|
|변수 명 중복 선언|o|x|x|
|초기값 부여|x|x|o|
|값 재 할당|o|o|x|



**타입 추론**  
```typescript
    let variable = 1 // number 형으로 판단.
    let variable = 'string' // string 형으로 판단.
```

### 객체와 인터페이스

**인터페이스**  
```typescript
    /* 기본 구조 */
    interface 인터페이스명 {
        속성 명[?]: 속성 타입[,...]
    }
    /* example */
    interface Person {
        name: string //필수
        age?: number  //선택
    }
    /* 익명 인터페이스 */
    /* => 선언하지 않은 인터페이스 */
    let ai: {
        name: string
        age:number
        etc?: boolean
    } = {name: 'Jack', age: 32}
    /* 주로 함수를 구현할 때 사용됨 */
    function printMe(me: {name: string, age: number, etc?: boolean} ){
        /* something content */
    }
```
**클래스**  
```typescript
    /* 기본 구조 */
    class 클래스명 {
        //접근제한자 누락 시 public이 default
        [private | protected | public] 속성이름[?]: 속성타입[...]
        // private : 클래스 외부에서 접근 불가
        // protected : 상속 받은 클래스 내부에서 접근 가능
    }
    /* example */
    class Person {
        name: string
        age?: number
    } // let Person_1 = new Person();

    /* constructor */
    class Person2 {
        public name: string
        age?: number
        constructor(name: string, age?: number) {
            this.name = name;
            this.age = age
        }
    }
    /* constructor 축약형 */
    class Person3 {
        constructor(public name: string, public age?: number) {}
    }    
```
**Getter/ Setter 메서드**  
클래스는 기본적으로 `캡슐화`즉 은닉성을 목표로 하며 따라서 많은 변수들을  
특정 메소드에서만 접근할 수 있게 구성하는 것이 좋으며 이런 메소드를 보통 `getter, setter`라고 표현한다.
```typescript
    class Person {
        // 변수가 private, protected일 경우 변수명 앞에 _를 붙이는 습관이 코드 구성에 좋다.
        private _name: string;
        private _changeable: boolean;
        constructor() { 
            this._name = ''
            this._changeable = false
        }

        set changeable(flag: boolean){
            this._changeable = flag
        }

        get name(): string {
            return this._name;
        }

        set name(name: string) {
            //set이 코드 동작에 있어 심각한 문제를 야기할 수 있다면
            //암호화 모듈과 함께 구성하는 것이 좋다
            if(this._changeable)
                this._name = name;
        }
    }
    /* 사용 */
    const person1 = new Person()
    person1.name = '이영현'
    console.log(person1.name)
    person1.changeable = true
    person1.name = '김영현'
    console.log(person1.name)
    // console => ''
    // console => 김영현
```


**클래스 & 인터페이스**  
클래스 구조를 인터페이스 구조에 맞게 작성하게 설정.
```typescript
    /* 기본 구조 */
    class 클래스명 implements 인터페이스명 {
    }
    /* example */
    interface Person {
        name: string
        age : number
        work(): void
    }

    class WorkPerson implements Person {
        name: string
        age: number
        work() {
            console.log('일하자..')
        }
    }
```
**추상 클래스 & 상속**  
`abstract`키워드를 사용하여 상속받는 클래스에서 해당 속성들을 사용하게 함.  
`abstract`가 붙은 class는 new로 생성할 수 없음.  

```typescript
    /* 기본 구조 */
    abstract class 클래스명 {
        abstract 속성이름: 속성타입
        abstract 메서드_이름() {}
    }

    /* example */
    abstract class Animal {
        abstract type: string,
        abstract age: number
        constructor(public gender?: string){}
        abstract sound() {}
    }

    class Cat extends Animal {
        constructor(public type: string, public age: number, gender?: string){
            super(gender);
        }
        sound(){
            console.log('야옹');
        }
    }
```
**static(정적) 속성**  
객체가 생성되지 않아도 호출할 수 있는 속성이다
```typescript
    class A {
        static initValue = 1
    }
    A.initValue // 1
```

**객체의 타입 변환**  
특정 타입의 변숫값을 다른 타입의 값으로 변환할 수 있는 기능
```typescript
    /* 기본 구조 */
    (<타입>객체)
    (객체 as 타입)

    /* example */
    let person: object = {name: 'Jack'};
    person.name; // => error person은 단순 object 형이다.
    // error fix -> 
    /* type. 1  */    
    (<{name: string}>person).name = 'Jack2';
    /* type. 2 */
    (person as {name: string}).name = 'Jack3';
```