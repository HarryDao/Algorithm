// https://leetcode.com/problems/max-area-of-island/

// Given a non-empty 2D array grid of 0's and 1's, an island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

// Find the maximum area of an island in the given 2D array. (If there is no island, the maximum area is 0.)

// Example 1:

// [[0,0,1,0,0,0,0,1,0,0,0,0,0],
//  [0,0,0,0,0,0,0,1,1,1,0,0,0],
//  [0,1,1,0,1,0,0,0,0,0,0,0,0],
//  [0,1,0,0,1,1,0,0,1,0,1,0,0],
//  [0,1,0,0,1,1,0,0,1,1,1,0,0],
//  [0,0,0,0,0,0,0,0,0,0,1,0,0],
//  [0,0,0,0,0,0,0,1,1,1,0,0,0],
//  [0,0,0,0,0,0,0,1,1,0,0,0,0]]
// Given the above grid, return 6. Note the answer is not 11, because the island must be connected 4-directionally.
// Example 2:

// [[0,0,0,0,0,0,0,0]]
// Given the above grid, return 0.
// Note: The length of each dimension in the given grid does not exceed 50.

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
    if (!grid.length || !grid[0].length) return 0;
    
    const ROWS = grid.length;
    const COLS = grid[0].length;
    let count = 0;
    let max = 0;

    for (let r = 0; r < ROWS; r ++) {
        for (let c =0; c < COLS; c++) {
            const value = grid[r][c];
            if (value === 0) {
                continue;
            }

            stack = [[r, c]];
            count = 0;
            while (stack.length) {
                const [r, c] = stack.pop();
                if (grid[r][c]) {
                    count += 1;
                    grid[r][c] = 0;
                }
                const neighbors = [
                    [r - 1, c],
                    [r + 1, c],
                    [r, c - 1],
                    [r, c + 1]
                ];
                neighbors.forEach(([rN, cN]) => {
                    if (rN < 0 || rN >= ROWS || cN < 0 || cN >= COLS) {
                        return;
                    } else if (grid[rN][cN]) {
                        stack.push([rN, cN]);
                    }
                });
            }
            max = Math.max(max, count);
        }
    }

    return max;
};

console.log(maxAreaOfIsland(
    [[0,0,1,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,1,1,0,1,0,0,0,0,0,0,0,0],
    [0,1,0,0,1,1,0,0,1,0,1,0,0],
    [0,1,0,0,1,1,0,0,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,1,1,0,0,0,0]]
)); //

// console.log(maxAreaOfIsland([
//     [0, 0, 1],
//     [0, 1, 1],
//     [1, 0, 0],
// ]));