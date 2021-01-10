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

function search(nums: number[], target: number): number {
    let startIndex = 0;
    let endIndex = nums.length - 1;

    while (startIndex <= endIndex) {
        const start = nums[startIndex];
        const end = nums[endIndex];

        if (endIndex - startIndex <= 1) {
            if (start === target) {
                return startIndex;
            } else if (end === target) {
                return endIndex;
            } else {
                return -1;
            }
        }

        const midIndex = Math.floor(startIndex / 2 + endIndex / 2);
        const mid = nums[midIndex];

        if (mid === target) return midIndex;

        if (start < mid) {
            if (target < start || target > mid) {
                startIndex = midIndex + 1;
            } else {
                endIndex = midIndex;
            }
        } else {
            if (target < mid || target > end) {
                endIndex = midIndex;
            } else {
                startIndex = midIndex + 1;
            }
        }

    }

    return -1;
};

// console.log(search([4,5,6,7,0,1,2], -1));
console.log(search([3, 1], 1));