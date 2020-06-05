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


/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
function searchMatrixIterate (matrix, target) {
    if (!matrix.length || !matrix[0].length) return false;

    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    function findNumber(index) {
        const row = Math.ceil((index + 1) / COLS);
        const col = index + 1 - (row - 1) * COLS;
        return matrix[row - 1][col - 1];
    }

    let start = 0;
    let end = COLS * ROWS - 1;

    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        const midNumber = findNumber(mid);
        if (target === midNumber) {
            return true;
        } else if (target < midNumber) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }

    return false;
}

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
function searchMatrixRecursive (matrix, target) {
    if (!matrix.length || !matrix[0].length) return false;

    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    function findNumber(index) {
        const row = Math.ceil((index + 1) / COLS);
        const col = index + 1 - (row - 1) * COLS;
        return matrix[row - 1][col - 1];
    }

    return (function search(start, end) {
        if (start >= end) return findNumber(start) === target;

        const mid = Math.floor((end + start) / 2);
        const midNumber = findNumber(mid);

        if (target === midNumber) {
            return true;
        } else if (target > midNumber) {
            return search(mid + 1, end);
        } else {
            return search(start, mid - 1);
        }
    })(0, ROWS * COLS - 1);
}


/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
function searchMatrixNaive (matrix, target) {
    if (!matrix.length) return false;

    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    if (target < matrix[0][0]) return false;
    if (target > matrix[ROWS - 1][COLS - 1]) return false;

    const rowIndex = (function searchRow(start, end) {
        if (start >= end) return start;

        const mid = Math.floor((start + end) / 2);
        const first = matrix[mid][0];
        const last = matrix[mid][COLS - 1];

        if (first <= target && target <= last) {
            return mid;
        } else if (first > target) {
            return searchRow(start, mid - 1);
        } else {
            return searchRow(mid + 1, end);
        }
    })(0, ROWS - 1);
    
    const row = matrix[rowIndex];

    const colIndex = (function searchCol(start = 0, end = COLS - 1) {
        if (start >= end) {
            return target === row[start] ? start : null
        };

        const mid = Math.floor((end + start) / 2);

        if (target === row[mid]) {
            return mid;
        } else if (target > row[mid]) {
            return searchCol(mid + 1, end);
        } else {
            return searchCol(start, mid - 1);
        };
    })();

    if (colIndex === null) return false;

    return true;
};

// console.log(searchMatrix([
//     [1,   3,  5,  7],
//     [10, 11, 16, 20],
//     [23, 30, 34, 50]]
// , 16
// ))

console.log(searchMatrixIterate(
    [[1,3,5,7],[10,11,16,20],[23,30,34,50]], 5
))

