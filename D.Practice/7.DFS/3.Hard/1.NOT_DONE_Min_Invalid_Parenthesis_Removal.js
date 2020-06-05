// https://leetcode.com/problems/remove-invalid-parentheses/

// Remove the minimum number of invalid parentheses in order to make the input string valid. Return all possible results.

// Note: The input string may contain letters other than the parentheses ( and ).

// Example 1:

// Input: "()())()"
// Output: ["()()()", "(())()"]
// Example 2:

// Input: "(a)())()"
// Output: ["(a)()()", "(a())()"]
// Example 3:

// Input: ")("
// Output: [""]

function removeInvalidParenthesesNaive(s) {
    let max = 0;
    let maxMap = {};
    let prev = [{ count: 0, string: '' }];

    function addToMax(count, string) {
        if (count > 0) {
            return false;
        }

        if (count === 0) {
            if (string.length === max) {
                maxMap[string] = true;
            } else if (string.length > max) {
                max = string.length;
                maxMap = { [string]: true };
            }
        }

        return true;
    }

    for (let i = s.length - 1; i >= 0; i--) {
        const chr = s[i];
        const add = chr === '(' ? 1 : (chr === ')' ? -1 : 0);

        prev.forEach(({ count, string }) => {
            count += add;
            string = chr + string;

            if (addToMax(count, string)) {
                prev.push({ count, string });
            }
        });
    }

    const array = Object.keys(maxMap);
    return array.length ? array : [''];
}

console.log(removeInvalidParentheses(
    '()())()'
)); //

// console.log(removeInvalidParentheses(
//     ")))(a)())))()("
// )); //

console.log(removeInvalidParentheses(
    '())()))'
)); //'

console.log(removeInvalidParentheses(
    '))((()'
)); //

// [ 1, 0, -1, 0, -1, -2 ]
// [0, 1, 2], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5]
// 1,          1,              2