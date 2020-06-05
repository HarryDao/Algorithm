function ListNode(val) {
    this.val = val;
    this.next = null;
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    add(val) {
        const newNode = new ListNode(val);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = this.tail.next;
        }

        return this;
    }
}

const testLinkedList = function(toPrint = true) {
    return function(fn, inputs, ...args) {
        const list = new LinkedList();

        if (!Array.isArray(inputs)) {
            inputs = [inputs];
        }
    
        for (const input of inputs) {
            list.add(input);
        }
    
        let node = fn(list.head, ...args);
    
        if (!toPrint) return node;

        let limit = 0;
        while (node) {
            if (++limit > 10) {
                console.log('LIMITED');
                break;
            }
            console.log("node:", node.val);
            node = node.next;
        }
    };
}

module.exports = {
    ListNode,
    LinkedList,
    testLinkedList,
}