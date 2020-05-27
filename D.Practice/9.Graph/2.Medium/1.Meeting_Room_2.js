// https://leetcode.com/problems/meeting-rooms-ii/

// Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), find the minimum number of conference rooms required.

// Example 1:

// Input: [[0, 30],[5, 10],[15, 20]]
// Output: 2
// Example 2:

// Input: [[7,10],[2,4]]
// Output: 1

/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);

    const rooms = [];

    loop1:
    for (let interval of intervals) {

        loop2:
        for (let index = 0; index < rooms.length; index ++) {
            if (rooms[index] <= interval[0]) {
                rooms[index] = interval[1];
                continue loop1;
            }
        }
        rooms.push(interval[1]);
    }

    return rooms.length;
};

console.log(minMeetingRooms(
    [[0, 30],[5, 10],[15, 20]]
)); // 2

console.log(minMeetingRooms(
    [[7, 10], [2, 4]]
)); // 1

console.log(minMeetingRooms(
    [[1,8],[6,20],[9,16],[13,17]]
)); // 3

console.log(minMeetingRooms(
    [[1, 8], [2, 12], [3, 13], [10, 13], [11, 12]]
)); // 4

console.log(minMeetingRooms(
    [[4,18],[1,35],[12,45],[25,46],[22,27]]
)); // 4