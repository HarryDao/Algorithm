// https://leetcode.com/problems/basic-calculator-ii/

// The expression string contains only non-negative integers, +, -, *, / operators and empty spaces . The integer division should truncate toward zero.

// Example 1:

// Input: "3+2*2"
// Output: 7
// Example 2:

// Input: " 3/2 "
// Output: 1
// Example 3:

// Input: " 3+5 / 2 "
// Output: 5
// Note:

// You may assume that the given expression is always valid.
// Do not use the eval built-in library function.

/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
    const isDigit = /[0-9]/;
    const isMultiplication = /[\*\/]/;
    const isPlus = /[\+\-]/;

    function perform(num2, num1, operator) {
        let result = num1 / num2;

        if (operator === '+') {
            result = num1 + num2;
        } else if (operator === '-') {
            result = num1 - num2;
        } else if (operator === '*') {
            result = num1 * num2;
        }

        return parseInt(result);
    }

    const numStack = [];
    const operatorStack = [];
    let numStr = '';

    function drainStack() {
        while (operatorStack.length) {
            numStack.push(perform(
                numStack.pop(),
                numStack.pop(),
                operatorStack.pop()
            ));
        }
    }

    for (let chr of s) {
        if (isDigit.test(chr)) {
            numStr += chr;
        } else if (isPlus.test(chr) || isMultiplication.test(chr)) {
            numStack.push(Number(numStr));
            const lastOperator = operatorStack[operatorStack.length - 1];
            numStr = '';

            if (isMultiplication.test(chr)) {
                while (isMultiplication.test(operatorStack[operatorStack.length - 1])) {
                    numStack.push(perform(
                        numStack.pop(),
                        numStack.pop(),
                        operatorStack.pop(),
                    ));                    
                }
            } else {
                drainStack();
            }

            operatorStack.push(chr);
        }
    }

    if (numStr) numStack.push(Number(numStr));
    drainStack();

    return numStack[0];
}


/**
 * @param {string} s
 * @return {number}
 */
var calculateTooNaive = function(s) {
    const isDigit = /[0-9]/;
    const isOperator = /[\+\-\*\/]/;

    const nums = [];
    const operators = [];
    let numStr = '';

    for (let chr of s) {
        if (isDigit.test(chr)) {
            numStr += chr;
        } else if (isOperator.test(chr)) {
            operators.push(chr);
            nums.push(Number(numStr));
            numStr = '';
        }
    }

    if (numStr) nums.push(Number(numStr));

    function perform(num1, num2, operator) {
        let result = num1 / num2;

        if (operator === '+') {
            result = num1 + num2;
        } else if (operator === '-') {
            result = num1 - num2;
        } else if (operator === '*') {
            result = num1 * num2;
        }

        return parseInt(result);
    }

    function eval(withMultiplication) {
        let index = 0;
        while (index < operators.length) {
            const operator = operators[index];
            if (
                withMultiplication && (operator === '*' || operator === '/') ||
                !withMultiplication && (operator === '+' || operator === '-')
            ) {
                nums.splice(
                    index,
                    2,
                    perform(nums[index], nums[index + 1], operator)
                );
                operators.splice(index, 1);
            } else {
                index += 1;
            }
        }
    }

    eval(true);
    eval();

    return nums[0];
};

// console.log(calculate(
//     "3+2*2"
// )); // 7

// console.log(calculate(
//     "3 + 2 - 1 * 2 / 9"
// )); 

console.log(calculate(
    "1*2-3/4+5*6-7*8+9/10"
)); 