// https://leetcode.com/problems/longest-consecutive-sequence/

// Given an unsorted array of integers, find the length of the longest consecutive elements sequence.

// Your algorithm should run in O(n) complexity.

// Example:

// Input: [100, 4, 200, 1, 3, 2]
// Output: 4
// Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.


/**
 * @param {number[]} nums
 * @return {number}
 */



/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutiveUF = function(nums) {
    const numMap = {};
    const map = {};
    const uf = new UnionFind(nums.length);

    for (let i = 0, l = nums.length; i < l; i++) {
        const num = nums[i];
        
        if (numMap[num]) continue;
        numMap[num] = true;

        if (map[num]) {
            map[num].forEach(j => {
                uf.union(i, j);
            });
        }

        [num - 1, num + 1].forEach(n => {
            if (!map[n]) map[n] = [];
            map[n].push(i);
        });
    }

    const count = {};
    let max = 0;

    uf.list.forEach((n) => {
        const root = uf.root(n);
        count[root] = count[root] ? count[root] + 1 : 1;
        max = Math.max(max, count[root]);
    });

    return max;
};

class UnionFind {
    constructor(length) {
        this.list = [];
        this.weights = [];

        for (let i = 0; i < length; i ++) {
            this.list.push(i);
            this.weights.push(1);
        }
    }

    root(node) {
        while (node !== this.list[node]) {
            this.list[node] = this.list[this.list[node]];
            node = this.list[node];
        }
        return node;
    }

    union(node1, node2) {
        if (this.list[node1] === this.list[node2]) return;

        const root1 = this.root(node1);
        const root2 = this.root(node2);

        if (root1 === root2) {
            return;
        }

        const weight1 = this.weights[root1];
        const weight2 = this.weights[root2];

        if (weight1 < weight2) {
            this.list[root1] = root2;
            this.weights[root2] = weight1 + weight2;
        } else {
            this.list[root2] = root1;
            this.weights[root1] = weight1 + weight2;
        }
    }
} 

console.log(longestConsecutive(
    [100,4,200,1,3,2, 3]
)); // 4

// var obj = {
//     99: 0,
//     101: 0,
//     3: 1 -> 4
//     5: 1,
//     199: 2,
//     201: 2,
//     0: 3,
//     2: [3, 4],

// }
