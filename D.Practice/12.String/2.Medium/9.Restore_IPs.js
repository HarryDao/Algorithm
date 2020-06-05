// https://leetcode.com/problems/restore-ip-addresses/

// Given a string containing only digits, restore it by returning all possible valid IP address combinations.

// A valid IP address consists of exactly four integers (each integer is between 0 and 255) separated by single points.

// Example:

// Input: "25525511135"
// Output: ["255.255.11.135", "255.255.111.35"]

/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
    if (!s) return [];

    function genCombinations(index) {
        const combinations = Array(3).fill(null);
        combinations[0] = Number(s[index]);

        if (s[index] === '0') return combinations;

        if (index < s.length - 1) {
            combinations[1] = Number(s.slice(index, index + 2));
        }

        if (index < s.length - 2) {
            const num = Number(s.slice(index, index + 3));
            if (num < 256) {
                combinations[2] = num;
            }
        }

        return combinations;
    }

    const map = Array(3).fill(null);

    for (let i = s.length - 1; i >= 0; i--) {
        const possible = [];

        genCombinations(i).forEach((num, index) => {
            if (num === null) return;
            const prev = map[index] || [[]];
            prev.forEach(p => {
                if (p.length > 3) return;
                possible.push([num, ...p]);
            });
        });

        if (i === 0) {
            return possible.filter(p => p.length === 4).map(p => p.join('.'));
        }

        map.pop();
        map.unshift(possible);
    }
};

console.log(restoreIpAddresses(
    '25525511135'
)); // ["255.255.11.135", "255.255.111.35"]

console.log(restoreIpAddresses(
    "0000"
)); // ["0.0.0.0"]

console.log(restoreIpAddresses(
    "010010"
)); //[ '0.10.0.10', '0.100.1.0' ]