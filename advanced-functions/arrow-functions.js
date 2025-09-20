// 화살표 함수의 몇 가지 독특하고 유용한 기능을 살펴보자

// 화살표 함수에는 'this'가 없다
// 화살표 함수 본문에서 this에 접근하면, 외부에서 값을 가져옴
// 이런 특징 때문에 객체의 메서드 안에서 동일 객체의 프로퍼티를 대상으로 순회할 때 사용 가능
let group = {
    title: "team1",
    students: ['bora', 'hojin', 'jimin'],

    showList() {
        this.students.forEach(
            // 익명함수는 this가 없어 외부의 this.title을 가져옴
            student => console.log(this.title + ': ' + student)
        );
    }

    // 일반 함수로 구현되었다면 함수의 this가 undefined라서 에러 발생
    // this.students.forEach(
    //         // TypeError: Cannot read property 'title' of undefined
    //         function(student) { console.log(this.title + ': ' + student); }
    //     );
}

group.showList();

// 화살표 함수 vs. bind
// .bind(this)는 함수의 '한정된 버전(bound version)'을 만듦
// class Menu {
//   constructor() {
//     this.items = ['Home', 'About'];
//   }

//   handleClick(event) {
//     console.log(this.items); // bind를 사용하지 않으면 'undefined'가 됨
//     console.log(event.target.textContent);
//   }

//   attachEvents() {
//     const button = document.querySelector('#menu-button');
//     // bind를 사용해서 handleClick의 this를 Menu 인스턴스로 고정
//     button.addEventListener('click', this.handleClick.bind(this));
//   }
// }

// 화살표 함수는 this가 없을 뿐, 어떤 것도 바인딩시키지 않음
// 화살표 함수에서 this를 사용하면 this의 값을 외부 렉시컬 환경에서 찾음

// 화살표 함수엔 'arguments'가 없다
// ** arguemnts 객체
// 일반 함수에서만 사용할 수 있는 유사 배열 객체
// 함수에 전달된 모든 인수에 접근할 수 있게 해줌
function showArgs() {
  console.log(arguments);
}

showArgs(1, 'hello', true); // { '0': 1, '1': 'hello', '2': true }

// 이런 특징은 현재 this 값과 arguments 정보를 함께 실어
// 호출을 포워딩해 주는 데코레이터를 만들 때 유용하게 사용됨
// ** 데코레이터: 원본 함수를 건드리지 않고, 추가적인 기능을 덧붙이는 함수
// ** 포워딩: 원본 함수에 전달될 모든 정보(인자와 this 컨텍스트)를 데코레이터에 그대로 전달하는 것

function defer(f, ms) { // f라는 함수를 ms 시간 후에 실행되도록 지연시키는 데코레이터
  return function() {
    setTimeout(() => f.apply(this, arguments), ms) // f.apply(this, argumnets)는 sayHi(철수)와 동일하게 실행
  };
}

function sayHi(who) {
  alert('안녕, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("철수"); // 2초 후 "안녕, 철수"가 출력됩니다.

// 화살표 함수를 사용하지 않고 동일한 기능을 하는 데코레이터 함수를 만들면
// etTimeout에 넘겨주는 콜백 함수에서 사용할 변수 ctx와 args를 반드시 만들어줘야 함
function defer2(f, ms) {
  return function(...args) {
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  };
}