// https://leetcode.com/problems/search-in-rotated-sorted-array/

// Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

// (i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).

// You are given a target value to search. If found in the array return its index, otherwise return -1.

// You may assume no duplicate exists in the array.

// Your algorithm's runtime complexity must be in the order of O(log n).

// Example 1:

// Input: nums = [4,5,6,7,0,1,2], target = 0
// Output: 4
// Example 2:

// Input: nums = [4,5,6,7,0,1,2], target = 3
// Output: -1

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let start = 0;
    let end = nums.length - 1;

    while (start < end) {
        if (end - start < 2) {
            if (nums[start] === target) return start;
            if (nums[end] === target) return end;
        }

        let mid = Math.floor((end + start) / 2);

        if (nums[mid] === target) return mid;

        const left = [start, mid - 1];
        const right = [mid + 1, end];
        const sorted = nums[left[0]] <= nums[left[1]] ? left : right;
        const rotated = sorted === left ? right : left;
        const next = (target >= nums[sorted[0]] && target <= nums[sorted[1]]) ? sorted : rotated;

        start = next[0];
        end = next[1];
    }

    return target === nums[start] ? start : -1;
};

// console.log(search(
//     [4,5,6,7,0,1,2], 2
// )); // 6

console.log(search(
    [3,4,5,6,7,8,1,2], 2
)); 