// https://leetcode.com/problems/copy-list-with-random-pointer/

// A linked list is given such that each node contains an additional random pointer which could point to any node in the list or null.

// Return a deep copy of the list.

// The Linked List is represented in the input/output as a list of n nodes. Each node is represented as a pair of [val, random_index] where:

// val: an integer representing Node.val
// random_index: the index of the node (range from 0 to n-1) where random pointer points to, or null if it does not point to any node.

// Example 1:


// Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
// Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
// Example 2:


// Input: head = [[1,1],[2,1]]
// Output: [[1,1],[2,1]]
// Example 3:



// Input: head = [[3,null],[3,0],[3,null]]
// Output: [[3,null],[3,0],[3,null]]
// Example 4:

// Input: head = []
// Output: []
// Explanation: Given linked list is empty (null pointer), so return null.






// Definition for a Node.
function Node(val, next, random) {
   this.val = val;
   this.next = next;
   this.random = random;
};


/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    let node = head;
    let head2 = null;
    let node2 = null;
    let index = 0;
    let arr = [];
    
    while (node) {
        node.index = index;

        const newNode = new Node(node.val, null);

        if (!head2) head2 = newNode;
        if (node2) {
            node2.next = newNode;
        }

        node2 = newNode;

        node.index = index;
        arr[index] = newNode;

        index ++;
        node = node.next;
    }

    node = head;

    while (node) {
        if (node.random) {
            arr[node.index].random = arr[node.random.index];
        } else {
            arr[node.index].random = null;
        }
        node = node.next;
    }

    return head2;
};