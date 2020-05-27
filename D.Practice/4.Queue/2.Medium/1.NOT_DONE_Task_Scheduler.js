// https://leetcode.com/problems/task-scheduler/

// Given a char array representing tasks CPU need to do. It contains capital letters A to Z where different letters represent different tasks. Tasks could be done without original order. Each task could be done in one interval. For each interval, CPU could finish one task or just be idle.

// However, there is a non-negative cooling interval n that means between two same tasks, there must be at least n intervals that CPU are doing different tasks or just be idle.

// You need to return the least number of intervals the CPU will take to finish all the given tasks.

 

// Example:

// Input: tasks = ["A","A","A","B","B","B"], n = 2
// Output: 8
// Explanation: A -> B -> idle -> A -> B -> idle -> A -> B.

/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
    n += 1;
    const obj = {};
    let max = 0;
    let countMax = 0;

    tasks.forEach(task => {
        if (!obj[task]) {
            obj[task] = 1
        } else {
            obj[task] += 1;
        }

        if (obj[task] > max) {
            max = obj[task];
            countMax = 1;
        } else if (obj[task] === max) {
            countMax += 1;
        }
    });

    if (n > Object.keys(obj).length) {
        return (max - 1) * n + countMax;
    } else {
        const rounds = Math.ceil(tasks.length / n);
        if (rounds > max) {
            return rounds * n - ((rounds * n) - tasks.length);
        } else {
            const left = tasks.length - max * countMax - (n - countMax) * (max - 1);
            return (max - 1) * n + countMax + Math.max(left, 0);
        }
    }
};


// console.log(leastInterval(["A","A","A","B","B","B"], 2));

// const a = ["A","A","B","B","C","C","D","D","E","E","F","F","G","G","H","H","I","I","J","J","K","K","L","L","M","M","N","N","O","O","P","P","Q","Q","R","R","S","S","T","T","U","U","V","V","W","W","X","X","Y","Y","Z","Z"];

// console.log(leastInterval(a, 2));

// console.log(leastInterval(["A","A","A","B","B","B"], 0));

// console.log(leastInterval(["A","A","A","A","A","A","B","C","D","E","F","G"], 1));

// console.log(leastInterval(["A","A","A","A","A","A","B","C","D","E","F","G"], 2));

// console.log(leastInterval(["A","B","C","D","A","B","V"], 3));

// console.log(leastInterval(["A","A","A","B","B","B","C","D","E","F","G","H","I","J","K"], 7));

console.log(leastInterval(["A","A","A","A","B","B","B","B","C","C","C","C","D","D","D","D","E","F"], 4));

// 4 4 4 4 1 1
// 3 3 3 3 1 0
// 2 2 2 2 0 0
// 1 1 1 1 0 0
// 0 0 0 0 0 0