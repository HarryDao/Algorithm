class Node {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority;
    }
}

class PriorityQueue { // Use Min_Binary_Heap
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        const newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }

    dequeue() {
        const min = this.values[0];
        const last = this.values.pop();
        if (this.values.length) {
            this.values[0] = last;
            this.sinkDown();
        }
        return min;
    }

    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];

        while(idx > 0) {
            const idxParent = Math.floor((idx - 1)/2);
            const elementParent = this.values[idxParent];
            if (element.priority >= elementParent.priority) break;
            this.values[idxParent] = element;
            this.values[idx] = elementParent;
            idx = idxParent;
        }
    }

    sinkDown() {
        const length = this.values.length;
        let idx = 0;
        const el = this.values[idx];
        while(idx < length - 1) {
            const leftIdx = idx * 2 + 1;
            const rightIdx = idx * 2 + 2;
            if (leftIdx > length - 1 && rightIdx > length - 1) {
                break;
            }
            let childIdx;
            if (leftIdx > length - 1) {
                childIdx = rightIdx;
            } else if (rightIdx > length - 1) {
                childIdx = leftIdx;
            } else {
                childIdx = this.values[leftIdx].priority < this.values[rightIdx].priority ? leftIdx : rightIdx;
            }

            const child = this.values[childIdx];
            if (child.priority >= el.priority) break;
            this.values[childIdx] = el;
            this.values[idx] = child;
            idx = childIdx
        }
    }
}

class WeighedGraph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        this.adjacencyList[vertex] = {};
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1][vertex2] = { weight, node: vertex2 };
        this.adjacencyList[vertex2][vertex1] = { weight, node: vertex1 };
    }

    findShortestPathDijkstra(start, finish) {
        const { adjacencyList } = this;
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        const path = [];
        let smallest;

        Object.keys(this.adjacencyList).forEach(vertex => {
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Number.POSITIVE_INFINITY;
                nodes.enqueue(vertex, Number.POSITIVE_INFINITY);
            }
            previous[vertex] = null;
        });

        while (nodes.values.length) {
            smallest = nodes.dequeue().val;
            if (smallest === finish) {
                while (previous[smallest]) {
                    path.unshift(smallest);
                    smallest = previous[smallest];
                }
                path.unshift(start);
                break;
            }
            if (smallest || distances[smallest] !== Number.POSITIVE_INFINITY) {
                Object.keys(adjacencyList[smallest]).forEach(neighbor => {
                    const nextNode = adjacencyList[smallest][neighbor];
                    let candidate = distances[smallest] + nextNode.weight;
                    if (candidate < distances[neighbor]) {
                        distances[neighbor] = candidate;
                        previous[neighbor] = smallest;
                        nodes.enqueue(neighbor, candidate);
                    }
                });
            }
            
        }
        return path;
    }
}

const g = new WeighedGraph();
g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');
g.addVertex('A1');
g.addVertex('A2');
g.addVertex('A3');

g.addEdge('A', 'B', 4);
g.addEdge('A', 'C', 2);
g.addEdge('B', 'E', 3);
g.addEdge('C', 'D', 2);
g.addEdge('C', 'F', 4);
g.addEdge('D', 'E', 3);
g.addEdge('D', 'F', 1);
g.addEdge('E', 'F', 1);
g.addEdge('A', 'A1', 5);
g.addEdge('A1', 'A2', 2);
g.addEdge('A2', 'A3', 2);

g.findShortestPathDijkstra('A', 'E');

