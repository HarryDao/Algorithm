// https://leetcode.com/problems/group-anagrams/

// Given an array of strings, group anagrams together.

// Example:

// Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
// Output:
// [
//   ["ate","eat","tea"],
//   ["nat","tan"],
//   ["bat"]
// ]
// Note:

// All inputs will be in lowercase.
// The order of your output does not matter.

/**
 * @param {string[]} strs
 * @return {string[][]}
 */

// Time: O(n * k);
// Space: O(n * k);

var groupAnagramsHash = function(strs) {
    const map = {};

    function hash(str) {
        const count = Array(24).fill(0);

        for (let chr of str) {
            count[chr.charCodeAt(0) - 97] += 1;    
        }

        return count.join('-');
    }

    for (let str of strs) {
        const hashed = hash(str);
        if (map[hashed]) {
            map[hashed].push(str);
        } else {
            map[hashed] = [str];
        }
    }

    return Object.values(map);
}


/**
 * @param {string[]} strs
 * @return {string[][]}
 */

// Time: O(n * k * log(k));
// Space: O(n * k)

var groupAnagramsSort = function(strs) {
    const groups = {};
    for (let str of strs) {
        const sorted = str.split('').sort().join('');
        if (groups[sorted]) {
            groups[sorted].push(str);
        } else {
            groups[sorted] = [str];
        }
    }

    return Object.values(groups);
};




console.log(groupAnagramsHash(
    ["eat","tea","tan","ate","nat","bat"]
)); // [["bat"],["nat","tan"],["ate","eat","tea"]]