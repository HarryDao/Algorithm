// https://leetcode.com/problems/rotting-oranges/

// In a given grid, each cell can have one of three values:

// the value 0 representing an empty cell;
// the value 1 representing a fresh orange;
// the value 2 representing a rotten orange.
// Every minute, any fresh orange that is adjacent (4-directionally) to a rotten orange becomes rotten.

// Return the minimum number of minutes that must elapse until no cell has a fresh orange.  If this is impossible, return -1 instead.

// Example 1:
// Input: [[2,1,1],[1,1,0],[0,1,1]]
// Output: 4

// Example 2:
// Input: [[2,1,1],[0,1,1],[1,0,1]]
// Output: -1
// Explanation:  The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.

// Example 3:
// Input: [[0,2]]
// Output: 0
// Explanation:  Since there are already no fresh oranges at minute 0, the answer is just 0.

const orangesRotting = function(grid) {
    if (!grid.length || !grid[0].length) return 0;

    const ROWS = grid.length;
    const COLS = grid[0].length;

    let roundCount = 0;
    let rottenCount = 0;
    let totalCount = 0;

    let prevQueue = [];
    let nextQueue = [];

    for (let row = 0; row < ROWS; row ++) {
        for (let col = 0; col < COLS; col ++) {
            if (grid[row][col] !== 0) {
                totalCount += 1;
            }

            if (grid[row][col] === 2) {
                rottenCount += 1;
                nextQueue.push([row, col]);
            }
        }
    }

    while (nextQueue.length && rottenCount < totalCount) {
        prevQueue = nextQueue;
        nextQueue = [];
        let hasRotted = false;
    
        while (prevQueue.length) {
            const [row, col] = prevQueue.shift();

            if (grid[row][col] === 1) {
                grid[row][col] = 2;
                rottenCount += 1;
                hasRotted = true;
            }

            const neighbors = [
                [row - 1, col],
                [row + 1, col], 
                [row, col - 1],
                [row, col + 1]
            ].filter(([r, c]) => {
                return r >= 0 &&
                    r < ROWS &&
                    c >= 0 &&
                    c < COLS &&
                    grid[r][c] === 1
            });
            nextQueue.push(...neighbors);
        }

        if (hasRotted) roundCount += 1;
    }

    return rottenCount < totalCount ? -1 : roundCount;
};

// console.log(orangesRotting(
//     [[2,1,1],[1,1,0],[0,1,1]]
// ));

// console.log(orangesRotting(
//     [[2,1,1],[0,1,1],[1,0,1]]
// ));

console.log(orangesRotting(
    [[0,2]]
))