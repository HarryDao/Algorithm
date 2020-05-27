// https://leetcode.com/problems/minimum-cost-for-tickets/

// In a country popular for train travel, you have planned some train travelling one year in advance.  The days of the year that you will travel is given as an array days.  Each day is an integer from 1 to 365.

// Train tickets are sold in 3 different ways:

// a 1-day pass is sold for costs[0] dollars;
// a 7-day pass is sold for costs[1] dollars;
// a 30-day pass is sold for costs[2] dollars.
// The passes allow that many days of consecutive travel.  For example, if we get a 7-day pass on day 2, then we can travel for 7 days: day 2, 3, 4, 5, 6, 7, and 8.

// Return the minimum number of dollars you need to travel every day in the given list of days.

/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function(days, costs) {
    const DAYS = [1, 7, 30];
    const map = {};
    
    function find(index = 0) {
        if (index >= days.length) return 0;
        if (map.hasOwnProperty(index)) return map[index];

        let min = Number.POSITIVE_INFINITY;

        for (let costIndex = 0; costIndex < costs.length; costIndex++) {
            const newCost = costs[costIndex];
            const newDay = days[index] + DAYS[costIndex];

            let nextIndex = index;
            while (days[nextIndex] && days[nextIndex] < newDay) {
                nextIndex += 1;
            }
            
            min = Math.min(min, newCost + find(nextIndex));
        }

        map[index] = min;

        return min;
    }

    const result = find();

    return result === null ? -1 : result;
};

console.log(mincostTickets(
    [1,4,6,7,8,20], [2,7,15]
)); //11

// console.log(mincostTickets(
//     [], [2, 7, 1]
// )); 