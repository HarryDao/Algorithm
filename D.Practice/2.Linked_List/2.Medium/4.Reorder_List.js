// https://leetcode.com/problems/reorder-list/

// Given a singly linked list L: L0→L1→…→Ln-1→Ln,
// reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…

// You may not modify the values in the list's nodes, only nodes itself may be changed.

// Example 1:

// Given 1->2->3->4, reorder it to 1->4->2->3.
// Example 2:

// Given 1->2->3->4->5, reorder it to 1->5->2->4->3.

const { LinkedList, ListNode }  = require('../LinkedList');


/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
    if (!head) return head;

    let slow = head;
    let fast = head;

    while (slow.next && fast.next) {
        slow = slow.next;
        fast = fast.next.next ? fast.next.next : fast.next;
    }
    
    let node = slow;
    let reverse = null;

    while (node) {
        const next = node.next;
        node.next = reverse;
        reverse = node;
        node = next;
    }

    let node1 = head;
    let node2 = reverse;
    let currentNode = null;

    while (node2) {
        const next1 = node1.next;
        const next2 = node2.next;

        if (node1 !== node2) {
            node1.next = node2;
        }

        if (currentNode) {
            currentNode.next = node1;
        }

        currentNode = node2;

        node1 = next1;
        node2 = next2;
    }
};

const l1 = new LinkedList();

l1.add(1).add(2).add(3).add(4).add(5);
reorderList(l1.head);

let n = l1.head;
while (n) {
    console.log('n:', n.val);
    n = n.next;
}


// 1 2 3 4 5
// 1