// https://leetcode.com/problems/valid-parentheses/

// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
 

// Example 1:

// Input: s = "()"
// Output: true
// Example 2:

// Input: s = "()[]{}"
// Output: true
// Example 3:

// Input: s = "(]"
// Output: false
// Example 4:

// Input: s = "([)]"
// Output: false
// Example 5:

// Input: s = "{[]}"
// Output: true


function isValid(s: string): boolean {
    const CHARS: { [key: string]: string } = {
        '(': ')',
        '{': '}',
        '[': ']',
    };
    const IS_CLOSE = /[\}\)\]]/;

    let stack: string[] = [];

    for (let chr of s) {
        if (CHARS[chr]) {
            stack.push(CHARS[chr]);
        } else if (IS_CLOSE.test(chr)) {
            if (chr !== stack[stack.length - 1]) return false;
            stack.pop();
        }
    }

    return !stack.length;
};

console.log('is:', isValid(')'))