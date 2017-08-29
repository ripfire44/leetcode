/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    map = [];
    for (let i=0; i < nums.length; i++) {
        complementIndex = map.indexOf(target-nums[i]);
        if(complementIndex>-1) {
            return [i, complementIndex];
        }
        map.push(nums[i]);
    }
    throw 'no solution';

};

var test = [7, 11, 3, 14, 1, 13, 8];
console.log(twoSum(test,9));