class Node {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority;
    }
}

class PriorityQueue { // Use Min_Binary_Heap
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        const newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }

    dequeue() {
        // swap 1st value with last value
        // swap value with Math.math(2 children) if value < max
        const min = this.values[0];
        const last = this.values.pop();
        if (this.values.length) {
            this.values[0] = last;
            this.sinkDown();
        }
        return min;
    }

    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];

        while(idx > 0) {
            const idxParent = Math.floor((idx - 1)/2);
            const elementParent = this.values[idxParent];
            if (element.priority >= elementParent.priority) break;
            this.values[idxParent] = element;
            this.values[idx] = elementParent;
            idx = idxParent;
        }
    }

    sinkDown() {
        const length = this.values.length;
        let idx = 0;
        const el = this.values[idx];
        while(idx < length - 1) {
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
                childIdx = this.values[leftIdx].priority < this.values[rightIdx].priority ? leftIdx : rightIdx;
            }

            const child = this.values[childIdx];
            if (child.priority >= el.priority) break;
            this.values[childIdx] = el;
            this.values[idx] = child;
            idx = childIdx
        }
    }
}

const ER = new PriorityQueue();
ER.enqueue('common cold', 5);
ER.enqueue('gunshot', 1);
ER.enqueue('highFever', 4);
ER.enqueue('broken arm', 2);
ER.enqueue('glass in foot', 3);

console.log('ER:', ER.values);

console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.dequeue());