// 자바스크립트에서 에러 발생 시, 스크립트는 죽고(즉시 중단), 콘솔에 에러 출력
// 그러나 try...catch를 사용하면 스크립트가 죽는 걸 방지하고
// 에러를 잡아서 무언가를 할 수 있음
// try..catch는 런타임 에러에만 동작함

// 대부분의 자바스크립트 호스트 환경에는 전역 에러 핸들러를 지원해서
// try...catch 없이 떨어져나온 에러를 잡을 수는 있음
// 예: 브라우저 환경의 window.onerror

// try...catch...finally 문법
try {
    // try 블록 코드 실행
    // 에러가 없다면 끝까지 실행되고 catch 블록은 건너뜀
    // 에러가 있다면 실행이 중단되고 catch(err) 블록으로 넘어감
} catch (err) {
    // 변수 err(이름 아무거나 사용 가능)는 에러 객체를 포함
    // 여기에 에러에 대한 설명이 담겨있음
    // 에러 정보가 필요 없으면 (err) 없이도 쓸 수 있음

    // 새로운 네트워크 요청 보내기, 사용자에게 대안 제안하기, 로깅 등등...원하는 작업을 하면 됨
} finally {
    // 항상 실행할 코드가 있으면 사용
    // 경우에 따라 try...finally 구문도 사용 가능

    // 에러 없음: try 블록 실행 끝난 후 실행. try 블록에 return이 있으면 return 반환 전 finally 블록 실행
    // 에러 있음: catch 블록 실행 후 실행
}

try {
    console.log("try 시작");
    console.log("try 끝");
} catch (err) {
    console.log("영원히 실행 안 됨");
}

try {
    console.log("try2 시작");
    랄라랄라라라
    console.log("영원히 실행 안 됨");
} catch (err) {
    console.log("에러를 잡았다");

    console.log(err.name); // 에러 이름
    console.log(err.message); // 에러 상세 내용을 담은 메시지
    console.log(err.stack); // 현재 호출 스택. 표준은 아닌데 대부분 호스트 환경에서 지원됨

    console.log('에러 전체보기');
    console.log(err);
}

// try..catch는 동기적으로 동작해서
// 스케줄 된 코드에서 발생한 예외는 잡을 수 없음
// try {
//     setTimeout(() => { noSuchVariable; }, 1000); // 여기서 죽음
// } catch (error) {
//     console.log('작동 멈춤'); // 실행 안 됨
// }

// 이렇게 함수 내부에 구현하면 잡을 수 있음
setTimeout(() => {
    try {
        noSuchVariable;
    } catch (error) {
        console.log('이건 잡히지롱');
    }
}, 1000);

// throw 연산자로 에러를 던져보기
let error = new Error('먼가 잘못됨');
let error1 = new SyntaxError('문법이 잘못됨');

console.log(error.name); // Error(생성자와 동일한 값)
console.log(error.message); // 먼가 잘못됨

console.log(error1.name); // SyntaxError
console.log(error1.message); // 문법이 잘못됨

let json = '{ "age": 30 }'; // 불완전한 데이터

try {

  let user = JSON.parse(json); // <-- 에러 없음

//   blabla; // 또 다른 에러 다시 던지기 테스트용

  if (!user.name) {
    throw new SyntaxError("불완전한 데이터: 이름 없음"); // 에러 던지기
  }

  console.log( user.name );

} catch(e) {
    
    if (e instanceof SyntaxError) { // SyntaxError는 여기서 처리
    console.log( "JSON Error: " + e.message );
  } else {
    throw e; // 모르는 에러 다시 던지기. 바깥의 try..catch문이 있으면 잡히고 없으면 쥬금
  }

}

