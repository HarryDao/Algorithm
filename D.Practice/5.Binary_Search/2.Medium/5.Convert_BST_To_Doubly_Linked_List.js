// https://leetcode.com/problems/convert-binary-search-tree-to-sorted-doubly-linked-list/

// Convert a Binary Search Tree to a sorted Circular Doubly-Linked List in place.

// You can think of the left and right pointers as synonymous to the predecessor and successor pointers in a doubly-linked list. For a circular doubly linked list, the predecessor of the first element is the last element, and the successor of the last element is the first element.

// We want to do the transformation in place. After the transformation, the left pointer of the tree node should point to its predecessor, and the right pointer should point to its successor. You should return the pointer to the smallest element of the linked list.

 

// Example 1:

// root = [4,2,5,1,3]


// Output: [1,2,3,4,5]

// Explanation: The figure below shows the transformed BST. The solid line indicates the successor relationship, while the dashed line means the predecessor relationship.

// Example 2:

// Input: root = [2,1,3]
// Output: [1,2,3]
// Example 3:

// Input: root = []
// Output: []
// Explanation: Input is an empty tree. Output is also an empty Linked List.
// Example 4:

// Input: root = [1]
// Output: [1]

function Node(val, left, right) {
    this.val = val;
    this.left = left;
    this.right = right;
};



/**
 * @param {Node} root
 * @return {Node}
 */

//       4      
//   2       6  
// 1   3   5   7

var treeToDoublyListIterative = function(root) {   
    const stack = [];
    let pointer = root;

    let head = null;
    let currentNode = null;

    function buildList(val) {
        const node = new Node(val);
        if (!head) head = node;
        if (currentNode) {
            currentNode.right = node;
            node.left = currentNode;
        }
        currentNode = node;
    }
    
    while (stack.length || pointer) {
        if (pointer) {
            stack.push(pointer);
            pointer = pointer.left;
        } else {
            pointer = stack.pop();
            buildList(pointer.val);
            pointer = pointer.right;
        }
    }

    if (head) {
        head.left = currentNode;
        currentNode.right = head;
    }

    return head;
}



/**
 * @param {Node} root
 * @return {Node}
 */
var treeToDoublyListRecursion = function(root) {    
    function traverseInOrder(node, fn) {
        if (!node) return;
        
        if (node.left) traverseInOrder(node.left, fn);

        fn(node.val);

        if (node.right) traverseInOrder(node.right, fn);
    }

    let head = null;
    let currentNode = null;

    traverseInOrder(root, (val) => {
        const newNode = new Node(val);

        if (!head) head = newNode;

        if (currentNode) {
            currentNode.right = newNode;
            newNode.left = currentNode;
        }

        currentNode = newNode;
    });

    if (head) {
        head.left = currentNode;
        currentNode.right = head;
    }

    return head;
};

// 1, 2, 3, 4, 5, 6, 7
const head = new Node(4);
head.left = new Node(2);
head.left.left = new Node(1);
head.left.right = new Node(3);
head.right = new Node(6);
head.right.right = new Node(7);
head.right.left = new Node(5);

// // 1
// const head = new Node(1);
// head.right = new Node(2);

const h2 = treeToDoublyListIterative(head);

let n = 0;
let node = h2;
while (node && ++n < 10) {
    console.log('node:', node.val);
    if (node.left) console.log('l:', node.left.val);
    if (node.right) console.log('r:', node.right.val);
    node = node.right;
}