// https://leetcode.com/problems/reorder-list/

// Given a singly linked list L: L0→L1→…→Ln-1→Ln,
// reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…

// You may not modify the values in the list's nodes, only nodes itself may be changed.

// Example 1:

// Given 1->2->3->4, reorder it to 1->4->2->3.
// Example 2:

// Given 1->2->3->4->5, reorder it to 1->5->2->4->3.

import { ListNode, LinkedList, printList } from '../LinkedListTS';

function reorderList(head: ListNode | null): void {
    // find midpoint
    let prevSlow: ListNode | null = null;
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    while (fast && fast.next && slow) {
        fast = fast.next;
        if (fast) fast = fast.next;

        prevSlow = slow;
        slow = slow.next;
    }

    if (prevSlow === slow || slow === fast) return;

    if (prevSlow) {
        prevSlow.next = null;
    }

    // reverse the 2nd list
    let prevNode2: ListNode | null = null;
    let node2: ListNode | null = slow;

    while (node2) {
        const next = node2.next;
        node2.next = prevNode2;
        prevNode2 = node2;
        node2 = next;
    }

    // merge 2 lists
    let l1 = head;
    let l2 = prevNode2;

    let newNode: ListNode | null = null;
    
    while (l1 || l2) {
        if (l1) {
            const next = l1;
            if (!newNode) {
                newNode = next;
            } else {
                newNode.next = l1;
                newNode = newNode.next;
            }

            l1 = l1.next;
        }

        if (l2) {
            const next = l2;
            if (!newNode) {
                newNode = next;
            } else {
                newNode.next = l2;
                newNode = newNode.next;
            }

            l2 = l2.next;
        }
    }
};

const list = new LinkedList();
list.addArray([1, 2, 3, 4, 5, 6,]);

reorderList(list.head);
printList(list.head);