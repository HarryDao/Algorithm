// https://leetcode.com/problems/insert-delete-getrandom-o1/

// Design a data structure that supports all following operations in average O(1) time.

// insert(val): Inserts an item val to the set if not already present.
// remove(val): Removes an item val from the set if present.
// getRandom: Returns a random element from current set of elements. Each element must have the same probability of being returned.
// Example:

// // Init an empty set.
// RandomizedSet randomSet = new RandomizedSet();

// // Inserts 1 to the set. Returns true as 1 was inserted successfully.
// randomSet.insert(1);

// // Returns false as 2 does not exist in the set.
// randomSet.remove(2);

// // Inserts 2 to the set, returns true. Set now contains [1,2].
// randomSet.insert(2);

// // getRandom should return either 1 or 2 randomly.
// randomSet.getRandom();

// // Removes 1 from the set, returns true. Set now contains [2].
// randomSet.remove(1);

// // 2 was already in the set, so return false.
// randomSet.insert(2);

// // Since 2 is the only number in the set, getRandom always return 2.
// randomSet.getRandom();



/**
 * Initialize your data structure here.
 */
var RandomizedSet = function() {
    this.map = {};
    this.list = [];
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if (!this.map.hasOwnProperty(val)) {
        this.list.push(val);
        this.map[val] = this.list.length - 1;
        return true;
    }
    return false;
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (this.map.hasOwnProperty(val)) {
        const last = this.list[this.list.length - 1];
        const index = this.map[val];
        
        this.list[index] = last;
        this.map[last] = index;

        delete this.map[val];
        this.list.pop();
        return true;
    }

    return false;
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    if (!this.list.length) return null;
    return this.list[Math.floor(Math.random() * this.list.length)];
};

var obj = new RandomizedSet();
console.log(obj.insert(1));
console.log(obj.remove(2));
console.log(obj.insert(2));
console.log('obj:', obj.getRandom());
console.log(obj.remove(1));
console.log(obj.insert(2));
console.log('OOO:', obj.getRandom());

// ["RandomizedSet","insert","remove","insert","getRandom","remove","insert","getRandom"]
// [[],[1],[2],[2],[],[1],[2],[]]
// [null,true,false,true,1,true,false,2]