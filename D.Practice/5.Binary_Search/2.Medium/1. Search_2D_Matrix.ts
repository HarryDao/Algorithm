// https://leetcode.com/problems/search-a-2d-matrix/

// Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

// Integers in each row are sorted from left to right.
// The first integer of each row is greater than the last integer of the previous row.
// Example 1:

// Input:
// matrix = [
//   [1,   3,  5,  7],
//   [10, 11, 16, 20],
//   [23, 30, 34, 50]
// ]
// target = 3
// Output: true
// Example 2:

// Input:
// matrix = [
//   [1,   3,  5,  7],
//   [10, 11, 16, 20],
//   [23, 30, 34, 50]
// ]
// target = 13
// Output: false

function searchMatrix(matrix: number[][], target: number): boolean {
    if (!matrix.length || !matrix[0].length) return false;

    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    if (target < matrix[0][0] || target > matrix[ROWS - 1][COLS - 1]) return false;

    function findNumberByIndex(index: number) {
        const row = Math.floor(index / COLS);
        const col = index - row * COLS;

        return matrix[row][col];
    }

    let startIndex = 0;
    let endIndex = ROWS * COLS - 1;

    while (startIndex <= endIndex) {
        if (startIndex === endIndex) {
            return findNumberByIndex(startIndex) === target;
        }

        const midIndex = Math.floor(startIndex / 2 + endIndex / 2);
        const mid = findNumberByIndex(midIndex);
        // console.log('mid:', startIndex, endIndex, midIndex, mid);
        if (mid === target) {
            return true;
        } else if (mid < target) {
            startIndex = midIndex + 1;
        } else {
            endIndex  = midIndex;
        }
    }

    return false;
};

console.log(searchMatrix([
    [1,   3,  5,  7],
    [10, 11, 16, 20],
    [23, 30, 34, 50]
  ], 3));

console.log(searchMatrix([[1]], 1));