class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class SinglyLinkedList {
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
        } else {
            this.tail.next = newNode;
            this.tail = this.tail.next;
        }
        this.length += 1;
        return this;
    }

    pop() {
        let current = this.head;
        let newTail = current;
        if (!current) return undefined;
        while (current.next) {
            newTail = current;
            current = current.next;
        }
        this.tail = newTail;
        this.tail.next = null;
        this.length -= 1;
        if (!this.length) {
            this.head = null;
            this.tail = null;
        }
        return current;
    }

    shift() {
        let node;
        if (!this.head) {}
        else if (!this.head.next) {
            node = this.head;
            this.head = null;
            this.tail = null;
        }
        else {
            node = this.head;
            this.head = this.head.next;
        }
        this.length = Math.max(0, this.length - 1);
        return node;
    }

    unshift(val) {
        const node = new Node(val);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
        this.length += 1;
        return this;
    }

    get(index) {
        if (!this.length || index >= this.length || index < 0 ) {
            return null;
        };
        if (index === this.length - 1) {
            return this.tail;
        }
        let i = 0;
        let node = this.head;
        while (i < index) {
            node = node.next;
            i += 1;
        }
        return node;
    }

    set(index, val) {
        // if (!this.length || index >= this.length || index < 0) {
        //     return;
        // }
        
        // let i = 0;
        // let node = this.head;
        // while (i < index) {
        //     node = node.next;
        //     i += 1;
        // }
        // node.val = val;
        const node = this.get(index);
        if (node) node.val = val;
    }

    insert(index, val) {
        // const newNode = new Node(val);
        // if (index < 0 || index > this.length) return false;
        // let i = 0;
        // let current = this.head;
        // let before = current;
        // while (i < index) {
        //     before = current;
        //     current = current.next;
        //     i += 1;
        // }
        // if (!before) {
        //     this.head = newNode;
        //     this.tail = newNode;
        // }
        // else if (before === current) {
        //     this.head = newNode;
        //     newNode.next = current;
        // }
        // else {
        //     before.next = newNode;
        //     newNode.next = current;
        // }
        // this.length += 1;
        // return true;

        if (index < 0 || index > this.length) return false;
        if (index === 0) return this.unshift(val);
        if (index === this.length) return this.push(val);
        const before = this.get(index - 1);
        const current = this.get(index);
        const node = new Node(val);
        before.next = node;
        node.next = current;
        this.length += 1;
        return true;
    }

    remove(index) {
        if (index < 0 || index >= this.length) return undefined;
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();
        const before = this.get(index - 1);
        const current = this.get(index);
        const after = this.get(index + 1);
        before.next = after;
        return current;
    }

    reverse() {
        let current = this.head;
        this.head = this.tail;
        this.tail = current;

        let next = current ? current.next : null;
        while (next) {
            const temp = next.next;
            if (current.next === next) {
                current.next = null;
            }
            next.next = current;
            current = next;
            next = temp;
        }
    }

    print() {
        let node = this.head;
        console.log('head:', this.head ? this.head.val : null);
        console.log('tail:', this.tail ? this.tail.val : null);
        console.log('length:', this.length);
        while(node) {
            console.log(node.val);
            node = node.next;
        }
    }
}

// const first = new Node('Hi');
// first.next = new Node('there');
// first.next.next = new Node('buddy');


const ssl = new SinglyLinkedList();

ssl.push('1');
ssl.push('2');
ssl.push('3');
ssl.push('4');
ssl.push('5');
ssl.print();
console.log('------------------');
ssl.reverse();
ssl.print();


// ssl.unshift('1');
// ssl.unshift('2');
// ssl.unshift('3');
// ssl.unshift('4');
// ssl.print();


// ssl.pop();
// ssl.print();

// ssl.shift();
// ssl.print();

// console.log(ssl.get(3));

// ssl.set(4, 'somthingFun');
// ssl.print();

// ssl.insert(3, 'hoho');
// ssl.print();

// ssl.remove(0);
// ssl.print();