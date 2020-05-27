// https://leetcode.com/problems/increasing-triplet-subsequence/

// Given an unsorted array return whether an increasing subsequence of length 3 exists or not in the array.

// Formally the function should:

// Return true if there exists i, j, k
// such that arr[i] < arr[j] < arr[k] given 0 ≤ i < j < k ≤ n-1 else return false.
// Note: Your algorithm should run in O(n) time complexity and O(1) space complexity.

// Example 1:

// Input: [1,2,3,4,5]
// Output: true
// Example 2:

// Input: [5,4,3,2,1]
// Output: false

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function(nums) {
    const result = [];

    for (let num of nums) {
        if (!result.length) {
            result.push(num);
        } else if (result[0] >= num) {
            result[0] = num;
        } else if (result[1] === num) {
            result[1] = num;
        } else if (result[result.length - 1] < num) {
            result.push(num);
        } else {
            result[1] = num;
        }
        if (result.length === 3) return true;
    }
    return false;
};

// console.log(increasingTriplet(
//     [1, 4, 2, 5]
// )); // true

console.log(increasingTriplet(
    [0,4,2,1,0,-1,-3]
)); //