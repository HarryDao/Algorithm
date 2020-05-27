// https://www.hackerrank.com/challenges/crossword-puzzle/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=recursion-backtracking

// A  Crossword grid is provided to you, along with a set of words (or names of places) which need to be filled into the grid. Cells are marked either + or -. Cells marked with a - are to be filled with the word list.

'use strict';

function crosswordPuzzle(crossword, hints) {
    crossword = crossword.map(str => str.split(''));
    hints = hints.split(';');
    
    const { words, chrMap } = mapCrossword(crossword);

    function fill(words, hints) {
        const wordIndex = words.findIndex(word => {
            return word.filter(chr => Array.isArray(chr)).length;
        });
        if (wordIndex < 0) return words;

        const word = words[wordIndex];
        const regex = '^' + word.map(chr => Array.isArray(chr) ? '.' : chr).join('') + '$';
        const matched = hints.filter(hint => !!hint.match(new RegExp(regex)));
        if (!matched.length) return false;

        for (let match of matched) {
            const wordsClone = JSON.parse(JSON.stringify(words));
            wordsClone[wordIndex].forEach((chr, index) => {
                if (!Array.isArray(chr)) return;
                const matchedChr = match[index];
                const [r, c] = chr;
                chrMap[`${r}-${c}`].forEach(location => {
                    wordsClone[location[0]][location[1]] = matchedChr;
                });
            });
            const result = fill(wordsClone, hints.filter(hint => hint !== match));
            if (result) return result;
        }
        return false;
    }

    const filled = fill(words, hints, 0);

    for (let location in chrMap) {
        const chrLocation = chrMap[location][0];
        const chr = filled[chrLocation[0]][chrLocation[1]];

        const [r, c] = location.split('-');
        crossword[r][c] = chr;
    }

    return crossword.map(chrs => chrs.join(''));
}

function mapCrossword(crossword) {
    const ROW_COUNT = crossword.length;
    const COL_COUNT = crossword[0].length;
    const words = [];
    const chrMap = {};

    for (let rowIndex = 0; rowIndex < ROW_COUNT; rowIndex ++) {
        for (let colIndex = 0; colIndex < COL_COUNT; colIndex ++) {

        }
    }

    function loop(isRow = true) {
        const ROW = isRow ? ROW_COUNT : COL_COUNT;
        const COL = isRow ? COL_COUNT : ROW_COUNT;

        for (let rowIndex = 0; rowIndex < ROW; rowIndex ++) {
            let chrs = [];
    
            for (let colIndex = 0; colIndex < COL; colIndex ++) {
                const row = isRow ? rowIndex : colIndex;
                const col = isRow ? colIndex : rowIndex;
                const chr = crossword[row][col];

                if (chr === '-') {
                    chrs.push([row, col]);
                }

                const isEnd = isRow ? (col === COL_COUNT - 1) : (row === ROW_COUNT - 1);
                if (chr !== '-' || isEnd) {
                    if (chrs.length > 1) {
                        words.push(chrs);
                        const wordIndex = words.length - 1;
    
                        chrs.forEach(([r, c], index) => {
                            const key = `${r}-${c}`;
                            if (!chrMap[key]) chrMap[key] = []; 
                            chrMap[key].push([wordIndex, index]);                       
                        });
                    }
                    chrs = [];
                }
            }
        }
    }

    loop();
    loop(false);
    return { words, chrMap };
}


//console.log(crosswordPuzzle([ 
//    '+-++++++++',
//    '+-++++++++',
//    '+-++++++++',
//    '+-----++++',
//    '+-+++-++++',
//    '+-+++-++++',
//    '+++++-++++',
//    '++------++',
//    '+++++-++++',
//    '+++++-++++' 
//], 'LONDON;DELHI;ICELAND;ANKARA'));


//crosswordPuzzle([
//    '+-++',
//    '+---',
//    '+-++',
//    '++--',
//], 'HO;CHO;HIT');

console.log(crosswordPuzzle([
    'XXXXXX-XXX',
    'XX------XX',
    'XXXXXX-XXX',
    'XXXXXX-XXX',
    'XXX------X',
    'XXXXXX-X-X',
    'XXXXXX-X-X',
    'XXXXXXXX-X',
    'XXXXXXXX-X',
    'XXXXXXXX-X',
], 'ICELAND;MEXICO;PANAMA;ALMATY'))



