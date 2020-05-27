// https://leetcode.com/problems/merge-intervals/

// Given a collection of intervals, merge all overlapping intervals.

// Example 1:
// Input: [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].

// Example 2:
// Input: [[1,4],[4,5]]
// Output: [[1,5]]
// Explanation: Intervals [1,4] and [4,5] are considered overlapping.

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    intervals.sort((a, b) => a[0] < b[0] ? -1 : 1);

    let i = 0;
    while (i < intervals.length) {
        let end = intervals[i][1];

        for (let j = i + 1; j < intervals.length; j++) {
            if (intervals[j][0] > end) {
                if (j > i + 1) {
                    intervals.splice(i + 1, j - i - 1);
                    intervals[i][1] = end;
                }
                break;
            } else {
                end = Math.max(end, intervals[j][1]);
                if (j === intervals.length - 1) {
                    intervals.splice(i + 1, j - i);
                    intervals[i][1] = end;
                }
            }
        }

        i ++;
    }

    return intervals;
};

// console.log(merge(
//     [[1,3],[2,6],[8,10],[15,18]]
// )); // [[1,6],[8,10],[15,18]]

// console.log(merge(
//     [[1,4],[4,5]]
// )); // [1, 5]

console.log(merge(
    [[1,4],[1,5]]
)); // [1, 5]

