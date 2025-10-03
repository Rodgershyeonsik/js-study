class Animal {
    constructor(name) {
        this.speed = 0;
        this.name = name;
    }

    run(speed) {
        this.speed = speed;
        console.log(`${this.name}은 속도 ${this.speed}로 달린다`)
    }

    stop() {
        this.speed = 0;
        console.log(`${this.name}이 멈췄다`)
    }
}

let animal = new Animal('동물');

// extends 예시
// 확장 class Rabbit은 동물이 하는 일반적인 동작 수행 가능
class Rabbit extends Animal {
    hide() {
        console.log(`${this.name}이 숨었다!`);
    }
}

let rabbit = new Rabbit('뽀숑');

rabbit.run('10');
rabbit.hide();

// method overriding
// Cat에서 자체적으로 stop()메서드를 정의하면,
// Animal에서 상속받은 메서드가 아닌 자체 메서드 사용
class Cat extends Animal {
    stop() {
        console.log(`냥냥이 ${this.name}, 멈추지 않는다!`);
    }

    hide() {
        super.stop(); // Animal의 stop() 호출
        console.log(`${this.name}이는 무서워서 숨었다.`); 
    }
}

let cat = new Cat('삼색');

cat.stop();
cat.hide();

// constructor overriding
// 자식 class에 생성자가 없으면 자동으로 비어있는 생성자가 만들어지고
// super로 부모 class의 생성자 호출, 빈 객체가 만들어지고 this에 할당
// 그러나 자식 class에 커스텀 생성자를 추가하게 되면 따로 super 호출을 해줘야함.
class Dog extends Animal {
    
    constructor(name, tailLength) {
        super(name); // 부모(Animal)의 생성자를 먼저 실행해줘야 this가 될 객체가 만들어짐
        this.tailLength = tailLength;
    }
}

let dog = new Dog('흰둥', 5);

console.log(dog.name);
console.log(dog.tailLength);