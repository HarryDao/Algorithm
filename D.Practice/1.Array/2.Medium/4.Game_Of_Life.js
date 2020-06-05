// https://leetcode.com/problems/game-of-life/

// According to the Wikipedia's article: "The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970."

// Given a board with m by n cells, each cell has an initial state live (1) or dead (0). Each cell interacts with its eight neighbors (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):

// Any live cell with fewer than two live neighbors dies, as if caused by under-population.
// Any live cell with two or three live neighbors lives on to the next generation.
// Any live cell with more than three live neighbors dies, as if by over-population..
// Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
// Write a function to compute the next state (after one update) of the board given its current state. The next state is created by applying the above rules simultaneously to every cell in the current state, where births and deaths occur simultaneously.

// Example:

// Input: 
// [
//   [0,1,0],
//   [0,0,1],
//   [1,1,1],
//   [0,0,0]
// ]
// Output: 
// [
//   [0,0,0],
//   [1,0,1],
//   [0,1,1],
//   [0,1,0]
// ]
// Follow up:

// Could you solve it in-place? Remember that the board needs to be updated at the same time: You cannot update some cells first and then use their updated values to update other cells.
// In this question, we represent the board using a 2D array. In principle, the board is infinite, which would cause problems when the active area encroaches the border of the array. How would you address these problems?

/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

// O(m * n)
// O(1)

var gameOfLife = function(board) {
    if (!board.length || !board[0].length) return board;

    const ROWS = board.length;
    const COLS = board[0].length;

    for (let row = 0; row < ROWS; row ++) {
        for (let col = 0; col < COLS; col ++) {
            const now = board[row][col];
            const count = [
                [row - 1, col - 1],
                [row - 1, col],
                [row - 1, col + 1],
                [row, col - 1],
                [row, col + 1],
                [row + 1, col - 1],
                [row + 1, col],
                [row + 1, col + 1]
            ].reduce((count, [r, c]) => {
                const isLive = board[r] && (board[r][c] === 1 || board[r][c] === -1);
                return count + !!isLive;
            }, 0);

            if (now && count < 2) {
                board[row][col] = -1;
            } else if (now && count > 3) {
                board[row][col] = -1;
            } else if (!now && count === 3) {
                board[row][col] = 2;
            }
        }
    }

    for (let row = 0; row < ROWS; row ++) {
        for (let col = 0; col < COLS; col ++) {
            board[row][col] = board[row][col] > 0 ? 1 : 0;
        }
    }

    return board;
}

// 0 => 2
// 1 => -1

/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

// O(m * n)
// O(m * n)

var gameOfLifeNormal = function(board) {
    if (!board.length || !board[0].length) return board;

    const ROWS = board.length;
    const COLS = board[0].length;
    const changes = [];

    for (let row = 0; row < ROWS; row ++) {
        for (let col = 0; col < COLS; col ++) {
            const now = board[row][col];

            const neighbors = [
                [row - 1, col - 1],
                [row - 1, col],
                [row - 1, col + 1],
                [row, col - 1],
                [row, col + 1],
                [row + 1, col - 1],
                [row + 1, col],
                [row + 1, col + 1]
            ];

            const liveNeighbors = neighbors.filter(([r, c]) => board[r] && board[r][c]).length;

            let next = now;

            if (now && liveNeighbors < 2) {
                next = 0;
            } else if (now && liveNeighbors >= 2 && liveNeighbors <= 3) {
                next = 1;
            } else if (now && liveNeighbors > 3) {
                next = 0;
            } else if (!now && liveNeighbors === 3) {
                next = 1;
            }

            if (next !== now) {
                changes.push([row, col]);
            }
        }
    }

    changes.forEach(([r, c]) => {
        board[r][c] = 1 - board[r][c];
    });

    return board;
};


console.log(gameOfLife(
    [
        [0,1,0],
        [0,0,1],
        [1,1,1],
        [0,0,0]
    ]
)); // [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]