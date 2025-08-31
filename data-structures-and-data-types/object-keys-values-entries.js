// Object.keys(obj) - 객체의 키만 담은 배열 반환
// Obejct.values(obj) - 객체의 값만 담은 배열 반환
// Obejct.entries(obj) - [키, 값] 쌍을 답은 배열 반환
// Map, Set, Array 전용 메서드와 달리 iterable 객체가 아닌 진짜 배열을 반환함
// Object.keys, values, entries는 for..in 반복문처럼 키가 심볼형인 프로퍼티를 무시함

let user = {
    name: 'John',
    age: 23
};

console.log(Object.keys(user)); // ['name', 'age']
console.log(Object.values(user)); // ['John', 23]
for(let entry of Object.entries(user)) {
    console.log(entry); // ['name', 'John'], ['age', 23]
}

// Object.entries(obj), Object.fromEntries(array)를 활용해 객체에 배열 전용 메서드 사용하기
let prices = {
    banana: 1,
    orange: 2,
    meat: 4,
};

let doublePrices = Object.fromEntries(
    Object.entries(prices).map(([key, value]) => [key, value * 2])
);

console.log(doublePrices.meat); // 8

// 보충: Object.fromEntries()는 [key, value] 형태의 배열을 요소로 가지는 이터러블이면 사용 가능
// 1. Array
let arr = [
  ['name', 'John'],
  ['age', 23],
  ['isAdmin', true]
];

let obj = Object.fromEntries(arr);

console.log(obj); // { name: 'John', age: 23, isAdmin: true }

// 2. Map
let map = new Map([
  ['apple', 10],
  ['banana', 20],
  ['orange', 30]
]);

let obj2 = Object.fromEntries(map);

console.log(obj2); // { apple: 10, banana: 20, orange: 30 }