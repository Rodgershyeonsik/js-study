// class 기본 문법
class User {
    constructor(name) { 
        // setter 활성화
        this.name = name; 
    }

    sayHi() { 
        console.log('hi~'); 
    }

    get name() {
        return this._name;
    }

    set name(value) {
        if (value.length < 4) {
            console.log("이름이 너무 짧습니다.");
            return;
        }

        this._name = value;
    }
}

let user = new User('john'); // new에 의해 constructor 자동 호출
user.sayHi();
console.log(user.name); // john
user = new User("ho"); // 이름이 너무 짧습니다.

console.log(typeof User); // function, class는 함수임
console.log(User === User.prototype.constructor); // true, 정확히는 생성자 메서드와 동일
console.log(User.prototype.sayHi) // sayHi() { console.log('hi~'); }
console.log(Object.getOwnPropertyNames(User.prototype)); // ['constructor', 'sayHi', 'name']

// 일반 함수와 다른 class만의 특징
// 1. class로 만든 함수 내부엔 특수 내부 프로퍼티인 [[IsClassConstructor]]: true가 붙음
//    class 생성자를 new와 함께 호출하지 않으면 에러가 발생하는데, 이때 사용
// 2. class에 정의된 메서드는 열거할 수 없음(non-enumerable)
// 3. 항상 엄격 모드(use strict)로 실행됨

// class 표현식 예시
let User2 = class MyClass {
    sayHi() { console.log('안녕하시렵니까?'); }
    showClass() { console.log(MyClass); } // class 안에서만 쓸 수 있음
};

new User2().showClass();

// 동적 class 생성
function makeClass(phrase) {
    return class {
        sayHi() { console.log(phrase); }
    };
}

let Class1 = makeClass('동적으로 생성된 클래스');
new Class1().sayHi(); // 동적으로 생성된 클래스

// 클래스 필드 예시
// 복잡한 표현식, 함수 호출 결과도 값으로 사용 가능
class User3 {
    country = 'korea'; // <프로퍼티 이름> = 값 형태로 정의

    constructor(name) {
        this.name = name;
    }
    
    // 이렇게 클래스 필드를 사용하면 각 User3 객체마다 독립적인 함수를 만들어주고
    // 이 함수의 this를 해당 객체에 바인딩 해줌
    sayHi = () =>  { console.log(`hi, ${this.name}`); }
}

console.log(User3.prototype.name); // undefined, User3.prototype이 아닌 개별 객체에만 설정됨

let bora = new User3('bora');
let pete = new User3('pete');

bora.sayHi(); // hi, bora
pete.sayHi(); // hi, pete