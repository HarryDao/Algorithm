// https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/

// Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.

// Your algorithm's runtime complexity must be in the order of O(log n).

// If the target is not found in the array, return [-1, -1].

// Example 1:

// Input: nums = [5,7,7,8,8,10], target = 8
// Output: [3,4]
// Example 2:

// Input: nums = [5,7,7,8,8,10], target = 6
// Output: [-1,-1]



/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    let start = 0;
    let end = nums.length - 1;
    let index = -1;
    
    while (start <= end) {
        if (end - start < 2) {
            if (nums[start] === target) index = start;
            if (nums[end] === target) index = end;
            break;
        }

        const mid = Math.floor((start + end) / 2);

        if (nums[mid] === target) {
            index = mid;
            break;
        } else if (nums[mid] > target) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }

    if (index === -1) return [-1, -1];

    let leftStart = 0;
    let leftEnd = index;
    let left = -1;

    while (leftStart <= leftEnd) {
        if (nums[leftEnd] < target) {
            left = leftEnd + 1;
            break;
        }

        if (nums[leftStart] === target) {
            left = leftStart;
            break;
        }

        const mid = Math.floor((leftStart + leftEnd) / 2);

        if (nums[mid] < target) {
            leftStart = mid + 1;
        } else {
            leftEnd = mid - 1;
        }
    }

    let rightStart = index;
    let rightEnd = nums.length - 1;
    let right = -1;

    while (rightStart <= rightEnd) {
        if (nums[rightStart] > target) {
            right = rightStart - 1;
            break;
        }

        if (nums[rightEnd] === target) {
            right = rightEnd;
            break;
        }

        const mid = Math.floor((rightStart + rightEnd) / 2);

        if (nums[mid] > target) {
            rightEnd = mid - 1;
        } else {
            rightStart = mid + 1;
        }
    }

    return [left, right];
}




/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRangeNaive = function(nums, target) {
    let start = 0;
    let end = nums.length - 1;
    let index = -1;

    while (start <= end) {
        if (end - start < 2) {
            if (target === nums[start]) index = start;
            if (target === nums[end]) index = end;
            break;
        }

        const mid = Math.floor((start + end) / 2);
        if (target === nums[mid]) {
            index = mid;
            break;
        }
        else if (target > nums[mid]) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }

    if (index === -1) {
        return [-1, -1];
    }

    let left = index;
    let right = index;

    while (left - 1 >= 0 && nums[left - 1] === target) {
        left = left - 1;
    }

    while (right + 1 < nums.length && nums[right + 1] === target) {
        right = right + 1;
    }

    return [left, right];
};

console.log(searchRange(
    [5,7,7,8,8,8,8,10], 8
)); // [3, 4]

console.log(searchRange(
    [1,2,2], 2
)); // [1, 2]