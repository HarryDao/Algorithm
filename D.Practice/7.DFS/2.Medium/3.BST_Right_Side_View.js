// https://leetcode.com/problems/binary-tree-right-side-view/

// Given a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

// Example:

// Input: [1,2,3,null,5,null,4]
// Output: [1, 3, 4]
// Explanation:

//    1            <---
//  /   \
// 2     3         <---
//  \     \
//   5     4       <---


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
 * @return {number[]}
 */
var rightSideViewDSF = function(root) {
    if (!root) return [];

    const stack = [[root, 0]];
    const result = [];
    let depth = 0;

    while (stack.length) {
        const [node, level] = stack.pop();
        
        if (depth <= level) {
            result.push(node.val);
            depth += 1;
        }

        if (node.left) {
            stack.push([node.left, level + 1]);
        }

        if (node.right) {
            stack.push([node.right, level + 1]);
        } 
    }

    return result;
}






/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideViewBSF = function(root) {
    if (!root) return [];

    let array = [root];
    let view = [];
    while(array.length) {
        view.push(array[array.length - 1].val);

        let newArray = [];

        array.forEach(node => {
            if (node.left) newArray.push(node.left);
            if (node.right) newArray.push(node.right);
        });

        array = newArray;
    }

    return view;
};