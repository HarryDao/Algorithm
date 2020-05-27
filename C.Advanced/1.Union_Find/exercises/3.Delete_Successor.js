//Successor with delete. Given a set of nn integers }S={0,1,...,n−1} and a sequence of requests of the following form:
//- Remove x from S;
//- Find the successor of x: the smallest y in S such that y >= x;
//design a data type so that all operations (except construction) take logarithmic time or better in the worst case.

class DeleteSuccessor {
    constructor(array) {
        this.list = [];
        this.weight = [];
        this.successor = [];
        
        for (let i = 0; i <= n; i++) {
            this.list[i] = i;
            this.weight[i] = 1;
            this.successor[i] = null;
        }
    }

    root(n) {
        let root = n;
        while (this.list[root] !== root) {
            this.list[root] = this.list[this.list[root]];
            root = this.list[root];
        }
        return root;
    }

    union(n1, n2) {
        const root1 = this.root(n1);
        const root2 = this.root(n2);
        
        if (root1 === root2) return;
        const weight1 = this.weight[root1];
        const weight2 = this.weight[root2];

        
    }
}