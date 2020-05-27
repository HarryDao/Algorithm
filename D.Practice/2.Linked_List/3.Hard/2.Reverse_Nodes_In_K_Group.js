// https://leetcode.com/problems/reverse-nodes-in-k-group/

// Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.

// k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes in the end should remain as it is.

// Example:

// Given this linked list: 1->2->3->4->5

// For k = 2, you should return: 2->1->4->3->5

// For k = 3, you should return: 3->2->1->4->5

// Note:

// Only constant extra memory is allowed.
// You may not alter the values in the list's nodes, only nodes itself may be changed.


const { ListNode, LinkedList } = require('../LinkedList');



/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */

 // 1 2 3
 // 3 2 1 6 5 4

var reverseKGroup = function(head, k) {
    if (k < 2) return head;

    function reverse(h, prevTail) {
        let node = h;
        let prev = null;

        while (node) {
            const temp = node.next;
            node.next = prev;
            prev = node;
            node = temp;
        }

        if (prevTail) prevTail.next = prev;
        return prev;
    }

    let node = head;
    let count = 0;
    let newHead = null;
    let tempTail = null;
    let prevTail = null;

    while (node) {
        count += 1;
        let tempNext = node.next;

        if (count === 1) {
            if (tempTail) {
                prevTail = tempTail;
            }
            tempTail = node;
        }

        if (count === k) {
            node.next = null;
            const h = reverse(tempTail, prevTail);

            if (!newHead) newHead = h;
            count = 0;
        }

        node = tempNext;
    }

    if (count > 0) {
        if (!newHead) return head;
        prevTail.next = tempTail;
    }

    return newHead;
}

const list = new LinkedList();
list.add(1)
.add(2)
.add(3)
.add(4)
.add(5);

const reverse = reverseKGroup(list.head, 3);
let node = reverse;
while (node) {
    console.log('n:', node.val);
    node = node.next;
}