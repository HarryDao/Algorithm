// https://leetcode.com/problems/merge-k-sorted-lists/

// Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.

// Example:

// Input:
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// Output: 1->1->2->3->4->4->5->6

const { MinPriorityList } = require('../../helpers');
const { LinkedList, ListNode } = require('../LinkedList');
const { mergeTwoListsIteration } = require('../1.Easy/1.Merge_2_Linked_List');


/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
// Time complexity : O(Nlogk) where k is the number of linked lists.
// The comparison cost will be reduced to O(logk) for every pop and insertion to priority queue. But finding the node with the smallest value just costs O(1) time.
// There are N nodes in the final linked list.

// Space complexity :
// O(n) Creating a new linked list costs O(n) space.
// O(k) The code above present applies in-place method which cost O(1) space. And the priority queue (often implemented with heaps) costs O(k) space (it's far less than N in most situations).


var mergeKLists = function(lists) {
    const queue = new MinPriorityList();
    let head = null;
    let tail = null;

    lists.forEach((l, index) => {
        if (l) {
            queue.enqueue(index, l.val);
        }
    });

    while (queue.list.length) {
        const index = queue.dequeue();
        const node = lists[index];

        if (!head) {
            head = node;
            tail = node;
        } else {
            tail.next = node;
            tail = node;
        }

        lists[index] = node.next;

        if (node.next) {
            queue.enqueue(index, node.next.val);
        }
    }

    return head;
};


/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */

// Time complexity : O(Nlogk) where k is the number of linked lists.
// We can merge two sorted linked list in O(n) time where n is the total number of nodes in two lists.
// Sum up the merge process and we can get: O(Nlogk) 

// Space complexity : O(1)
// We can merge two sorted linked lists in O(1) space.

var mergeKListsDivideAndConquer = function(lists) {
    function merge(start, end) {
        if (start > end) return null;
        if (start === end) return lists[start];
        const mid = Math.floor((end + start) / 2);
        const left = merge(start, mid);
        const right = merge(mid + 1, end);
        return mergeTwoListsIteration(left, right);
    };

    return merge(0, lists.length - 1);
}



const l1 = new LinkedList();
const l2 = new LinkedList();
const l3 = new LinkedList();
const l4 = new LinkedList();

l1.add(1).add(4).add(5);
l2.add(1).add(3).add(4);
l3.add(2).add(6);

const l = mergeKLists([l1.head, l2.head, l3.head]);
const l = mergeKListsDivideAndConquer([l1.head, l2.head, l3.head]);



// l2.add(-1).add(5).add(11);
// l4.add(6).add(10);
// const l = mergeKListsDivideAndConquer([l1.head, l2.head, l3.head, l4.head]);


let node = l;

while (node) {
    console.log(node.val);
    node = node.next;
}
