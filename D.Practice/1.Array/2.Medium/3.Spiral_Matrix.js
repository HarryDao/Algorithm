// https://leetcode.com/problems/spiral-matrix/

// Given a matrix of m x n elements (m rows, n columns), return all elements of the matrix in spiral order.

// Example 1:

// Input:
// [
//  [ 1, 2, 3 ],
//  [ 4, 5, 6 ],
//  [ 7, 8, 9 ]
// ]
// Output: [1,2,3,6,9,8,7,4,5]
// Example 2:

// Input:
// [
//   [1, 2, 3, 4],
//   [5, 6, 7, 8],
//   [9,10,11,12]
// ]
// Output: [1,2,3,4,8,12,11,10,9,5,6,7]

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    if (!matrix.length || !matrix[0].length) return [];

    const ROW = matrix.length;
    const COL = matrix[0].length;

    let row = 0;
    let col = 0;
    let proceedable = true;
    let proceedOnRow = true;

    const result = [];

    loop1:
    while (proceedable) {
        result.push(matrix[row][col]);
        
        matrix[row][col] = null;

        const nextOnRows = [
            [row, col - 1, true],
            [row, col + 1, true],
        ];

        const nextOnCols = [
            [row - 1, col, false],
            [row + 1, col, false],
        ];
        
        const nexts = proceedOnRow ?
            [...nextOnRows, ...nextOnCols] :
            [...nextOnCols, ...nextOnRows];

        proceedable = false;
        
        loop2:
        for (let next of nexts) {
            if (
                next[0] >= 0 &&
                next[0] < ROW &&
                next[1] >= 0 &&
                next[1] < COL &&
                matrix[next[0]][next[1]] !== null
            ) {
                row = next[0];
                col = next[1];
                proceedOnRow = next[2];
                proceedable = true;
                break loop2;
            }
        }
    }

    return result;
};

console.log(spiralOrder(
    [
        [ 1, 2, 3 ],
        [ 4, 5, 6 ],
        [ 7, 8, 9 ]
    ]
)); // [1,2,3,6,9,8,7,4,5]