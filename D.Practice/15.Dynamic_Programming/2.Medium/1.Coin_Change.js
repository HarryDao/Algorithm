// https://leetcode.com/problems/coin-change/

// You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

// Example 1:

// Input: coins = [1, 2, 5], amount = 11
// Output: 3 
// Explanation: 11 = 5 + 5 + 1
// Example 2:

// Input: coins = [2], amount = 3
// Output: -1
// Note:
// You may assume that you have an infinite number of each kind of coin.

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChangeIterative = function(coins, amount) {
    coins.sort((a, b) => a < b ? -1 : 1);
    
    if (amount === 0) return 0;

    const map = coins.reduce((obj, coin) => {
        obj[coin] = 1;
        return obj;
    }, {});

    for (let total = 1; total <= amount; total ++) {
        if (map[total]) continue;
        let min = -1;

        loop2:
        for (let coin of coins) {
            if (coin > total) {
                break loop2;
            }

            const left = total - coin;

            if (left === 0) {
                min = 1;
            } else if (map[left] && map[left] > 0) {
                min = min > -1 ? Math.min(min, map[left] + 1) : (map[left] + 1);
            }
        }

        map[total] = min;
    }

    return map[amount];
}

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChangeRecursive = function(coins, amount) {
    coins.sort((a, b) => a - b);

    const map = coins.reduce((obj, coin) => {
        obj[coin] = 1;
        return obj;
    }, {});

    function find(total) {
        if (total === 0) return 0;
        if (total < coins[0]) return null;
        if (map.hasOwnProperty(total)) return map[total];
        let min = null;

        for (let coin of coins) {
            if (coin > total) break;

            const left = find(total - coin);

            if (left !== null) {
                if (min === null || left < min) {
                    min = left;
                }
            }
        }

        map[total] = min === null ? min : min + 1;

        return map[total];
    }

    const result = find(amount);
    return result === null ? -1 : result;
};

// console.log(coinChange(
//     [1,2,5],  11
// )); //

// console.log(coinChange(
//     [2], 0
// )); //

// console.log(coinChange(
//     [186,419,83,408], 6249
// )); //

console.log(coinChange(
    [474,83,404,3], 264
)); 
