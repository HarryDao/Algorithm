// https://leetcode.com/problems/trapping-rain-water/

// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.


// The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped. Thanks Marcos for contributing this image!

// Example:

// Input: [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6

// [12, 0], [2, 2], [1, 5], [3, 6] => [3 - 1] * 2


/**
 * @param {number[]} height
 * @return {number}
 */
var trapPointers = function(height) {
    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let total = 0;

    while (left < right) {
        const leftVal = height[left];
        const rightVal = height[right];

        if (leftVal < rightVal) {
            if (leftVal > leftMax) {
                leftMax = leftVal;
            } else {
                total += leftMax - leftVal;
            }
            left += 1;
        } else {
            if (rightVal > rightMax) {
                rightMax = rightVal;
            } else {
                total += rightMax - rightVal;
            }
            right -= 1;
        }
    }

    return total;
}

/**
 * @param {number[]} height
 * @return {number}
 */
var trapStack = function(height) {
    const stack = [];
    let total = 0;
    let max = 0;

    for (let index = 0; index < height.length; index ++) {
        const value = height[index];

        while (stack.length && stack[stack.length - 1].value < value) {
            const last = stack.pop();

            if (stack.length) {
                const secondLast = stack[stack.length - 1];
                const diff = Math.min(max, secondLast.value, value) - last.value;
                // console.log('add:', diff, index, secondLast.index, diff * (index - secondLast.index - 1));
                total += diff * (index - secondLast.index - 1);
            }
        }

        max = Math.max(max, value);
        stack.push({ value, index });
    }

    return total;
}

/**
 * @param {number[]} height
 * @return {number}
 */
var trapNormal = function(height) {
    function findWaterSize(from, to) {
        if (from === to) return { size: 0 };
        const isForward = from < to;
        const increment = (to - from) / Math.abs(to - from);
        let prev = from;
        let index = from;
        let total = 0;
        
        while (isForward ? index <= to : index >= to) {
            const start = height[index];
            let nextIndex = index + increment;
            let count = 0;

            while (isForward ? nextIndex <= to : nextIndex >= to) {
                const next = height[nextIndex];
                if (next < start) {
                    count += start - next;
                    nextIndex += increment;
                } else {
                    total += count;
                    break;
                }
            }

            prev = index;
            index = nextIndex;

        }
        
        return { size: total, end: prev };
    }

    const forward = findWaterSize(0, height.length - 1);
    const backward = findWaterSize(height.length - 1, forward.end);

    return forward.size + backward.size;
};

console.log(trap(
    [0,1,0,2,1,0,1,3,2,1,2,1]
)); // 6

console.log(trap(
    [5,2,1,2,1,5]
)); //
