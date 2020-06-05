// https://leetcode.com/problems/basic-calculator/

// Implement a basic calculator to evaluate a simple expression string.

// The expression string may contain open ( and closing parentheses ), the plus + or minus sign -, non-negative integers and empty spaces .

// Example 1:

// Input: "1 + 1"
// Output: 2
// Example 2:

// Input: " 2-1 + 2 "
// Output: 3
// Example 3:

// Input: "(1+(4+5+2)-3)+(6+8)"
// Output: 23

/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
    const isNum = /[0-9]/;
    const isOperator = /[\+\-]/;
    const nums = [[]];
    const operators = [];
    let numStr = '';

    function pushNum() {
        if (numStr) {
            nums[nums.length - 1].push(Number(numStr));
        }
        numStr = '';
    }

    function perform(stack) {
        if (stack.length === 1) return stack[0];
        
        const num2 = stack.pop();
        const num1 = stack.pop();
        const operator = operators.pop();

        if (operator === '+') {
            return num1 + num2;
        } else if (operator === '-') {
            return num1 - num2;
        }

        return null;        
    }

    for (let chr of s) {
        if (isNum.test(chr)) {
            numStr += chr;
        } else if (isOperator.test(chr)) {
            pushNum();
            const last = nums[nums.length - 1];
            if (last.length === 2) {
                last.push(perform(last));
            }
            operators.push(chr);
        } else if (chr === '(') {
            nums.push([]);
        } else if (chr === ')') {
            pushNum();
            const last = nums.pop();
            nums[nums.length - 1].push(
                perform(last)
            );
        }
    }

    pushNum();
    const last = nums.pop();

    if (operators.length) {
        return perform(last);
    }

    return last[0];
};


// console.log(calculate(
//     "1 + 1"
// )); // 2

// console.log(calculate(
//     '2-1 + 2 '
// )); // 3 

// console.log(calculate(
//     "(1+(4+5+2)-3)+(6+8)"
// )); //

console.log(calculate(
    '(1)'
)); //
