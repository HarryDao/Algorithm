// https://leetcode.com/problems/remove-linked-list-elements/

// Remove all elements from a linked list of integers that have value val.

// Example:

// Input:  1->2->6->3->4->5->6, val = 6
// Output: 1->2->3->4->5

const { LinkedList } = require('../../helpers');


/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    if (!head) return head;

    let newHead = null;
    let newTail = null;
    let node = head;

    while (node) {
        const next = node.next;

        if (node.val !== val) {
            if (!newHead) {
                newHead = node;
            } else {
                newTail.next = node;
            }

            newTail = node;
            node.next = null;
        }

        node = next;
    }

    return newHead;
}



/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElementsNaive = function(head, val) {
    let newHead = null;
    let prev = null;
    let node = head;

    while (node) {
        const next = node.next;

        if (node.val === val) {
            node.next = null;
            if (prev) {
                prev.next = next;
            }
        } else {
            if (!newHead) {
                newHead = node;
            }

            prev = node;
        }

        node = next;
    }

    return newHead;
};

const list = new LinkedList();

// list.adds([6,2,6,3,4,5,6]);
// list.adds([1, 1]);
list.adds([1, 2, 2, 1])

let node = removeElements(list.head, 1);
console.log("node:", node);
while (node) {
    console.log('node:', node.val);
    node = node.next;
}

