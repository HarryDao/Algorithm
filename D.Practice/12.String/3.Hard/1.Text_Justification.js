// https://leetcode.com/problems/text-justification/

// Given an array of words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.

// You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly maxWidth characters.

// Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line do not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

// For the last line of text, it should be left justified and no extra space is inserted between words.

// Note:

// A word is defined as a character sequence consisting of non-space characters only.
// Each word's length is guaranteed to be greater than 0 and not exceed maxWidth.
// The input array words contains at least one word.
// Example 1:

// Input:
// words = ["This", "is", "an", "example", "of", "text", "justification."]
// maxWidth = 16
// Output:
// [
//    "This    is    an",
//    "example  of text",
//    "justification.  "
// ]
// Example 2:

// Input:
// words = ["What","must","be","acknowledgment","shall","be"]
// maxWidth = 16
// Output:
// [
//   "What   must   be",
//   "acknowledgment  ",
//   "shall be        "
// ]
// Explanation: Note that the last line is "shall be    " instead of "shall     be",
//              because the last line must be left-justified instead of fully-justified.
//              Note that the second line is also left-justified becase it contains only one word.
// Example 3:

// Input:
// words = ["Science","is","what","we","understand","well","enough","to","explain",
//          "to","a","computer.","Art","is","everything","else","we","do"]
// maxWidth = 20
// Output:
// [
//   "Science  is  what we",
//   "understand      well",
//   "enough to explain to",
//   "a  computer.  Art is",
//   "everything  else  we",
//   "do                  "
// ]

var fullJustify = function(words, maxWidth) {
    const result = [];
    let current = [];
    let count = 0;

    function buildLine(isLastLine = false) {
        if (isLastLine) {
            const str = current.join(' ');
            result.push(str + ' '.repeat(maxWidth - str.length));
            return;
        }

        if (!current.length) {
            return;
        } else if (current.length === 1) {
            result.push(current[0] + ' '.repeat(maxWidth - current[0].length));
        } else {
            const spaces = current.length - 1;
            const totalLength = current.reduce((total, word) => total + word.length, 0);
            const spaceLength = maxWidth - totalLength;
            const minSpace = Math.floor(spaceLength / spaces);
            const modSpace = spaceLength % spaces;

            let str = '';
            for (let i = 0; i < current.length; i ++) {
                if (i > 0) {
                    str += ' '.repeat(i > modSpace ? minSpace : (minSpace + 1));
                }
                str += current[i];
            }
    
            result.push(str);
        }

        current = [];
        count = 0;
    }

    for (let word of words) {
        const length = word.length;
        const nextCount = count ? (count + 1 + length) : (count + length);
        if (nextCount > maxWidth) {
            buildLine();
        }

        count += count ? (length + 1) : length;
        current.push(word);
    }

    buildLine(true);

    return result;
};

// console.log(fullJustify(
//     ["This", "is", "an", "example", "of", "text", "justification."], 16
// )); //

console.log(fullJustify(
    ["What","must","be","acknowledgment","shall","be"], 16
)); // [ 'What   must   be', 'acknowledgment  ', 'shall be        ' ]