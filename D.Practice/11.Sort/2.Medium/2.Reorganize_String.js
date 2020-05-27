// https://leetcode.com/problems/reorganize-string/

// Given a string S, check if the letters can be rearranged so that two characters that are adjacent to each other are not the same.

// If possible, output any possible result.  If not possible, return the empty string.

// Example 1:

// Input: S = "aab"
// Output: "aba"
// Example 2:

// Input: S = "aaab"
// Output: ""
// Note:

// S will consist of lowercase letters and have length in range [1, 500].

const { GeneralPriorityQueue } = require('../../helpers');

/**
 * @param {string} S
 * @return {string}
 */
var reorganizeString = function(s) {
    const map = {};

    for (let chr of s) {
        map[chr] = map[chr] ? (map[chr] + 1) : 1;
    }

    const pq = new GeneralPriorityQueue(false);

    for (let chr in map) {
        pq.enqueue(map[chr], chr);
    }

    let result = '';
    let temp = null;

    while (pq.list.length) {
        const node = pq.dequeue(true);

        result += node.data;

        if (temp) {
            pq.enqueue(temp.priority, temp.data);
        }

        temp = node.priority < 2 ? null : {
            priority: node.priority - 1,
            data: node.data
        };
    }

    return temp ? '' : result;
};

// console.log(reorganizeString(
//     "aabcc"
// )); //

console.log(reorganizeString(
    'aaba'
)); // ''