// https://leetcode.com/problems/top-k-frequent-words/

// Given a non-empty list of words, return the k most frequent elements.

// Your answer should be sorted by frequency from highest to lowest. If two words have the same frequency, then the word with the lower alphabetical order comes first.

// Example 1:
// Input: ["i", "love", "leetcode", "i", "love", "coding"], k = 2
// Output: ["i", "love"]
// Explanation: "i" and "love" are the two most frequent words.
//     Note that "i" comes before "love" due to a lower alphabetical order.
// Example 2:
// Input: ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], k = 4
// Output: ["the", "is", "sunny", "day"]
// Explanation: "the", "is", "sunny" and "day" are the four most frequent words,
//     with the number of occurrence being 4, 3, 2 and 1 respectively.
// Note:
// You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
// Input words contain only lowercase letters.
// Follow up:
// Try to solve it in O(n log k) time and O(n) extra space.


/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */

// Time: O(N * logN)
// Space: O(N)

var topKFrequent = function(words, k) {
    const freqs = {};

    for (let word of words) {
        freqs[word] = freqs[word] ? (freqs[word] + 1) : 1;
    }

    const arr = Object.keys(freqs).map(word => ({
        word,
        freq: freqs[word]
    }));

    arr.sort((a, b) => {
        if (a.freq !== b.freq) {
            return a.freq > b.freq ? -1 : 1
        } else {
            return a.word < b.word ? -1 : 1;
        }
    });

    return arr.slice(0, k).map(({ word }) => word);
}


console.log(topKFrequent(
    ["i", "love", "leetcode", "i", "love", "coding"], 2
)) // ["i","love"]





const { GeneralPriorityQueue } = require('../../helpers');

/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequentWithPQ = function(words, k) {
    const freqs = {};
    
    for (let word of words) {
        freqs[word] = freqs[word] ? (freqs[word] + 1) : 1;
    }

    const queue = new GeneralPriorityQueue(function(parent, child) {
        if (parent.priority !== child.priority) {
            return parent.priority > child.priority;
        } else {
            return parent.data < child.data;
        }
    });

    for (let word in freqs) {
        queue.enqueue(freqs[word], word);
    }

    const result = [];
    while (queue.list.length && result.length < k) {
        result.push(queue.dequeue());
    }

    return result;
};

// console.log(topKFrequentWithPQ(
//     ["i", "love", "leetcode", "i", "love", "coding"], 2
// )) // ["i","love"]