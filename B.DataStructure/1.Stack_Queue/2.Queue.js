class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class Queue {
    constructor(val) {
        this.first = null;
        this.last = null;
        this.length = 0;
    }

    enqueue(val) {
        const node = new Node(val);
        if (!this.last) {
            this.first = node;
            this.last = node;
        } else {
            this.last.next = node;
            this.last = node;
        }
        this.length += 1;
        return this.length;
    }

    dequeue() {
        if (!this.first) {
            return null;
        }
        const node = this.first;
        this.first = node.next;
        if (this.length === 1) {
            this.last = null;
        };
        this.length -= 1;
        return node.val;
    }

    peek() {
        return this.first ? this.first.val : null;
    }

    print() {
        let node = this.first;
        console.log('head:', this.first);
        console.log('tail:', this.last);
        console.log('length: ', this.length);
        while (node) {
            console.log(node.val);
            node = node.next;
        }
    }
}

const queue = new Queue();
console.log(queue.enqueue(1));
console.log(queue.enqueue(2));
console.log(queue.enqueue(3));
queue.print();
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
queue.print();