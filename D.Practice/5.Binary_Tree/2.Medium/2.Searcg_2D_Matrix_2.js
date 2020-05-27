// https://leetcode.com/problems/search-a-2d-matrix-ii/

// Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

// Integers in each row are sorted in ascending from left to right.
// Integers in each column are sorted in ascending from top to bottom.
// Example:

// Consider the following matrix:

// [
//   [1,   4,  7, 11, 15],
//   [2,   5,  8, 12, 19],
//   [3,   6,  9, 16, 22],
//   [10, 13, 14, 17, 24],
//   [18, 21, 23, 26, 30]
// ]
// Given target = 5, return true.

// Given target = 20, return false.

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrixBinarySearch = function(matrix, target) {
    if (!matrix.length || !matrix[0].length) return false;

    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    let [rowGap, colGap] = ROWS <= COLS ? [1, COLS / ROWS] : [ROWS / COLS, 1];

    let prev = null;
    let current = { row: 0, col: 0 };

    while (
        Math.round(current.row) < ROWS &&
        Math.round(current.gap) < COLS
    ) {
        

        prev = current;
        current = {
            row: current.row + rowGap,
            col: current.col + colGap,
        }
        current.row += rowGap;
        current.col += colGap;
    }
};


console.log(searchMatrixBinarySearch(
    [
        [1,   4,  7, 11, 15],
        [2,   5,  8, 12, 19],
        [3,   6,  9, 16, 22],
        [10, 13, 14, 17, 24],
        [18, 21, 23, 26, 30]
    ], 15
));