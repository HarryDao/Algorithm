// https://leetcode.com/problems/validate-binary-search-tree/

// Given a binary tree, determine if it is a valid binary search tree (BST).

// Assume a BST is defined as follows:

// The left subtree of a node contains only nodes with keys less than the node's key.
// The right subtree of a node contains only nodes with keys greater than the node's key.
// Both the left and right subtrees must also be binary search trees.
 

// Example 1:

//     2
//    / \
//   1   3

// Input: [2,1,3]
// Output: true
// Example 2:

//     5
//    / \
//   1   4
//      / \
//     3   6

// Input: [5,1,4,null,null,3,6]
// Output: false
// Explanation: The root node's value is 5 but its right child's value is 4.

const { BinaryTree, testBST } = require('../../helpers');

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @return {boolean}
 */

var isValidBST = function(root) {
    if (!root) return true;

    const stack = [];
    let prev = null;
    let currentNode = root;

    while (currentNode || stack.length) {
        while (currentNode) {
            stack.push(currentNode);
            currentNode = currentNode.left;
        }

        if (stack.length) {
            const last = stack.pop();
            
            if (prev !== null && last.val <= prev) {
                return false;
            }

            prev = last.val;
            currentNode = last.right;
        }
    }

    return true;
}



/**
 * @param {TreeNode} root
 * @return {boolean}
 */

var isValidBSTRecursion = function(root) {
    function traverse(node, fn) {
        if (!node) return;
        if (node.left) traverse(node.left, fn);
        fn(node);
        if (node.right) traverse(node.right, fn);
    }
    let prev = null;
    let valid = true;

    traverse(root, (node) => {
        if (prev && prev.val >= node.val) {
            valid = false;
        }

        prev = node;
    });

    return valid;
};


const tree = new BinaryTree();
tree.add(3).add(5).add(1).add(4).add(2);

console.log(isValidBST(tree.head));