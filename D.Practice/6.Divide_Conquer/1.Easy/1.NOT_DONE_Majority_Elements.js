// https://leetcode.com/problems/majority-element/

// Given an array of size n, find the majority element. The majority element is the element that appears more than ⌊ n/2 ⌋ times.

// You may assume that the array is non-empty and the majority element always exist in the array.

// Example 1:

// Input: [3,2,3]
// Output: 3
// Example 2:

// Input: [2,2,1,1,1,2,2]
// Output: 2

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    const majority = Math.ceil(nums.length / 2);
    const count = {};
    let max = 0;
    let result = null;

    for (let num of nums) {
        count[num] = count[num] ? (count[num] + 1) : 1;
        if (count[num] >= majority) {
            return num;
        }
        if (count[num] > max) {
            max = count[num];
            result = num;
        }
    }
    return result;
};

console.log(majorityElement(
    [2, 1, 2, 1, 2]
)); // 2