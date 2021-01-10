// https://leetcode.com/problems/3sum-closest/

// 16. 3Sum Closest
// Medium

// 2684

// 157

// Add to List

// Share
// Given an array nums of n integers and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution.

 

// Example 1:

// Input: nums = [-1,2,1,-4], target = 1
// Output: 2
// Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

function threeSumClosest(nums: number[], target: number): number {
    nums.sort((a, b) => a <= b ? -1 : 1 );

    let closestSum = Number.POSITIVE_INFINITY;
    let diff = Number.POSITIVE_INFINITY;

    for (let index = 0, length = nums.length; index < length - 2; index += 1) {
        const num1 = nums[index];

        let start = index + 1;
        let end = length - 1;

        while (start < end) {
            const sum = num1 + nums[start] + nums[end];
            const currentDiff = Math.abs(sum - target);
            
            if (currentDiff < diff) {
                // console.log('update:', `${sum}(${num1}, ${nums[start]}, ${nums[end]})`, closestSum, diff);
                closestSum = sum;
                diff = currentDiff;
            }

            if (sum < target) {
                start += 1;
            } else {
                end -= 1;
            }
        }
    }

    return closestSum;
};

console.log(threeSumClosest([-1,2,1,-4], 1));
// console.log(threeSumClosest([1,2,4,8,16,32,64,128],82)); //82