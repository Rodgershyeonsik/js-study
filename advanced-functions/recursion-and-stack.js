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



