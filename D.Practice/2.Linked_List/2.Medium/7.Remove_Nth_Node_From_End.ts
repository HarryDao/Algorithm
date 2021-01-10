// https://leetcode.com/problems/remove-nth-node-from-end-of-list/

// Given a linked list, remove the n-th node from the end of list and return its head.

// Example:

// Given linked list: 1->2->3->4->5, and n = 2.

// After removing the second node from the end, the linked list becomes 1->2->3->5.
// Note:

// Given n will always be valid.

// Follow up:

// Could you do this in one pass?

import { ListNode, LinkedList, printList } from '../LinkedListTS';

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    if (!head) return null;

    let diff = 0;
    let prevSlow: ListNode | null = null;
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    while (fast) {
        fast = fast.next;
        diff += 1;
        
        if (diff <= n) continue;

        prevSlow = slow;
        if (slow) slow = slow.next;

    }

    if (!prevSlow) {
        return head ? head.next : null;
    }

    if (slow && slow.next) {
        prevSlow.next = slow.next;
    } else {
        prevSlow.next = null;
    }

    return head;
};

const list = new LinkedList().addArray([1, 2, 3, 4, 5]);
const h = removeNthFromEnd(list.head, 0);
printList(h);