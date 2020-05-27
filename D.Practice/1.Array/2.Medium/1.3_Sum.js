// https://leetcode.com/problems/3sum/

// Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.

// Note:
// The solution set must not contain duplicate triplets.

// Example:

// Given array nums = [-1, 0, 1, 2, -1, -4],

// A solution set is:
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */

const threeSum = function(nums, target = 0) {
    const result = {};
    nums.sort((a, b) => Number(a) < Number(b) ? -1 : 1);

    for (let i = 0; i < nums.length - 2; i ++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let start = i + 1;
        let end = nums.length - 1;
        let total = nums[i] + nums[start] + nums[end];

        while (start < end) {
            if (total === target) {
                const prop = [nums[i], nums[start], nums[end]].join('|');
                result[prop] = true;
            }

            if (total < target) {
                total -= nums[start];
                start += 1;
                total += nums[start];
            } else {
                total -= nums[end];
                end -= 1;
                total += nums[end];
            }
        }
    }

    return Object.keys(result).map(str => str.split('|'));
}

console.log(threeSum([-1,-2,-3,4,1,3,0,3,-2,1,-2,2,-1,1,-5,4,-3]));