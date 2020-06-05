// https://leetcode.com/problems/employee-free-time/

// We are given a list schedule of employees, which represents the working time for each employee.

// Each employee has a list of non-overlapping Intervals, and these intervals are in sorted order.

// Return the list of finite intervals representing common, positive-length free time for all employees, also in sorted order.

// (Even though we are representing Intervals in the form [x, y], the objects inside are Intervals, not lists or arrays. For example, schedule[0][0].start = 1, schedule[0][0].end = 2, and schedule[0][0][0] is not defined).  Also, we wouldn't include intervals like [5, 5] in our answer, as they have zero length.

 

// Example 1:

// Input: schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]
// Output: [[3,4]]
// Explanation: There are a total of three employees, and all common
// free time intervals would be [-inf, 1], [3, 4], [10, inf].
// We discard any intervals that contain inf as they aren't finite.
// Example 2:

// Input: schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]
// Output: [[5,6],[7,9]]

/**
 * // Definition for an Interval.
 * function Interval(start, end) {
 *    this.start = start;
 *    this.end = end;
 * };
 */

const { GeneralPriorityQueue } = require('../../helpers');

/**
 * @param {Interval[][]} schedule
 * @return {Interval[]}
 */
var employeeFreeTime = function(schedule) {
    const pq = new GeneralPriorityQueue(function(parent, child) {
        if (parent.priority.start !== child.priority.start) {
            return parent.priority.start < child.priority.start;
        } else {
            return parent.priority.end <= child.priority.end;
        }
    });

    schedule.forEach((time, index) => {
        if (time.length) {
            pq.enqueue(time[0], { index, at: 0 });
        }
    });

    const occupied = [];

    while (pq.length) {
        const { index, at } = pq.dequeue();
        const times = schedule[index];
        const time = times[at];
        const last = occupied[occupied.length - 1];

        if (!last || last.end < time.start) {
            occupied.push(time);
        } else {
            last.end = Math.max(last.end, time.end);
        }

        if (at < times.length - 1) {
            pq.enqueue(times[at + 1], { index, at: at + 1 });
        }
    }

    const free = [];
    let prev = null;

    for (let time of occupied) {
        if (prev) {
            free.push({ start: prev.end, end: time.start });
        }

        prev = time;
    }

    return free;
};


console.log(employeeFreeTime(
    [
        [{start: 3, end: 7}, {start: 9, end: 12}, {start: 15, end: 18}],
        [{start: 8, end: 11}]
    ]
));


// class GeneralPriorityQueue {
//     constructor(isMinPQOrCompareFn = true) {
//         if (typeof isMinPQOrCompareFn === 'function') {
//             this.compareFn = isMinPQOrCompareFn;
//         } else {
//             this.isMin = !!isMinPQOrCompareFn;
//         }
//         this.list = [];
//         this.length = 0;
//     }

//     swap(i, j) {
//         const temp = this.list[i];
//         this.list[i] = this.list[j];
//         this.list[j] = temp;
//     }

//     compare(parentIndex, index) {
//         const child = this.list[index];
//         const parent = this.list[parentIndex];

//         if (this.compareFn) {
//             return this.compareFn(parent, child);
//         } else if (this.isMin) {
//             return Number(parent.priority) < Number(child.priority);
//         } else {
//             return Number(parent.priority) > Number(child.priority);
//         }
//     }

//     enqueue(priority, data) {
//         const newNode = new GeneralPriorityQueueNode(priority, data);
//         this.list.push(newNode);
        
//         let index = this.list.length - 1;
//         while (index > 0) {
//             const parentIndex = Math.floor((index - 1) / 2);
//             if (this.compare(parentIndex, index)) {
//                 break;
//             } else {
//                 this.swap(parentIndex, index);
//                 index = parentIndex;
//             }
//         }

//         this.length += 1;
//         return this;
//     }

//     dequeue() {
//         if (!this.length) return null;

//         this.swap(0, this.list.length - 1);
//         const node = this.list.pop();
//         this.length -= 1;

//         if (!this.length) return node;

//         let index = 0;

//         while (index < this.length - 1) {
//             const child1Index = index * 2 + 1;
//             const child2Index = index * 2 + 2;
//             let nextIndex = null;

//             if (child1Index > this.length - 1 && child2Index > this.length - 1) {
//                 break;
//             } else if (child1Index > this.length - 1) {
//                 nextIndex = child2Index;
//             } else if (child2Index > this.length - 1) {
//                 nextIndex = child1Index;
//             } else if (this.compare(child1Index, child2Index)) {
//                 nextIndex = child1Index;
//             } else {
//                 nextIndex = child2Index;
//             }

//             if (this.compare(index, nextIndex)) {
//                 break;
//             } else {
//                 this.swap(index, nextIndex);
//                 index = nextIndex;
//             }
//         }

//         return node;
//     }
// }

// class GeneralPriorityQueueNode {
//     constructor(priority, data) {
//         this.priority = priority;
//         this.data = data === undefined ? priority : data ;
//     }
// }
