// https://leetcode.com/problems/median-of-two-sorted-arrays/

// There are two sorted arrays nums1 and nums2 of size m and n respectively.

// Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

// You may assume nums1 and nums2 cannot be both empty.

// Example 1:

// nums1 = [1, 3]
// nums2 = [2]

// The median is 2.0
// Example 2:

// nums1 = [1, 2]
// nums2 = [3, 4]

// The median is (2 + 3)/2 = 2.5


/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

// O(log(min(m, n)))
// O(1)

var findMedianSortedArraysBest = function(nums1, nums2) { 
    const [short, long] = nums1.length < nums2.length ?
        [nums1, nums2] :
        [nums2, nums1];

    const shortLength = short.length;
    const longLength = long.length;
    const totalLength = shortLength + longLength;
    const cutLength = Math.ceil((shortLength + longLength) / 2);
    
    let start = 0;
    let end = shortLength;

    while (start <= end) {
        const mid = Math.floor(start/2 + end / 2);
        const longMidIndex = cutLength - mid - 1;

        const shortLeft = mid > 0 ? short[mid - 1] : null;
        const shortRight = mid < shortLength ? short[mid] : null;
        const longLeft = longMidIndex >= 0 ? long[longMidIndex] : null;
        const longRight = longMidIndex < longLength - 1 ? long[longMidIndex + 1] : null;

        if (
            shortLeft !== null &&
            longRight !== null &&
            shortLeft > longRight
        ) {
            end = mid;
            continue;
        }

        if (
            longLeft !== null &&
            shortRight !== null &&
            longLeft > shortRight
        ) {
            start = mid + 1;
            continue;
        }

        let average = Math.max(
            shortLeft !== null ? shortLeft : Number.NEGATIVE_INFINITY,
            longLeft !== null ? longLeft : Number.NEGATIVE_INFINITY,
        );

        if (totalLength % 2 === 0) {
            average += Math.min(
                shortRight !== null ? shortRight : Number.POSITIVE_INFINITY,
                longRight !== null ? longRight : Number.POSITIVE_INFINITY
            );
            average /= 2;
        }

        return average;        
    }
}


/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

// O(min(m, n))
// O(1)

var findMedianSortedArraysBetter = function(nums1, nums2) { 
    const [short, long] = nums1.length < nums2.length ?
        [nums1, nums2] :
        [nums2, nums1];

    const shortLength = short.length;
    const longLength = long.length;
    const totalLength = shortLength + longLength;
    const cutLength = Math.ceil((shortLength + longLength) / 2);

    for (let i = 0; i <= shortLength; i++) {
        const shortLeft = i > 0 ? short[i - 1] : null;
        const shortRight = i < shortLength ? short[i] : null;

        const cutIndex = cutLength - i - 1;
        const longLeft = cutIndex >= 0 ? long[cutIndex] : null;
        const longRight = cutIndex < longLength - 1 ? long[cutIndex + 1] : null;

        if (
            shortLeft !== null &&
            longRight !== null &&
            shortLeft > longRight
        ) {
            continue;
        }

        if (
            shortRight !== null &&
            longLeft !== null &&
            longLeft > shortRight
        ) {
            continue;
        }

        let average = Math.max(
            shortLeft !== null ? shortLeft : Number.NEGATIVE_INFINITY,
            longLeft !== null ? longLeft : Number.NEGATIVE_INFINITY,
        );

        if (totalLength % 2 === 0) {
            average += Math.min(
                shortRight !== null ? shortRight : Number.POSITIVE_INFINITY,
                longRight !== null ? longRight : Number.POSITIVE_INFINITY
            );
            average /= 2;
        }

        return average;
    }
}

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

// O(n + m)
// O(1)

var findMedianSortedArraysNormal = function(nums1, nums2) {    
    const mid = (nums1.length + nums2.length - 1) / 2;
    const mid1 = Math.floor(mid);
    const mid2 = mid1 === mid ? mid : mid1 + 1;

    if (!nums1.length && !nums2.length) {
        return -1;
    } else if (!nums1.length) {
        return (nums2[mid1] + nums2[mid2]) / 2;
    } else if (!nums2.length) {
        return (nums1[mid1] + nums1[mid2]) / 2;
    }

    let pointer1 = 0;
    let pointer2 = 0;
    let count = 0;
    let total = 0;

    while (count <= mid2) {
        count += 1;

        const n1 = nums1[pointer1];
        const n2 = nums2[pointer2];
        let next = null;

        if (n1 < n2) {
            if (pointer1 < nums1.length) {
                next = n1;
                pointer1 += 1;
            } else {
                next = n2;
                pointer2 += 1;
            }
        } else {
            if (pointer2 < nums2.length) {
                next = n2;
                pointer2 += 1;
            } else {
                next = n1;
                pointer1 += 1;                
            }
        }

        if (count === mid1 + 1) {
            total += next;
        }

        if (count === mid2 + 1) {
            total += next;
        }
    }

    return total / 2;
};


// 1 2 3 4 5 6 7 8 9 10

// 1 4 8 10
// 2 3 5 6 7 9

console.log(findMedianSortedArrays(
    [1, 5],
    [8, 10, 14, 18]
)); // 9

console.log(findMedianSortedArrays(
    [1, 5],
    [8, 10, 14]
)); // 8

console.log(findMedianSortedArrays(
    [0, 0],
    [0, 0]
)); // 0

console.log(findMedianSortedArrays(
    [100001],
    [100000]
));