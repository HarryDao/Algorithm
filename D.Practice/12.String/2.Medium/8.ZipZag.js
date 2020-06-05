// https://leetcode.com/problems/zigzag-conversion/

// The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

// P   A   H   N
// A P L S I I G
// Y   I   R
// And then read line by line: "PAHNAPLSIIGYIR"

// Write the code that will take a string and make this conversion given a number of rows:

// string convert(string s, int numRows);
// Example 1:

// Input: s = "PAYPALISHIRING", numRows = 3
// Output: "PAHNAPLSIIGYIR"
// Example 2:

// Input: s = "PAYPALISHIRING", numRows = 4
// Output: "PINALSIGYAHRPI"
// Explanation:

// P     I    N
// A   L S  I G
// Y A   H R
// P     I

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    if (numRows < 2) return s;
    const result = Array(numRows).fill('');
    let index = 0;
    let add = 1;

    for (let chr of s) {
        if (index === 0) {
            add = 1;
        } else if (index === numRows - 1) {
            add = -1;
        }

        result[index] += chr;
        index += add;
    }

    return result.join('');
};

console.log(convert(
    'PAYPALISHIRING', 4
)); //PINALSIGYAHRPI

console.log(convert(
    'PAYPALISHIRING', 1
)); 