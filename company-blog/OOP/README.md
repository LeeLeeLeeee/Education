# OOP(객체지향 프로그래밍)

Created: 2021년 12월 21일 오후 5:57
Last Edited Time: 2022년 2월 11일 오후 5:35
Stakeholders: 익명
Type: 개발 개념

### 🖱 절차, 객체?

코드를 작성하다 보면 우리는 필연적으로 구현 문제에 부딪히게 된다. 우리는 해당 문제를 해결함에 있어 절차 식으로 해결할 수도 있고 객체 식으로 해결할 수 있을 것이다. 위 두 가지 방법은 각각의 장단점이 있는데 절차 식 해결 방식은 메모리를 덜 먹는다는 장점이 있고 객체 식 해결 방식은 각각의 기능들을 객체화 하기 때문에 추후 유지 관리도 편하고 확장에도 용이하다는 장점이있다. 기계가 발달함에 따라 과거와는 다르게 우리는 현재 많은 메모리를 가질 수 있기 때문에 더 유지보수가 편하고 확장에 용이한 객체지향 프로그래밍이 더 사랑을 받고 있다고 생각한다. (나의 짧은 생각)

### 🎮 객체지향 특징

객체지향으로 코딩을 할 때 꼭 알아야 할 4가지 특징이있다.

1. **캡슐화**
    
    **캡슐화**를 객체의 정보를 은닉하는 개념이다. 왜 정보 은닉을 해야하는가 의문이 들 수도 있어 예를 들어 정보 은닉의 필요성을 설명하겠다. 예를 들어 **오락기**라는 객체를 생성했다고 한다.  오락기 내부적으로 많은 정보(파워 모드, 에너지 퍼센트, 화면 밝기 등)가 들어있을 것이다. 하지만 우리는 이 정보들을 알 필요가 없다. 오락기가 공개하고 싶은 기능(메소드 : 전원 켜기, 게임 시작하기, 게임 중단하기 등)만 실행 할 수 있으면 우리는 충분히 오락기를 제어할 수 있다. 이것이 캡슐화가 원하는 방향이라고 생각한다.
    
2. **추상화**
    
    **추상화**는 구체화되어 복잡한 객체를 핵심적인 개념 혹은 기능으로 표현하는 개념이다. 이미 우리는 일상에서 추상화를 많이 사용하고 있다. 예를들어 **슈팅 게임 오락기, 리듬 게임 오락기, 100원, 500원** 이렇게 객체가 있을 때 비슷한 특징을 가진 그룹으로 묶으라고 한다면 우리는 어렵지 않게 해당 요구를 수행할 수 있을 것이다. (**오락기**: 슈팅 게임 오락기, 리듬 게임 오락기 | **동전**: 100원, 500원)
    
3. **다형성**
    
    **다형성**이란 하나의 객체가 여러가지 타입을 가질 수 있는 특징을 의미한다. 위 추상화 예시에서 덧붙여 **오락기**라는 추상화된 객체는 **play**라는 메소드를 가지고 있다고 하자. **play**란 메소드를 실행할 때 우리는 오락기에서 게임이 실행되는 것을 예상할 것이다. 다만 게임이 실행된다고 했을 때 두 오락기에서 같은 게임이 실행된다면 우리는 많은 혼란이 있을 것이다. 따라서 추상화된 객체 오락기의 **play**메소드는 구체화된 객체 **슈팅 게임 오락기**에서 **슈팅 게임**이, **리듬 게임 오락기**에서 **리듬 게임**이 실행되게 구현할 수 있는 것이 객체의 다형성이다.
    
4. **상속성**
    
    상속성이란 기존의 객체에 기능을 추가하거나 재정의하여 새로운 객체를 정의하는 것이다. 상속이라는 특징은 객체 지향 프로그래밍에서 아주 중요한 개념인데 상속을 함으로써 객체간 계층 구조를 형성시키고 계층이 생기면서 추상화와 다형성 특징의 토대가 마련될 수 있기 때문이다.
    객체간 상속이 이루어지면 상속해주는 객체를 **부모 클래스**, 상속 받는 객체를 **자식 클래스**라고 
    ****표현한다. 자식 클래스는 부모 클래스의 기능을 그대로 재사용할 수 있다. 기능에 변경이 필요할 경우 부모 클래스 기능을 무시하고 재선언할 수 있으며 이를 **메소드 오버라이딩**이라고 표현한다.
    

### 🎢 from 절차지향 프로그래밍 to 객체지향 프로그래밍

현재 우리는 객체 지향 프로그래밍 환경에서 작업을 많이 해왔기 때문에 객체 지향의 편리함을 모를 수 있다. 오락실을 프로그래밍을 절차지향(야매)에서 객체지향(야매2)로 변경하면서 어떤 점이 편리한 지 설명하겠다. (문법 적 접근이 아닌 개념 적으로 설명하기 위한 예시이다)

### 1. 오락실 기능 명세 - v1

- 이용자는 돈을 사용하여 오락기를 실행할 수 있으며 오락기를 실행할 때 마다 돈이 감소한다.
- 이용자는 돈이 떨어질 때 까지 오락기를 사용해야 한다.
- 오락기는 켜진 후 실행될 수 있으며 이용자가 돈이 없다면 오락기는 자동 종료된다.

### 반복문 없는 절차 지향

```c

int 영수_용돈 = 300;

if(오락기.상태())
{
	if(오락기.용돈_검사(영수_용돈)) 
	{
		영수_용돈 = 오락기.실행(영수_용돈);
	}
	else 
	{
		오락기.off()
		printf('영수야 돈가져와..');
	}
} 
else 
{
	오락기.on();
}

if(오락기.용돈_검사(영수_용돈)) 
{
		영수_용돈 = 오락기.실행(영수_용돈);
} 
else 
{
		오락기.off()
		printf('영수야 돈가져와..');
}

int 철수_용돈 = 400

if(오락기.용돈_검사(철수_용돈)) 
{
		철수_용돈 = 오락기.실행(철수_용돈);
} 
else 
{		
		오락기.off()
		printf('철수야 돈가져와..');
}
// 여기까지...
```

### 반복문을 적용한 절차 지향

```c

int 용돈_배열[2] = { 300, 400 }; // 0 = 영수, 1 = 철수

for(int i = 0; i < 2; i++) 
{
	while(오락기.용돈_검사(용돈_배열[i])) 
	{
		if(오락기.상태()) {
			용돈_배열[i] = 오락기.실행(용돈_배열[i]);		
		} else {
			오락기.on();
		}
	}
	오락기.off()
	printf('돈가져와..');
}
```

### 2. 오락실 기능 명세 - v2

간단한 기능은 충분히 절차 지향적으로 작성해도 복잡하지 않은 것 같다. 오락실 기능 명세에 몇 가지 내용을 조금 더 추가해보자.

- 오락기는 3개의 오락기로 구성된다.
    - 슈팅 게임
    - 리듬 게임
    - 격투 게임
- 이용자는 자신이 원하는 오락기에서 게임을 시작한다.

### 반복문을 적용한 절차 지향

```c

int 용돈_배열[2] = { 300, 400 }; // 0 = 영수, 1 = 철수
int 게임_타입_배열[2] = { "슈팅 게임", "격투 게임" }

for(int i = 0; i < 2; i++) 
{
	switch(게임_타입_배열[i]) {
		case "슈팅 게임":
			while(슈팅_게임_오락기.용돈_검사(용돈_배열[i])) 
			{
				if(슈팅_게임_오락기.상태()) {
					용돈_배열[i] = 슈팅_게임_오락기.실행(용돈_배열[i]);		
				} else {
					슈팅_게임_오락기.on();
				}
			}
			슈팅_게임_오락기.off()
			printf('돈가져와..');
			break;
		case "리듬 게임":
			while(리듬_게임_오락기.용돈_검사(용돈_배열[i])) 
			{
				if(리듬_게임_오락기.상태()) {
					용돈_배열[i] = 리듬_게임_오락기.실행(용돈_배열[i]);		
				} else {
					리듬_게임_오락기.on();
				}
			}
			리듬_게임_오락기.off()
			printf('돈가져와..');
			break;
		case "격투 게임":
		while(격투_게임_오락기.용돈_검사(용돈_배열[i])) 
			{
				if(격투_게임_오락기.상태()) {
					용돈_배열[i] = 격투_게임_오락기.실행(용돈_배열[i]);		
				} else {
					격투_게임_오락기.on();
				}
			}
			격투_게임_오락기.off()
			printf('돈가져와..');
			break;
	}
}
```

위 코드는 절차 지향적으로도 옳은 예시가 아니다. 다만 절차 지향이라는 패턴이 요구 사항 변경 및 확장에 있어 복잡도가 증가한다는 것만 느끼면 된다.

### 객체 지향

객체 지향으로 해당 코드를 작성하기 전에 우리는 해당 코드에서 행위의 주체를 선정하고 해당 주체를 추상화하여 객체 지향에 적합한 객체로 만들어야 한다. 위 코드에서 행위의 주체는 사람과 오락기이다. 우선 **사람**을 객체화 시켜보자.

```java
public class Person {
	private int money;
	private String want_mode;
	private String name;

	public Person(String name, int money, String want_mode) {
		this.money = money;
		this.name = name;
		this.want_mode = want_mode;
	}

	public void setMoney(int input_money) {
		if(input_money < 0) {
			throw new ExcessException();
		}
		this.money = input_money;
	}

	public int getMoney() {
		return this.money;
	}

	public String getName() {
		return this.name;
	}

	public String getMode() {
		return this.want_mode;
	}
}
```

사람이라는 객체는 `Class`로 선언이된다. 이는 `Java`문법의 특징이며 `Class`가 아닌 `Prototype`을 사용하는 언어도 있다. 사람 객체 안에는 돈, 이름, 원하는 게임이 정보로 선언되어 있으며 private 처리하여 외부에서는 해당 변수에 접근할 수 없게 만든다. 우리는 이것을 용어로 **멤버 변수**, **객체 속성**이라고 부른다. 객체에 정보를 선언한 후 객체의 행동을 선언 한다. 사람 객체에서 외부로 공개된 행동은 돈 받아오기, 돈 설정하기, 이름 받아오기, 모드 받아오기이다. 사람 객체는 이 행동을 외부로 공개하고 이 행동들로만 상호 작용하여 자신이 맡은 역할을 100% 수행해야 한다. `constructor` 는 생성자로서 객체가 생성되는 시점에 필요한 정보를 수집한다. 사람 객체의 경우 돈, 이름, 원하는 게임의 정보를 생성 시점에 할당 받게 된다. 이번엔 **오락기**를 객체화 해보자. 

```java
public class GameMachine {
	private int cost;
	private boolean status;
	private String type;

	public GameMachine(int cost, String type) {
		this.status = false;
		this.cost = cost;
		this.type = type;
	}
	
	public void on() {
		this.status = true;
	}

	public void off() {
		this.status = false;
	}

	public int run_game(int money) {
		if(money < cost) {
			throw new ExcessException();
		} else {
			return money - cost;
		}
	}

	public String show_screen() {
		System.out.println("게임 진행 중...")	
	}
	
	public void getStatus() {
		return this.status;
	}
}
```

`GameMachine` 이라는 오락기 객체를 선언하였다. 오락기 객체는 `cost`, `status`, `type`을 멤버 변수로 가지고 있으며 `on`, `off`, `calculate_cost`, `showScreen`, `getStatus`메소드를 지원한다. 위 객체를 이용하여 자식 클래스를 생성해보자.

```java
public class FightGameMachine extends GameMachine { // 격투 게임
	public FightGameMachine (int cost) {
			super(cost, '격투 게임');
	}
	public String show_screen() {
		System.out.println("격투 게임 진행 중...")	
	}
}

public class RythmeGameMachine extends GameMachine { // 리듬 게임
	public RythmeGameMachine (int cost) {
			super(cost, '리듬 게임');
	}
	public String show_screen() {
		System.out.println("리듬 게임 진행 중...")	
	}
}

public class ShootingGameMachine extends GameMachine { // 슈팅 게임
	public ShootingGameMachine (int cost) {
			super(cost, '슈팅 게임');
	}
	public String show_screen() {
		System.out.println("슈팅 게임 진행 중...")	
	}
}
```

자식클래스는 부모클래스를 상속 받음으로써 부모클래스의 정보와 메소드를 사용할 수 있다. 또한 객체의 다형성을 이용하여 부모클래스 메소드를 자신의 특성에 맞게 변경할 수 있다. 이제 생성된 객체를 바탕으로 요구사항대로 코드를 구현해보자.

```java
List<Person> child_list = new ArrayList<Person>
child_list.add(new Person(1000, "철수", "격투 게임"));
child_list.add(new Person(1500, "민수", "리듬 게임"));
child_list.add(new Person(2000, "영희", "슈팅 게임"));

for (int i = 0; i < child_list.size(); i++) {
		GameMachine game_machine;
		Person child = child_list[i];
		switch(child.getMode()) {
			case '슈팅 게임':
				game_machine = new ShootingGameMachine(200)
				break;
			case '리듬 게임':
				game_machine = new RythmeGameMachine(1000)
				break;
			case '격투 게임':
				game_machine = new FightGameMachine(500)
				break;
		}

		if(!game_machine.getStatus()) {
			game_machine.on();
		}

		try {
			while(true) {

				int change = game_machine.run_game(child.getMoney());
				child.setMoney(change);
				game_machine.show_screen();
			}
		} catch(Exception except) {
			if(except instanceof ExcessException) {
				System.out.println("돈이 부족합니다.");
			} else {
				System.out.println("에러 발생!");
			}
		} finally {
				game_machine.off();
		}
}
```