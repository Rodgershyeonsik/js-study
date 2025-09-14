// 상당수의 자바스크립트 내장 함수는 인수 개수에 제약을 두지 않음
// 임의의 정해지지 않은 수의 인수를 받는 방법과
// 함수의 매개변수에 배열을 전달하는 방법에 대해 알아보자

// 나머지 매개 변수 ...
function sum(a, b) {
  return a + b;
}

// 에러가 발생하지 않음. 단, 반환 값은 처음 두 개의 인수만 사용
console.log( sum(1, 2, 3, 4, 5) ); // 3

function sumAll(...args) { // ...는 "남은 매개변수들을 한데 모아 배열에 집어넣어라"를 의미
    let sum = 0;

    for(let arg of args) sum += arg;

    return sum
}

console.log( sumAll(1)); // 1
console.log( sumAll(1, 2)); // 3
console.log( sumAll(1, 2, 3)); // 6

function showName(firstName, lastName, ...titles) { // 나머지 매개변수는 항상 마지막에 있어야 함!
  console.log( firstName + ' ' + lastName ); // Bora Lee

  // 나머지 인수들은 배열 titles의 요소가 됩니다.
  // titles = ["Software Engineer", "Researcher"]
  console.log( titles[0] ); // Software Engineer
  console.log( titles[1] ); // Researcher
  console.log( titles.length ); // 2
}

showName("Bora", "Lee", "Software Engineer", "Researcher");

// arguments 객체
// 유사 배열 객체(array-like object)로, 인덱스를 사용해 인수 접근 가능
// 나머지 매개변수가 나오기 전 함수 인수 전체를 얻어내는 방법
// 단 배열이 아니기 때문에 배열 메서드 사용 불가

function showName() {
  console.log( arguments.length );
  console.log( arguments[0] );
  console.log( arguments[1] );

  // arguments는 이터러블 객체이기 때문에
  // for(let arg of arguments) alert(arg); 를 사용해 인수를 펼칠 수 있습니다.
}

// 2, Bora, Lee가 출력됨
showName("Bora", "Lee");

// 1, Bora, undefined가 출력됨(두 번째 인수는 없음)
showName("Bora");

// 화살표 함수는 arguments 객체를 지원하지 않음
function f() {
  let showArg = () => console.log(arguments[0]);
  showArg();
}

f(1); // 1, 화살표 함수의 arguments가 아닌 외부 일반함수 f의 argument인 1

// 스프레드 문법
// 이터러블 객체에서 사용 가능
let arr = [1, 3, 5];

// 전개 구문(spread syntax)이 배열을 인수 목록으로 바꿔줌
console.log( Math.max(...arr) ); // 5

let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

// 이터러블 객체 여러개 전달하기
console.log( Math.max(...arr1, ...arr2) ); // 8

// 평범한 값과 혼합해 사용하기
console.log( Math.max(1, ...arr1, 4, ...arr2, 55) ); // 55

// 배열 합치기
let merged = [0, ...arr, 2, ...arr2];

console.log(merged); // 위 순서대로 합쳐짐

let hello = 'Hello';

// 문자열(이터러블 객체)도 사용 가능
console.log([...hello]); // ['H', 'e', 'l', 'l', 'o']
console.log( Array.from(hello) ) // 이터러블 객체 -> 배열 변환, [...hello]와 동일한 작업

// Array.from은 이터러블 객체 뿐 아니라 유사 배열 객체 둘 다 사용 가능(스프레드는 이터러블만)
// 일반적으로 무언가를 배열로 바꿀 땐 Array.from 사용

// 배열 복사본 만들기
let arr4 = [1, 2, 3];
let arr4Copy = [...arr4]; // 배열을 펼쳐 각 요소 분리 후, 매개변수 목록으로 만든 다음
                          // 매개변수 목록을 새로운 배열에 할당

// 참조가 다르므로 기존 배열 수정해도 복사본은 영향x
arr4.push(4);
console.log(arr4);
console.log(arr4Copy);

// 객체 복사본 만들기
// Object.assign()보다 코드가 짧아서 많이 선호되는 방식
let obj = { a: 1, b: 2, c: 3 };
let objCopy = { ...obj }; // 객체를 펼쳐서 각 요소를 분리후, 매개변수 목록으로 만든 다음에
                          // 매개변수 목록을 새로운 객체에 할당함

// 참조가 다르므로 기존 객체를 수정해도 복사본은 영향x
obj.d = 4;
console.log(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
console.log(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}