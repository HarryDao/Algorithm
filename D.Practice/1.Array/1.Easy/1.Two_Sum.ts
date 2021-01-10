// https://leetcode.com/problems/two-sum/
// Given an array of integers, return indices of the two numbers such that they add up to a specific target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// Example:

// Given nums = [2, 7, 11, 15], target = 9,

// Because nums[0] + nums[1] = 2 + 7 = 9,
// return [0, 1].


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums: number[], target: number): number[] {
    const map: {[key: string] : number} = {};

    for (let index = 0, length = nums.length; index < length; index += 1) {
        const num = nums[index];

        if (map.hasOwnProperty(num)) {
            return [map[num], index];    
        } else {
            map[target - num] = index;
        }
    }

    return [-1, -1];
};

console.log(twoSum([2,7,11,15], 19));