// https://leetcode.com/problems/minimum-window-substring/

// Given a string S and a string T, find the minimum window in S which will contain all the characters in T in complexity O(n).

// Example:

// Input: S = "ADOBECODEBANC", T = "ABC"
// Output: "BANC"
// Note:

// If there is no such window in S that covers all characters in T, return the empty string "".
// If there is such window, you are guaranteed that there will always be only one unique minimum window in S.
// Accepted

var minWindow = function(s, t) {
    const countMap = {};
    let count = t.length;

    for (const chr of t) {
        countMap[chr] = countMap[chr] ? (countMap[chr] + 1) : 1;
    }

    const map = {};
    const array = [];
    let startIndex = 0;
    let minDiff = null;
    let range = null;

    for (let index = 0, length = s.length; index < length; index ++) {
        const chr = s[index];

        if (!countMap[chr]) continue;

        array.push(index);
            
        if (!map[chr]) map[chr] = [];
        map[chr].push(array.length - 1);

        if (map[chr].length > countMap[chr]) {
            array[map[chr].shift()] = null;
        } else {
            count -= 1;
        }

        if (!count) {
            while (array[startIndex] === null) {
                startIndex ++;
            }

            const start = array[startIndex];
            const end = array[array.length - 1];
            const nextDiff = end - start;

            if (minDiff === null || nextDiff < minDiff) {
                minDiff = nextDiff;
                range = [start, end + 1];
            } 
        }

        // console.log('array:', chr, array);
        // console.log('map:', chr, map);
        // console.log('min:', minDiff, range);
        // console.log('=====================')
    }

    return range ? s.slice(...range) : '';
}

// console.log(minWindow(
//     "ADOABECODEBANC", 'ABCA'
// )); //


// console.log(minWindow(
//     "a", 'aa'
// )); // ''

console.log(minWindow(
    'bba', 'ab'
)); // 