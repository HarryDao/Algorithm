function quickSort(array) {
    function swap(i, j) {
        const iTemp = array[i];
        array[i] = array[j];
        array[j] = iTemp;
    }

    function sort(start = 0, end = array.length - 1) {
        if (start >= end) return;

        let pivot = array[start];
        let largerQueue = [];

        for (let i = start + 1; i <= end; i++) {
            if (array[i] < pivot) {
                if (largerQueue.length) {
                    swap(largerQueue.shift(), i);
                    largerQueue.push(i);
                }
            } else {
                largerQueue.push(i);
            }
        }
        
        const smallestLargerIndex = largerQueue.shift() || (end + 1);
        swap(start, smallestLargerIndex - 1);
        sort(start, smallestLargerIndex - 2);
        sort(smallestLargerIndex, end);
    }

    sort();
    return array;
}




// 5 1 4 6 2 7 3

//5 1 4
//5 1 4 6
//5 1 4 2 6
//5 1 4 2 6 7
//5 1 4 2 3 7 6



// 5 6 7 1 2 3

// 5 6 7
// 5 1 7 6

//console.log(quickSort([5, 1, 4, 6, 2, 7, 3]));
console.log(quickSort([5, 1, 2, 3, 4]));