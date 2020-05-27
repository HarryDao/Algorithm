// Tree are flat => but expensive to keep it flat
// O(N) => total O(N^2)
class QuickFind {
    constructor(n) {
        this.list = [];
        for (let i = 0; i <= n; i++) {
            this.list[i] = i;
        }
    }

    union(n1, n2) { // O(N) => Too expensive
        const value1 = this.list[n1];
        const value2 = this.list[n2];
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i] === value1) {
                this.list[i] = value2;
            }
        }
    }

    connected(n1, n2) { // O(1)
        return this.list[n1] === this.list[n2];
    }
}

const find = new QuickFind(4);



// Tree can be very tall
// O(N) => total O(N^2)
class QuickUnion {
    constructor(n) {
        this.list = [];
        for (let i = 0; i <= n; i++) {
            this.list[i] = i;
        }
    }

    root(n) {
        let root = n;
        while (this.list[root] !== root) {
            root = this.list[root];
        }
        return root;
    }

    union(n1, n2) { // O(N)
        this.list[this.root(n1)] = this.root(n2);
    }

    connected(n1, n2) { // O(N) => too expensive
        return this.root(n1) === this.root(n2);
    }
}

//const quickUnion = new QuickUnion(3);
//quickUnion.union(0, 1);
//quickUnion.union(0, 2);
//console.log('li:', quickUnion.list);

//console.log(quickUnion.connected(1, 2));
//console.log(quickUnion.connected(1, 3));





// Effort to keep the tree flatter
// O(logN) => total is O(N * logN);
class WeightedQuickUnion {
    constructor(n) {
        this.list = [];
        this.weight = [];
        for (let i = 0; i <= n; i++) {
            this.list[i] = i;
            this.weight[i] = 1;
        }
    }

    // O(logN)
    root(n) {
        let root = n;
        while (this.list[root] !== root) {
            root = this.list[root];
        }
        return root;
    }

    // Flatter the tree with weight
    // O(logN): double nodes (forming additional Tree T2) => just merge T2 to current Tree T1: at most increase depth by 1
    union(n1, n2) { // O(logN) => merge 
        const root1 = this.root(n1);
        const weight1 = this.weight[root1];

        const root2 = this.root(n2);
        const weight2 = this.weight[root2];

        if (root1 === root2) {
            return;
        }

        if (weight1 < weight2) {
            this.list[root1] = root2;
            this.weight[weight2] = weight2 + weight1;
        } else {
            this.list[root2] = root1;
            this.weight[weight1] = weight2 + weight1;
        }
    }


    // O(logN): double number of nodes, depth at most increases by 1 
    connected(n1, n2) {
        return this.root(n1) === this.root(n2);
    }
}

//const weightedQuickUnion = new WeightedQuickUnion(3);
//weightedQuickUnion.union(0, 1);
//weightedQuickUnion.union(0, 2);
//console.log('li:', weightedQuickUnion.list);

//console.log(weightedQuickUnion.connected(1, 2));
//console.log(weightedQuickUnion.connected(1, 3));



// nearly O(1) => total is nearly O(N);
class WeightedCompressedQuickUnion {
    constructor(n) {
        this.list = [];
        this.weight = [];
        for (let i = 0; i <= n; i++) {
            this.list[i] = i;
            this.weight[i] = 1;
        }
    }

    // near O(1)
    root(n) {
        let root = n;
        while (this.list[root] !== root) {
            this.list[root] = this.list[this.list[root]]; // flatten the tree, so all nodes point to parent
            root = this.list[root];
        }
        return root;
    }

    // O(1)
    union(n1, n2) { 
        const root1 = this.root(n1);
        const weight1 = this.weight[root1];

        const root2 = this.root(n2);
        const weight2 = this.weight[root2];

        if (root1 === root2) {
            return;
        }

        if (weight1 < weight2) {
            this.list[root1] = root2;
            this.weight[root2] = weight2 + weight1;
        } else {
            this.list[root2] = root1;
            this.weight[root1] = weight2 + weight1;
        }
    }


    // near O(1)
    connected(n1, n2) {
        return this.root(n1) === this.root(n2);
    }
}