// https://leetcode.com/problems/merge-two-sorted-lists/

// Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

// Example:

// Input: 1->2->4, 1->3->4
// Output: 1->1->2->3->4->4

const { LinkedList, ListNode } = require('../LinkedList');

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

// Iteration:

// Time complexity : O(n + m)
// Because exactly one of l1 and l2 is incremented on each loop iteration, the while loop runs for a number of iterations equal to the sum of the lengths of the two lists. All other work is constant, so the overall complexity is linear.

// Space complexity : O(1)
// The iterative approach only allocates a few pointers, so it has a constant overall memory footprint.

var mergeTwoListsIteration = function(l1, l2) {
    let node1 = l1;
    let node2 = l2;
    let lastNode = null;
    let firstNode = null;

    while (node1 || node2) {
        let val = null;
        if (
            !node1 ||
            (node2 && node2.val < node1.val)
        ) {
            val = node2.val;
            node2 = node2.next;
        } else {
            val = node1.val;
            node1 = node1.next;
        }

        const node = new ListNode(val);

        if (!firstNode) {
            firstNode = node;
            lastNode = node;
        } else {
            lastNode.next = node;
            lastNode = node;
        }
    }

    return firstNode;
};

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

// Time complexity : O(n + m)
// Because each recursive call increments the pointer to l1 or l2 by one (approaching the dangling null at the end of each list), there will be exactly one call to mergeTwoLists per element in each list. Therefore, the time complexity is linear in the combined size of the lists.

// Space complexity : O(n + m)
// The first call to mergeTwoLists does not return until the ends of both l1 and l2 have been reached, so n + m stack frames consume O(n + m) space.

var mergeTwoListsRecursion = function(l1, l2) {
    if (!l1) {
        return l2;
    }

    if (!l2) {
        return l1;
    }

    if (l1.val < l2.val) {
        l1.next = mergeTwoListsRecursion(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoListsRecursion(l1, l2.next);
        return l2;
    }
}


// const l1 = new LinkedList();
// const l2 = new LinkedList();
// l1.add(1).add(2).add(4);
// l2.add(1).add(3).add(4);

// const l = mergeTwoListsRecursion(l1.head, l2.head);

// let node = l;
// while (node) {
//     console.log(node.val);
//     node = node.next;
// }


module.exports = {
    mergeTwoListsIteration
}
