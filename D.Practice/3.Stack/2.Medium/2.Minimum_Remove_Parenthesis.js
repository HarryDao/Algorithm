// https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/

// Given a string s of '(' , ')' and lowercase English characters. 

// Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses string is valid and return any valid string.

// Formally, a parentheses string is valid if and only if:

// It is the empty string, contains only lowercase characters, or
// It can be written as AB (A concatenated with B), where A and B are valid strings, or
// It can be written as (A), where A is a valid string.

/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function(s) {
    let openings = [];
    let closings = [];
    
    for (let index = 0; index < s.length; index ++) {
        const chr = s[index];
        
        if (chr === '(') {
            openings.push(index);
        }

        if (chr === ')') {
            if (openings.length) {
                openings.pop();
            } else {
                closings.push(index);
            }
        }
    }

    const arr = s.split('');
    
    [...openings, ...closings].forEach(index => {
        arr[index] = ''
    });

    return arr.join('');
};

// console.log(minRemoveToMakeValid("lee(t(c)o)de)haha"));
console.log(minRemoveToMakeValid(")i()()((fm(((()"));