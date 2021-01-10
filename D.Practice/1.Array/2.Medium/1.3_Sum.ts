// https://leetcode.com/problems/3sum/

function threeSum(nums: number[]): number[][] {
    const result: {[key: string]: boolean} = {};

    nums.sort((a, b) => a < b ? -1 : 1);

    nums.forEach((num, index) => {
        if (index < nums.length - 1) {
            twoSum(nums, index + 1, num * (-1)).forEach(two => {
                // result.push([num, ...two]);
                const str = [num, ...two].join(',');
                result[str] = true;
            });
        }
    });

    return Object.keys(result).map(str => str.split(',').map(str => Number(str)));
}

function twoSum(nums: number[], start: number, target: number): number[][]{
    let startIndex = start;
    let endIndex = nums.length - 1;

    let total = nums[startIndex] + nums[endIndex];
    const result: number[][] = [];

    while (startIndex < endIndex) {
        if (total === target) {
            result.push([nums[startIndex], nums[endIndex]]);
        }
        if (total >= target) {
            total = total - nums[endIndex] + nums[endIndex - 1];
            endIndex -= 1;
        } else {
            total = total - nums[startIndex] + nums[startIndex + 1];
            startIndex += 1;
        }
    }

    return result;
}

console.log(threeSum([-1,0,1,2,-1,-4]));