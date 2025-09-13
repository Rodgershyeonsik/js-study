// 재귀(Recursion) - 함수가 자기 자신을 호출하는 것
// 큰 목표 작업 하나를 동일하면서도 간단한 작업 여러 개로 나눌 수 있을 때
// 목표 작업을 간단한 동작 하나와 목표 작업을 변형한 작업으로 단순화시킬 수 있을 때

// x를 n제곱해주는 함수 pow(x, n) 구현 예시
// 1. for loop - 반복적 사고를 통한 방법
function pow1(x, n) {
    let result = 1;

    for (let i = 0; i < n; i++) {
        result *= x;
    }

    return result;
}

console.log(pow1(2, 3)); // 8

// 2. 재귀적 사고를 통한 방법
// pow2는 n이 1이 될 때까지 재귀적으로 자신을 호출
function pow2(x, n) {
    if(n === 1) {
        return x; // 명확한 결과값 즉시 도출. 재귀의 베이스(base)
    } else {
        return x * pow2(x, n - 1); // 재귀 단계(recursive step)
    }
}

console.log(pow2(2, 3)); // 8

// 3. 재귀로 더 짧게 구현한 버전
function pow3(x, n) {
    return (n === 1) ? x : x * pow3(x, n - 1);
}

// 실행 컨텍스트(execution context) - 함수 실행에 대한 세부 정보를 담고 있는 내부 데이터 구조
// 함수 내부에 중첩 호출이 있는 경우 현재 함수의 실행이 일시 중지,
// 중지된 함수와 연관된 실행 컨택스트가 실행 컨텍스트 스택에 저장됨
// 예: pow2(2, 3)을 호출한 경우 컨텍스트 스택, 재귀의 깊이는 3
// Context: { x: 2, n: 1, 첫 번째 줄 } call: pow(2, 1)
// Context: { x: 2, n: 2, 다섯 번째 줄 } call: pow(2, 2)
// Context: { x: 2, n: 3, 다섯 번째 줄 } call: pow(2, 3)

// 실행 컨텍스트는 메모리를 차지하므로 재귀 사용 시 메모리 요구사항에 유의
// 단, 반복문을 쓰면 대개 함수호출 비용(메모리 사용)이 절약됨

// 재귀적 순회(recursive traversal)
// 예제: 아래와 같이 표현된 company에서 salary의 합 구하기
let company = {
  sales: [{
    name: 'John',
    salary: 1000
  }, {
    name: 'Alice',
    salary: 1600
  }],

  development: { // 부서에는 하위 부서가 존재, 더 늘어날 가능성도 있음
    sites: [{
      name: 'Peter',
      salary: 2000
    }, {
      name: 'Alex',
      salary: 1800
    }],

    internals: [{
      name: 'Jack',
      salary: 1300
    }]
  }
};

// 급여 합계를 구해주는 함수
function sumSalaries(department) {
    console.log(`current department: ${JSON.stringify(department)}`);

  if (Array.isArray(department)) { // 첫 번째 경우: 부서가 배열로 이루어진 가장 단순한 구조(재귀의 베이스)
    console.log('is array');
    return department.reduce((prev, current) => prev + current.salary, 0);
  } else { // 두 번째 경우
    console.log('is department');
    let sum = 0;
    for (let subdep of Object.values(department)) {
      console.log(`calling sumSaraleies for subdep: ${JSON.stringify(subdep)}`)
      sum += sumSalaries(subdep); // 재귀 호출로 각 하위 부서 임직원의 급여 총합을 구함
      console.log(`after summing salaries of subdep: ${sum}`);
    }
    return sum;
  }
}

console.log( sumSalaries(company) );

// 재귀적 자료 구조 - 자기 자신의 일부를 복제하는 형태의 자료 구조
// 예: 위에 정의한 company, HTML, XML 등

// 연결 리스트(linked list)
// 빠르게 삽입 또는 삭제를 해야할 때 배열 대신 활용 가능
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

// 리스트 쪼개기
let secondList = list.next.next;
list.next.next = null;

console.log( JSON.stringify(list) ); // {"value":1,"next":{"value":2,"next":null}}
console.log( JSON.stringify(secondList) ); // {"value":3,"next":{"value":4,"next":null}}

// 합치기
list.next.next = secondList;

console.log( JSON.stringify(list) );

// 데이터 교체
list = {value: "new item", next: list};
console.log( JSON.stringify(list) ); // {"value: "new item", "next":{"value": 1, "next": {...}}}

// 중간 요소 제거
list.next = list.next.next;
console.log( JSON.stringify(list) ); // {"value: "new item", "next":{"value": 2, "next": {...}}}

// 연결 리스트의 치명적 단점은 인덱스만 사용해 요소에 접근할 수 없다는 점
// n번째 요소에 접근하기 위해 n번 next로 이동 필요
// 중간에 요소를 삽입 또는 삭제하는 게 불필요할 경우 큐(queue)나 데크(deque)를 사용할 수 있음