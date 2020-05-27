// https://leetcode.com/problems/reconstruct-itinerary/

// Given a list of airline tickets represented by pairs of departure and arrival airports [from, to], reconstruct the itinerary in order. All of the tickets belong to a man who departs from JFK. Thus, the itinerary must begin with JFK.

// Note:

// If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string. For example, the itinerary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].
// All airports are represented by three capital letters (IATA code).
// You may assume all tickets form at least one valid itinerary.

// Example 1:

// Input: [["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]
// Output: ["JFK", "MUC", "LHR", "SFO", "SJC"]
// Example 2:

// Input: [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
// Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
// Explanation: Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"].
//              But it is larger in lexical order.

const { MinPriorityList } = require('../../helpers');

/**
 * @param {string[][]} tickets
 * @return {string[]}
 */

// var findItinerary = function(tickets) {
//     if (tickets.length < 2) return tickets[0];
//     const map = {};
//     for (let ticket of tickets) {
//         if (!map[ticket[0]]) map[ticket[0]] = {
//             path: [ticket[0]],
//             dest: new MinPriorityList()
//         };
//         map[ticket[0]].dest.enqueue(ticket[1], ticket[1]);
//     }


//     while (Object.keys(map).length > 1) {
//         for (let depart in map) {
//             let { path, dest } = map[depart];
//             let newPath = [...path];
//             if (!dest.list.length) continue;

//             let next = dest.dequeue();

//             if (!map[next]) newPath.push(next);
            
//             while (map[next]) {
//                 const nextNode = map[next]
//                 newPath.push(...nextNode.path);
//                 const temp = nextNode.dest.dequeue();
//                 if (temp && !map[temp]) newPath.push(temp);
//                 if (
//                     !nextNode.dest.list.length &&
//                     next !== depart
//                 ) {
//                     delete map[next];
//                 }
//                 next = temp;
//             }
//             map[depart].path = newPath;
//         }
//     }

//     return map[Object.keys(map)[0]].path;
// };


// console.log(findItinerary(
//     [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
// )); // ["JFK","MUC","LHR","SFO","SJC"]

// console.log(findItinerary(
//     [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
// )); // ["JFK","ATL","JFK","SFO","ATL","SFO"]

console.log(findItinerary(
    [["JFK","SFO"]]
))