function countInversions(arr) {
    function splitArray(array) {
        const middleIndex = Math.floor(array.length / 2);
        return [array.slice(0, middleIndex + 1), array.slice(middleIndex)];
    }

    return splitArray(arr);
}


console.log(countInversions([2, 4, 1]));