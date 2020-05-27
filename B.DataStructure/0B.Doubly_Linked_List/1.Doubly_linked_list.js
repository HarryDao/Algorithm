class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(val) {
        const newNode = new Node(val);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.length = 1;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
            this.length += 1;
        }

        return this;
    }

    pop() {
        if (!this.head) {
            return undefined;
        }

        if (this.head === this.tail) {
            const node = this.head;
            this.head = null;
            this.tail = null;
            this.length = 0;
            return node;
        }

        const node = this.tail;
        this.tail.prev.next = null;
        this.tail = this.tail.prev;
        this.length -= 1;
        node.prev = null;
        return node;
    }

    shift() {
        if (!this.head) return undefined;


        const node = this.head;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            this.length = 0;
            return node;
        }

        this.head.next.prev = null;
        this.head = this.head.next;
        this.length -= 1;
        node.next = null;
        return node;
    }

    unshift(val) {
        const newNode = new Node(val);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.length = 1;
            return this;
        }

        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
        this.length += 1;
        return this;
    }

    get(index) {
        if (index < 0 || index >= this.length || !this.head) return undefined;

        const mid = Math.floor(this.length / 2);
        
        if (index < mid) {
            let currentIndex = 0;
            let node = this.head;
            while (currentIndex < index) {
                node = node.next;
                currentIndex += 1;
            }

            return node;
        }

        let currentIndex = this.length - 1;
        let node = this.tail;

        while (currentIndex > index) {
            node = node.prev;
            currentIndex -= 1;
        }
        
        return node;
    }

    set(index, val) {
        const node = this.get(index);
        if (node) {
            node.val = val;
            return true;
        }
        return false;
    }

    insert(index, val) {
        if (index < 0 || index > this.length) return false;

        if (index === 0) {
            this.unshift(val);
            return true;
        }
        
        if (index === this.length) {
            this.push(val);
            return true;
        }

        const newNode = new Node(val);
        const currentNode = this.get(index);
        const prevNode = currentNode.prev;

        if (prevNode) {
            prevNode.next = newNode;
            newNode.prev = prevNode;
        }

        newNode.next = currentNode;
        currentNode.prev = newNode;
        this.length += 1;

        return true;
    }

    remove(index) {
        if (index < 0 || index >= this.length) return undefined;

        if (index === 0) {
            return this.shift();
        }

        if (index === this.length - 1) {
            return this.pop();
        }

        const node = this.get(index);
        const next = node.next;
        const prev = node.prev;

        prev.next = next;
        next.prev = prev;
        this.length -= 1;
        
        node.next = null;
        node.prev = null;
        return node;
    }
}


const list = new DoublyLinkedList();

list.push(1);
list.push(2);
list.push(3);
list.remove(1);
debugger