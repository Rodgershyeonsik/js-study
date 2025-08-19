// Map
// 키가 있는 데이터를 저장한다는 점에서 객체와 유사하나
// 키에 다양한 자료형을 허용한다는 점에서 차이가 있음
let map = new Map(); // 새로운 맵 인스턴스 생성

map.set('1', 'str1'); // 문자형 key로 value 저장
map.set(1, 'num1'); // 숫자형 key로 value 저장
map.set(true, 'bool1'); // 불린형 key로 value 저장

console.log( map.get(1) ); // 'num1', 1이 key인 value
console.log( map.get('1') ); // 'str1', '1'이 key인 value
console.log( map.get('랄라') ); // undefined, key가 없음

console.log( map.size ); // 3, 요소의 개수 반환

console.log( map.has(true) ); // true, key가 존재함
console.log( map.has(false) ); // false, key가 존재하지 않음

map.clear(); // map 비우기
console.log( map.size ); // 0

// map 사용 시엔 map[key]를 사용할 수 있지만 map을 일반 객체로 취급하게 되어 권장하지 않음
// 전용 메서드 set, get을 쓰도록 하자

// 중요!!! map은 key로 객체를 허용한다!!
let john = { name: "Join" };
let visitsCountMap = new Map();

visitsCountMap.set(john, 123);

console.log( visitsCountMap.get(john) ); // 123

let visitsCountObj = {};

visitsCountObj[john] = 123;

console.log( visitsCountObj[john] ); // 123

let pete = { name: "Pete" };
visitsCountObj[pete] = 456;

console.log( visitsCountObj[john] ); // 456, 실제로는 객체 key가 '[object Object]'로 형변환되어 값이 덮어씌워짐!!

// map.set 호출 시 맵 자신이 반환되어 map.set chaining 가능
map.set('2', 'str2')
    .set(2, 'num2')
    .set(false, 'bool2');

// map 요소에 반복 작업하기 예시
// ** map 생성자에 key-value 쌍의 배열을 요소로 가진 배열을 전달해 초기화하는 방법
let recipeMap = new Map([
    ['cucumber', 500],
    ['tomatoes', 350],
    ['onion', 50]
]);

// key 대상 순회
for (let vegetable of recipeMap.keys()) {
    console.log(vegetable); // cucumber, tomatoes, onion
}

// value 대상 순회
for (let amount of recipeMap.values()) {
    console.log(amount); // 500, 350, 50
}

// [key, value] 쌍 대상 순회
for (let entry of recipeMap) { // recipeMap.entries()로 for..of 돌려도 결과 동일
    console.log(entry); // ['cucumber', 500], ['tomatoes', 350], ['onion', 50]
}

// map은 객체와 달리 값이 삽입된 순서대로 순회 실시

// forEach도 지원함
recipeMap.forEach((value, key, map) => {
    console.log(`${key}: ${value}`); // cucumber: 500...
});

// 객체를 map으로 바꾸기
let obj = {
    name: 'John',
    age: 30
};

// Object.entries(): 객체의 키-값 쌍을 요소([key, value])로 가지는 배열로 반환
let mapFromObj = new Map(Object.entries(obj));

console.log( mapFromObj.get('name') ); // John

// map을 객체로 바꾸기(Object.fromEntries)
let fruitsMap = new Map();
fruitsMap.set('banana', 1);
fruitsMap.set('orange', 2);
fruitsMap.set('meat', 4);

let frutsObj = Object.fromEntries(fruitsMap.entries()); // Object.fromEntries(fruitsMap)도 가능

// 맵이 객체가 되었습니다!
// obj = { banana: 1, orange: 2, meat: 4 }

console.log(frutsObj.orange); // 2


// Set
// 중복을 허용하지 않는 값을 모아놓은 특별한 컬렉션

let set = new Set(); // set 인스턴스 생성. 대개 배열을 전달받음
console.log( set.add('John') ); // 값을 추가하고 set 자신을 반환

console.log( set.has('John') ); // true, 값 있음
console.log( set.delete('John') ); // true, 제거 성공

console.log( set.has('John') ); // false, 값 없음
console.log( set.delete('John') ); // false, 제거할 값이 없어서 제거 실패

let lily = { name: "Lily" };
let peter = { name: "Peter" };
let mary = { name: "Mary" };

set.add(lily);
set.add(peter);
set.add(mary);
set.add(lily);
set.add(mary);

console.log( set.size ); // 3, 유일무이한 값만 저장

for (let user of set) {
    console.log(user.name); // Lily, Peter, Mary
}

// set은 유일무이함 확인에 최적화되어 배열 내 요소 전체를 뒤져서 찾는 arr.find보다 성능이 좋음

// set 값에 반복 작업 할 때 forEach도 사용 가능
// value, valueAgain은 같은 값인데 굳이 이렇게 구현된 것은
// map -> set, set -> map 교체를 쉽게 하기 위함(map의 forEach 콜백이 인수가 3개라 맞추려고)
set.forEach((value, valueAgain, set) => {
    console.log(`value: ${value}], valueAgain: ${valueAgain}`);
});

console.log( set.keys() ); // set 내의 모든 값을 포함하는 이터러블 반환
console.log( set.values() ); // set.keys와 동일한 작업. map 호환성을 위해 만들어짐
console.log( set.entries() ); // [value, value] 배열을 포함하는 이터러블 반환