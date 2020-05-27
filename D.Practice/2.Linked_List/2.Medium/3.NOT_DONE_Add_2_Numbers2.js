// https://leetcode.com/problems/add-two-numbers-ii/

// You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Follow up:
// What if you cannot modify the input lists? In other words, reversing the lists is not allowed.

// Example:

// Input: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 8 -> 0 -> 7

const { LinkedList, ListNode } = require('../LinkedList');


/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    const arr1 = [];
    const arr2 = [];
    
    let node1 = l1;
    let node2 = l2;

    while (node1) {
        arr1.push(node1.val);
        node1 = node1.next;
    }

    while (node2) {
        arr2.push(node2.val);
        node2 = node2.next;
    }

    const length1 = arr1.length;
    const length2 = arr2.length;
    let length = Math.max(length1, length2);
    let add = 0;
    const result = [];

    for (let i = 0; i < length; i++) {
        const num1 = arr1[length1 - 1 - i] || 0;
        const num2 = arr2[length2 - 1 - i] || 0;
        const total = num1 + num2 + add;
        result.push(total % 10);
        add = Math.floor(total / 10);
    }

    if (add) result.push(add);

    let node = null;
    for (const val of result) {
        const newNode = new ListNode(val);
        newNode.next = node;
        node = newNode;
    }

    return node;
};

// console.log(addTwoNumbers(
//     [7,2,4,3]
//     [5,6,4]
// )); // 

const l1 = new LinkedList();
const l2 = new LinkedList();
// l1.add(7).add(2).add(4).add(3);
// l2.add(5).add(6).add(4);

l1.add(5);
l2.add(5);

const l = addTwoNumbers(l1.head, l2.head);
let node = l;
while (node) {
    console.log('node:', node.val);
    node = node.next;
}
