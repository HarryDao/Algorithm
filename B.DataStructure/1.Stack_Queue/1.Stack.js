class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.length = 0;
    }

    push(val) {
        var newNode = new Node(val);
        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            newNode.next = this.first;
            this.first = newNode;
        }
        this.length += 1;
        return this.length;
    }

    pop() {
        if (!this.first) {
            return null;
        }
        const node = this.first;
        this.first = node.next;
        if (this.length === 1) {
            this.last = null;
        }
        this.length -= 1;
        return node.val;
    }

    peek() {
        return this.first ? this.first.val : null;
    }

    print() {
        let node = this.first;
        console.log('head:', this.first.val);
        console.log('tail:', this.last.val);
        console.log('length: ', this.length);
        while (node) {
            console.log(node.val);
            node = node.next;
        }
    }
}

const stack = new Stack ();
stack.push(1);
stack.push(2);
stack.push(3);
stack.print();
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());