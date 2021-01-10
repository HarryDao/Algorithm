// https://leetcode.com/problems/rotate-list/

// Input: head = [1,2,3,4,5], k = 2
// Output: [4,5,1,2,3]

import { ListNode, LinkedList, printList } from '../LinkedListTS';

function rotateRight(head: ListNode | null, k: number): ListNode | null {
    let count = 0;
    let node = head;
    let tail: ListNode | null = node;
    
    while (node) {
        count += 1;
        node = node.next;
        if (node) tail = node;
    }

    let nodeCount = count - k % count;

    if (nodeCount % count === 0) return head;

    let prevNode: ListNode | null = null;
    let currentNode = head;
    
    while (nodeCount > 0 && currentNode) {
        prevNode = currentNode;
        currentNode = currentNode.next;
        nodeCount -= 1;
    }

    if (prevNode) prevNode.next = null;
    if (tail) tail.next = head;
    return currentNode;
};

const l = new LinkedList().addArray([1, 2, 3, 4, 5]);
const h = rotateRight(l.head, 5);
printList(h);