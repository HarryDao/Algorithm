// https://leetcode.com/problems/flatten-nested-list-iterator/

// Given a nested list of integers, implement an iterator to flatten it.

// Each element is either an integer, or a list -- whose elements may also be integers or other lists.

// Example 1:

// Input: [[1,1],2,[1,1]]
// Output: [1,1,2,1,1]
// Explanation: By calling next repeatedly until hasNext returns false, 
//              the order of elements returned by next should be: [1,1,2,1,1].
// Example 2:

// Input: [1,[4,[6]]]
// Output: [1,4,6]
// Explanation: By calling next repeatedly until hasNext returns false, 
//              the order of elements returned by next should be: [1,4,6].


/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */



/**
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
var NestedIterator = function(nestedList) {
    const stack = [...nestedList];
    const list = [];

    while (stack.length) {
        const item = stack.pop();
        if (Array.isArray(item))  {
            stack.push(...item);
        } else if (item.isInteger()) {
            list.push(item.getInteger());
        } else {
            stack.push(item.getList());
        }
    }

    this.list = list;
};


/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator.prototype.hasNext = function() {
    return !!this.list.length;
};

/**
 * @this NestedIterator
 * @returns {integer}
 */
NestedIterator.prototype.next = function() {
    return this.list.pop();
};

// const nested = new NestedIterator(
//     [1,[4,[6]], [8, [10, 12]]]
// );; // [1, 4, 6, 8, 10, 12]

// while(nested.hasNext()) {
//     console.log(nested.next());
// }

// const arr = [1,[4,[6]], [8, [10, 12]]];
// const arr = [[1,1],2,[1,1]];
const arr = [1,[4,[6]]];

var i = new NestedIterator(arr), a = [];
while (i.hasNext()) a.push(i.next());
console.log('a:', a);