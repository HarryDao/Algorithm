// https://leetcode.com/problems/balanced-binary-tree/

// Given a binary tree, determine if it is height-balanced.

// For this problem, a height-balanced binary tree is defined as:

// a binary tree in which the left and right subtrees of every node differ in height by no more than 1.

 

// Example 1:

// Given the following tree [3,9,20,null,null,15,7]:

//     3
//    / \
//   9  20
//     /  \
//    15   7
// Return true.

// Example 2:

// Given the following tree [1,2,2,3,3,null,null,4,4]:

//        1
//       / \
//      2   2
//     / \
//    3   3
//   / \
//  4   4
// Return false.

const { BinaryTreePlain } = require('../../helpers');

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
var isBalanced = function(root) {
    if (!root) return true;
    let balanced = true;

    function findLevel (node) {
        if (!balanced) return;

        if (!node) return 0;

        let left = 0;
        let right = 0;

        if (node.left) {
            left = 1 + findLevel(node.left);    
        }

        if (node.right) {
            right = 1 + findLevel(node.right);
        }

        if (Math.abs(left - right) > 1) {
            balanced = false;
        } else {
            return Math.max(left, right);
        };
    }

    findLevel(root);

    return balanced;
};

function test(array) {
    const tree = new BinaryTreePlain();
    tree.adds(array);
    console.log(isBalanced(tree.head)); 
}

// test([3,9,20,null,null,15,7]);
test([1,2,2,3,3,null,null,4,4]);

//        1
//       / \
//      2   2
//     / \
//    3   3
//   / \
//  4   4