// https://leetcode.com/problems/different-ways-to-add-parentheses/

// Given a string of numbers and operators, return all possible results from computing all the different possible ways to group numbers and operators. The valid operators are +, - and *.

// Example 1:

// Input: "2-1-1"
// Output: [0, 2]
// Explanation: 
// ((2-1)-1) = 0 
// (2-(1-1)) = 2
// Example 2:

// Input: "2*3-4*5"
// Output: [-34, -14, -10, -10, 10]
// Explanation: 
// (2*(3-(4*5))) = -34 
// ((2*3)-(4*5)) = -14 
// ((2*(3-4))*5) = -10 
// (2*((3-4)*5)) = -10 
// (((2*3)-4)*5) = 10


/**
 * @param {string} input
 * @return {number[]}
 */
var diffWaysToCompute = function(input) {
    const numbers = [];
    const operators = [];
    let num = '';

    for (let chr of input) {
        if (/[0-9]/.test(chr)) {
            num += `${chr}`;
        } else {
            operators.push(chr);
            numbers.push(Number(num));
            num = '';
        }
    }
    if (num) numbers.push(Number(num));

    function performOperation(num1, num2, operator) {
        if (operator === '+') {
            return num1 + num2;
        }

        if (operator === '-') {
            return num1 - num2;
        }

        if (operator === '*') {
            return num1 * num2;
        }

        if (operator === '/' ) {
            return num1 / num2;
        }
    }

    const map = {};

    for (let i = 0, l = numbers.length; i < l; i++) {
        if (i === 0) {
            map[i] = [numbers[i]];
            continue;
        }

        const current = [];

        if (i >= 2) {
            const next = performOperation(numbers[i - 1], numbers[i], operators[i - 1]);
            map[i - 2].forEach(num => {
                current.push(performOperation(num, next, operators[i - 2]));
            });
        }

        if (i >= 1) {
            map[i - 1].forEach(num => {
                // console.log('1:', performOperation(num, numbers[i], operators[i - 1]));
                current.push(performOperation(num, numbers[i], operators[i - 1]));
            });
        }

        map[i] = current;
        console.log('map:', map);
    }

    return map[numbers.length - 1];
};

// console.log(diffWaysToCompute(
//     "2-1-1"
// )); //[0, 2]

console.log(diffWaysToCompute(
    "2*3-4*5"
)); // 

// 2 3 4 5
// * - *

// [6 4 5], [- *] || [2 -1 5] [* *] || [2 3 20] [* - ]

// 2 * 3 - 4 * 5 + 8


// * - *
// * - *

// 1 2 3
// 1 3 2
// 2 1 3
// 2 3 1
// 3 1 2
// 3 2 1

