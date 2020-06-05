// https://leetcode.com/problems/binary-tree-vertical-order-traversal/

// Input: [3,9,8,4,0,1,7,null,null,null,2,5] (0's right child is 2 and 1's left child is 5)

//      3
//     /\
//    /  \
//    9   8
//   /\  /\
//  /  \/  \
//  4  01   7
//     /\
//    /  \
//    5   2

// Output:

// [
//   [4],
//   [9,5],
//   [3,0,1],
//   [8,2],
//   [7]
// ]


const { BinaryTree } = require('../../helpers');

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalOrder = function(root) {
    if (!root) return [];

    const positive = [];
    const negative = [];

    const queue = [{
        node: root,
        level: 0
    }];
    
    function add(node, level) {
        if (level >= 0) {
            if (!positive[level]) positive[level] = [];
            positive[level].push(node.val);
        } else {
            const index = (level * -1) - 1;
            if (!negative[index]) negative[index] = [];
            negative[index].push(node.val);
        }
    }

    while (queue.length) {
        const { node, level } = queue.pop();
        add(node, level);

        if (node.left) {
            queue.unshift({
                node: node.left,
                level: level - 1
            });
        }

        if (node.right) {
            queue.unshift({
                node: node.right,
                level: level + 1
            });
        }
    }

    return [...negative.reverse(), ...positive];
};


const tree = new BinaryTree();

tree.add(5).add(1).add(8).add(7).add(9).add(-1).add(3);

console.log(verticalOrder(tree.root));        