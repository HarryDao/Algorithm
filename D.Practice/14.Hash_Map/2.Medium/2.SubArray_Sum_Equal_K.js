// https://leetcode.com/problems/subarray-sum-equals-k/

// Given an array of integers and an integer k, you need to find the total number of continuous subarrays whose sum equals to k.

// Example 1:

// Input:nums = [1,1,1], k = 2
// Output: 2
 

// Constraints:

// The length of the array is in range [1, 20,000].
// The range of numbers in the array is [-1000, 1000] and the range of the integer k is [-1e7, 1e7].



/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    let total = 0;
    let count = 0;
    const sum = {};

    for (let num of nums) {
        total += num;

        const compensate = total - k;
    
        if (total === k) count ++;
        if (sum[compensate]) count += sum[compensate];
        sum[total] = sum[total] ? sum[total] + 1 : 1;
    }

    return count;
}






/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */


var subarraySumNaive = function(nums, k) {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        total = 0;
        for (let j = i; j < nums.length; j++) {
            total += nums[j];
            if (total === k) {
                count += 1;
            }
        }
    }

    return count;
};

console.log(subarraySum(
    [1, 1, 1], 2
)); // 2

console.log(subarraySum(
    [1,2,1,2,1], 3
)); // 4

console.log(subarraySum(
    [-1,-1, 1], 0
)); // 1

console.log(subarraySum(
    [-92,-63,75,-86,-58,22,31,-16,-66,-67,420], 100
)); // 1


console.log(subarraySum(
    [3, 4, 7, 2, -3, 1, 4, 2], 7
)); // 4