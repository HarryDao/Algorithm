function validAnagram(str1, str2){
    // add whatever parameters you deem necessary - good luck!
    if (str1.length !== str2.length) return false;
    const obj = {};
    for (let chr of str1) {
        if (!obj[chr]) obj[chr] = 0;
        obj[chr] += 1;
    }
    for (let chr of str2) {
        if (!obj[chr]) return false;
        obj[chr] -= 1;
    }
    for (let key in obj) {
        if (obj[key]) return false;
    }
    return true;
}