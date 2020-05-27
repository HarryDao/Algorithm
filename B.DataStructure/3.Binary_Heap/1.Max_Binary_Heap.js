class MaxBinaryHeap {
    constructor() {
        this.values = [];
    }

    insert(element) {
        this.values.push(element);
        this.bubbleUp();
    }

    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];

        while(idx > 0) {
            const idxParent = Math.floor((idx - 1)/2);
            const elementParent = this.values[idxParent];
            if (element <= elementParent) break;
            this.values[idxParent] = element;
            this.values[idx] = elementParent;
            idx = idxParent;
        }
    }

    extractMax() {
        // swap 1st value with last value
        // swap value with Math.math(2 children) if value < max
        const max = this.values[0];
        const last = this.values.pop();
        if (this.values.length) {
            this.values[0] = last;
            this.sinkDown();
        }
        return max;
    }

    sinkDown() {
        const length = this.values.length;
        let idx = 0;
        const el = this.values[idx];
        while(idx < length - 1) {
            console.log('heap:', heap.values);
            const leftIdx = idx * 2 + 1;
            const rightIdx = idx * 2 + 2;
            if (leftIdx > length - 1 && rightIdx > length - 1) {
                break;
            }
            let childIdx;
            if (leftIdx > length - 1) {
                childIdx = rightIdx;
            } else if (rightIdx > length - 1) {
                childIdx = leftIdx;
            } else {
                childIdx = this.values[leftIdx] > this.values[rightIdx] ? leftIdx : rightIdx;
            }

            const child = this.values[childIdx];
            if (child <= el) break;
            this.values[childIdx] = el;
            this.values[idx] = child;
            idx = childIdx
        }
    }
}

const heap = new MaxBinaryHeap();

heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(12);
heap.insert(55);


console.log(heap.values);

console.log(heap.extractMax());
console.log(heap.values);