// https://leetcode.com/problems/gas-station/

// There are N gas stations along a circular route, where the amount of gas at station i is gas[i].

// You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from station i to its next station (i+1). You begin the journey with an empty tank at one of the gas stations.

// Return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1.

// Note:

// If there exists a solution, it is guaranteed to be unique.
// Both input arrays are non-empty and have the same length.
// Each element in the input arrays is a non-negative integer.
// Example 1:

// Input: 
// gas  = [1,2,3,4,5]
// cost = [3,4,5,1,2]

// Output: 3

// Explanation:
// Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
// Travel to station 4. Your tank = 4 - 1 + 5 = 8
// Travel to station 0. Your tank = 8 - 2 + 1 = 7
// Travel to station 1. Your tank = 7 - 3 + 2 = 6
// Travel to station 2. Your tank = 6 - 4 + 3 = 5
// Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
// Therefore, return 3 as the starting index.

// Example 2:

// Input: 
// gas  = [2,3,4]
// cost = [3,4,3]

// Output: -1

// Explanation:
// You can't start at station 0 or 1, as there is not enough gas to travel to the next station.
// Let's start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
// Travel to station 0. Your tank = 4 - 3 + 2 = 3
// Travel to station 1. Your tank = 3 - 3 + 3 = 3
// You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3.
// Therefore, you can't travel around the circuit once no matter where you start.

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */

// O(N)
// O(1)

var canCompleteCircuit = function(gas, cost) {
    let total = 0;
    let current = 0;
    let startIndex = 0;

    for (let index = 0; index < gas.length; index ++) {
        const diff = gas[index] - cost[index];
        total += diff;
        current += diff;

        if (current < 0) {
            startIndex = index + 1;
            current = 0;
        }
    }

    return total < 0 ? -1 : startIndex;
}

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */

// O(n ** 2)
// O(n)

var canCompleteCircuitNaive = function(gas, cost) {
    const diffs = gas.map((g, i) => g - cost[i]);

    if (diffs.length < 2) return diffs[0] >= 0 ? 0 : -1;

    for (let index = 0; index < diffs.length; index ++) {
        const prevIndex = index === 0 ? diffs.length - 1 : index - 1;
        const diff = diffs[index];
        const prev = diffs[prevIndex];
        
        if (diff >= 0 && prev < 0) {
            let count = 0;
            let i = index;
            let total = 0;
            let isPassed = true;
            while (count < diffs.length) {
                total += diffs[i];
                if (total < 0) {
                    isPassed = false;
                    break;
                }

                i++;
                if (i >= diffs.length) i = 0;
                
                count ++;
            }

            if (isPassed) return index;
        }
    }

    return -1;
};

console.log(canCompleteCircuit(
    [1,2,3,4,5], [3,4,5,1,2]
)); // 3;

console.log(canCompleteCircuit(
    [3,3,4], [3,4,4]
)); // -1

console.log(canCompleteCircuit(
    [5,1,2,3,4],
    [4,4,1,5,1]
)); //

console.log(canCompleteCircuit(
    [3], [3]
)); //

// 1 -3 1 -2 3

// 1 2 3 4 5
// 3 4 5 1 2
// -2 -2 -2 3 3
// -2 -4 -6 -3 0
