// https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/

import { remove } from "lodash";

// Given a string s of '(' , ')' and lowercase English characters. 

// Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses string is valid and return any valid string.

// Formally, a parentheses string is valid if and only if:

// It is the empty string, contains only lowercase characters, or
// It can be written as AB (A concatenated with B), where A and B are valid strings, or
// It can be written as (A), where A is a valid string.

function minRemoveToMakeValid(s: string): string {
    const chrs = s.split('');
    const removeIndices: number[] = [];
    const trackIndices: number[] = [];
    let count = 0;
    
    chrs.forEach((chr, index) => {
        if (chr === '(') {
            count += 1;
            trackIndices.push(index);
        } else if (chr === ')') {
            if (count > 0) {
                count -= 1;
                trackIndices.pop();
            } else {
                removeIndices.push(index);
            }
        }
    });

    [...removeIndices, ...trackIndices].forEach((index) => {
        chrs[index] = '';
    });

    return chrs.join('');
};

console.log(minRemoveToMakeValid('lee(t(c)o)de)'));
console.log(minRemoveToMakeValid('a)b(c)d'));
console.log(minRemoveToMakeValid('))(('));
console.log(minRemoveToMakeValid('(a(b(c)d)'));