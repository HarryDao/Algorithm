class MinPriorityList {
    constructor() {
        this.list = [];
    }

    enqueue(data, priority) {
        this.list.push({
            priority,
            data
        });
        let index = this.list.length - 1;
        
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);

            if (this.list[parentIndex].priority <= this.list[index].priority) {
                break;
            }
            
            this.swap(parentIndex, index);
            index = parentIndex;
        }
    }

    dequeue() {
        if (!this.list.length) return null;

        this.swap(0, this.list.length - 1);
        const node = this.list.pop();

        let index = 0;

        while (index < this.list.length - 1) {
            let child1Index = index * 2 + 1;
            let child2Index = index * 2 + 2;
            let minIndex = null;

            if (child1Index >= this.list.length && child2Index >= this.list.length) {
                minIndex = null;
            } else if (child1Index >= this.list.length) {
                minIndex = child2Index;
            } else if (child2Index >= this.list.length) {
                minIndex = child1Index;
            } else if (this.list[child1Index].priority < this.list[child2Index].priority) {
                minIndex = child1Index;
            } else {
                minIndex = child2Index;
            }

            if (minIndex && this.list[minIndex].priority < this.list[index].priority) {
                this.swap(minIndex, index);
                index = minIndex;
            } else {
                break;
            }
        }

        return node.data;
    }

    swap(index1, index2) {
        const node1 = this.list[index1];
        this.list[index1] = this.list[index2];
        this.list[index2] = node1;
    }
}

class GeneralPriorityQueue {
    constructor(isMinPQ = true) {
        if (typeof isMinPQ === 'function') {
            this.compareFn = isMinPQ;
        } else {
            this.isMinPQ = isMinPQ;
        }
        this.list = [];
    }

    swap(i, j) {
        const temp = this.list[i];
        this.list[i] = this.list[j];
        this.list[j] = temp;
    }

    compare(parentIndex, childIndex) {
        const parent = this.list[parentIndex];
        const child = this.list[childIndex];

        if (this.compareFn) {
            return this.compareFn(parent, child);
        } else if (this.isMinPQ) {
            return parent.priority <= child.priority;
        } else {
            return parent.priority >= child.priority;
        }
    }

    enqueue(priority, data) {
        this.list.push({ data, priority });
        let i = this.list.length - 1;

        while (i > 0) {
            let parentIndex = Math.floor((i - 1) / 2);
            if (this.compare(parentIndex, i)) break;

            this.swap(i, parentIndex);
            i = parentIndex;
        }
    }

    dequeue(fullData = false) {
        this.swap(0, this.list.length - 1);
        const node = this.list.pop();
        const length = this.list.length;

        if (!this.list.length) {
            return fullData ? node : node.data;            
        };

        let i = 0;
        while (true) {
            let child1 = i * 2 + 1;
            let child2 = i * 2 + 2;
            let childIndex = null;
            
            if (child1 >= length && child2 >= length) {
                break;
            } else if (child1 >= length) {
                childIndex = child2;
            } else if (child2 >= length) {
                childIndex = child1;
            } else {
                childIndex = this.compare(child1, child2) ? child1 : child2;   
            }

            if (this.compare(i, childIndex)) break;

            this.swap(i, childIndex);
            i = childIndex;
        }

        return fullData ? node : node.data;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    add(val, data) {
        if (val === null) return this;

        const newNode = new BinaryTreeNode(val, data);

        if (!this.root) {
            this.root = newNode;
            return this;
        }

        let node = this.root;

        while (node) {
            if (node.val === val) {
                return this;
            } else if (node.val < val) {
                if (!node.right) {
                    node.right = newNode;
                }
                node = node.right;
            } else {
                if (!node.left) {
                    node.left = newNode;
                }
                node = node.left;
            }
        }

        return this;
    }

    search(val, returnPath = false) {
        if (!this.root) return null;
        
        let node = this.root;
        const paths = [];

        while (node) {
            if (returnPath) paths.push(node);

            if (node.val === val) {
                return returnPath ? paths : node;
            } else if (node.val < val) {
                node = node.right;
            } else {
                node = node.left;
            }
        }

        return null;
    }

    traverseInOrderIterative(fn = false) {
        if (!this.root) return;

        const stack = [];
        const result = fn ? null : [];
        let currentNode = this.root;
        
        while (currentNode || stack.length) {
            while (currentNode) {
                stack.push(currentNode);
                currentNode = currentNode.left;
            }

            if (stack.length) {
                const last = stack.pop();

                if (fn)  {
                    fn(last.val);
                } else {
                    result.push(last.val);
                }

                currentNode = last.right;
            }
        }

        if (!fn) return result;
    }
}

class BinaryTreeNode {
    constructor(val, data) {
        this.val = val;
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

function testBST(appliedFn, array) {
    const tree = new BinaryTree();
    for (const item of array) {
        tree.add(item);
    }
    return appliedFn(tree.head);
}

module.exports = {
    MinPriorityList,
    GeneralPriorityQueue,
    BinaryTree,
    BinaryTreeNode,
    testBST,
}