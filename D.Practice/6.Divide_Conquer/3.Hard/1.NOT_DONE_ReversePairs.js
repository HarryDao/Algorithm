// https://leetcode.com/problems/reverse-pairs/

// Given an array nums, we call (i, j) an important reverse pair if i < j and nums[i] > 2*nums[j].

// You need to return the number of important reverse pairs in the given array.

// Example1:

// Input: [1,3,2,3,1]
// Output: 2
// Example2:

// Input: [2,4,3,5,1]
// Output: 3

const { BinaryTree } = require('../Binary_Tree');

/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function(nums) {
    const tree = new BinaryTree();
    
    for (let num of nums) {
        
    }
}

// 4 3 6 1

//   4 <- 1 + 1
//3 <- 1   5 <- 1






/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairsNaive = function(nums) {
    let count = 0;
    for (let i = 0, l = nums.length; i < l; i++) {
        for (let j = i + 1; j < l; j++) {
            if (nums[i] > nums[j] * 2) {
                count += 1;
            }
        }
    }
    return count;
};

console.log(reversePairs(
    [2,4,3,5,1]
)); // 3


// 2 4 3 5 1
// 0 1 2 3 4