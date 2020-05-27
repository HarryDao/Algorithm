// https://leetcode.com/problems/kth-largest-element-in-an-array/

// Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.

// Example 1:

// Input: [3,2,1,5,6,4] and k = 2
// Output: 5
// Example 2:

// Input: [3,2,3,1,2,4,5,5,6] and k = 4
// Output: 4
// Note:
// You may assume k is always valid, 1 ≤ k ≤ array's length.


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

// Time complexity :O(N) in the average case, O(N ** 2) worst case
// Space complexity : O(1).


var findKthLargestQuickSort = function(nums, k) {
    if (k < 0 || k > nums.length) return false;
    const kIndex = k - 1;

    function swap(i, j) {
        const temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    return (function sort(start, end) {
        if (start >= end) return nums[start];
        const pivot = nums[start];
        let i = start + 1;
        for (let j = start + 1; j <= end; j++) {
            if (nums[j] > pivot) {
                swap(i, j);
                i += 1;
            }
        }

        swap(i - 1, start);
        if (i - 1 === kIndex) {
            return nums[i - 1];
        } else if (kIndex < i - 1) {
            return sort(start, i - 2);
        } else {
            return sort(i, end);
        }
    })(0, nums.length - 1);
}

console.log(findKthLargestQuickSort([4, 3, 5,6, 1, 7], 2));


const { MinPriorityList } = require('../../helpers');

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

// Time complexity : O(Nlogk).
// Space complexity : O(k) to store the heap elements.

var findKthLargestPriorityQueue = function(nums, k) {
    if (!nums.length || !k) return null;

    const queue = new MinPriorityList();
    
    for (let num of nums) {
        if (queue.list.length < k) {
            queue.enqueue(num, num);
        } else if (num > queue.list[0].data) {
            queue.dequeue();
            queue.enqueue(num, num);
        }
    }

    return queue.list.length ? queue.dequeue() : null;
};

// console.log(findKthLargestPriorityQueue(
//     [3,2,1,5,6,4],
//     2
// ));