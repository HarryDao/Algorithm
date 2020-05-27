class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(v1, v2) {
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);
    }

    removeEdge(v1, v2) {
        this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
        this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
    }

    removeVertex(v) {
        delete this.adjacencyList[v];
        Object.keys(this.adjacencyList).forEach(key => {
            this.adjacencyList[key] = this.adjacencyList[key].filter(vertex => vertex !== v);
        });
    }

    recurseDFS(start) {
        const result = [];
        const visited = {};
        const { adjacencyList } = this;

        (function dfs(vertex) {
            if (!vertex) return null;
            visited[vertex] = true;
            result.push(vertex);
            adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    dfs(neighbor);
                }
            });
        })(start);
        return result;
    }

    iterateDFS(start) {
        const result = [];
        const visited = [];
        const stack = [start];
        const { adjacencyList } = this;

        while (stack.length) {
            const vertex = stack.shift();
            if (visited[vertex]) continue;
            result.push(vertex);
            visited[vertex] = true;
            stack.unshift(...adjacencyList[vertex]);
        }

        return result;
    }

    iterateBFS(start) {
        const result = [];
        const visited = [];
        const queue = [start];
        const { adjacencyList } = this;

        while (queue.length) {
            console.log('queue:', queue);
            const vertex = queue.shift();
            if (visited[vertex]) continue;
            result.push(vertex);
            visited[vertex] = true;
            queue.push(...adjacencyList[vertex]);
        }

        return result;
    }
}

let g = new Graph();
g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addEdge('A', 'C');
g.addEdge('B', 'C');
g.addEdge('A', 'D');
g.addEdge('A', 'B');

// g.removeEdge('C', 'B');
// g.removeVertex('C');
console.log(g);


// console.log(g.recurseDFS('A'));
// console.log(g.iterateDFS('A'));
console.log(g.iterateBFS('A'));