// Only use when array is SORTED

function countUniqueValues(arr){
    if (!arr.length) return 0;
    
    let i = 0;
    let count = 1;
    
    for (let j = 0; j < arr.length; j++) {
        if (arr[j] > arr[i]) {
            count += 1;
            i = j;
        }
    }
    return count;
}


console.log(countUniqueValues([-1, -1, 2, 3, 4, 5]));