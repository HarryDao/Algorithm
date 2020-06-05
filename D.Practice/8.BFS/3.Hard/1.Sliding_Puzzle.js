// https://leetcode.com/problems/sliding-puzzle/

// On a 2x3 board, there are 5 tiles represented by the integers 1 through 5, and an empty square represented by 0.

// A move consists of choosing 0 and a 4-directionally adjacent number and swapping it.

// The state of the board is solved if and only if the board is [[1,2,3],[4,5,0]].

// Given a puzzle board, return the least number of moves required so that the state of the board is solved. If it is impossible for the state of the board to be solved, return -1.

// Examples:

// Input: board = [[1,2,3],[4,0,5]]
// Output: 1
// Explanation: Swap the 0 and the 5 in one move.
// Input: board = [[1,2,3],[5,4,0]]
// Output: -1
// Explanation: No number of moves will make the board solved.
// Input: board = [[4,1,2],[5,0,3]]
// Output: 5
// Explanation: 5 is the smallest number of moves that solves the board.
// An example path:
// After move 0: [[4,1,2],[5,0,3]]
// After move 1: [[4,1,2],[0,5,3]]
// After move 2: [[0,1,2],[4,5,3]]
// After move 3: [[1,0,2],[4,5,3]]
// After move 4: [[1,2,0],[4,5,3]]
// After move 5: [[1,2,3],[4,5,0]]
// Input: board = [[3,2,4],[1,5,0]]
// Output: 14

const { Queue } = require('../../helpers');

/**
 * @param {number[][]} board
 * @return {number}
 */
var slidingPuzzle = function(board) {
    const ROWS = 2;
    const COLS = 3;
    const target = `1-2-3-4-5-0`;

    function findNexts(b) {
        const [r, c] = (function() {
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c ++) {
                    if (!b[r][c]) {
                        return [r, c];
                    }
                }
            }
        })();
        const nexts = [
            [r - 1, c],
            [r, c - 1],
            [r, c + 1],
            [r + 1, c]
        ].map(([rNext, cNext]) => {
            if (
                rNext < 0 ||
                rNext >= ROWS ||
                cNext < 0 ||
                cNext >= COLS
            ) {
                return false;
            }

            const next = JSON.parse(JSON.stringify(b));
            const temp = next[r][c];
            next[r][c] = next[rNext][cNext];
            next[rNext][cNext] = temp;

            return next;
        }).filter(next => !!next);

        return nexts;
    }

    const queue = new Queue();
    const map = {};

    function enqueue(b, steps) {
        const stringified = stringify(b);
        
        if (!map[stringified]) {
            map[stringified] = true;
            queue.enqueue({ b, steps });
        }
    }

    function stringify(b) {
        return `${b[0].join('-')}-${b[1].join('-')}`;
    }

    enqueue(board, 0);

    while (queue.length) {
        const { b, steps } = queue.dequeue();
        if (stringify(b) === target) {
            return steps;
        }
        const nexts = findNexts(b);
        nexts.forEach(next => {
            enqueue(next, steps + 1);
        });
    }

    return -1;
};

// [[1,2,3],[4,5,0]]

console.log(slidingPuzzle(
    [
        [4,1,2],
        [5,0,3]
    ],
)); // 5

console.log(slidingPuzzle(
    [[3,2,4],[1,5,0]]
)); // 14