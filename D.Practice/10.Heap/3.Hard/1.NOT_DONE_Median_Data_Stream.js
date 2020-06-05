// https://leetcode.com/problems/find-median-from-data-stream/

// Median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle value.

// For example,
// [2,3,4], the median is 3

// [2,3], the median is (2 + 3) / 2 = 2.5

// Design a data structure that supports the following two operations:

// void addNum(int num) - Add a integer number from the data stream to the data structure.
// double findMedian() - Return the median of all elements so far.
 

// Example:

// addNum(1)
// addNum(2)
// findMedian() -> 1.5
// addNum(3) 
// findMedian() -> 2
 

// Follow up:

// If all integer numbers from the stream are between 0 and 100, how would you optimize it?
// If 99% of all integer numbers from the stream are between 0 and 100, how would you optimize it?

const { GeneralPriorityQueue } = require('../../helpers');


/**
 * initialize your data structure here.
 */
var MedianFinder = function() {
    this.upperList = new GeneralPriorityQueue(true);
    this.lowerList = new GeneralPriorityQueue(false);
    this.length = 0;
};

/** 
 * @param {number} num
 * @return {void}
 */

MedianFinder.prototype.addNum = function(num) {
    const { upperList, lowerList } = this;

    if (upperList.length < lowerList.length) {
        upperList.enqueue(num);
    } else {
        lowerList.enqueue(num);
    }

    if (upperList.length && lowerList.length) {
        while (upperList.peek().priority < lowerList.peek().priority) {
            const upper = upperList.dequeue();
            const lower = lowerList.dequeue();
            upperList.enqueue(lower);
            lowerList.enqueue(upper);
        }
    }

    this.length ++;
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    const { upperList, lowerList, length } = this;

    if (!length) {
        return null;
    } else if (length % 2 === 0) {
        return (upperList.peek().data + lowerList.peek().data) / 2;
    } else {
        return lowerList.peek().data;
    }
};


/** 
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

var obj = new MedianFinder();

function add(num) {
    obj.addNum(num);
    console.log('uppder:', obj.upperList.list.map(l => l.priority));
    console.log('lower:', obj.lowerList.list.map(l => l.priority));
    console.log('Median:', obj.findMedian());
}
add(1);
add(4);
add(5);
add(6);
add(7);
add(8);