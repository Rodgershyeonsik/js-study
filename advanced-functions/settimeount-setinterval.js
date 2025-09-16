// 호출 스케줄링(scheduling a call)의 두 가지 방법
// ** 호출 스케줄링: 일정 시간이 지난 후 원하는 함수를 예약 실행(호출)할 수 있게 하는 것
// ** 스케줄링에 관한 자바스크립트 명세는 따로 없고, 호스트 환경마다 조금씩 다르다는 점 유의!!

// setTimeount(func|code, [delay], [arg1], [arg2], ...)
// 일정 시간이 지난 후 함수를 실행하는 방법

// func|code
// 실행하고자 하는 코드로 함수 또는 문자열 형태로 대개 함수가 들어감
// delay
// 실행 전 대기시간. 단위는 밀리초(millisecond)이며 기본값은 0
// arg1, arg2 ...
// 함수에 전달할 인수들

// setTimeout 예제
function sayHi() {
    console.log('Hi');
}

setTimeout(sayHi, 1000); // 1초 후 sayHi() 호출
// 주의!!
// 괄호를 붙여 함수를 넘기면 함수의 참조 값이 아닌 함수 실행 결과가 전달되어 의도대로 동작하지 않음
// setTimeout(sayHi(), 1000);

function sayHi2(who, phrase) {
    console.log(`${who}님 ${phrase}`);
}

setTimeout(sayHi2, 2000, '홍길동', '안녕하세요.');

// clearTimeout으로 스케줄링 취소하기
// 브라우저 환경에선 setTimeout 반환값이 타이머 식별자
// node.js 환경에선 뱐환값이 타이머 객체
let timerObj = setTimeout(()=> console.log('아무 일도 없음'), 1000);
console.log(timerObj);

clearTimeout(timerObj); // 브라우저 환경에서는 타이머 식별자가 들어가는데 동일하게 동작함
console.log(timerObj); // 취소 후에도 반환값은 null이 되지 않음

// setInterval(func|code, [delay], [arg1], [arg2], ...)
// 인수는 setTimeout과 동일
// setTimeout과 달리 함수를 주기적으로 실행하게 만듦
let timerObj2 = setInterval(()=> console.log('똑딱'), 2000); // 2초 간격으로 로그
setTimeout(() => { clearInterval(timerObj2); console.log('정지'); }, 5000); // 5초 후 정지
