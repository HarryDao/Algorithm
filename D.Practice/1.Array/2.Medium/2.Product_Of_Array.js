// Product of Array Except Self

// https://leetcode.com/problems/product-of-array-except-self/

// Given an array nums of n integers where n > 1,  return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].

// Example:

// Input:  [1,2,3,4]
// Output: [24,12,8,6]
// Constraint: It's guaranteed that the product of the elements of any prefix or suffix of the array (including the whole array) fits in a 32 bit integer.

// Note: Please solve it without division and in O(n).

// Follow up:
// Could you solve it with constant space complexity? (The output array does not count as extra space for the purpose of space complexity analysis.)


/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const left = [1];
    const right = [1];
    
    for (let i = 0; i < nums.length - 1; i++) {
        const next = left[left.length - 1] * nums[i];
        left.push(next);
    }

    for (let i = nums.length - 1; i > 0; i--) {
        const next = right[right.length - 1] * nums[i];
        right.push(next);
    }

    return nums.map((n, i) => {
        return left[i] * right[nums.length - i - 1];
    });
};

console.log(productExceptSelf(
    [1,2,3,4]
)); // [24,12,8,6]