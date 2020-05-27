// https://leetcode.com/problems/decode-string/

// Given an encoded string, return its decoded string.

// The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

// You may assume that the input string is always valid; No extra white spaces, square brackets are well-formed, etc.

// Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there won't be input like 3a or 2[4].

// Examples:

// s = "3[a]2[bc]", return "aaabcbc".
// s = "3[a2[c]]", return "accaccacc".
// s = "2[abc]3[cd]ef", return "abcabccdcdcdef".

/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
    const chrStack = [[]];
    const numStack = [];
    const isNumber = /[0-9]/;
    const isChr = /[a-z]/i;
    const isOpenBracket = /\[/;
    const isCloseBracket = /\]/;
    let num = '';

    function addNum() {
        numStack.push(num ? Number(num) : 1);
        num = '';
    }

    function mergeString() {
        const latestChrs = chrStack.pop();

        let str = '';
        for (let i = latestChrs.length - 1; i >=0; i--) {
            str = latestChrs[i].repeat(numStack.pop()) + str;
        }

        if (chrStack.length) {
            chrStack[chrStack.length - 1].push(str);
        } else {
            return str;
        }
    }

    for (let chr of s) {
        if (chr.match(isNumber)) {
            num += chr;
        }
        if (chr.match(isChr)) {
            chrStack[chrStack.length - 1].push(chr);
            addNum();
        }
        if (chr.match(isOpenBracket)) {
            chrStack.push([]);
            addNum();
        }
        if (chr.match(isCloseBracket)) {
            mergeString();
        }
    }

    return mergeString();
};

console.log(decodeString('d3[a2[c]]')); // "daccaccacc"


// d3[a2[c]]

// [[d, acc]]
// [1, 3]

// daccaccacc