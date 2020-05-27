// https://leetcode.com/problems/friend-circles/

// There are N students in a class. Some of them are friends, while some are not. Their friendship is transitive in nature. For example, if A is a direct friend of B, and B is a direct friend of C, then A is an indirect friend of C. And we defined a friend circle is a group of students who are direct or indirect friends.

// Given a N*N matrix M representing the friend relationship between students in the class. If M[i][j] = 1, then the ith and jth students are direct friends with each other, otherwise not. And you have to output the total number of friend circles among all the students.

// Example 1:
// Input: 
// [[1,1,0],
//  [1,1,0],
//  [0,0,1]]
// Output: 2
// Explanation:The 0th and 1st students are direct friends, so they are in a friend circle. 
// The 2nd student himself is in a friend circle. So return 2.

// Example 2:
// Input: 
// [[1,1,0],
//  [1,1,1],
//  [0,1,1]]
// Output: 1
// Explanation:The 0th and 1st students are direct friends, the 1st and 2nd students are direct friends, 
// so the 0th and 2nd students are indirect friends. All of them are in the same friend circle, so return 1.





/**
 * @param {number[][]} M
 * @return {number}
 */

// Time: O(n ** 2)
// Space: O(n)

var findCircleNumDFS = function(matrix) {
    const stack = [];
    const visited = {};
    let count = 0;

    matrix.forEach((a, i1) => {
        a.forEach((v, i2) => {
            if (v && !visited[i2]) {
                count += 1;
                stack.push(i2);
                while(stack.length) {
                    const next = stack.pop();
                    visited[next] = true;

                    matrix[next].forEach((v, i) => {
                        if (v && !visited[i]) {
                            stack.push(i);
                        }
                    });
                }
            }
        });
    });

    return count;
}


console.log(findCircleNumDFS(
    [[1,1,0],[1,1,0],[0,0,1]]
)); // 2







/**
 * @param {number[][]} M
 * @return {number}
 */

// Time: ~ O(n ** 2)
// Space: O(n)

var findCircleNumUnionFind = function(matrix) {
    const friends = new UnionFind(matrix.length);
    
    matrix.forEach((array, index1) => {
        array.forEach((value, index2) => {
            if (index1 !== index2 && value) {
                friends.union(index1, index2);
            }
        });
    });

    return friends.count();
};

class UnionFind {
    constructor(n) {
        this.list = [];
        this.weights = [];
        for (let i = 0; i < n; i++) {
            this.list.push(i);
            this.weights.push(1);
        }        
    }

    root(n) {
        let node = n;
        while (node != this.list[node]) {
            this.list[node] = this.list[this.list[node]];
            node = this.list[node];
        }
        return node;
    }

    union(n1, n2) {
        const root1 = this.root(n1);
        const root2 = this.root(n2);
        if (root1 === root2) return;

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

    count() {
        const obj = {};
        this.list.forEach(item => obj[this.root(item)] = true);
        return Object.keys(obj).length;
    }
}


// console.log(findCircleNumUnionFind(
//     [[1,1,0],[1,1,0],[0,0,1]]
// )); // 2

// console.log(findCircleNumUnionFind(
//     [[1,1,0],
//     [1,1,1],
//     [0,1,1]]
// )); // 1


// console.log(findCircleNumUnionFind([
//     [1,0,0,1],
//     [0,1,1,0],
//     [0,1,1,1],
//     [1,0,1,1]
// ])); // 1


// console.log(findCircleNumfindCircleNumUnionFind(
//     [
//         [1,1,0,0,0,0,0,1,0,0,0,0,0,0,0],
//         [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
//         [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
//         [0,0,0,1,0,1,1,0,0,0,0,0,0,0,0],
//         [0,0,0,0,1,0,0,0,0,1,1,0,0,0,0],
//         [0,0,0,1,0,1,0,0,0,0,1,0,0,0,0],
//         [0,0,0,1,0,0,1,0,1,0,0,0,0,1,0],
//         [1,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
//         [0,0,0,0,0,0,1,1,1,0,0,0,0,1,0],
//         [0,0,0,0,1,0,0,0,0,1,0,1,0,0,1],
//         [0,0,0,0,1,1,0,0,0,0,1,1,0,0,0],
//         [0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],
//         [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
//         [0,0,0,0,0,0,1,0,1,0,0,0,0,1,0],
//         [0,0,0,0,0,0,0,0,0,1,0,0,0,0,1]
//     ]
// )); // 3