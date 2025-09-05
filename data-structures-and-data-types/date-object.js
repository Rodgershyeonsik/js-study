// Date 객체
// 날짜, 시간을 저장하고, 날짜 관련 메서드를 제공

let now = new Date(); // Date 객체 생성
console.log(now); // 코드 실행 시점 날짜 및 시간 출력

// new Date(milliseconds)
// UTC 기준 1970년 1월 1일 0시 0분 0초에서 밀리초(1/1000 초) 후의 시점이 저장된 Date 객체 반환
// 타임스탬프(timestamp): 1970년의 첫날을 기준으로 흘러간 밀리초를 나타내는 정수

// 1970년 1월 1일 0시 0분 0초(UTC+0)를 나타내는 객체
let Jan01_1970 = new Date(0);
console.log( Jan01_1970 );

// 1970년 1월 1일의 24시간 후는 1970년 1월 2일(UTC+0)임
let Jan02_1970 = new Date(24 * 3600 * 1000);
console.log( Jan02_1970 );
console.log( Jan02_1970.getTime() ); // 타임스탬프 추출

// 1970년 1월 1일 이전 날짜에 해당하는 타임스탬프 값은 음수
let Dec31_1969 = new Date(-24 * 3600 * 1000);
console.log( Dec31_1969 );

// new Date(datastring)
let date = new Date('2025-09-05');
// 시간 지정 안했을 경우 GMT 자정으로 가정
// 코드가 실행되는 시간대(timezone)에 따라 출력 문자열이 바뀜
console.log(date);

// new Date(year, month, date, hours, minutes, seconds, ms)
// year: 반드시 4자리
// month: 0 ~ 11(1월 ~ 12월)
// date: 값이 없는 경우엔 1로 처리
// hours/minutes/seconds/ms에 값이 없는 경우엔 0으로 처리
// ms: 0 ~ 999
console.log(new Date(2011, 0, 1, 0, 0, 0, 0)); // 2011년 1월 1일 00시 00분 00초
console.log(new Date(2011, 0, 1)); // 위와 동일

// 날짜 구성요소 얻기
console.log( date.getFullYear() ); // 네자릿수 연도 반환, 2025
console.log( date.getMonth() ); // 월 반환(0 ~ 11)
console.log( date.getDate() ); // 일 반환(1 ~ 31)
// getHours(), getMinutes(), getSeconds(), getMilliseconds()는 순서대로 시, 분, 초, 밀리초 반환
// getDay()는 요일 반환(0 일요일 ~ 6 토요일)
// 여기까지 메서드는 모두 현지 시간 기준이며
// get뒤에 UTC를 붙이면 표준시 기준 날짜 구성 요소를 반환. getUTCFullYear() 등
console.log( new Date().getTimezoneOffset() ); // 현지 시간과 표준 시간의 차이 반환

// 날짜 구성요소 설정하기
// setFullYear(year, [month], [date]), setMonth(month, [date]) 등
// setTime 제외 모두 setUTCHours()같이 표준시에 따라 날짜 구성요소 설정 메서드 있음
let today = new Date();

today.setHours(0);
console.log(today); // 시간만 변경

today.setHours(0, 0, 0, 0);
console.log(today); // 날짜는 변경되지 않고 시, 분, 초 모두 변경

// 자동 고침
let date1 = new Date(2013, 0, 32); // 2013년 1월 32일은 없음
console.log(date1); // 2013년 2월 1일 출력

let date2 = new Date(2016, 1, 28);
let date3 = new Date(2017, 1, 28);

// 2월 28일의 이틀 뒤 날짜를 구하고 싶을 때, 윤년을 신경쓰지 않아도 알아서 구해줌
date2.setDate(date2.getDate() + 2);
date3.setDate(date3.getDate() + 2);

console.log(`Two days after February 28, 2016: ${date2}`); // 2016년 3월 1일
console.log(`Two days after February 28, 2017: ${date3}`); // 2017년 3월 2일

date.setSeconds(date.getSeconds() + 70); // 70초 뒤의 날짜 구하기
console.log(date); 

date.setDate(0); // 일의 최소값은 1이므로, 0 입력 시 전 달(9월)의 마지막 날을 설정한 것과 같은 효과
console.log(`Calling date.setDate(0): ${date}`); // 2025년 8월 31일

date.setDate(-5); // 전 달(7월)의 마지막 날(0)에서 5일 전
console.log(`Calling date.setDate(-5): ${date}`); // 2025년 7월 26일

// Date.now()
// 현재 타임스탬프 반환
// Date 객체를 따로 생성하지 않아 new Date().getTime()보다 성능 좋음
console.log(Date.now());

// Date.parse(str)로 문자열에서 날짜 읽어오기
// 꼭 형식을 지켜야 함(YYYY-MM-DDTHH:mm:ss.sssZ)
// 문자열이 형식과 맞지 않은 경우 NaN 반환
// YYYY-MM-DD – 날짜(연-월-일)
// "T" – 구분 기호로 쓰임
// HH:mm:ss.sss – 시:분:초.밀리초
// 'Z'(옵션) – +-hh:mm 형식의 시간대를 나타냄. Z 한 글자인 경우엔 UTC+0을 나타냄

console.log(Date.parse('2012-01-26T13:51:50.417-07:00')); // 문자열과 대응하는 타임스탬프 반환
console.log(new Date(Date.parse('2012-01-26T13:51:50.417-07:00'))); // 타임스탬프 값으로 Date 객체 생성