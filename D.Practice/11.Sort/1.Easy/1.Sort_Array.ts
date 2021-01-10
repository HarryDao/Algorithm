// https://leetcode.com/problems/sort-an-array/

// Input: nums = [5,1,1,2,0,0]
// Output: [0,0,1,1,2,5]

function quickSortArray(nums: number[]): number[] {
    const stack: [number, number][] = [[0, nums.length - 1]];

    const swap = (xIndex: number, yIndex: number) => {
        const x = nums[xIndex];
        nums[xIndex] = nums[yIndex];
        nums[yIndex] = x;
    }

    while (stack.length) {
        const [startIndex, endIndex] = stack.pop()  as [number, number];
        
        if (startIndex >= endIndex) continue;

        const pivot = nums[startIndex];
        let swapIndex = startIndex + 1;
        let runIndex = startIndex + 1;

        while (runIndex <= endIndex) {
            if (nums[swapIndex] > pivot && nums[runIndex] <= pivot) {
                swap(swapIndex, runIndex);
            }

            while (swapIndex < runIndex && nums[swapIndex] <= pivot) {
                swapIndex += 1;
            }

            runIndex += 1;
        }

        let midIndex = startIndex;
        for (let i = 0; i <= endIndex; i += 1) {
            if (i < endIndex) {
                if (nums[i + 1] > pivot) {
                    midIndex = i;
                    if (nums[i] < pivot) {
                        swap(pivot, midIndex);
                    }
                    break;
                }
            } else if (pivot > nums[endIndex]) {
                swap(startIndex, endIndex);
                midIndex = endIndex;
            }
        }

        if (startIndex < midIndex - 1) {
            stack.push([startIndex, midIndex - 1]);
        }
        if (midIndex + 1 < endIndex) {
            stack.push([midIndex + 1, endIndex]);
        }
    }

    return nums;
}

console.log(quickSortArray([5,1,1,2,0,0]));
console.log(quickSortArray([4, 1, 5, 2, 3]))



// maximum callstack
function quickSortArrayRecursion(nums: number[]): number[] {
    const swap = (xIndex: number, yIndex: number) => {
        const x = nums[xIndex];
        nums[xIndex] = nums[yIndex];
        nums[yIndex] = x;
    }

    const sort = (startIndex: number, endIndex: number) => {
        console.log('sort:', startIndex, endIndex);
        if (startIndex >= endIndex) return null;
        
        const pivot = nums[startIndex];
        let swapIndex = startIndex + 1;
        let checkIndex = startIndex + 1;

        while (checkIndex <= endIndex) {
            if (nums[swapIndex] > pivot && nums[checkIndex] <= pivot) {
                swap(swapIndex, checkIndex);
            }

            while (swapIndex < checkIndex && nums[swapIndex] <= pivot) {
                swapIndex += 1;
            } 

            checkIndex += 1;
        }

        let midIndex = startIndex;
        for (let i = 0; i <= endIndex; i += 1) {
            if (i === endIndex) {
                if (nums[i] < pivot) {
                    swap(startIndex, endIndex);
                    midIndex = endIndex;
                }
            } else if (nums[i + 1] > pivot) {
                midIndex = i;
                if (nums[i] < pivot) {
                    swap(i, startIndex);
                }
                break;
            }
        }

        if (startIndex < midIndex - 1) {
            sort(startIndex, midIndex - 1);
        }
        if (midIndex + 1 < endIndex) {
            sort(midIndex + 1, endIndex);
        }
    }

    sort(0, nums.length - 1);
    return nums;
}
