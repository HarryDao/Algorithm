// https://leetcode.com/problems/container-with-most-water/

// Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.

// Note: You may not slant the container and n is at least 2.


// The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

// Example:

// Input: [1,8,6,2,5,4,8,3,7]
// Output: 49



/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    if (height.length < 2) return 0;

    function calSize(i1, i2) {
        return Math.min(height[i1], height[i2]) * Math.abs(i2 - i1);
    }

    let start = 0;
    let end = height.length - 1;
    let max = 0;

    while (start < end) {
        max = Math.max(max, calSize(start, end));

        if (height[start] < height[end]) {
            start += 1;    
        } else {
            end -= 1;
        }
    }

    return max;
}


/**
 * @param {number[]} height
 * @return {number}
 */
var maxAreaNaive = function(height) {
    const { length } = height;
    let max = 0;

    for (let i = 0; i < length; i ++) {
        for (let j = i; j < length; j++) {
            max = Math.max(max, (j - i) * Math.min(height[i], height[j]));
        }
    }

    return max;
};

// console.log(maxArea(
//     [1,8,6,2,5,4,8,3,7, 4]
// )); // 49

console.log(maxArea(
    [2,3,4,5,18,17,6]
)); // 17

console.log(maxArea(
    [1,3,2,5,25,24,5]
)); // 24