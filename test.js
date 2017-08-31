// Matrix multiply

const A = [1,2,5].sort((a, b) => (b - a));
const target = 10;
let x = [];
let result;
let answers = [];

let max = 20;
do {
    x = calcRem(A, target, x);
    result = dot(A, x);
    if (result == target) {
        answers.push(x.slice());
    }
    console.log('x:', x, 'result:', result, 'target:', target, result == target ? 'HIT! coins:'+ x.reduce((a, v) => (a + v)) : '');
    x.pop();
    if(!x.length) {
        break;
    }
    let check = x.reduce((a,v)=>(a+v));
    if(!check) {
        break;
    }
    for (let i = x.length - 1; i >= 0; i--) {
        check = isNaN(check)? x[i]:check+x[i];
        if (x[i] > 0) {
            x[i]--;
            x.splice(i + 1);
            break;
        }
    }
    max--;

} while (max > 0);

if (max == 0) {
    console.log('Max was reached!');
}

console.log('answers:', answers);
console.log('coins:', answers.map(x=>x.reduce((a,v)=>(a+v))));

function calcRem(a, target, array) {
    let rem = target;
    array = array || [];
    for (let i = 0; i < array.length; i++) {
        rem -= array[i] * A[i];
    }
    for (let i = array.length; i < A.length; i++) {
        array.push(Math.floor(rem / A[i]));
        rem %= A[i];
    }
    return array;
}

function dot(a, b) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
        sum += a[i] * b[i];
    }
    return sum;
}



// console.log('Manual: ', sum);

// const mathjs = require('mathjs');

// console.log('Mathjs: ', mathjs.dot(A, x));