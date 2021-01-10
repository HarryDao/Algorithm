// https://leetcode.com/problems/partition-list/

// Given a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.

// You should preserve the original relative order of the nodes in each of the two partitions.

// Example:

// Input: head = 1->4->3->2->5->2, x = 3
// Output: 1->2->2->4->3->5

import { LinkedList, ListNode, printList } from '../LinkedListTS';

function partition(head: ListNode | null, x: number): ListNode | null {
    let smallHead: ListNode | null = null;
    let smallNode: ListNode | null = null;
    let largeHead: ListNode | null = null;
    let largeNode: ListNode | null = null;
    let node: ListNode | null = head;

    while (node) {
        if (node.val < x) {
            if (smallNode) {
                smallNode.next = node;
                smallNode = node;
            } else {
                smallNode = node;
                smallHead = node;
            }
        } else {
            if (largeNode) {
                largeNode.next = node;
                largeNode = node;
            } else {
                largeNode = node;
                largeHead = node;
            }
        }

        const next = node.next;
        node.next = null;
        node = next;
    }

    if (smallNode) {
        smallNode.next = largeHead;
        return smallHead;
    }

    return largeHead;
};

const l = new LinkedList().addArray([1, 4, 3, 2, 5, 2]);
const h = partition(l.head, 4);

printList(h);