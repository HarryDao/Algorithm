// https://leetcode.com/problems/partition-labels/

// A string S of lowercase English letters is given. We want to partition this string into as many parts as possible so that each letter appears in at most one part, and return a list of integers representing the size of these parts.

 

// Example 1:

// Input: S = "ababcbacadefegdehijhklij"
// Output: [9,7,8]
// Explanation:
// The partition is "ababcbaca", "defegde", "hijhklij".
// This is a partition so that each letter appears in at most one part.
// A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits S into less parts.
 

// Note:

// S will have length in range [1, 500].
// S will consist of lowercase English letters ('a' to 'z') only.

/**
 * @param {string} S
 * @return {number[]}
 */
var partitionLabels = function(s) {
    if (!s) return [];

    const ends = {};

    for (let index = 0, length = s.length; index < length; index ++) {
        const chr = s[index];
        ends[chr] = index;
    }

    let index = 0;
    let endIndex = 0;
    const counts = [];
    let count = 0;

    while (index < s.length) {
        const chr = s[index];
        count += 1;
        endIndex = Math.max(endIndex, ends[chr]);

        if (index === endIndex) {
            counts.push(count);
            count = 0;
        }

        index ++;
    }

    return counts;
};


console.log(partitionLabels(
    "ababcbacadefegdehijhklij"
));// 