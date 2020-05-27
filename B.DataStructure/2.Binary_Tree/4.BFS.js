class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    insert(val) {
        const newNode = new Node(val);
        if (!this.root) {
            this.root = newNode;
            return this;
        }
        let current = this.root;
        while (current) {
            if (val > current.val) {
                if (!current.right) {
                    current.right = newNode;
                    current = null;
                } else {
                    current = current.right;
                }
            } else {
                if (!current.left) {
                    current.left = newNode;
                    current = null;
                } else {
                    current = current.left;
                }
            }
        }
        return this;
    }

    find(val) {
        if (!this.root) return false;
        let node = this.root;
        while (node) {
            if (val === node.val) {
                return node;
            }
            else if (val > node.val) {
                if (node.right) {
                    node = node.right;
                } else {
                    return false;
                }
            }
            else {
                if (node.left) {
                    node = node.left;
                } else {
                    return false;
                }
            }
        }
        return false;
    }

    BFS() {
        if (!this.root) return [];
        const data = [];
        const queue = [this.root];
        while (queue.length) {
            const node = queue.shift();
            if (node) data.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        return data;
    }


    DFSPreOrder() {
        if (!this.root) return [];
        const data = [];
        function traverse(node) {
            if (!node) return;
            data.push(node.val);
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
        }
        traverse(this.root);
        return data;
    }

    DFSPreOrder2() {
        if (!this.root) return [];
        const data = [];
        const stack = [this.root];
        while (stack.length) {
            const node = stack.shift();
            if (node) data.push(node.val);
            if (node.right) stack.unshift(node.right);
            if (node.left) stack.unshift(node.left);
        }
        return data;
    }

    DFSPostOrder() {
        if (!this.root) return [];
        const data = [];
        function traverse(node) {
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
            if (node) data.push(node.val);
        }
        traverse(this.root);
        return data;
    }

    DFSInOrder() {
        if (!this.root) return [];
        const data = [];
        function traverse(node) {
            if (node.left) traverse(node.left);
            if (node) data.push(node.val);
            if (node.right) traverse(node.right);
        }
        traverse(this.root);
        return data;
    }
}

const tree = new BST();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);

console.log(tree.BFS());
// console.log(tree.DFSPreOrder());
// console.log(tree.DFSPreOrder2());
// console.log(tree.DFSPostOrder());
console.log(tree.DFSInOrder());

