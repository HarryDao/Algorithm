// https://leetcode.com/problems/merge-two-sorted-lists/

// Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

// Example:

// Input: 1->2->4, 1->3->4
// Output: 1->1->2->3->4->4

import { ListNode, LinkedList, printList } from '../LinkedListTS';

function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let node: ListNode | null = null;
    let head: ListNode | null = null;
    let node1: ListNode | null = l1;
    let node2: ListNode | null = l2;

    while (node1 || node2) {
        let nextNode: ListNode | null;

        if (!node2) {
            nextNode = node1;
        } else if (!node1) {
            nextNode = node2;
        } else if (node1.val < node2.val) {
            nextNode = node1;
        } else {
            nextNode = node2;
        }

        if (nextNode === node1) {
            if (node1) node1 = node1.next;
        } else if (node2) {
            node2 = node2.next;
        }

        if (!node) {
            head = nextNode;
            node = nextNode;
        } else {
            node.next = nextNode;
            node = nextNode;
        }
    }

    return head;
};

const l1 = new LinkedList().addArray([1, 4, 7]);
const l2 = new LinkedList().addArray([2, 3, 6]);

const h = mergeTwoLists(l1.head, l2.head);
printList(h);