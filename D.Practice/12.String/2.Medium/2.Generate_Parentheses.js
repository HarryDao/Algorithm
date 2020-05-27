// https://leetcode.com/problems/generate-parentheses/

// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

// For example, given n = 3, a solution set is:

// [
//   "((()))",
//   "(()())",
//   "(())()",
//   "()(())",
//   "()()()"
// ]


/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const result = [];

    (function add (open, close, string) {
        if (open > close) return;
        if (open === 0 && close === 0) result.push(string);
        if (open > 0) add(open - 1, close, string + '(');
        if (close > 0) add(open, close - 1, string + ')');
    })(n, n, '');

    return result;
}



/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis2 = function(n) {
    const OPEN = '(';
    const CLOSE = ')';

    const combinations = [{
        string: '',
        currentOpenings: 0,
        openings: n,
        closings: n
    }];
    const result = [];

    while (combinations.length) {
        const { string, currentOpenings, openings, closings } = combinations.pop();
        const addOpening = {
            string: string + OPEN,
            currentOpenings: currentOpenings + 1,
            openings: openings - 1,
            closings
        }
        const addClosing = {
            string: string + CLOSE,
            currentOpenings: currentOpenings - 1,
            openings,
            closings: closings - 1
        }

        if (!currentOpenings && !openings && !closings) {
            result.push(string);
        } else if (!currentOpenings > 0) {
            if (openings > 0) {
                combinations.push(addOpening);
            }
        } else {
            if (openings > 0) {
                combinations.push(addOpening);
            }
            if (closings > 0) {
                combinations.push(addClosing)
            }
        }
    }

    return result;
};

console.log(generateParenthesis(
    3
)); // ["((()))","(()())","(())()","()(())","()()()"]

console.log(generateParenthesis(
    4
)); // ["(((())))","((()()))","((())())","((()))()","(()(()))","(()()())","(()())()","(())(())","(())()()","()((()))","()(()())","()(())()","()()(())","()()()()"]