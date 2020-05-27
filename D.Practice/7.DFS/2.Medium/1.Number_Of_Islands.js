// https://leetcode.com/problems/number-of-islands/

// Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

// Example 1:

// Input:
// 11110
// 11010
// 11000
// 00000

// Output: 1
// Example 2:

// Input:
// 11000
// 11000
// 00100
// 00011

// Output: 3



/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslandsDFSIterative = function(grid) {
    if (!grid.length || !grid[0].length) return 0;

    const ROWS = grid.length;
    const COLS = grid[0].length;
    let count = 0;

    for (let rowIndex = 0; rowIndex < ROWS; rowIndex ++) {
        for (let colIndex = 0; colIndex < COLS; colIndex ++) {
            if (grid[rowIndex][colIndex] === '1') {
                count += 1;
                const queue = [[rowIndex, colIndex]];
                while (queue.length) {
                    const [r, c] = queue.pop();
                    if (
                        r < 0 ||
                        r >= ROWS ||
                        c < 0 ||
                        c >= COLS ||
                        grid[r][c] !== '1'
                    ) continue;
                    
                    grid[r][c] = '0';
                    queue.push(
                        [r - 1, c],
                        [r + 1, c],
                        [r, c - 1],
                        [r, c + 1]
                    );
                }
            }
        }
    }

    return count;
};


console.log(numIslandsDFSIterative(
    [
        ["1","1","1","1","0"],
        ["1","1","0","1","0"],
        ["1","1","0","0","0"],
        ["0","0","0","0","0"]]
)); // 1

// console.log(numIslands(
//     [["1","0","1","1","0","1","1"]]
// ));





/**
 * @param {character[][]} grid
 * @return {number}
 */

// Time complexity : O(M×N) where MM is the number of rows and NN is the number of columns.

var numIslandsDFSRecursion = function(grid) {
    if (!grid.length || !grid[0].length) return 0;

    const ROWS = grid.length;
    const COLS = grid[0].length;

    function search(rowIndex, colIndex) {
        if (
            rowIndex < 0 ||
            rowIndex > ROWS - 1 ||
            colIndex < 0 ||
            colIndex > COLS - 1 ||
            grid[rowIndex][colIndex] === '0'
        ) return;

        grid[rowIndex][colIndex] = '0';
        
        const neighbors = [
            [rowIndex, colIndex - 1],
            [rowIndex, colIndex + 1],
            [rowIndex - 1, colIndex],
            [rowIndex + 1, colIndex]
        ];

        neighbors.forEach(coords => search(...coords));
    }

    let count = 0;

    for (let rowIndex = 0; rowIndex < ROWS; rowIndex += 1) {
        for (let colIndex = 0; colIndex < COLS; colIndex += 1) {
            if (grid[rowIndex][colIndex] === '1') {
                count += 1;
                search(rowIndex, colIndex)
            }
        }
    }

    return count;
};


function numIslandsBFS(grid) {
    if (!grid.length || !grid[0].length) return 0;

    const ROWS = grid.length;
    const COLS = grid[0].length;
    let count = 0;
    let queue = [];
    
    for (let rowIndex = 0; rowIndex < ROWS; rowIndex += 1) {
        for (let colIndex = 0; colIndex < COLS; colIndex += 1) {
            if (grid[rowIndex][colIndex] === '1') {
                count += 1;
                queue.push([rowIndex, colIndex]);
                while (queue.length) {
                    const [r, c] = queue.shift();
                    if (
                        r < 0 ||
                        r >= ROWS ||
                        c < 0 ||
                        c >= COLS ||
                        grid[r][c] !== '1'
                    ) continue;
                    grid[r][c] = '0';
                    queue.push(
                        [r - 1, c],
                        [r + 1, c],
                        [r, c - 1],
                        [r, c + 1]
                    );
                }
            }
        }
    }

    return count;
}

