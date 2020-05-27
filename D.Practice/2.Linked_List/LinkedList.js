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

module.exports = {
    ListNode,
    LinkedList,
}