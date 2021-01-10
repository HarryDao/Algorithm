// https://leetcode.com/problems/decode-string/

// Given an encoded string, return its decoded string.

// The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

// You may assume that the input string is always valid; No extra white spaces, square brackets are well-formed, etc.

// Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there won't be input like 3a or 2[4].

// Examples:

// s = "3[a]2[bc]", return "aaabcbc".
// s = "3[a2[c]]", return "accaccacc".
// s = "2[abc]3[cd]ef", return "abcabccdcdcdef".

function decodeString(s: string): string {
    const numStack: number[] = [];
    const chrStack: string[] = [''];
    let currentStr = '';
    let currentNum = '';
    
    for (let chr of s) {
        if (/[a-z]/.test(chr)) {
            currentStr += chr;
        } else if (currentStr) {
            chrStack[chrStack.length - 1] += currentStr;
            currentStr = '';
        }
        
        if (/[0-9]/.test(chr)) {
            currentNum += chr;
        } else if (currentNum) {
            numStack.push(Number(currentNum));
            currentNum = '';
        }

        if (chr === '[') {
            chrStack.push('');
        }

        if (chr === ']') {
            const lastStr = chrStack.pop() as string;
            const lastNum = numStack.pop() as number;
            chrStack[chrStack.length - 1] += lastStr.repeat(lastNum);
        }
        // console.log('chr:', chr, currentStr, currentNum);;
        // console.log('chrStack;', chrStack);
        // console.log('numStack:', numStack);
    }

    return chrStack.pop() + currentStr;
};

console.log(decodeString('3[a2[c]]'));
console.log(decodeString('2[abc]3[cd]ef'));
// 3[a2[c]]
// [3, 2]
// [a, c]
// [3]
// [acc]
// accaccacc


// 2[abc]3[cd]ef
// [2]
// ['', 'abc']
// ['abcabc'];
