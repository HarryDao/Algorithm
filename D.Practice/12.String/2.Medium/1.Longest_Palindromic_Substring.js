// https://leetcode.com/problems/longest-palindromic-substring/

// Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

// Example 1:
// Input: "babad"
// Output: "bab"
// Note: "aba" is also a valid answer.

// Example 2:
// Input: "cbbd"
// Output: "bb"



/**
 * @param {string} s
 * @return {string}
 */

// O(n ** 2) time
// O(1) space

var longestPalindrome = function(s) {
    const expandFromCenter = (left, right) => {
        let l = left;
        let r = right;

        while (l >= 0 && r < s.length && s[l] === s[r]) {
            l --;
            r ++;
        }

        return r - l - 1;
    };

    let start = 0; end = 0;

    for (let i = 0; i < s.length; i++) {
        const len1 = expandFromCenter(i, i);
        const len2 = expandFromCenter(i, i + 1);
        const len = Math.max(len1, len2);

        if (len > end - start + 1) {
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
        }
    }

    return s.slice(start, end + 1);
};

console.log(longestPalindrome(
    "babad"
)); // 'bab'






/**
 * @param {string} s
 * @return {string}
 */

// O(n ** 3) time

var longestPalindromeNaive = function(s) {
    const isPalindrom = (begin, last) => {
        let start = begin;
        let end = last;
        while (start < end) {
            if (s[start] !== s[end]) return false;
            start ++;
            end --;
        }
        return true;
    };

    let maxStr = [0, 0];

    for (let start = 0; start < s.length; start ++) {
        for (let end = start + 1; end < s.length; end ++)  {
            if (isPalindrom(start, end)) {
                if (end - start > maxStr[1] - maxStr[0]) {
                    maxStr = [start, end];
                }
            }
        }
    }

    return s.slice(maxStr[0], maxStr[1] + 1);
};

// console.log(longestPalindromeNaive(
//     "babad"
// )); // 'bab'