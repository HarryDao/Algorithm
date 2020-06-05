// https://leetcode.com/problems/minimum-size-subarray-sum/

// Given an array of n positive integers and a positive integer s, find the minimal length of a contiguous subarray of which the sum ≥ s. If there isn't one, return 0 instead.

// Example: 

// Input: s = 7, nums = [2,3,1,2,4,3]
// Output: 2
// Explanation: the subarray [4,3] has the minimal length under the problem constraint.
// Follow up:
// If you have figured out the O(n) solution, try coding another solution of which the time complexity is O(n log n). 


/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLenBest = function(s, nums) {
    let start = 0;
    let end = 0;
    let total = nums[0];
    let min = 0;

    while (start <= end && end < nums.length) {
        if (total >= s) {
            min = min ? Math.min(min, end - start + 1) : end - start + 1;
        }

        if (total <= s) {
            end += 1;
            total += nums[end];
        } else {
            total -= nums[start];
            start += 1;
        }
    }

    return min;
}


var minSubArrayLenBST = function(s, nums) {
    let total = 0;
    const sums = nums.map(num => {
        total += num;
        return num;
    });


}


/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */

// O(N ** 2)

var minSubArrayLenNaive = function(s, nums) {
    let prev = [];
    let min = 0;

    for (let i = nums.length - 1; i >= 0; i --) {
        const num = nums[i];
        const next = [];
        
        prev.push({ sum: 0, index: i });

        prev.forEach(({ sum, index }) => {
            if (sum + num < s) {
                next.push({
                    sum: sum + num,
                    index
                });
            } else {
                const diff = index - i + 1;
                min = min ? Math.min(min, diff) : diff;
            }
        });

        prev = next;
    }

    return min;
};

console.log(minSubArrayLen(
    7,
    [2,3,1,2,4,3]
)); //