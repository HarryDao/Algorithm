function hash(str, arrayLen) {
    let total = 0;
    for (let char of str) { // linear time
        let value = char.charCodeAt(0) - 96;
        total = (total + value) % arrayLen;
    }
    return total;
}


function hashImproved(str, arrayLen) {
    let total = 0;
    const A_PRIME_NUMBER = 31; // spread more uniformly => reduce collion
    for (let i = 0; i < Math.min(str.length, min); i++) { // make constant time
        const char = str[i];
        const value = char.charCodeAt(0) - 96;
        total += (total * A_PRIME_NUMBER + value) * arrayLen;
    }
    return total
}