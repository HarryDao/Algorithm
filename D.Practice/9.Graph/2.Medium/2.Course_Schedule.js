// https://leetcode.com/problems/course-schedule/

// There are a total of numCourses courses you have to take, labeled from 0 to numCourses-1.

// Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: [0,1]

// Given the total number of courses and a list of prerequisite pairs, is it possible for you to finish all courses?

 

// Example 1:

// Input: numCourses = 2, prerequisites = [[1,0]]
// Output: true
// Explanation: There are a total of 2 courses to take. 
//              To take course 1 you should have finished course 0. So it is possible.
// Example 2:

// Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
// Output: false
// Explanation: There are a total of 2 courses to take. 
//              To take course 1 you should have finished course 0, and to take course 0 you should
//              also have finished course 1. So it is impossible.


/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    const nextMap = Array(numCourses).fill(false);
    const requiredMap = Array(numCourses).fill(false);

    prerequisites.forEach(([next, prev]) => {
        if (!nextMap[prev]) nextMap[prev] = {};
        nextMap[prev][next] = true;

        if (!requiredMap[next]) requiredMap[next] = {};
        requiredMap[next][prev] = true;
    });

    const learnMap = {};
    const result = [];

    for (let i = 0; i < numCourses; i++) {
        if (!requiredMap[i]) {
            let stack = [i];
            while (stack.length) {
                const learned = stack.pop();

                if (learnMap[learned]) continue;
                learnMap[learned] = true;
                result.push(learned);

                const nexts = nextMap[learned];
                if (nexts) {
                    for (let index in nexts) {
                        if (requiredMap[index]) {
                            delete requiredMap[index][learned];

                            if (!Object.keys(requiredMap[index]).length) {
                                requiredMap[index] = false;
                                stack.push(index);
                            }
                        }
                    }
                }
            }
        }
    }
    
    return result.length === numCourses;   
};

console.log(canFinish(
    2, [[1,0]]
)); // true

console.log(canFinish(
    2, [[1,0],[0,1]]
)); //false

console.log(canFinish(
    4, [[1,0],[2,0],[3,1],[3,2]]
)); // [0,1,2,3] or [0,2,1,3]