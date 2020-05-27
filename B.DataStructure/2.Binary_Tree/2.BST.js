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

    print(val) {
        let nodes = [this.root];
        const arr = [this.root.val];
        while (nodes.length) {
            const temp = [];
            nodes.forEach(node => {

                const vals = [];
                if (node) {
                    temp.push(node.left, node.right);
                    if (node.left) {
                        vals.push(node.left.val);
                    }
                    if (node.right) {
                        vals.push(node.right.val)
                    }
                }
                if (vals.length) arr.push(vals);
            });
            nodes = temp;
        }
        console.log(arr);
    }
}

const tree = new BST();
tree.insert(10);
tree.insert(14);
tree.insert(15);
tree.insert(9);
tree.insert(13);
console.log(tree.find(8));