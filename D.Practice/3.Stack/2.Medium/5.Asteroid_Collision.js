// https://leetcode.com/problems/asteroid-collision/

// We are given an array asteroids of integers representing asteroids in a row.

// For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

// Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

// Example 1:
// Input: 
// asteroids = [5, 10, -5]
// Output: [5, 10]
// Explanation: 
// The 10 and -5 collide resulting in 10.  The 5 and 10 never collide.
// Example 2:
// Input: 
// asteroids = [8, -8]
// Output: []
// Explanation: 
// The 8 and -8 collide exploding each other.
// Example 3:
// Input: 
// asteroids = [10, 2, -5]
// Output: [10]
// Explanation: 
// The 2 and -5 collide resulting in -5.  The 10 and -5 collide resulting in 10.
// Example 4:
// Input: 
// asteroids = [-2, -1, 1, 2]
// Output: [-2, -1, 1, 2]
// Explanation: 
// The -2 and -1 are moving left, while the 1 and 2 are moving right.
// Asteroids moving the same direction never meet, so no asteroids will meet each other.
// Note:

// The length of asteroids will be at most 10000.
// Each asteroid will be a non-zero integer in the range [-1000, 1000]..


/**
 * @param {number[]} asteroids
 * @return {number[]}
 */

// O(N);

var asteroidCollision = function(asteroids) {
    const stack = [];

    for (const asteroid of asteroids) {
        stack.push(asteroid);

        while (stack.length > 1) {
            const last = stack.pop();
            const secondLast = stack.pop();

            if (secondLast > 0 && last < 0) {
                if (Math.abs(last) > secondLast) {
                    stack.push(last);
                } else if (Math.abs(last) < secondLast) {
                    stack.push(secondLast);
                }
            } else {
                stack.push(secondLast, last);
                break;
            }
        }
    }

    return stack;
}


/**
 * @param {number[]} asteroids
 * @return {number[]}
 */

// O(N ** 2)

var asteroidCollisionNaive = function(asteroids) {
    function collide(num1, num2) {
        const abs1 = Math.abs(num1);
        const abs2 = Math.abs(num2);
        const isRight1 = num1 > 0;
        const isRight2 = num2 > 0;

        if (isRight1) {
            if (isRight2) {
                return [num1, num2];
            } else if (abs1 === abs2) {
                return [];
            } else {
                return abs1 > abs2 ? [ num1 ] : [ num2 ];
            }
        } else {
            return [num1, num2];
        }
    }

    let isStable = false;
    let current = asteroids;

    while (!isStable) {
        isStable = true;
        let next = [];
        let i = 0;

        while (i + 1 < current.length) {
            const nextState = collide(current[i], current[i + 1]);

            if (nextState.length === 2) {
                next.push(nextState[0]);
                i += 1;
            } else {
                next.push(...nextState);
                i += 2;
                isStable = false;
            }
        }
        if (i === current.length - 1) {
            next.push(current[i]);
        }

        current = next;
    }

    return current;
};


console.log(asteroidCollision(
    [5,10,-5]
)); // [5, 10]

console.log(asteroidCollision(
    [8, -8]
)); // []

console.log(asteroidCollision(
    [10, 2, -5]
)); // [10]

console.log(asteroidCollision(
    [-2, -1, 1, 2]
)); // [-2, -1, 1, 2]
