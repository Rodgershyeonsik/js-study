// 코드 블록 {...} 안에서 선언한 변수는 블록 안에서만 사용할 수 있음
// if, for, while등 동일
{
    let message = 'hi';
    console.log(message); // hi
}

// console.log(message); // ReferenceError: message is not defined

{
  // 또 다른 메시지 출력
  let message = 'bye';
  console.log(message);
}

// 동일한 이름의 변수를 블록없이 let으로 선언 시 에러 발생
let message = 'hi';
// let message = 'bye bye~'; // Syntax Error: Identifier 'message' has already been declared

// 중첩(nested) 함수
// 함수 내부에서 선언한 함수
function sayHiBye(firstName, lastName) {

  // 헬퍼(helper) 중첩 함수
  function getFullName() {
    return firstName + " " + lastName;
  }

  console.log( "Hello, " + getFullName() );
  console.log( "Bye, " + getFullName() );

}

// 중첩 함수 그 자체로 반환될 수도 있음
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();

console.log( counter() ); // 0
console.log( counter() ); // 1
console.log( counter() ); // 2

// 만약 counter를 여러 개 만들었을 때
// 이 함수들은 서로 독립적일까?
// 함수와 중첩 함수 내 count 변수에 어떤 값이 할당될까?

// 단계 1. 변수
// 렉시컬 환경(Lexical Environmnet)
// 자바스크립트에서 실행 중인 함수, 코드 블록, 스크립트 전체가 가지는
// 내부 숨김 연관 객체(internal hidden associated object)
// 명세서에서 자바스크립트의 동작을 설명하는 데 쓰이는 이론상의 객체로,
// 코드를 사용해 직접 렉시컬 환경을 얻거나 조작하는 것은 불가능

// 렉시컬 환경 객체는 (1)환경 레코드, (2)외부 렉시컬 환경에 대한 참조 두 부분으로 구성됨
// (1) 환경 레코드: 모든 지역 변수를 프로퍼티로 저장하고 있는 객체(this값 같은 기타 정보)
// (2) 외부 렉시컬 환경에 대한 참조: 외부 코드와 연관됨

// '변수'는 특수 내부 객체인 환경 레코드의 프로퍼티
// '변수를 가져오거나 변경'하는 것은 '환경 레코드의 프로퍼티를 가져오거나 변경함'을 의미

// 단계 2. 함수 선언문
// 함수 선언문(function declaration)으로 선언한 함수는 일반 변수와 달리 바로 초기화됨
// 때문에 렉시컬 환경이 만들어지는 즉시 사용 가능
// ** 함수 표현식은 해당 안 됨(예: let say = fuction(name)...)

// 단계 3. 내부와 외부의 렉시컬 환경
// 코드에서 변수에 접근 시, 먼저 내부 렉시컬 환경을 검색 범위로 잡음
// 내부 렉시컬 환경에서 원하는 변수를 찾지 못하면,
// 검색 범위를 내부 렉시컬 환경이 참조하는 외부 렉시컬 환경으로 확장
// 이 과정은 검색 범위가 전역 렉시컬 환경으로 확장될 때까지 반복됨

// 단계 4. 함수를 반환하는 함수
// 위의 makeCounter()의 경우, 호출할 때마다 새로운 렉시컬 환경이 만들어지고
// 여기에 makeCounter 실행에 필요한 변수들이 저장됨

// 모든 함수는 [[Environment]]라 불리는 숨김 프로퍼티를 갖는데,
// 여기에 함수가 만들어진 곳의 렉시컬 환경에 대한 참조가 저장됨
// 따라서, counter().[[Environment]]엔 {count: 0}이 있는 렉시컬 환경에 대한 참조가 저장됨
// [[Environment]]는 함수가 생성될 때 딱 한 번 값이 세팅되고 영원히 변하지 않음

// counter()를 호출하면 각 호출마다 새로운 렉시컬 환경이 생성되고,
// 이 렉시컬 환경은 counter.[[Environment]]에 저장된 렉시컬 환경을 외부 렉시컬 환경으로써 참조
// 익명 중첩 함수엔 지역 변수가 없어서 렉시컬 환경이 비어있고,
// counter()의 렉시컬 환경에 참조하는 외부 렉시컬에서 count를 찾아 count++ 실행
// counter()를 여러 번 호출 하면 count 변수가 2, 3으로 증가하게 됨

// 클로저(closure)
// 외부 변수를 기억하고 이 외부 변수에 접근할 수 있는 함수
// 자바스크립트에선 모든 함수가 자연스럽게 클로저가 되는데,
// 함수마다 자신이 선언된 외부 렉시컬 환경을 기억하는 [[Environment]]를 가지고 있어
// 외부 변수에 접근 가능하기 때문

// 함수 호출이 끝나면 함수에 대응하는 렉시컬 환경이 메모리에서 제거됨(함수 관련 변수 접근 불가)
// 호출이 끝난 후에도 도달 가능한 중첩 함수가 있을 수 있는데,
// 이때는 이 중첩함수의 [[Environment]] 프로퍼티에 외부 함수 렉시컬 환경에 대한 정보가 저장됨
function f() {
  let value = 123;

  return function() {
    console.log(value);
  }
}

// g.[[Environment]]에 f() 호출 시 만들어지는 렉시컬 환경 정보가 저장
// g가 살아있는 동안, 연관 렉시컬 환경(그 안의 변수인 value)도 메모리에 살아있음
let g = f();
g();

g = null; // 도달할 수 없는 상태가 되어 메모리에서 삭제

// 이론상으로는 이렇지만, 자바스크립트 엔진(V8 엔진. node.js, chrome, edge, opera)이
// 최적화를 해서 외부 변수가 사용되지 않는다고 판단하면 메모리에서 제거함
