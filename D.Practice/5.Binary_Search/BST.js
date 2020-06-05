class BST {
    constructor(val) {
        this.root = val === undefined ? null : new BSTNode(val);
    }

    add(val) {
        const newNode = new BSTNode(val);
        
        if (!this.root) {
            this.root = newNode;
            return;
        }

        let node = this.root;

        while(node) {
            if (val === node.val) {
                break;
            } else if (val < node.val) {
                if (node.left) {
                    node = node.left;
                } else {
                    node.left = newNode;
                    break;
                }
            } else {
                if (node.right) {
                    node = node.right;
                } else {
                    node.right = newNode;
                    break;
                }
            }
        }
    }
}

class BSTNode {
    constructor(val, left, right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

const b = new BST();
[3, 2, 4, 1, 5].forEach(v => b.add(v));
let nodes = [b.root];
while (nodes.length) {
    console.log("nodes:", nodes.map(n => n.val));
    let newArr = [];
    nodes.map(node => {
        if (node.left) newArr.push(node.left);
        if (node.right) newArr.push(node.right);
    })
    nodes = newArr;

}