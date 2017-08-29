/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */

var coinChange = async function(coins, amount) {
    let coinsSorted = coins.sort((a, b)=>(b-a));
    console.log('Coins:', coinsSorted, 'Amount:', amount);
    async function check(set, target) {
        let checks = [];
        for(let i=0;i<set.length;i++) {
            let subset = [];
            let val = (subset = set.slice()).splice(i,1);
            console.log('val:', val, 'subset:', subset);
            if(val>target){
                console.log(`Dead end. val:${val}, target:${target}`);
                checks.push(Promise.resolve(NaN));
            } else {
                let div = Math.trunc(target / val);
                let rem = target % val;
                if(!rem) {
                    console.log(`Even. div:${div}, rem:${rem}`);
                    checks.push(Promise.resolve(div));
                } else if(!subset.length) {
                    console.log(`No more subset, dead end. div:${div}, rem:${rem}`);
                    checks.push(Promise.resolve(NaN));
                } else {
                    console.log(`Keep going. div:${div}, rem:${rem}, subset:${subset}`);
                    checks.push(check(subset, rem).then((v)=>div+v));
                }
            }
        }
        return Promise.all(checks).then((arr)=>{
            console.log(arr);
            return arr.filter(Boolean).sort((a, b)=>(a-b))[0];
        });
    }



    return await check(coinsSorted, amount);
};

var startTime = new Date();
coinChange([1,5,10,25], 132).then((value)=>{
    console.log((new Date())-startTime);
    console.log('Result: ', value);
});


