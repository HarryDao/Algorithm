/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stack = [];
    this.min = null;
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stack.push([x, this.min]);
    
    if (this.min === null) {
        this.min = x;
    } else {
        this.min = Math.min(this.min, x);
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    if (!this.stack.length) return null;

    const node = this.stack.pop();
    this.min = node[1];

    return node[0];
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    if (!this.stack.length) return null;
    return this.stack[this.stack.length - 1][0];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.min;
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */


const doo = (function() {
    let minStack;
    let result = [];
    return function(commands, args) {
        commands.forEach((command, index) => {
            if (command === 'MinStack') {
                minStack = new MinStack();
                result.push(null);
            } else if (command === 'push' || command === 'pop') {
                minStack[command](...args[index]);
                result.push(null);
            } else if (command === 'getMin') {
                result.push(minStack[command]());
            }
        });
        return result;
    }
})();

console.log(doo(
    ["MinStack","push","push","push","push","getMin","pop","getMin","pop","getMin","pop","getMin"],
    [[],[2],[0],[3],[0],[],[],[],[],[],[],[]]
)); //

// ["MinStack","push","push","push","push","getMin","pop","getMin","pop","getMin","pop","getMin"]
// [[],[2],[0],[3],[0],[],[],[],[],[],[],[]]
// [null,null,null,null,null,0,null,0,null,0,null,2]