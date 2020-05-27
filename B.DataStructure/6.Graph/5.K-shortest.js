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
        this.removed = [];
    }

    addVertex(vertex) {
        this.adjacencyList[vertex] = {};
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1][vertex2] = { weight, node: vertex2 };
        this.adjacencyList[vertex2][vertex1] = { weight, node: vertex1 };
    }

    removeEdge(vertex1, vertex2) {
        if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex1][vertex2]) {
            return;
        }
        this.removed.push({
            type: 'edge',
            vertex1,
            vertex2,
            weight: this.adjacencyList[vertex1][vertex2].weight
        });
        delete this.adjacencyList[vertex1][vertex2];
        delete this.adjacencyList[vertex2][vertex1];
    }

    removeVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            return;
        }
        const list = this.adjacencyList[vertex];

        delete this.adjacencyList[vertex];
        Object.keys(list).forEach(v => {
            delete this.adjacencyList[v][vertex];
        });

        this.removed.push({
            type: 'vertex',
            vertex,
            list
        });
    }

    restoreGraph() {
        while (this.removed.length) {
            const {
                type,
                weight,
                vertex1,
                vertex2,
                vertex,
                list
            } = this.removed.pop();

            if (type === 'edge') {
                this.adjacencyList[vertex1][vertex2] = {
                    weight,
                    node: vertex2
                }
                this.adjacencyList[vertex2][vertex1] = {
                    weight,
                    node: vertex1
                }
            } else {
                this.adjacencyList[vertex] = list;
                Object.keys(list).forEach(v => {
                    this.adjacencyList[v][vertex] = {
                        weight: list[v].weight,
                        node: vertex
                    }
                });
            }
        }
    }

    calculatePathWeight(path) {
        let weight = 0;
        for (let i = 0; i < path.length - 1; i++) {
            weight += this.adjacencyList[path[i]][path[i + 1]].weight;
        }
        return weight;
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
                    path.push(smallest);
                    smallest = previous[smallest];
                }
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

        return path.length ? path.concat(start).reverse() : null;
    }

    

    findNShortestPaths(start, finish, N) {
        const shortestPaths = [];
        const tempPaths = {
            queue: new PriorityQueue(),
            stored: {},
        };
        const shortest = this.findShortestPathDijkstra(start, finish);

        if (!shortest) {
            return shortestPaths;
        }

        shortestPaths.push(shortest);
        
        loop1:
        for (let n = 1; n < N; n++) {
            const originalShortestPath = shortestPaths[n - 1];

            loop2:
            for (let index = 0; index < originalShortestPath.length - 2; index++) {
                const spurVertex = originalShortestPath[index];
                const rootPath = originalShortestPath.slice(0, index + 1);
                const rootRegex = new RegExp(`^${rootPath.join('')}`);
                shortestPaths.forEach(path => {
                    if (path.join('').match(rootRegex)) {
                        this.removeEdge(path[index], path[index + 1])
                    }
                });
                rootPath.forEach(vertex => {
                    if (vertex !== spurVertex) {
                        this.removeVertex(vertex);
                    }
                });
                const spurShortestPath = this.findShortestPathDijkstra(spurVertex, finish);
                this.restoreGraph();
                if (spurShortestPath) {
                    const spurPath = [...rootPath, ...spurShortestPath.slice(1)];
                    if (!tempPaths.stored[spurPath.join('')]) {
                        tempPaths.queue.enqueue(spurPath,  this.calculatePathWeight(spurPath));
                        tempPaths.stored[spurPath.join('')] = true;
                    }
                }
            }

            if (!tempPaths.queue.values.length) {
                break loop1;
            }

            const bestNextPath = tempPaths.queue.dequeue();
            console.log('bestNe:', bestNextPath);
            delete tempPaths.stored[bestNextPath.val.join('')];

            shortestPaths.push(bestNextPath.val);
        }

        return shortestPaths;
    }
}

const g = new WeighedGraph();
// g.addVertex('A');
// g.addVertex('B');
// g.addVertex('C');
// g.addVertex('D');
// g.addVertex('E');
// g.addVertex('F');
// g.addVertex('A1');
// g.addVertex('A2');
// g.addVertex('A3');

// g.addEdge('A', 'B', 4);
// g.addEdge('A', 'C', 2);
// g.addEdge('B', 'E', 5);
// g.addEdge('C', 'D', 2);
// g.addEdge('C', 'F', 4);
// g.addEdge('D', 'E', 4);
// g.addEdge('D', 'F', 1);
// g.addEdge('E', 'F', 1);
// g.addEdge('A', 'A1', 5);
// g.addEdge('A1', 'A2', 2);
// g.addEdge('A2', 'A3', 2);

// // g.findShortestPathDijkstra('A', 'E');
// g.findSecondShortest('A', 'E');




// g.addVertex('A');
// g.addVertex('B');
// g.addVertex('C');
// g.addVertex('D');

// g.addEdge('A', 'B', 1);
// g.addEdge('A', 'C', 2);
// g.addEdge('B', 'C', 3);
// g.addEdge('C', 'D', 4);

// console.log('g:', g.adjacencyList);

// var a = g.findNShortestPaths('A', 'D', 2);
// console.log('a:', a);

g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');
g.addVertex('G');
g.addVertex('H');

g.addEdge('C', 'D', 3);
g.addEdge('D', 'F', 4);
g.addEdge('C', 'E', 2);
g.addEdge('D', 'E', 1);
g.addEdge('E', 'F', 2);
g.addEdge('E', 'G', 3);
g.addEdge('F', 'G', 2);
g.addEdge('F', 'H', 1);
g.addEdge('G', 'H', 2);


console.log(g.findShortestPathDijkstra('C', 'H'));
console.log(g.findNShortestPaths('C', 'H', 7));
