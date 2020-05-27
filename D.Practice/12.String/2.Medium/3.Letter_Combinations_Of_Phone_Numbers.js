// https://leetcode.com/problems/letter-combinations-of-a-phone-number/

// Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.

// A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.


// Example:

// Input: "23"
// Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    const map = {
        '2': [ 'a', 'b', 'c' ],
        '3': [ 'd', 'e', 'f' ],
        '4': [ 'g', 'h', 'i' ],
        '5': [ 'j', 'k', 'l' ],
        '6': [ 'm', 'n', 'o' ],
        '7': [ 'p', 'q', 'r', 's'],
        '8': [ 't', 'u', 'v' ],
        '9': [ 'w', 'x', 'y', 'z' ]
    };

    let result = [];

    for (let digit of digits) {
        if (!result.length) {
            result = map[digit];
            continue;
        }

        const next = [];
        map[digit].forEach(chr => {
           next.push(...result.map(str => str + chr)) 
        });

        result = next;
    }

    return result;
};



console.log(letterCombinations(
    "23"
)); // ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].