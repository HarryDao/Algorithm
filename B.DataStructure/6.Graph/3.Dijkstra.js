class NaivePriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
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
        const nodes = new NaivePriorityQueue();
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
            }
            previous[vertex] = null;
        });

        while (nodes.values.length) {
            console.log('node0:', nodes);
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
                        console.log('node:', nodes.values);
                    }
                });
            }
            
        }
        console.log('path:', path);
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

g.addEdge('A', 'B', 4);
g.addEdge('A', 'C', 2);
g.addEdge('B', 'E', 3);
g.addEdge('C', 'D', 2);
g.addEdge('C', 'F', 5);
g.addEdge('D', 'E', 3);
g.addEdge('D', 'F', 1);
g.addEdge('E', 'F', 1);

g.findShortestPathDijkstra('A', 'E');

