// NOT YET NOT YET NOT YET

// https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/ =>

// Given an array arr of positive integers, consider all binary trees such that:

// Each node has either 0 or 2 children;
// The values of arr correspond to the values of each leaf in an in-order traversal of the tree.  (Recall that a node is a leaf if and only if it has 0 children.)
// The value of each non-leaf node is equal to the product of the largest leaf value in its left and right subtree respectively.
// Among all possible binary trees considered, return the smallest possible sum of the values of each non-leaf node.  It is guaranteed this sum fits into a 32-bit integer.

// Example 1:

// Input: arr = [6,2,4]
// Output: 32
// Explanation:
// There are two possible trees.  The first has non-leaf node sum 36, and the second has non-leaf node sum 32.

//     24            24
//    /  \          /  \
//   12   4        6    8
//  /  \               / \
// 6    2             2   4


/**
 * @param {number[]} arr
 * @return {number}
 */
const mctFromLeafValues = function(arr) {
    const stack = [
        arr.map(num => ({ total: 0, max: num }))
    ];
    let min = null;

    while (stack.length) {
        console.log('stack:', stack);
        const list = stack.pop();
        if (list.length <= 2) {
            const { total } = add(list[0], list[1]);
            min = min === null ? total:  Math.min(total, min);
            console.log('min:', min, total);
            continue;    
        }

        const evenArr = [];
        const oddArr = [];

        for (let i = 0; i <= list.length; i += 2) {
            const even = add(list[i], list[i + 1]);
            if (even) evenArr.push(even);
            
            const odd = add(list[i], list[i - 1]);
            if (odd) oddArr.push(odd);
        }

        stack.push(evenArr, oddArr);
    }

    function add(num1, num2) {
        if (!num1 && !num2) return null;
        if (!num1) return num2;
        if (!num2) return num1;

        return {
            total: num1.max * num2.max + num1.total + num2.total,
            max: Math.max(num1.max, num2.max)
        };
    }

    return min
};

// 6 8 4 10 2 7 13

// mctFromLeafValues([6, 2, 4])
// mctFromLeafValues([7,12,8,10]);

mctFromLeafValues([15,13,5,3,15]);

// 15 13 5 3 15

// 15 (13 5) (3 15)
// 0 65 45

    // 15 13 15
    // (15 13) 15
    // 195 0

        // 225

// (15 13) 5 (3 15)
// 195 0 45

    // 15 5 15
    // 75 0
        // 225

// (15 13) (5 3) 15
// 195 15 0
    // 15 5 15
    // 75


