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

예시 코드
```javascript
    import { observable, reaction, computed, autorun } from 'mobx';

    // Observable State 만들기
    const calculator = observable({
        a: 1,
        b: 2
    });
    //  computed 로 특정 값 캐싱
        const sum = computed(() => {
            console.log('계산중이예요!');
            return calculator.a + calculator.b;
        });
    /* autorun 사용안할 경우 */
    //  // 특정 값이 바뀔 때 특정 작업 하기!
    //  reaction(() => calculator.a,
    //      (value, reaction) => {
    //          console.log(`a 값이 ${value} 로 바뀌었네요!`);
    //      }
    //  );

    //  reaction(() => calculator.b,
    //      value => {
    //          console.log(`b 값이 ${value} 로 바뀌었네요!`);
    //      }
    //  );

    //  sum.observe(() => calculator.a); // a 값을 주시
    //  sum.observe(() => calculator.b); // b 값을 주시

    /* autorun 사용한 경우 */
    autorun(() => console.log(`a 가 바뀌었어요! ${calculator.a}`));
    autorun(() => console.log(`b 가 바뀌었어요! ${calculator.b}`));
    autorun(() => sum.get()); // get은 최근 버전에서는 사라진 것 같다.

    /* 실행 코드 */
    calculator.a = 10;
    calculator.b = 20;

    //**** 여러번 조회해도 computed 안의 함수를 다시 호출하지 않지만..
    console.log(sum.value);
    console.log(sum.value);


    // 내부의 값이 바뀌면 다시 호출 함
    calculator.a = 20;
    console.log(sum.value);
```
console 값.
```bash
    # 계산중이예요! 
    # a 값이 10 로 바뀌었네요! 
    # 계산중이예요! 
    # b 값이 20 로 바뀌었네요! 
    # 계산중이예요! 
    # 30
    # 30
    # a 값이 20 로 바뀌었네요! 
    # 계산중이예요! 
    # 40
```