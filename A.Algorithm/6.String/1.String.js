// https://www.hackerrank.com/challenges/sherlock-and-valid-string/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=strings

//Sherlock considers a string to be valid if all characters of the string appear the same number of times. It is also valid if he can remove just  character at  index in the string, and the remaining characters will occur the same number of times. Given a string , determine if it is valid. If so, return YES, otherwise return NO.

//For example, if , it is a valid string because frequencies are . So is  because we can remove one  and have  of each character in the remaining string. If  however, the string is not valid as we can only remove  occurrence of . That would leave character frequencies of .

function isValid(s) {
    const freq = {};
    let totalFreq = 0;

    for (let chr of s) {
        if (!freq[chr]) freq[chr] = 0;
        freq[chr] += 1;
        totalFreq += 1;
    }
    
    const freqCount = {};
    for (let chr in freq) {
        const times = freq[chr];
        if (!freqCount[times]) freqCount[times] = 0;
        freqCount[times] += 1;
    }
    
    
    if (Object.keys(freqCount).length < 2) {
        return 'YES';
    } else if (Object.keys(freqCount).length > 2) {
        return 'NO';
    }

    let is1 = null;
    let isHigherThan1 = null;
    for (let times in freqCount) {
        if (freqCount[times] === 1) {
            is1 = times
        } else {
            isHigherThan1 = times;
        }
    }

    const isValid = Number(is1) - Number(isHigherThan1) === 1 || Number(is1) === 1;
    return isValid ? 'YES' : 'NO';
}

console.log(isValid('abcdefghhgfedecba'));