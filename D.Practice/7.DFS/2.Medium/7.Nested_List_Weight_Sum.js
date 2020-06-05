// https://leetcode.com/problems/nested-list-weight-sum-ii/

// Nested List Weight Sum II

// Given a nested list of integers, return the sum of all integers in the list weighted by their depth.

// Each element is either an integer, or a list -- whose elements may also be integers or other lists.

// Different from the previous question where weight is increasing from root to leaf, now the weight is defined from bottom up. i.e., the leaf level integers have weight 1, and the root level integers have the largest weight.

// Example 1:

// Input: [[1,1],2,[1,1]]
// Output: 8 
// Explanation: Four 1's at depth 1, one 2 at depth 2.
// Example 2:

// Input: [1,[4,[6]]]
// Output: 17 
// Explanation: One 1 at depth 3, one 4 at depth 2, and one 6 at depth 1; 1*3 + 4*2 + 6*1 = 17.

var depthSumInverse = function(nestedList) {
    const stack = [...nestedList.map(list => ({ node: list,  depth: 0}))];
    const total = [];
    let maxDepth = 0;
    
    while (stack.length) {
        const { node, depth } = stack.pop();
        if (node.isInteger()) {
            total.push({ value: node.getInteger(), depth });
            maxDepth = Math.max(depth, maxDepth);
        } else {
            node.getList().forEach(item => {
                stack.push({ node: item, depth: depth + 1 });
            });
        }
    }
    
    return total.reduce((sum, { value, depth }) => {
        return sum + value * (maxDepth + 1 - depth);
    }, 0);
}

var depthSumInverseRecursive = function(nestedList) {
    const totalArray = [];
    let maxDepth = 0;

    function add(node, depth) {
        if (node.isInteger()) {
            maxDepth = Math.max(maxDepth, depth);
            totalArray.push({
                value: node.getInteger(),
                depth
            });
        } else {
            node.getList().forEach(sub => {
                add(sub, depth + 1);
            });
        }
    }

    nestedList.forEach(item => {
        add(item, 0)
    });

    const total = totalArray.reduce((total, { value, depth }) => {
        return total + value * (maxDepth + 1 - depth);
    }, 0);

    console.log(total);
};