// https://leetcode.com/problems/reorder-data-in-log-files/

// You have an array of logs.  Each log is a space delimited string of words.

// For each log, the first word in each log is an alphanumeric identifier.  Then, either:

// Each word after the identifier will consist only of lowercase letters, or;
// Each word after the identifier will consist only of digits.
// We will call these two varieties of logs letter-logs and digit-logs.  It is guaranteed that each log has at least one word after its identifier.

// Reorder the logs so that all of the letter-logs come before any digit-log.  The letter-logs are ordered lexicographically (alphabetical order) ignoring identifier, with the identifier used in case of ties.  The digit-logs should be put in their original order.

// Return the final order of the logs.

 

// Example 1:

// Input: logs = ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]
// Output: ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]

/**
 * @param {string[]} logs
 * @return {string[]}
 */
var reorderLogFiles = function(logs) {
    const byLetters = [];
    const byDigits = [];
    
    logs.forEach(log => {
        const array = log.split(' ');
        if (array[1].match(/[0-9]/)) {
            byDigits.push(log);
        } else {
            byLetters.push([array[0], array.slice(1).join(' ')]);
        }
    });

    byLetters.sort((a, b) => a[1] < b[1] ? -1 : 1);

    return byLetters.map(array => array.join(' ')).concat(byDigits);
};

console.log(reorderLogFiles(
    ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]
)); //["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]



["ubd cujg j d yf","u lrvmdt ykmox","4 nivgc qo z i","uhb rfrwt qzx r","ys0 splqqxoflgx","0 tllgmf qp znc","6p tzwmh ige mc","ns 566543603829","ha6 1 938 376 5","3yx 97 666 56 5","d 84 34353 2249","ah4 4209164350","rap 7729 8 125","apx 814023338 8","s 1088746413789"]

["ubd cujg j d yf","u lrvmdt ykmox","4 nivgc qo z i","uhb rfrwt qzx r","ys0 splqqxoflgx","0 tllgmf qp znc","6p tzwmh ige mc","ns 566543603829","ha6 1 938 376 5","3yx 97 666 56 5","d 84 34353 2249","s 1088746413789","ah4 4209164350","rap 7729 8 125","apx 814023338 8"]