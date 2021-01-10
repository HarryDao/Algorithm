import { listenerCount } from "process";

export class ListNode {
    val: number;
    next: ListNode | null;
    constructor(
        val: number,
        next?: ListNode | null,
    ){
        this.val = val;
        this.next = next || null;
    };
}

export class LinkedList {
    head: ListNode | null;
    tail: ListNode | null;
    constructor() {
        this.head = null;
        this.tail = null;
    }

    add(val: number) {
        const newNode = new ListNode(val);

        if (!this.tail) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = this.tail.next;
        }

        return this;
    }

    addArray(vals: number[]) {
        vals.forEach(val => {
            this.add(val);
        });
        return this;
    }
}

export const printList = (node: ListNode | null) => {
    const array: number[] = [];

    while (node) {
        array.push(node.val);
        node = node.next;
    }

    console.log(array);
    return array;
}