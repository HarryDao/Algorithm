// https://leetcode.com/problems/sort-list/

// Sort a linked list in O(n log n) time using constant space complexity.

// Example 1:

// Input: 4->2->1->3
// Output: 1->2->3->4
// Example 2:

// Input: -1->5->3->4->0
// Output: -1->0->3->4->5

const { LinkedList } = require('../../helpers');

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
var sortList = function(head) {
    if (!head || !head.next) return head;

    let length = 1;
    let total = 0;
    let nextHead = head;
    let node1 = null;

    while (!total || length < total) {
        node1 = nextHead;
        prevTail = null;

        loop1:
        while (node1) {
            if (length === 1) {
                total += 1;
            }

            let node2 = node1;
            let next = node1;
            let tail1 = null;
            let tail2 = null;

            for (let i = 0; i < length; i ++) {
                tail1 = node2;
                node2 = node2 ? node2.next : node2;
                tail2 = next ? next.next : null;
                next = next && next.next ? next.next.next : null;
            }
    
            if (length === 1 && node2) {
                total += 1;
            }

            if (tail1) {
                tail1.next = null;
            }

            if (tail2) {
                tail2.next = null;
            }
    
            let { newHead, newTail } = merge(node1, node2);

            if (!prevTail) {
                nextHead = newHead;
                prevTail = newTail;
            } else {
                prevTail.next = newHead;
                prevTail = newTail;
            }
            node1 = next;
        }
        length = length * 2;
    }

    return nextHead;
};

function merge(head1, head2) {
    let head = null;
    let node1 = head1;
    let node2 = head2;
    let tail = null;

    function toNext(on1 = true) {
        const temp = on1 ? node1 : node2;
        if (on1) {
            node1 = node1.next;
        } else {
            node2 = node2.next;
        }
        return temp;
    }

    while (node1 || node2) {
        let next = null;

        if (!node1) {
            next = toNext(false);
        } else if (!node2) {
            next = toNext(true);
        } else if (Number(node1.val) < Number(node2.val)) {
            next = toNext(true);
        } else {
            next = toNext(false);
        }

        if (!head) {
            head = next;
            tail = next;
        } else {
            tail.next = next;
            tail = next;
        }
    }

    return {
        newHead: head,
        newTail: tail,
    };
}




const list = new LinkedList();
list.add(3).add(-1).add(1).add(5).add(8);
let node = sortList(list.head);
let c = 0;
while (node) {
    if (++ c > 10) break;
    console.log(node.val);
    node = node.next;
}

