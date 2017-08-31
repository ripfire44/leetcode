/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */

var coinChange = function (coins, amount) {
    const A = coins.sort((a, b) => (b - a));
    const target = amount;
    let x = [];
    let result;
    let answers = [];
    let max = 5000000; // just in case

    do {
        x = calcRem(A, target, x);
        result = dot(A, x);
        if (result == target) {
            let answer = x.reduce((a, v) => (a + v));
            if (answers.indexOf(answer) === -1) {
                answers.push(answer);
            }
        }
        //console.log('x:', x, 'result:', result, 'target:', target, 'diff:', target - result, 'A:', A, result == target ? 'HIT! coins:' + x.reduce((a, v) => (a + v)) : '');
        x.pop();
        if (!x.length) {
            break;
        }
        let check = x.reduce((a, v) => (a + v));
        if (!check) {
            break;
        }
        for (let i = x.length - 1; i >= 0; i--) {
            if (x[i] > 0) {
                x[i]--;
                x.splice(i + 1);
                break;
            }
        }
        max--;

    } while (max>0);
    if (max == 0) {
        console.log('hit max!');
    }
    console.log('answers:', answers);
    if (!answers.length) {
        return -1;
    }
    return answers.sort((a, b) => (a - b))[0];


    function calcRem(a, target, array) {
        let rem = target;
        array = array || [];
        for (let i = 0; i < array.length; i++) {
            rem -= array[i] * a[i];
        }
        for (let i = array.length; i < a.length; i++) {
            array.push(Math.floor(rem / a[i]));
            rem %= a[i];
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
};

var startTime = new Date();



console.log(`Result: ${coinChange([227, 99, 328, 299, 42, 322], 9847)}, Time: ${(new Date()) - startTime}`);

