// https://leetcode.com/problems/the-skyline-problem/

// A city's skyline is the outer contour of the silhouette formed by all the buildings in that city when viewed from a distance. Now suppose you are given the locations and height of all the buildings as shown on a cityscape photo (Figure A), write a program to output the skyline formed by these buildings collectively (Figure B).

// Buildings Skyline Contour
// The geometric information of each building is represented by a triplet of integers [Li, Ri, Hi], where Li and Ri are the x coordinates of the left and right edge of the ith building, respectively, and Hi is its height. It is guaranteed that 0 ≤ Li, Ri ≤ INT_MAX, 0 < Hi ≤ INT_MAX, and Ri - Li > 0. You may assume all buildings are perfect rectangles grounded on an absolutely flat surface at height 0.

// For instance, the dimensions of all buildings in Figure A are recorded as: [ [2 9 10], [3 7 15], [5 12 12], [15 20 10], [19 24 8] ] .

// The output is a list of "key points" (red dots in Figure B) in the format of [ [x1,y1], [x2, y2], [x3, y3], ... ] that uniquely defines a skyline. A key point is the left endpoint of a horizontal line segment. Note that the last key point, where the rightmost building ends, is merely used to mark the termination of the skyline, and always has zero height. Also, the ground in between any two adjacent buildings should be considered part of the skyline contour.

// For instance, the skyline in Figure B should be represented as:[ [2 10], [3 15], [7 12], [12 0], [15 10], [20 8], [24, 0] ].

/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
// var getSkyline = function(buildings) {
//     if (!buildings.length) return [];
    
//     const ranges = [];

//     function findIndex(min, max) {
//         let low = 0;
//         let high = ranges.length - 1;

//         while (low < high) {
//             const mid = Math.floor((low + high) / 2);
//             console.log("low:", low, high, min >= ranges[mid].max ,max <= ranges[mid].min);
//             if (min >= ranges[mid].max) {
//                 low = mid + 1;
//             } else if (max <= ranges[mid].min) {
//                 high = mid;
//             } else {
//                 return mid;
//             }
//         }
//         return low;
//     }

//     function merge(min, max, height) {
//         const index = findIndex(min, max);
//         const current = ranges[index];
//         console.log("index:", index, ranges, min, max, height);
//         if (current.max <= min) {
//             ranges.push({ min, max, height });
//         } else {
//             const toBePushed = [];
//             let next = null;

//             if (current.min < min) {
//                 toBePushed.push({
//                     min: current.min,
//                     max: min,
//                     height: current.height,
//                 })
//             }

//             if (current.max > max) {
//                 toBePushed.push({
//                     min: min,
//                     max: max,
//                     height: Math.max(current.height, height)
//                 });
//                 toBePushed.push({
//                     min: max,
//                     max: current.max,
//                     height: current.height
//                 });
//             } else {
//                 toBePushed.push({
//                     min: min,
//                     max: current.max,
//                     height: Math.max(current.height, height),
//                 });

//                 if (current.max < max) {
//                     next = [current.max, max, height];
//                 }
//             }
//             console.log('toBePushed:', index, toBePushed, min, max, height);
//             console.log('next:', next);
//             ranges.splice(index, 1, ...toBePushed);
//             if (next) {
//                 merge(...next);
//             }
//         }
//     }

//     for (let [min, max, height] of buildings) {
//         if (!ranges.length) {
//             ranges.push({ min, max, height });
//         } else {
//             merge(min, max, height);
//         }
//         console.log('ranges:', ranges);
//     }
// };

function getSkyline(buildings) {
    const steps = {};
    let lowest = Number.POSITIVE_INFINITY;
    let highest = Number.NEGATIVE_INFINITY;    

    for (let [min, max, height] of buildings) {
        for (let i = min; i <= max; i++) {
            lowest = Math.min(lowest, i);
            highest = Math.max(highest, i);

            if (!steps.hasOwnProperty(i)) {
                steps[i] = height;
            } else {
                if (height > steps[i] || steps[i + 1] !== steps[i]) {
                    steps[i] = height;
                }
            }
        }
        console.log('log:', min, max, height, steps);
    }

    let prev = null;
    const result = [];

    for (let i = lowest; i <= highest + 1; i++) {
        if (steps.hasOwnProperty(i)) {
            const step = steps[i];
            if (!prev || prev !== step) {
                result.push([i, step]);
                prev = step;
            }
        } else {
            if (prev !== 0) {
                result.push([i - 1, 0]);
                prev = 0;
            }
        }
    }

    console.log('steps:', steps);

    return result;
}

// console.log(getSkyline(
//     [
//         [2,9,10],
//         [3,7,15],
//         [5,12,12],
//         [15,20,10],
//         [19,24,8]
//     ]
// )); // [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]


// console.log(getSkyline(
//     [[1,2,1],[1,2,2],[1,2,3]]
// )); //

console.log(getSkyline(
    [
        [3,7,8],
        [3,8,7],
        [3,9,6],
        // [3,10,5],
        // [3,11,4],
        // [3,12,3],
        // [3,13,2],
        // [3,14,1]
    ]
));


// Input
// [[3,7,8],[3,8,7],[3,9,6],[3,10,5],[3,11,4],[3,12,3],[3,13,2],[3,14,1]]
// Output
// [[3,8],[3,7],[3,6],[3,5],[3,4],[3,3],[3,2],[13,1],[14,0]]
// Expected
// [[3,8],[7,7],[8,6],[9,5],[10,4],[11,3],[12,2],[13,1],[14,0]]