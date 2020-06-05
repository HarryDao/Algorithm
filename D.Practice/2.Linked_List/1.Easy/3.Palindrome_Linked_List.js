// https://leetcode.com/problems/palindrome-linked-list/

// Given a singly linked list, determine if it is a palindrome.

// Example 1:

// Input: 1->2
// Output: false
// Example 2:

// Input: 1->2->2->1
// Output: true
// Follow up:
// Could you do it in O(n) time and O(1) space?

const { testLinkedList } = require('../LinkedList');

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    if (!head) return true;

    let prev = null;
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        fast = fast.next.next;

        const next = slow.next;
        
        slow.next = prev;
        prev = slow;
        slow = next;
    }

    let node1 = prev;
    let node2 = fast ? slow.next : slow;

    while (node1 && node2) {
        if (node1.val !== node2.val) return false;
        node1 = node1.next;
        node2 = node2.next;
    }

    return node1 === null && node2 === null;
};

const test = testLinkedList(false);
console.log(test(isPalindrome, [1])); // false;
// console.log(test(isPalindrome, [1,2, 3, 4])); // false;