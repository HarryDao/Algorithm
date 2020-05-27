// https://leetcode.com/problems/longest-substring-without-repeating-characters/

// Given a string, find the length of the longest substring without repeating characters.

// Example 1:

// Input: "abcabcbb"
// Output: 3 
// Explanation: The answer is "abc", with the length of 3. 
// Example 2:

// Input: "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.
// Example 3:

// Input: "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3. 
//              Note that the answer must be a substring, "pwke" is a subsequence and not a substring

/**
 * @param {string} s
 * @return {number}
 */

// Time: O(n)
// Space: O(n)

var lengthOfLongestSubstring = function(s) {
    const map = {};
    let start = 0;
    let end = 0;
    let max = 0;

    for (let end = 0; end < s.length; end ++) {
        const chr = s[end];
        if (map.hasOwnProperty(chr) && map[chr] >= start) {
            start = map[chr] + 1;
            map[chr] = end;
        } else {
            map[chr] = end;
            max = Math.max(end - start + 1, max);
        }
    }

    return max;
};

console.log(lengthOfLongestSubstring(
    "abcabcbb"
)); // 3

console.log(lengthOfLongestSubstring(
    "pwwkew"
)); // 3