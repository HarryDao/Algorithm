// https://leetcode.com/problems/maximum-length-of-pair-chain/

// You are given n pairs of numbers. In every pair, the first number is always smaller than the second number.

// Now, we define a pair (c, d) can follow another pair (a, b) if and only if b < c. Chain of pairs can be formed in this fashion.

// Given a set of pairs, find the length longest chain which can be formed. You needn't use up all the given pairs. You can select pairs in any order.

// Example 1:
// Input: [[1,2], [2,3], [3,4]]
// Output: 2
// Explanation: The longest chain is [1,2] -> [3,4]

/**
 * @param {number[][]} pairs
 * @return {number}
 */
var findLongestChain = function(pairs) {
    pairs.sort((a, b) => a[1] - b[1]);
    
    let last = Number.NEGATIVE_INFINITY;
    let count = 0;
    
    for (let pair of pairs) {
        if (pair[0] > last) {
            count ++;
            last = pair[1];
        }
    }

    return count;
};

console.log(findLongestChain(
    [[2,3], [3,4], [1,2]]
));// 2

console.log(findLongestChain(
    [[9,10],[9,10],[4,5],[-9,-3],[-9,1],[0,3],[6,10],[-5,-4],[-7,-6]]
)); // 5

console.log(findLongestChain(
    [[7,9],[4,5],[7,9],[-7,-1],[0,10],[3,10],[3,6],[2,3]]
)); // 4