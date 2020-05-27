//Union-find with specific canonical element. Add a method 𝚏𝚒𝚗𝚍() to the union-find data type so that 𝚏𝚒𝚗𝚍(𝚒) returns the largest element in the connected component containing ii. The operations, 𝚞𝚗𝚒𝚘𝚗(), 𝚌𝚘𝚗𝚗𝚎𝚌𝚝𝚎𝚍(), and 𝚏𝚒𝚗𝚍() should all take logarithmic time or better.

//For example, if one of the connected components is {1,2,6,9}, then the 𝚏𝚒𝚗𝚍() method should return 9 for each of the four elements in the connected components.

class UnionFind {
    constructor(n) {
        this.list = [];
        this.weight = [];
        this.values = [];
        for (let i = 0; i <= n; i++) {
            this.list[i] = i;
            this.weight[i] = 1;
            this.values[i] = i;
        }
    }

    root(n) {
        let root = n;
        while (this.list[root] !== root) {
            this.list[root] = this.list[this.list[root]];
            const max = Math.max(this.values[root], this.values[this.list[root]]); 
            this.values[root] = max;
            this.values[this.list[root]] = max;
            root = this.list[root];
        }
        return root;
    }

    union(n1, n2) { 
        const root1 = this.root(n1);
        const weight1 = this.weight[root1];

        const root2 = this.root(n2);
        const weight2 = this.weight[root2];
        
        if (root1 === root2) {
            return;
        }

        const value = Math.max(this.values[root1], this.values[root2]);
        this.values[root1] = value;
        this.values[root2] = value;

        if (weight1 < weight2) {
            this.list[root1] = root2;
            this.weight[root2] = weight2 + weight1;
        } else {
            this.list[root2] = root1;
            this.weight[root1] = weight2 + weight1;
        }
    }

    find(n) {
        return this.values[this.root(n)];
    }

    connected(n1, n2) {
        return this.root(n1) === this.root(n2);
    }
}

const unionFind = new UnionFind(4);

unionFind.union(0, 1);
//console.log('union:', unionFind.list);
//console.log('weight:', unionFind.weight);
//console.log('values:', unionFind.values);

unionFind.union(1, 2);
//console.log('union:', unionFind.list);
//console.log('weight:', unionFind.weight);
//console.log('values:', unionFind.values);

unionFind.union(3, 4);
//console.log('union:', unionFind.list);
//console.log('weight:', unionFind.weight);
//console.log('values:', unionFind.values);


console.log(unionFind.find(1));
console.log(unionFind.find(4));