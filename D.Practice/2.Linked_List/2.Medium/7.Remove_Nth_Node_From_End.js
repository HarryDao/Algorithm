// https://leetcode.com/problems/remove-nth-node-from-end-of-list/

// Given a linked list, remove the n-th node from the end of list and return its head.

// Example:

// Given linked list: 1->2->3->4->5, and n = 2.

// After removing the second node from the end, the linked list becomes 1->2->3->5.
// Note:

// Given n will always be valid.

// Follow up:

// Could you do this in one pass?

const { LinkedList } = require('../../helpers');

var removeNthFromEnd = function(head, n) {
    let prev = null;
    let node1 = head;
    let node2 = head;
    let diff = 0;

    while (node2) {
        node2 = node2.next;

        if (diff < n) {
            diff += 1;
        } else {
            prev = node1;
            node1 = node1.next;
        }
    }

    if (diff < n) {
        return head;
    }

    if (prev) {
        prev.next = node1.next;
    } else {
        if (node1.next) {
            const next = node1.next;
            node1.next = null;
            return next;
        } else {
            return null;
        }
    }

    return head;
};

const list = new LinkedList();

list.adds([1]);

let node = removeNthFromEnd(list.head, 2);
while (node) {
    console.log('node:', node.val);
    node = node.next;
}