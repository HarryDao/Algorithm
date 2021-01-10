// https://leetcode.com/problems/add-two-numbers/

// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Example:

// Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 0 -> 8
// Explanation: 342 + 465 = 807.


/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

import { ListNode, LinkedList, printList } from '../LinkedListTS';

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let node1: ListNode | null = l1;
    let node2: ListNode | null = l2;
    let node: ListNode | null = null;
    let firstNode: ListNode | null = node;
    let saved = 0;

    while (node1 || node2) {
        const v1 = node1 ? node1.val : 0;
        const v2 = node2 ? node2.val : 0;
        const total = v1 + v2 + saved;
        const v = total % 10;
        saved = (total - v) / 10;
        const nextNode = new ListNode(v);
        
        if (node) {
            node.next = nextNode;
            node = node.next;
        } else {
            node = nextNode;
            firstNode = nextNode;
        }

        if (node1) node1 = node1.next;
        if (node2) node2 = node2.next;
    }

    if (saved && node) node.next = new ListNode(saved); 
    return firstNode;
};

const l1 = new LinkedList().addArray([2, 4, 3]);
const l2 = new LinkedList().addArray([5, 6, 4]);
const node = addTwoNumbers(l1.head, l2.head);
printList(node);