// https://leetcode.com/articles/two-sum-ii-input-array-is-sorted/

// Given an array of integers that is already sorted in ascending order, find two numbers such that they add up to a specific target number.

// The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2.

// Note:

// Your returned answers (both index1 and index2) are not zero-based.
// You may assume that each input would have exactly one solution and you may not use the same element twice.
// Example:

// Input: numbers = [2,7,11,15], target = 9
// Output: [1,2]
// Explanation: The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2.

function twoSumSorted(array, target) {
    let start = 0;
    let end = array.length - 1;
    let total = array[start] + array[end];
    
    while (start < end && total !== target) {
        if (total < target) {
            total -= array[start];
            start += 1;
            total += array[start];
        } else {
            total -= array[end];
            end -= 1;
            total += array[end];
        }
    }

    return start < end ? [start, end] : null;
}

// time: O(n)
// space: O(1)

console.log(twoSumSorted([2,7,11,15], 9));