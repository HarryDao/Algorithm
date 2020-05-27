// https://leetcode.com/problems/top-k-frequent-elements/

// Given a non-empty array of integers, return the k most frequent elements.

// Example 1:

// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]
// Example 2:

// Input: nums = [1], k = 1
// Output: [1]
// Note:

// You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
// Your algorithm's time complexity must be better than O(n log n), where n is the array's size.
// It's guaranteed that the answer is unique, in other words the set of the top k frequent elements is unique.
// You can return the answer in any order.



/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequentQuickSort = function(nums, k) {
    const map = {};

    for (let num of nums) {
        map[num] = map[num] ? (map[num] + 1) : 1;
    }

    const array = [];
    for (let num in map) {
        array.push(({ num: Number(num), freq: map[num] }));
    }

    const complement = array.length - k;
    if (complement === 0) {
        return array.map(v => v.num);
    } else if (complement < 0) {
        return [];
    }
    
    function swap(i, j) {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    function sort(start, end) {
        const pivot = array[start];
        let i = start + 1;

        for (let j = start + 1; j <= end; j++) {
            if (array[j].freq < pivot.freq) {
                swap(i, j);
                i = i + 1;
            }
        }
        
        swap(start, i - 1);

        if (i === complement) {
            return array.slice(complement).map(({ num }) => num);
        } else if (i < complement) {
            return sort(i, end);
        } else {
            return sort(start, i - 2);
        }
    }

    return sort(0, array.length - 1);
}

// console.log(topKFrequentQuickSort(
//     [1,1,1,2,2,3], 2
// )); // [1, 2]

console.log(topKFrequentQuickSort(
    [1], 1
)); 




/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequentSort = function(nums, k) {
    const map = {};
    for (let num of nums) {
        map[num] = map[num] ? (map[num] + 1) : 1;
    }

    const array = [];
    for (let num in map) {
        array.push(({ num, freq: map[num] }));
    }

    array.sort((a, b) =>  a.freq > b.freq ? -1 : 1);

    return array.slice(0, k).map(({ num }) => num);
}









const { GeneralPriorityQueue } = require('../../helpers');

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequentWithHeap = function(nums, k) {
    const map = {};
    
    for (let num of nums) {
        map[num] = map[num] ? (map[num] + 1) : 1;
    }

    const pq = new GeneralPriorityQueue(false);

    for (let num in map) {
        pq.enqueue(map[num], Number(num));
    }

    const result = [];

    while (result.length < k && pq.list.length) {
        result.push(pq.dequeue());
    }

    return result;
};

// console.log(topKFrequentWithHeap(
//     [1,1,1,2,2,3], 4
// )); // [1, 2]