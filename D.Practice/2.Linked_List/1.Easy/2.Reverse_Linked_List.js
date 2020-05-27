// https://leetcode.com/problems/reverse-linked-list/

// Reverse a singly linked list.

// Example:

// Input: 1->2->3->4->5->NULL
// Output: 5->4->3->2->1->NULL

const { LinkedList, ListNode } = require('../LinkedList');

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let reverse = null;
    let node = head;
    while (node) {
        const newNode = new ListNode(node.val);
        newNode.next = reverse;
        reverse = newNode;
        node = node.next;
    }
    return reverse;
};