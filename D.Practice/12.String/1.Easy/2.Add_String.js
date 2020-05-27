// https://leetcode.com/problems/add-strings/

// Given two non-negative integers num1 and num2 represented as string, return the sum of num1 and num2.

// Note:

// The length of both num1 and num2 is < 5100.
// Both num1 and num2 contains only digits 0-9.
// Both num1 and num2 does not contain any leading zero.
// You must not use any built-in BigInteger library or convert the inputs to integer directly.

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
    const length1 = num1.length;
    const length2 = num2.length;
    const length = Math.max(length1, length2);
    let added = 0;
    let result = '';

    for (let i = 0; i < length; i++) {
        const index1 = length1 - 1 - i;
        const index2 = length2 - 1 - i;
        const digit1 = index1 >= 0 ? num1[index1] : 0;
        const digit2 = index2 >= 0 ? num2[index2] : 0;
        const sum = Number(digit1) + Number(digit2);
        result = (sum + added) % 10 + result;
        added = Math.floor((sum + added) / 10);
    }

    if (added) result = added + result;

    return result;
};

// console.log(addStrings(
//     '827', '626'
// )); //

console.log(addStrings(
    '584', '18'
)); // 