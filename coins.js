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
    let max = 3000; // just in case

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

    do {
        let check = x.length? x.reduce((a,v)=>(a+v)) : NaN;
        for (let i = x.length - 2; i >= 0; i--) {
            check = isNaN(check) ? x[i] : check + x[i];
            if (x[i] > 0) {
                x[i]--;
                x.splice(i + 1);
                break;
            }
        }
        if (check == 0) {
            break;
        }
        x = calcRem(A, target, x);
        result = dot(A, x);
        if (result == target) {
            answers.push(x.slice());
        }
        //console.log('x:', x, 'result:', result, 'target:', target, result == target ? 'HIT! coins:' + x.reduce((a, v) => (a + v)) : '');
        max--;

    } while (max > 0);
    //console.log('answers:', answers);
    let minCoins = answers.length? answers.map(x => x.reduce((a, v) => (a + v))).sort()[0] : -1;
    //console.log('Min coins', minCoins);
    return minCoins;

};

var startTime = new Date();
console.log(`Result: ${coinChange([3], 2)}, Time: ${(new Date()) - startTime}`);

