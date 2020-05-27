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
var twoSum = function(nums, target) {
    const complements = {};
    
    for (let index = 0; index < nums.length; index ++) {
        const num = nums[index];
        
        if (complements.hasOwnProperty(num)) {
            return [complements[num], index];
        }

        complements[target - num] = index;
    }

    return false;
};

// time: O(n)
// space: O(n)

// note: brute force -> time O(n2); space O(1)

console.log(twoSum([2,7,11,15], 18));