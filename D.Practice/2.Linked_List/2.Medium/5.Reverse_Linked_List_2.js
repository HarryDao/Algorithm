// https://leetcode.com/problems/reverse-linked-list-ii/

// Reverse a linked list from position m to n. Do it in one-pass.

// Note: 1 ≤ m ≤ n ≤ length of list.

// Example:

// Input: 1->2->3->4->5->NULL, m = 2, n = 4
// Output: 1->4->3->2->5->NULL


const { LinkedList, ListNode, testLinkedList } = require('../LinkedList');

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */

// O(1)

var reverseBetweenChangeNext = function(head, m, n) {
    if (!head || m >= n) return head;

    let newHead = head;
    let tailPre = null;
    let tailReverse = null;

    let prev = null;
    let node = head;
    let count = 1;
    
    while (node) {
        const next = node.next;

        if (count === m) {
            tailPre = prev;
            tailReverse = node;
        }

        if (count > m && count <= n) {
            node.next = prev;
        }

        if (count === n) {
            if (tailPre) {
                tailPre.next = node;
            } else {
                newHead = node;
            }

            if (tailReverse) {
                tailReverse.next = next;
            }
        }

        prev = node;
        node = next;
        count += 1;
    }

    return newHead;
};


/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */

// O(n ** 2)

var reverseBetweenSwapValues = function(head, m, n) {
    const mid = (m + n) / 2;

    function findCounterPart(count) {
        if (count < m || count >= mid) return null;
        return m + n - count;
    }

    function swap(node1, node2) {
        const val1 = node1.val;
        node1.val = node2.val;
        node2.val = val1;
    }

    let node = head;
    let count = 1;

    while (node && count < mid) {
        if (count >= m) {
            let counter = findCounterPart(count);
            let tempNode = node;
            let tempCounter = count;
            
            while (tempNode && tempCounter < counter) {
                tempNode = tempNode.next;
                tempCounter += 1;
            }
    
            if (tempCounter === counter) {
                swap(node, tempNode);
            }
        }
        node = node.next;
        count += 1;
    }

    return head;
}





const test = testLinkedList();

test(reverseBetweenChangeNext, [1, 2, 3, 4, 5], 2, 4); // 1, 4, 3, 2, 5
test(reverseBetweenChangeNext, [3, 5], 1, 2); // 5, 3


