// https://leetcode.com/problems/longest-increasing-subsequence/

// Given an unsorted array of integers, find the length of longest increasing subsequence.

// Example:

// Input: [10,9,2,5,3,7,101,18]
// Output: 4 
// Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4. 
// Note:

// There may be more than one LIS combination, it is only necessary for you to return the length.
// Your algorithm should run in O(n2) complexity.
// Follow up: Could you improve it to O(n log n) time complexity?

/**
 * @param {number[]} nums
 * @return {number}
 */

// Binary Search

// O(N * LogN)
// O(N)


var lengthOfLISBest = function (nums) {
    const result = [];

    for (const num of nums) {
        if (!result.length) {
            result.push(num);
        } else if (result[0] > num) {
            result[0] = num;
        } else if (result[result.length - 1] < num) {
            result.push(num);
        } else {
            let start = 0;
            let end = result.length - 1;
            
            while (start + 1 < end) {
                const mid = Math.floor((end + start) / 2);
                if (num > result[mid]) {
                    start = mid;
                } else {
                    end = mid;
                }
            }

            if (num === result[start]) {
                result[start] = num;
            } else if (num > result[start]) {
                result[start + 1] = num;
            } else {
                result[start - 1] = num;
            }
        }
    }

    return result.length;
}

// 6 8 10 => 9
// 

// 6 8 10 12 => 9
// 10 >
// 8 => 8 + 1;


/**
 * @param {number[]} nums
 * @return {number}
 */

// O(N ** 2)
// O(N)

var lengthOfLISBetter = function(nums) {
    const result = [];
    
    for (let num of nums) {
        if (!result.length) {
            result.push(num);
        } else if (result[0] >= num) {
            result[0] = num;
        } else if (result[result.length - 1] <= num) {
            result.push(num);
        } else {
            let start = 0;
            while(start < result.length) {
                if (result[start] >= num) break;
                start += 1;
            }
            result[start] = num;
        }
    }
    
    return result.length;
}

/**
 * @param {number[]} nums
 * @return {number}
 */

// O(> N ** 2)
// O(N ** 2);

var lengthOfLISNormal = function(nums) {
    let seqs = [];

    for (const num of nums) {
        const next = [];
        
        let added = false;
            
        seqs.forEach(array => {
            const filtered = array.filter(n => n < num);

            if (filtered.length) {
                added = true;
                next.push([...filtered, num]);
            }

            if (filtered.length !== array.length) {
                next.push(array);
            }
        });

        if (!added) next.push([num]);

        seqs = next;
    }
    
    return seqs.length ? Math.max(...seqs.map(seq => seq.length)) : 0;
};

// console.log(lengthOfLIS(
//     [10,9,2,5,3,7,101,18]
// )); // 4

// console.log(lengthOfLIS(
//     [3, 1, 2]
// )); // 2

// console.log(lengthOfLIS(
//     [11,12,13,14,15,6,7,8, 9, 10,101,18]
// )); // 6

// console.log(lengthOfLIS(
//     [2, 2, 2]
// )); // 1

console.log(lengthOfLIS(
    [10,9,2,5,3,4]
)); // 4