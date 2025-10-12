// 접근자 프로퍼티(accessor property)
// 값을 획득(get)하고 설정(set)하는 함수
// 외부 코드에서는 함수가 아닌 일반 프로퍼티처럼 보임

let obj = {
    get propName() {
        // getter, obj.propName을 실행할 때 실행되는 코드
    },

    set propName(value) {
        // setter, obj.propName = value를 실행할 때 실행되는 코드
    }
}

// obj에는 propName이라는 가상의 프로퍼티가 생김
// 읽고 쓸 수는 있지만 실제로는 존재하지 않음

let user = {
    name: 'John',
    surname: 'Kim',

    get fullName() {
        return `${this.name} ${this.surname}`;
    }
};

console.log(user.fullName); // John Kim
// user.fullName = 'test'; // getter만 있어서 에러 발생

// 접근자 프로퍼티 설명자
// ** 프로퍼티 설명자(Property Desicriptor): 프로퍼티가 어떻게 동작하는지 정의하는 메타정보

// get: 인수가 없는 함수. 프로퍼티를 읽을 때 동작
// set: 인수가 하나인 함수. 프로퍼티에 값을 쓸 때 호출
// enumerable: for..in, object.keys()로 나열될 수 있는지 여부
// configurable: 프로퍼티 삭제, 수정이 가능한지 여부

let user2 = {
  name: "John",
  surname: "Smith"
};

Object.defineProperty(user2, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }

  // value: 2 이렇게 value와 get을 동시에 설정하면 에러 발생
});

console.log(user2.fullName); // John Smith

for(let key in user2) console.log(key); // name, surname

// getter와 setter 활용법(1)
// 실제 프로퍼티 값을 감싸는 wrapper로 활용해 프로퍼티 값 통제하기
let user3 = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) { // 값 수정 시 데이터를 바로 넣지 않고 검증
      console.log("입력하신 값이 너무 짧습니다. 네 글자 이상으로 구성된 이름을 입력하세요.");
      return;
    }
    this._name = value;
  }
};

user3.name = "Pete";
console.log(user.name); // Pete

user.name = ""; // 너무 짧은 이름을 할당하려 함

// 실제 user의 이름은 _user에 저장되고, getter, setter를 통해서만 프로퍼티 접근
// getter, setter를 활용하면 값을 가져오거나 바꿀 때 추가 로직(제어, 검증, 처리)를 끼워넣을 수 있음
// 밑줄 "_"로 시작하는 프로퍼티는 객체 내부에서만 활용하고, 외부에선 건드리지 않는 것이 관습
// ES2022부터 private 키워드(#)로 선언 가능

// getter와 setter 활용법(2)
// 호환성을 위해 사용하기

// 예: 데이터 프로퍼티 name, age를 사용하는 User에 age 대신 birthday를 저장하도록 생성자를 수정해야하는 상황
class UserObj {
    constructor(name, birthday) {
        this.name = name;
        this.birthday = birthday;

        // age는 현재 날짜와 생일을 기준으로 계산됩니다.
        Object.defineProperty(this, "age", {
            get() {
                let todayYear = new Date().getFullYear();
                return todayYear - this.birthday.getFullYear();
            }
        });
    }
}

let john = new UserObj("John", new Date(1992, 6, 1));

console.log( john.birthday );
console.log( john.age ); // age를 사용하는 기존 코드도 수정 없이 사용 가능