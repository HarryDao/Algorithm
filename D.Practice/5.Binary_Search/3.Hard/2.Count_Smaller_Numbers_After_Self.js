// https://leetcode.com/problems/count-of-smaller-numbers-after-self/

// You are given an integer array nums and you have to return a new counts array. The counts array has the property where counts[i] is the number of smaller elements to the right of nums[i].

// Example:

// Input: [5,2,6,1]
// Output: [2,1,1,0] 
// Explanation:
// To the right of 5 there are 2 smaller elements (2 and 1).
// To the right of 2 there is only 1 smaller element (1).
// To the right of 6 there is 1 smaller element (1).
// To the right of 1 there is 0 smaller element.


/**
 * @param {number[]} nums
 * @return {number[]}
 */

// O(n * logn)

var countSmaller = function(nums) {
    const result = [];
    const tree = new Tree();

    for (let index = nums.length - 1; index >= 0; index --) {
        result.push(tree.add(nums[index]));
    }

    return result.reverse();
}

class Tree {
    constructor() {
        this.root = null;
    }

    add(val, data) {
        const newNode = new TreeNode(val);
        
        if (!this.root) {
            this.root = newNode;
            return 0;
        }

        let node = this.root;
        let count = 0;

        while (node) {
            const left = node.left;
            const right = node.right;

            if (val === node.val) {
                node.weight += 1;
                return count + node.leftCount;
            } else if (val < node.val) {
                node.leftCount += 1;
                if (!left) {
                    node.left = newNode;
                }
                node = left;
            } else {
                count += node.weight + node.leftCount;
                if (!right) {
                    node.right = newNode;
                }
                node = right;
            }
        }

        return count;
    }
}

class TreeNode {
    constructor(val) {
        this.val = val;
        this.weight = 1;
        this.leftCount = 0;
        this.left = null;
        this.right = null;
    }
}


/**
 * @param {number[]} nums
 * @return {number[]}
 */

// O(N ** 2)

var countSmallerNaive = function(nums) {
    const result = [];
    for (let i = 0, l = nums.length; i < l; i ++) {
        let count = 0;
        const num = nums[i];

        for (let j = i + 1; j < l; j++) {
            if (nums[j] < num) {
                count += 1;
            }
        }

        result.push(count);
    }

    return result;
};

// console.log(countSmaller(
//     [5,2,6,1]
// )); // [2, 1, 1, 0]

// console.log(countSmaller(
//     [12, 0, 3, 2, 1, 1]
// )); // [0, 0]


// [26,78,27,100,33,67,90,23,66,5,38,7,35,23,52,22,83,51,98,69,81,32,78,28,94,13,2,97,3,76,99,51,9,21,84,66,65,36,100,41]

console.log(countSmaller(
    [51,98, 69,81, 32,78,28,94,13,2,97,3,76,99,51,9,21,84,66,65,36,100,41],
)); //