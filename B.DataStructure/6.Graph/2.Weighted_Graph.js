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
}

const g = new WeighedGraph();

g.addVertex('A');
g.addVertex('B');
g.addVertex('C');

g.addEdge('A', 'B', 20);
g.addEdge('A', 'C', 40);

console.log(JSON.stringify(g));