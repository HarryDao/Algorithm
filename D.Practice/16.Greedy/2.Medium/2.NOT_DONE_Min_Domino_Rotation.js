// https://leetcode.com/problems/minimum-domino-rotations-for-equal-row/

// In a row of dominoes, A[i] and B[i] represent the top and bottom halves of the i-th domino.  (A domino is a tile with two numbers from 1 to 6 - one on each half of the tile.)

// We may rotate the i-th domino, so that A[i] and B[i] swap values.

// Return the minimum number of rotations so that all the values in A are the same, or all the values in B are the same.

// If it cannot be done, return -1.

 

// Example 1:



// Input: A = [2,1,2,4,2,2], B = [5,2,6,2,3,2]
// Output: 2
// Explanation: 
// The first figure represents the dominoes as given by A and B: before we do any rotations.
// If we rotate the second and fourth dominoes, we can make every value in the top row equal to 2, as indicated by the second figure.
// Example 2:

// Input: A = [3,5,1,2,3], B = [3,6,3,3,4]
// Output: -1
// Explanation: 
// In this case, it is not possible to rotate the dominoes to make one row of values equal.



/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
var minDominoRotations = function(A, B) {
    function rotate(isA = true) {
        const num = isA ? A[0] : B[0];
        let count = 0;

        for (let i = 1; i < A.length; i++) {
            const a = A[i];
            const b = B[i];

            if (a !== num && b !== num) {
                return -1;
            } else if (a !== num) {
                count += isA ? 1 : 0;
            } else if (b !== num) {
                count += isA ? 0 : 1;
            }
        }

        return count;
    }

    const rotateA = rotate();
    const rotateB = rotate(false);

    if (rotateA < 0 && rotateB < 0) {
        return -1 ;
    } else if (rotateA < 0) {
        return rotateB;
    } else if (rotateB < 0) {
        return rotateA;
    } else {
        return Math.min(rotateA, rotateB);
    }
}







/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
var minDominoRotationsNaive = function(A, B) {
    const maps = [A, B].map(arr => arr.reduce((obj, num, index) => {
        if (!obj[num]) {
            obj[num] = {};
        }

        obj[num][index] = true;

        return obj;
    }, {}));
    
    const { length } = A;
    let min = -1;

    maps.forEach((map, index) => {
        if (min === 0) return;

        const theOtherMap = maps[1 - index];

        for (let num in map) {
            const indices = map[num];
            const count = Object.keys(indices).length;

            if (count === length) {
                min = 0;
                break;
            }

            if (theOtherMap[num]) {
                const add = Object.keys(theOtherMap[num])
                    .filter(index => !indices[index])
                    .length;
                if (count + add === length) {
                    min = min < 0 ? add : Math.min(min, add);
                }
            }
        }
    });

    return min;
};

console.log(minDominoRotations(
    [2,1,2,4,2,2], [5,2,6,2,3,2]
)); // 2

console.log(minDominoRotations(
    [3,5,1,2,3], [3,6,3,3,4]
)); // -1

console.log(minDominoRotations(
    [1,2,1,1,1,2,2,2],
    [2,1,2,2,2,2,2,2]
)); //1