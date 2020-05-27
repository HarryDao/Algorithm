// https://leetcode.com/problems/add-two-numbers/

// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Example:

// Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 0 -> 8
// Explanation: 342 + 465 = 807.

const { LinkedList, ListNode } = require('../LinkedList');

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

// Time: O(max(n, m))
// Space: O(max(n, m))

var addTwoNumbers = function(l1, l2) {
    let node1 = l1;
    let node2 = l2;
    let head = null;
    let tail = null;
    let carry = 0;

    while (node1 || node2) {
        const val1 = node1 ? node1.val : 0;
        const val2 = node2 ? node2.val : 0;
        const sum = val1 + val2 + carry;
        const remainder = sum % 10;
        carry = (sum - remainder) / 10;

        const newNode= new ListNode(remainder);

        if (!head) {
            head = newNode;
            tail = newNode;
        } else {
            tail.next = newNode;
            tail = newNode;
        }

        if (node1) node1 = node1.next;
        if (node2) node2 = node2.next;
    }

    if (carry) {
        tail.next = new ListNode(carry);
    }

    return head;
};


const l1 = new LinkedList();
const l2 = new LinkedList();
// l1.add(2).add(4).add(3);
// l2.add(5).add(6).add(4);
l1.add(5);
l2.add(5);

const l = addTwoNumbers(l1.head, l2.head);

let node = l;
while (node) {
    console.log(node.val);
    node = node.next;
}
