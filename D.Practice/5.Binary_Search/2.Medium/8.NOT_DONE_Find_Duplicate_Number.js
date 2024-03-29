// https://leetcode.com/problems/find-the-duplicate-number/

// Given an array nums containing n + 1 integers where each integer is between 1 and n (inclusive), prove that at least one duplicate number must exist. Assume that there is only one duplicate number, find the duplicate one.

// Example 1:

// Input: [1,3,4,2,2]
// Output: 2
// Example 2:

// Input: [3,1,3,4,2]
// Output: 3
// Note:

// You must not modify the array (assume the array is read only).
// You must use only constant, O(1) extra space.
// Your runtime complexity should be less than O(n2).
// There is only one duplicate number in the array, but it could be repeated more than once.

/**
 * @param {number[]} nums
 * @return {number}
 */

// O(n)
// O(n)

var findDuplicatePrioritizeTime = function(nums) {
    const map = {};
    for (let num of nums) {
        if (map[num]) return num;
        map[num] = true;
    }
    return -1;
};

/**
 * @param {number[]} nums
 * @return {number}
 */

// O(nlogn)
// O(1)

var findDuplicateSORT = function(nums) {
    nums.sort((a, b) => Number(a) < Number(b) ? -1 : 1);
    let start = 0;
    let end = nums.length - 1;

    while (start < end) {
        const mid = Math.floor((start + end) / 2);
        
        if (nums[mid] > mid) {
            start = mid + 1;
        } else {
            end = mid;
        }
    }

    return nums[start];
}

console.log(findDuplicate(
    [1, 2, 3, 4, 4]
)); // 2


// 1 2 3 4 4 5 6 

// 0 1 2 3 4 5 6

// 1 2 2 3 4
// 0 1 2 3 4

// 2 => (0, 1, 2)
