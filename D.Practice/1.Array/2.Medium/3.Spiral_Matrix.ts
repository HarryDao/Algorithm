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

interface CoordData {
    x: number;
    y: number;
    dx: number;
    dy: number; 
}

function spiralOrder(matrixInput: number[][]): number[] {
    if (!matrixInput.length || !matrixInput[0].length) return [];
    
    const matrix: (number | null)[][] = JSON.parse(JSON.stringify(matrixInput));
    const result: number[] = [matrix[0][0] as number];
    matrix[0][0] = null;

    const next = ({ x, y, dx, dy }: CoordData): null | CoordData => {
        const possible: [number, number][] = [
            [x + dx, y + dy],
            [x - dx, y - dy],
            [x, y + 1],
            [x, y - 1],
            [x - 1, y],
            [x + 1, y]
        ];

        for (const [nextX, nextY] of possible) {
            if (matrix[nextX] && typeof matrix[nextX][nextY] === 'number') {
                result.push(matrix[nextX][nextY] as number);
                matrix[nextX][nextY] = null;
                return { x: nextX, y: nextY, dx: nextX - x, dy: nextY - y };
            }
        }

        return null;
    }

    let nextData: null | CoordData = {
        x: 0,
        y: 0,
        dx: 0,
        dy: 1
    }
    
    while (nextData) {
        nextData = next(nextData);
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