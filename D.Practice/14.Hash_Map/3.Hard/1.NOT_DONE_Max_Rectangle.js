// https://leetcode.com/problems/maximal-rectangle/

// Given a 2D binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

// Example:

// Input:
// [
//   ["1","0","1","0","0"],
//   ["1","0","1","1","1"],
//   ["1","1","1","1","1"],
//   ["1","0","0","1","0"]
// ]
// Output: 6

/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangleDynamicProgrammingIterative = function(matrix) {
    if (!matrix.length || !matrix[0].length) return 0;

    const ROWS = matrix.length;
    const COLUMNS = matrix[0].length;

    let count = Array(ROWS).fill(0);
    let max = 0;

    for (let c = COLUMNS - 1; c >= 0; c--) {
        for (let r = ROWS - 1; r >= 0; r--) {
            const value = matrix[r][c];

            if (value === '0') {
                count[r] = 0;
            } else {
                count[r] = 1 + count[r];
                
                let tempRow = count[r];
                let tempColumn = 0;
                let tempMax = 0;

                for (let i = r, l = count.length; i < l; i ++) {
                    if (count[i] === 0) break;
                    tempColumn += 1;
                    tempRow = Math.min(tempRow, count[i]);
                    tempMax = Math.max(tempMax, tempColumn * tempRow);
                }

                max = Math.max(tempMax, max);
            }
        }
    }

    return max;
};

// console.log(maximalRectangle([
//   ["1","0","1","0","0"],
//   ["1","0","1","1","1"],
//   ["1","1","1","1","1"],
//   ["1","0","0","1","0"]    
// ])); // 6

