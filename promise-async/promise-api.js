// promise 정적 메서드 유스케이스

// Promise.all
// 요소 전체가 프라미스인 이터러블(대개 배열)을 받고 새로운 프라미스 반환
Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)),
    new Promise(resolve => setTimeout(() => resolve(2), 2000)),
    new Promise(resolve => setTimeout(() => resolve(3), 1000)),
]).then(console.log); // [1, 2, 3]

// 배열 result의 요소 순서는 Promise.all에 전달되는 프라시스 순서와 상응
// 위 예시의 첫 번째 프라미스는 가장 늦게 이행돼도 배열의 첫 번째 요소에 저장됨

// url 배열을 fetch를 써서 처리하는 예시
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/Violet-Bora-Lee',
  'https://api.github.com/users/jeresig'
];

// fetch를 사용해 url을 프라미스로 매핑합니다.
let requests = urls.map(url => fetch(url));

// Promise.all은 모든 작업이 이행될 때까지 기다립니다.
Promise.all(requests)
  .then(responses => responses.forEach(
    response => console.log(`${response.url}: ${response.status}`)
  ));

// 전달되는 프로미스 중 하나라도 거부되면 에러와 함께 바로 거부됨
// 에러가 발생하면 다른 프라미스는 처리는 되지만 결과가 무시됨
Promise.all([
    new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("에러 발생!")), 2000)),
    new Promise((resolve) => setTimeout(() => resolve(3), 3000))
]).catch(console.log); // Error: 에러 발생!

// Promise.allSettled (구식 브라우저에서는 폴리필 필요)
// 요청 중 하나가 실패해도 다른 요청 결과가 필요할 때 사용
// 반환되는 배열은 다음과 같은 요소를 가짐
// 성공: {status:"fulfilled", value:result}
// 실패: {status:"rejected", reason:error}
let urls2 = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/Violet-Bora-Lee',
  'https://no-such-url'
];

Promise.allSettled(urls2.map(url => fetch(url)))
  .then(results => {
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        console.log(`${urls2[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        console.log(`${urls2[num]}: ${result.reason}`);
      }
    });
  });

// Promise.race
// 가장 먼저 처리되는 프라미스의 결과(혹은 에러) 하나만 반환
// 활용 예시: 타임아웃 처리, 여러 데이터 소스 중 가장 빠른 것을 사용하고 싶은 경우
Promise.race([
  new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("에러 발생!")), 2000)),
  new Promise((resolve) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1

// Promise.reslove, Promise.reject
// async/await 문법이 생긴 후로 거의 사용하지 않음
let promiseResolve = new Promise(resolve => resolve(value)); // Promise.resolve와 동일한 수행
let promiseReject = new Promise((resolve, reject) => reject(error)); // Promise.reject와 동일한 수행