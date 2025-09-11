// JSON.stringify(value, [replacer, space]) - 객체를 JSON으로 바꿔줌
let student = {
    name: 'John',
    age: 23,
    isAdmin: false,
    courses: ['html', 'css', 'js'],
    wife: null
};

let json = JSON.stringify(student);

console.log(typeof json); // string
console.log(json);
/* JSON으로 인코딩(JSON-encoded)된 객체
또는 직렬화 처리된(serialized), 문자열로 변환된(stringified), 결집된(marshalled) 객체 
{
  "name":"John", 문자열은 큰따옴표롤 감싸야 함. 작은따옴표, 백틱 사용 불가
  "age":23, 객체 프로퍼티 이름은 큰따옴표로 감싸야 함
  "isAdmin":false,
  "courses":["html","css","js"],
  "wife":null
}
 */

// 객체 외의 다른 자료형에 적용
console.log( JSON.stringify(1) ); // 1
console.log( JSON.stringify('test') ); // "test". 큰따옴표 추가
console.log( JSON.stringify(true) ); // true
console.log( JSON.stringify([1,2,3]) ); // [1,2,3]

// JSON은 특정 언어에 종속되지 않는 포맷임
// 따라서 자바스크립트 특유의 객체 프로퍼티는 JSON.stringify가 처리할 수 없음
let user = {
    sayHi() { // 함수 프로퍼티 무시
        console.log('hello');
    },
    [Symbol("id")]: 123, // 심볼형 프로퍼티 무시
    something: undefined // 값이 undefined인 프로퍼티 무시
};

console.log( JSON.stringify(user) ); // 빈 객체 {} 출력

// 중첩 객체를 알아서 문자열로 바꿔줌
let meetup = {
    title: "Conference",
    participants: [{name: 'john'}, {name: 'ann'}],
    room: {
        number: 23,
    }
};

console.log( JSON.stringify(meetup) ); // 객체 전체가 문자열로 변환

// 주의: 순환 참조가 있으면 원하는 대로 객체를 문자열로 바꾸는 게 불가능
// *순환 참조: 객체가 자기 자신을 직접 혹은 간접으로 참조하는 상황
let room2 = {
    number: 24
};

meetup.place = room2; // meetup은 room을 참조
room2.occupiedBy = meetup; // room은 meetup을 참조

// JSON.stringify(meetup); Error: Converting circular structure to JSON

// repalcer로 원하는 프로퍼티만 직렬화하기 - 순환 참조를 다뤄야하는 경우
console.log( JSON.stringify(meetup, ['title', 'participants', 'place', 'name', 'number']) );
/*
{
    "title":"Conference",
    "participants":[{"name":"john"},{"name":"ann"}],
    "place":{"number":24}
}
*/

// replacer에 배열 대신 함수 전달
console.log( JSON.stringify(meetup, function replacer(key, value) {
    console.log(`${key}: ${value}`);
    return (key === 'occupiedBy') ? undefined : value; // 인코딩 제외할 프로퍼티는 반환 값을 undefined로 만들기
}) );

/* replacer 함수에서 처리하는 키:값 쌍
: [object Object] -> 최상위 객체 meetup. 프로퍼티 아니라 key가 빈문자열로 들어옴
title: Conference
participants: [object Object],[object Object]
0: [object Object] -> 배열요소도 객체 프로퍼티처럼 키를 가짐
name: john
1: [object Object]
name: ann
room: [object Object]
number: 23
place: [object Object]
number: 24
*/

// space: 가독성을 높이기 위해 중간에 삽입할 공백 문자 수. 로깅 목적 없으면 굳이 안 씀
let user2 = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
};

console.log(JSON.stringify(user2, null, 2));
/* 공백 문자 두 개를 사용하여 들여쓰기함:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* JSON.stringify(user, null, 4)라면 아래와 같이 좀 더 들여써집니다.
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/

// 객체에 toJSON 메서드가 구현돼있으면 JSON.stringify는 이를 자동 호출해줌
meetup.date = new Date(2025, 9, 10);
delete meetup.place;

console.log( JSON.stringify(meetup) ); // date값이 자동으로 문자열로 변환됨

// room 객체에 커스텀 toJSON 추가
meetup.room.toJSON = function() {
    return this.number;
};

console.log( JSON.stringify(meetup) ); // {..., "room": 23, ...} 이렇게 호출됨

// JSON.parse(str, [reviver]) - JSON으로 인코딩된 객체를 다시 객체로 디코딩할 수 있음
// str: JSON 형식의 문자열
// reviver: 모든 (key, value) 쌍을 대상으로 호출되는 function(key, value) 형태의 함수

// 배열 형태의 문자열 예제
let numbers = "[0, 1, 2, 3]";
numbers = JSON.parse(numbers);

console.log( numbers[1] ); // 1

// 객체 예제
let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

let userObj = JSON.parse(userData);

console.log( userObj.name ); // John
console.log( userObj.friends[1] ); // 1

// 직접 JSON 만들 때 많이 하는 실수
// 주석도 지원하지 않아, 주석을 추가하면 유효하지 않은 형식이 됨
let jsonEX = `{
  name: "John",                     // 실수 1: 프로퍼티 이름을 큰따옴표로 감싸지 않았습니다.
  "surname": 'Smith',               // 실수 2: 프로퍼티 값은 큰따옴표로 감싸야 하는데, 작은따옴표로 감쌌습니다.
  'isAdmin': false                  // 실수 3: 프로퍼티 키는 큰따옴표로 감싸야 하는데, 작은따옴표로 감쌌습니다.
  "birthday": new Date(2000, 2, 3), // 실수 4: "new"를 사용할 수 없습니다. 순수한 값(bare value)만 사용할 수 있습니다.
  "friends": [0,1,2,3]              // 이 프로퍼티는 괜찮습니다.
}`;

let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
let meetup2 = JSON.parse(str);

// console.log( meetup.date.getDate() ) // 에러!
// riviver에 key가 date일 때 Date객체를 반환하는 함수를 넘겨주기
// 이 방식은 중첩 객체에도 적용할 수 있음
let meetup3 = JSON.parse(str, function(key, value) {
  if (key === 'date') return new Date(value);
  return value;
});

console.log( meetup.date.getDate() ); // 잘 됨~