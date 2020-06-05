// https://leetcode.com/problems/swap-nodes-in-pairs/

// Given a linked list, swap every two adjacent nodes and return its head.

// You may not modify the values in the list's nodes, only nodes itself may be changed.

// Example:

// Given 1->2->3->4, you should return the list as 2->1->4->3.


const { LinkedList } = require('../../helpers');

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head, k = 2) {
    if (k < 2) return head;

    let newHead = null;
    
    let prevChunkTail = null;
    let chunkHead = head;
    let chunkTail = head;
    let chunkCount = 1;

    loopChunk:
    while(chunkHead) {

        loopChunkTail:
        while (chunkCount < k && chunkTail) {
            chunkTail = chunkTail.next;
            chunkCount += 1;
        }
    
        if (chunkCount < k || !chunkTail) {
            if (prevChunkTail) {
                prevChunkTail.next = chunkHead;
            }

            if (!newHead) {
                newHead = chunkHead;
            }

            break loopChunk;
        }

        const next = chunkTail.next;
        chunkTail.next = null;
    
        const { newChunkHead, newChunkTail } = reverse(chunkHead);
    
        if (prevChunkTail) {
            prevChunkTail.next = newChunkHead;
        }
    
        prevChunkTail = newChunkTail;
    
        if (!newHead) {
            newHead = newChunkHead;
        }
    
        chunkHead = next;
        chunkTail = next;
        chunkCount = 1;
    }
    
    return newHead;
};

function reverse(node) {
    let newTail = null;
    let prev = null;
    let currentNode = node;

    while (currentNode) {
        const next = currentNode.next;

        currentNode.next = prev;

        prev = currentNode;
        currentNode = next;

        if (!newTail) {
            newTail = prev;
        }
    }

    return {
        newChunkHead: prev,
        newChunkTail: newTail,
    };
}

const list = new LinkedList();
list.add(4).add(5).add(6).add(7);

let node = swapPairs(list.head, 3);

while (node) {
    console.log('node:', node.val);
    node = node.next;
}
