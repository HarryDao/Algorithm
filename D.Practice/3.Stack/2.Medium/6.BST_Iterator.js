// Implement an iterator over a binary search tree (BST). Your iterator will be initialized with the root node of a BST.

// Calling next() will return the next smallest number in the BST.

// Example:

//      7
// 3            15
//        9           20

// BSTIterator iterator = new BSTIterator(root);
// iterator.next();    // return 3
// iterator.next();    // return 7
// iterator.hasNext(); // return true
// iterator.next();    // return 9
// iterator.hasNext(); // return true
// iterator.next();    // return 15
// iterator.hasNext(); // return true
// iterator.next();    // return 20
// iterator.hasNext(); // return false



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
 */
var BSTIterator = function(root) {
    this.stack = [];
    this.currentNode = root;
};

/**
 * @return the next smallest number
 * @return {number}
 */
BSTIterator.prototype.next = function() {
    while (this.hasNext()) {
        if (!this.currentNode) {
            const temp = this.stack.pop();
            this.currentNode = temp.right;
            return temp.val;
        }
    
        while (this.currentNode) {
            this.stack.push(this.currentNode);
            this.currentNode = this.currentNode.left;
        }
    }

    return null;
};

/**
 * @return whether we have a next smallest number
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
    return !!(this.stack.length || this.currentNode);
};

/** 
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

const { BinaryTree } = require('../../helpers');

const tree = new BinaryTree();
tree.add(7).add(3).add(15).add(9).add(20);

const iterator = new BSTIterator(tree.root);

let a = iterator.next();
while (a) {
    console.log('a:', a);
    console.log('has:', iterator.hasNext());
    a = iterator.next();
}