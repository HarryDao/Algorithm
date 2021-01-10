// https://leetcode.com/problems/kth-largest-element-in-an-array/

// Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.

// Example 1:

// Input: [3,2,1,5,6,4] and k = 2
// Output: 5
// Example 2:

// Input: [3,2,3,1,2,4,5,5,6] and k = 4
// Output: 4
// Note:
// You may assume k is always valid, 1 ≤ k ≤ array's length.

function findKthLargestQuickSort(nums: number[], k: number): number {
    const targetIndex = nums.length - k;

    let startIndex = 0;
    let endIndex = nums.length - 1;

    function swap(xIndex: number, yIndex: number) {
        if (xIndex === yIndex) return;
        const x = nums[xIndex];
        nums[xIndex] = nums[yIndex];
        nums[yIndex] = x;
    }

    while (startIndex <= endIndex) {
        if (startIndex >= endIndex) return nums[startIndex];
        const pivot = nums[startIndex];
        let swapIndex = startIndex + 1;
        let checkIndex = startIndex + 1;
        
        while (checkIndex <= endIndex) {
            if (nums[swapIndex] > pivot && nums[checkIndex] <= pivot) {
                swap(swapIndex, checkIndex);
            }
            while (nums[swapIndex] <= pivot && swapIndex < checkIndex) {
                swapIndex += 1;
            }

            checkIndex += 1;
        }

        let nextIndex = startIndex;
        if (nums[swapIndex] > pivot) {
            nextIndex = swapIndex - 1;
        } else if (nums[swapIndex] <= pivot) {
            nextIndex = swapIndex;
        }

        swap(startIndex, nextIndex);

        if (nextIndex === targetIndex) {
            return nums[nextIndex];
        } else if (nextIndex < targetIndex) {
            startIndex = nextIndex + 1;
        } else {
            endIndex = nextIndex - 1;
        }
    }

    return 0;
};



interface PQNode {
    value: any;
    priority: number
};

class PriorityQueue {
    queue: PQNode[] = [];
    
    swap(i1: number, i2: number) {
        const node1 = this.queue[i1];
        this.queue[i1] = this.queue[i2];
        this.queue[i2] = node1;
    }

    add(value: any, priority: number) {
        this.queue.push({ value, priority });

        let childIndex = this.queue.length - 1;

        while (childIndex > 0) {
            let parentIndex = Math.floor((childIndex - 1) / 2);

            const child = this.queue[childIndex];
            const parent = this.queue[parentIndex];

            if (child.priority >= parent.priority) break;

            this.swap(childIndex, parentIndex);
            childIndex = parentIndex;
        }

        return this;
    }

    remove(): PQNode | null {
        if (this.queue.length < 2) return this.queue.pop() || null;

        this.swap(0, this.queue.length - 1);
        const node = this.queue.pop() as PQNode;

        let parentIndex = 0;

        while (true) {
            const child1Index = parentIndex * 2 + 1;
            const child2Index = parentIndex * 2 + 2;
            
            let childIndex: number;
            if (child1Index > this.queue.length - 1 && child2Index > this.queue.length - 1) {
                break;
            } else if (child1Index > this.queue.length - 1) {
                childIndex = child2Index;
            } else if (child2Index > this.queue.length - 1) {
                childIndex = child1Index;
            } else {
                const child1 = this.queue[child1Index];
                const child2 = this.queue[child2Index];
                childIndex = child1.priority < child2.priority ? child1Index : child2Index;
            }

            const child = this.queue[childIndex];

            if (child.priority > this.queue[parentIndex].priority) {
                break;
            }

            this.swap(parentIndex, childIndex);
            parentIndex = childIndex;
        }

        return node;
    }
}

function findKthLargest(nums: number[], k: number): number {
    const pq = new PriorityQueue();
    nums.forEach((num) => {
        pq.add(num, num);
    });
    
    let count = 0;
    while (count < nums.length) {
        const node = pq.remove();
        count += 1;
        if (count === nums.length - k + 1 && node) return node.value;
    }

    return -1;
};

console.log(findKthLargest([3,2,1,5,6,4], 2));
// console.log(findKthLargest([-1, -1], 2))

// 3, 5, 6, 2, 4, 1
// 3, 5, 6