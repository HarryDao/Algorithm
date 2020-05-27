// https://leetcode.com/problems/moving-average-from-data-stream/

// Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.

// Example:

// MovingAverage m = new MovingAverage(3);
// m.next(1) = 1
// m.next(10) = (1 + 10) / 2
// m.next(3) = (1 + 10 + 3) / 3
// m.next(5) = (10 + 3 + 5) / 3

class MovingAverage {
    contructor(n) {
        this.nums = [];
        this.n = n;
        this.total = 0;
    }

    next(num) {
        this.nums.push(num);
        this.total += num;

        if (this.nums.length > this.n) {
            this.total -= this.nums.shift();
        }

        return this.total / this.nums.length;
    }
}