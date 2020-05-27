// https://leetcode.com/problems/decode-ways/

// A message containing letters from A-Z is being encoded to numbers using the following mapping:

// 'A' -> 1
// 'B' -> 2
// ...
// 'Z' -> 26
// Given a non-empty string containing only digits, determine the total number of ways to decode it.

// Example 1:

// Input: "12"
// Output: 2
// Explanation: It could be decoded as "AB" (1 2) or "L" (12).
// Example 2:

// Input: "226"
// Output: 3
// Explanation: It could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).


/**
 * @param {string} s
 * @return {number}
 */

// Time: O(n)
// Space: O(1)

var numDecodings = function(s) {
    function isValid(start, end) {
        if (end > s.length - 1) return false;
        const num = Number(s.slice(start, end + 1));
        return num && num > 0 && num <= 26;
    }

    let prev2 = null;
    let prev1 = null;

    for (let i = s.length - 1; i >= 0; i--) {
        let count = 0;

        if (s[i] !== '0') {
            if (isValid(i, i)) {
                count += prev1 === null ? 1 : prev1;
            }
    
            if (isValid(i, i + 1)) {
                count += prev2 === null ? 1: prev2;
            }
        }

        prev2 = prev1;
        prev1 = count;
    }

    return prev1;
};

console.log(numDecodings(
    '12'
)); // 2

console.log(numDecodings(
    '01'
)); // 0

console.log(numDecodings(
    '101'
)); //1