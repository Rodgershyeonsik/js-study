// 구조 분해 할당
// 함수에 객체나 배열을 전달해야 하는 경우
// 객체나 배열에 저장된 데이터 전체가 아닌 일부가 필요한 경우
// 객체나 배열을 변수로 분해할 수 있게 해주는 특별한 문법구조

// 배열 분해하기
let arr = ["John", "Kim"];

// firstName에 arr[0], lastName에 arr[1] 할당
let [firstName, lastName] = arr;

console.log(firstName); // John
console.log(lastName); // Kim

// split 같이 반환 값이 배열인 메서드를 함께 활용해도 좋음
// let [firstName, lastName] = "John Kim".split(' ');

// 쉼표를 사용하여 요소 무시하기
let [ name, , job] = ['John', 25, 'dancer'];
console.log(job); // dancer

// 할당 연산자 우측엔 모든 이터러블이 올 수 있음
let [one, two, three] = new Set([1, 2, 3]);

// 할당 연산자 좌측엔 할당할 수 있는 어떤 것이든 올 수 있음
let user = {};
[user.firstName, user.lastName] = "John Kim".split(' ');

console.log(firstName); // John

// .entries()로 객체의 키, 값 순회하기
for(let [key, value] of Object.entries(user)){
    console.log(`${key}:${value}`); // firstName:John, lastName
}

// Map에서 활용하기
let userMap = new Map();
userMap.set('name', 'John');
userMap.set('age', 23);

for(let [key, value] of userMap) {
    console.log(`${key}:${value}`); // name:John, age:23
}

// 두 변수에 저장된 값을 교환하기
let guest = "John";
let admin = "Pete";

[guest, admin] = [admin, guest];

console.log(guest, admin); // Pete John

// '...'로 나머지 요소 가져오기
// 단, ... 붙일 변수는 마지막에 위치해야함
let [name1, name2, ...rest] = ['john', 'pete', 'paul', 'jane', 'mary', 'tom'];

console.log(rest[0]); // paul
console.log(rest[1]); // jane
console.log(rest.length); // 4

// 할당할 값이 없으면 undefined 취급
let [boy, girl] = [];

console.log(boy); // undefined

// 할당할 값이 없을 땐 기본값(default value) 설정 가능
let [man = 'guest', woman = 'anonymous'] = ['john'];

console.log(man); // john
console.log(woman); // anonymous

// 함수를 기본값으로 할당하기
let [ 
    greeting = console.log('hi'), 
    res = (() => {
        console.log('has no value. set default value');
        return 'hey';
    })()] = ['hello'];

// 값이 할당된 greeting의 기본값 console.log('hi')는 실행되지 않음
// 값이 제공되지 않은 res의 기본값 함수 호출, has no value. set default value 출력 후 res에 hey 할당
console.log(greeting); // hello
console.log(res); // hey

// 객체 분해하기
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

let {title, height, width} = options;

// 순서에 관계없이 프로퍼티 key에 저장된 값이 변수에 할당
console.log(title);  // Menu
console.log(width);  // 100
console.log(height); // 200

// 객체 프로퍼티 키와 다른 이름을 가진 변수에 저장해보기
// 원하는 값만 뽑아오기도 가능(width, height만)
let {width: w, height: h} = options;

console.log(w); // 100
console.log(h); // 200

// 기본값 설정
let {menu1 = 'cake', 
    title: t = console.log('title?'), // 값이 있어 호출되지 않음
    order = console.log('order?')} = options;

console.log(menu1) // cake

// 나머지 패턴 '...'. 모던 브라우저는 지원하지만, IE 비롯 몇몇 구식 브라우저는 지원하지 않음
let menu = {
    best: 'cake',
    popular: 'coffee',
    menu1: 'kimchi',
    menu2: 'ramen'
};
let {best, popular, ...common} = menu;

console.log(common); // {menu1: 'kimchi', menu2: 'ramen'}

// let 없이 사용하기
// 아래의 코드는 구조 분해 할당을 위해 사용한 {...}를 자바스크립트가 코드 블록으로 인식해서 에러가 남
// {title, width, height} = {title: 'title', width: 300, height: 400};

// 올바른 코드. 구조 분해 할당문을 괄호 (...)로 감싸 표현식으로 해석하게 하기
({title, width, height} = {title: 'title', width: 300, height: 400});