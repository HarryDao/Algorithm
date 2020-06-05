// https://leetcode.com/problems/alien-dictionary/

// There is a new alien language which uses the latin alphabet. However, the order among letters are unknown to you. You receive a list of non-empty words from the dictionary, where words are sorted lexicographically by the rules of this new language. Derive the order of letters in this language.

// Example 1:

// Input:
// [
//   "wrt",
//   "wrf",
//   "er",
//   "ett",
//   "rftt"
// ]

// Output: "wertf"
// Example 2:

// Input:
// [
//   "z",
//   "x"
// ]

// Output: "zx"
// Example 3:

// Input:
// [
//   "z",
//   "x",
//   "z"
// ] 

// Output: "" 

// Explanation: The order is invalid, so return "".

const { Queue } = require('../../helpers');

/**
 * @param {string[]} words
 * @return {string}
 */
var alienOrder = function(words) {
    const index = (function() {
        const length = Math.max(...words.map(word => word.length));

        for (let i = 0; i < length; i++) {
            const chr = words[i][0];
            if (!words.every(w => !!w[i] && w[i] === chr)) {
                return i;
            }
        }
        return length;
    })();

    const filteredWords = words.map(word => {
        return word.slice(index);
    }).filter(w => !!w);

    let result = '';
    const map = {};

    const queue = new Queue();
    queue.enqueue(filteredWords);

    while (queue.length) {
        const arr = [];
        let node = queue.head;
        while (node) {
            arr.push(node.val);
            node = node.next;
        }
        console.log("queue:", arr);
        console.log('result:', result);

        const ws = queue.dequeue();
        
        let prev = null;
        let nexts = [];

        for (let index = 0, length = ws.length; index < length; index ++) {
            const word = ws[index];
            const chr = word[0];

            if (prev === null || prev[0] !== word[0] || index === length - 1) {
                if (map[chr]) {
                    if (result.length && result[result.length - 1] !== chr) {
                        return '';
                    }
                } else {
                    result += chr;
                    map[chr] = true;
                }
                
                if (index === length - 1 && prev && prev[0] === chr) {
                    if (word.length > 1) {
                        nexts.push(word.slice(1));
                    }
                }

                if (nexts.length > 1) {
                    queue.enqueue(nexts);
                }

                nexts = [];
            }

            if (word.length > 1) {
                nexts.push(word.slice(1));
            }

            prev = word;
        }
    }

    for (let word of words) {
        for (let chr of word) {
            if (!map[chr]) {
                result += chr;
                map[chr] = true;
            }
        }
    }

    return result;
};

// console.log(alienOrder(
//     ["wrt","wrf","er","ett","rftt"]
// )); // "wertf"

// console.log(alienOrder(
//     ['z', 'x', 'z']
// )); // ''

// console.log(alienOrder(
//     ['ab', 'adc']
// )); // abdc

// console.log(alienOrder(
//     ["wrt","wrtkj"]
// )); //

// console.log(alienOrder(
//     ["aac","aabb","aaba"]
// )); //

console.log(alienOrder(
    ["ac","ab","b"]
)); //