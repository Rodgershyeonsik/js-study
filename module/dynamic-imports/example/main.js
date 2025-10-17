// 동적 임포트 예시(1)
import('./say.js')
    .then(obj => {
        obj.hi();
        obj.bye();
        obj.default(); // default 모듈 호출 시에는 default 프로퍼티 사용
    })
    .catch(err => console.log(err));

// 동적 임포트 예시(2) - await 함수 안에서 호출하는 방식
// 최상위 await 지원 환경에서는 바로 쓰기 가능(esm + node 14+ 이상)
let { hi, bye } = await import('./say.js');

hi();
bye();