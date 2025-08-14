
// iterable(반복 가능한), 즉 반복 가능한 객체.
// 이터러블 개념을 사용하면 어떤 객체든 for..of 반복문 적용이 가능함
// 직접 이터러블 객체 만들어서 이해해보기
let range = {
    from: 1,
    to: 5
};

// 목표: for(let num of range) ... num = 1,2,3,4,5 같이 동작하게 만들기
// 이를 위해서는 Symbol.iterator 메서드를 추가해야됨

// 1. for..of 최초 호출 시, Symbol.iterator가 호출
range[Symbol.iterator] = function() {

    // Symbol.iterator는 이터레이터 객체를 반환
    // 2. 이후 for..of는 반환된 이터레이터 객체만을 대상으로 동작하는데, 이때 다음 값도 정해짐
    return {
        current: this.from,
        last: this.to,

        // 3. for..of 반복문에 의해 반복마다 next()가 호출
        next() {
            // 4. next()는 값을 객체 { done:.., value:.. } 형태로 반환
            if(this.current <= this.last) {
                return { done: false, value: this.current++ };
            } else {
                return { done: true };
            }
        },
    }
};

for(let num of range) {
    console.log(num); // next()가 반환하는 객체의 value값
}

// 관심사의 분리(Separation of concern, SoC)
// range엔 메서드 next()가 없는 대신
// range[Symbol.iterator]() 를 호출해서 만든 이터레이터 객체와
// 이 객체의 메서드 next()에서 반복에 사용될 값을 만들어냄
// 이렇게 이터레이터 객체와 반복 대상 객체를 분리한 것

// 문자열은 이터러블입니다.
for (let char of "test") {
    console.log( char ); // t, e, s, t가 차례로 출력
}

// surrogate pair 에도 잘 동작함
let str = '𝒳😂';
for (let char of str) {
    console.log( char ); // 𝒳와 😂가 차례대로 출력됨
}
// ** surrogate pair(서로게이트 쌍)
//      자바스크립트에서 2바이트(16비트)로는 표현할 수 없는 유니코드 문자를 나타낼 때 사용하는 두 개의 16비트 코드 유닛
//      이모지나 일부 특수 문자( 😄 (U+1F604), 🐱 (U+1F431) )

// 이터레이터 명시적으로 호출하기
// for..of와 동일하게 동작
let str1 = 'Hello';
// str1이 가진 이터레이터를 호출해서 새 이터레이터 객체 만들기
let iterator = str1[Symbol.iterator]();

while (true) {
    let result = iterator.next();
    if (result.done) break;
    console.log(result.value);
}

// 이터러블과 유사배열
// 이터러블(iterable): Symbol.iterator가 구현된 객체임
// 유사 배열(array-like): 인덱스와 length 프로퍼티가 있어 배열처럼 보이는 객체
// 문자열은 이터러블 객체이면서 유사 배열 객체임

// 예시: 유사 배열 객체이지만 이터러블 객체는 아님
let arrayLike = {
    0: "Hello",
    1: "World",
    length: 2
};
// Symbol.iterator가 없으므로 에러 발생
// for(let item of arrayLike) {} Uncaught TypeError TypeError: arrayLike is not iterable

// 범용 메서드 Array.from
// 이터러블이나 유사 배열을 받아 진짜 'Array'를 만들어준다
// 문자열을 Array.from 사용해서 배열로 만들기
let arr = Array.from(arrayLike);
console.log(arr); // ['Hello', 'World'] 출력
console.log( arr.pop() ); // World 출력

// Array.from엔 mapping 함수를 선택적으로 넘겨줄 수 있음
let arr1 = Array.from(range, num => num * num);
console.log(arr1);

// Array.from을 사용하면 surrogate pair을 처리할 수 있는 slice도 직접 구현 가능
function slice(str, start, end) {
    return Array.from(str).slice(start, end).join('');
}

let surrogateStr = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

// 내장 순수 메서드는 서로게이트 쌍을 지원하지 않습니다.
alert( str.slice(1, 3) ); // 쓰레깃값 출력 (영역이 다른 특수 값)