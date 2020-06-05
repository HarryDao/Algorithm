// https://leetcode.com/problems/verifying-an-alien-dictionary/

// In an alien language, surprisingly they also use english lowercase letters, but possibly in a different order. The order of the alphabet is some permutation of lowercase letters.

// Given a sequence of words written in the alien language, and the order of the alphabet, return true if and only if the given words are sorted lexicographicaly in this alien language.

 

// Example 1:

// Input: words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
// Output: true
// Explanation: As 'h' comes before 'l' in this language, then the sequence is sorted.
// Example 2:

// Input: words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
// Output: false
// Explanation: As 'd' comes after 'l' in this language, then words[0] > words[1], hence the sequence is unsorted.
// Example 3:

// Input: words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
// Output: false
// Explanation: The first three characters "app" match, and the second string is shorter (in size.) According to lexicographical rules "apple" > "app", because 'l' > '∅', where '∅' is defined as the blank character which is less than any other character (More info).

/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
var isAlienSorted = function(words, order) {
    if (words.length < 2) return true;

    const map = {};
    for (let i = 0; i < order.length; i ++) {
        map[order[i]] = i + 1;
    }

    loop1:
    for (let i = 1, l = words.length; i < l; i++) {
        const prev = words[i - 1];
        const current = words[i];
        const length = Math.max(prev.length, current.length);
        
        loop2:
        for (let j = 0; j < length; j ++) {
            if (!prev[j]) {
                break loop2;
            } else if (!current[j]) {
                return false;
            } else if (map[prev[j]] === map[current[j]]) {
                continue;
            } else if (map[prev[j]] < map[current[j]]) {
                break loop2;
            } else {
                return false;
            }
        }
    }

    return true;
};

console.log(isAlienSorted(
    ["hello","leetcode"],
    "hlabcdefgijkmnopqrstuvwxyz"
)); // true

console.log(isAlienSorted(
    ["word","world","row"],
    "worldabcefghijkmnpqstuvxyz"
)); // true

console.log(isAlienSorted(
    ["apple","app"],
    "abcdefghijklmnopqrstuvwxyz"
)); // false