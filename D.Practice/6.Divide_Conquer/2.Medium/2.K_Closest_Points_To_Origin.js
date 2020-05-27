// https://leetcode.com/problems/k-closest-points-to-origin/

// We have a list of points on the plane.  Find the K closest points to the origin (0, 0).

// (Here, the distance between two points on a plane is the Euclidean distance.)

// You may return the answer in any order.  The answer is guaranteed to be unique (except for the order that it is in.)

// Example 1:

// Input: points = [[1,3],[-2,2]], K = 1
// Output: [[-2,2]]
// Explanation: 
// The distance between (1, 3) and the origin is sqrt(10).
// The distance between (-2, 2) and the origin is sqrt(8).
// Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
// We only want the closest K = 1 points from the origin, so the answer is just [[-2,2]].
// Example 2:

// Input: points = [[3,3],[5,-1],[-2,4]], K = 2
// Output: [[3,3],[-2,4]]
// (The answer [[-2,4],[3,3]] would also be accepted.)

/**
 * @param {number[][]} points
 * @param {number} K
 * @return {number[][]}
 */

// Time Complexity: O(N) in average case complexity, where N is the length of points.
// Space Complexity: O(N).

var kClosest = function(points, k) {
    if (!points.length || k < 0 || k > points.length) return false;

    const distances = points.map(([x, y], index) => ({
        value: x ** 2 + y ** 2,
        index,
    }));

    const kIndex = k - 1;

    function swap(i, j) {
        const temp = distances[i];
        distances[i] = distances[j];
        distances[j] = temp;
    }

    (function sort(start, end) {
        if (start >= end) return;

        const pivot = distances[start].value;

        let i = start + 1;
        for (let j = start + 1; j <= end; j++) {
            if (distances[j].value < pivot) {
                swap(i, j);
                i += 1;
            }
        }
        swap(start, i - 1);

        if (i - 1 === kIndex) {
            return;
        } else if (kIndex < i - 1) {
            return sort(start, i - 2);
        } else {
            return sort(i, end);
        }
    })(0, distances.length - 1);

    return distances.slice(0, k).map(({ index }) => points[index]);
};

console.log(kClosest(
    [[3,3],[5,-1],[-2,4]], 2
));