// https://leetcode.com/problems/maximum-subarray/

// Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

// Example:

// Input: [-2,1,-3,4,-1,2,1,-5,4],
// Output: 6
// Explanation: [4,-1,2,1] has the largest sum = 6.
// Follow up:

// If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let max = null;
    let prev = null;

    for (let i = nums.length - 1; i >= 0; i--) {
        if (prev === null) {
            prev = nums[i];
            max = nums[i];
        } else {
            const num = nums[i];
            if (prev <= 0) {
                prev = num;
            } else {
                prev = num + prev;
            }
            max = Math.max(max, prev);
        }
    }
    return max;
};


maxSubArray([-2,1,-3,4,-1,2,1,-5,4]);