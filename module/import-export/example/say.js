function sayHi(user) {
    return `hi, ${user}`;
}

function sayBye(user) {
    return `bye, ${user}`;
}

function sayHey(user) {
    return `hey, ${user}!`
}

export {sayHi, sayBye}; // 두 함수 내보내기

export {sayHey as hey}; // hey로 내보내기