// Reverse a singly Linked List in groups of given size | Set 3

function reverseInGroup(h, n) {
    let currentCount = 0;
    let node = h;
    let prev = null;
    let groupPrevTail = null;
    let groupTail = node;
    let newHead = null;

    while (node) {
        const tempNode = node;
        const tempNext = node.next;
        node.next = prev;
        prev = node;
        node = tempNext;

        if (currentCount === 0) {
            groupTail = tempNode;
            groupTail.next = null;
        }

        if (currentCount === n - 1 || !node) {
            if (!groupPrevTail) {
                newHead = tempNode;
            }
            else {
                groupPrevTail.next = tempNode;
            }
            groupPrevTail = groupTail;
        }

        currentCount += 1;
        if (currentCount === n) {
            currentCount = 0;
        }
    }
}

class LinkedList {
    constructor() {
        this.head = n;
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

let head = new Node(1);
let node = head;

for (let i of [2, 3, 4]) {
    node.next = new Node(i);
    node = node.next;
}

reverse(head, 3);