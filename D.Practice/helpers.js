class MinPriorityList {
    constructor() {
        this.list = [];
    }

    enqueue(data, priority) {
        this.list.push({
            priority,
            data
        });
        let index = this.list.length - 1;
        
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);

            if (this.list[parentIndex].priority <= this.list[index].priority) {
                break;
            }
            
            this.swap(parentIndex, index);
            index = parentIndex;
        }
    }

    dequeue() {
        if (!this.list.length) return null;

        this.swap(0, this.list.length - 1);
        const node = this.list.pop();

        let index = 0;

        while (index < this.list.length - 1) {
            let child1Index = index * 2 + 1;
            let child2Index = index * 2 + 2;
            let minIndex = null;

            if (child1Index >= this.list.length && child2Index >= this.list.length) {
                minIndex = null;
            } else if (child1Index >= this.list.length) {
                minIndex = child2Index;
            } else if (child2Index >= this.list.length) {
                minIndex = child1Index;
            } else if (this.list[child1Index].priority < this.list[child2Index].priority) {
                minIndex = child1Index;
            } else {
                minIndex = child2Index;
            }

            if (minIndex && this.list[minIndex].priority < this.list[index].priority) {
                this.swap(minIndex, index);
                index = minIndex;
            } else {
                break;
            }
        }

        return node.data;
    }

    swap(index1, index2) {
        const node1 = this.list[index1];
        this.list[index1] = this.list[index2];
        this.list[index2] = node1;
    }
}

class GeneralPriorityQueue {
    constructor(isMinPQ = true) {
        if (typeof isMinPQ === 'function') {
            this.compareFn = isMinPQ;
        } else {
            this.isMinPQ = isMinPQ;
        }
        this.list = [];
    }

    swap(i, j) {
        const temp = this.list[i];
        this.list[i] = this.list[j];
        this.list[j] = temp;
    }

    compare(parentIndex, childIndex) {
        const parent = this.list[parentIndex];
        const child = this.list[childIndex];

        if (this.compareFn) {
            return this.compareFn(parent, child);
        } else if (this.isMinPQ) {
            return parent.priority <= child.priority;
        } else {
            return parent.priority >= child.priority;
        }
    }

    enqueue(priority, data) {
        this.list.push({ data, priority });
        let i = this.list.length - 1;

        while (i > 0) {
            let parentIndex = Math.floor((i - 1) / 2);
            if (this.compare(parentIndex, i)) break;

            this.swap(i, parentIndex);
            i = parentIndex;
        }
    }

    dequeue(fullData = false) {
        this.swap(0, this.list.length - 1);
        const node = this.list.pop();
        const length = this.list.length;

        if (!this.list.length) {
            return fullData ? node : node.data;            
        };

        let i = 0;
        while (true) {
            let child1 = i * 2 + 1;
            let child2 = i * 2 + 2;
            let childIndex = null;
            
            if (child1 >= length && child2 >= length) {
                break;
            } else if (child1 >= length) {
                childIndex = child2;
            } else if (child2 >= length) {
                childIndex = child1;
            } else {
                childIndex = this.compare(child1, child2) ? child1 : child2;   
            }

            if (this.compare(i, childIndex)) break;

            this.swap(i, childIndex);
            i = childIndex;
        }

        return fullData ? node : node.data;
    }
}

module.exports = {
    MinPriorityList,
    GeneralPriorityQueue,
}