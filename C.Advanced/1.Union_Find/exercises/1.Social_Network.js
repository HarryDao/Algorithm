//Social network connectivity. Given a social network containing n members and a log file containing m timestamps at which times pairs of members formed friendships, design an algorithm to determine the earliest time at which all members are connected (i.e., every member is a friend of a friend of a friend ... of a friend). Assume that the log file is sorted by timestamp and that friendship is an equivalence relation. The running time of your algorithm should be m * logn or better and use extra space proportional to n.

class SocialNetwork {
    constructor(n) {
        this.list = [];
        this.props = [];
        for (let i = 0; i <=n; i++) {
            this.list.push(i);
            this.props.push({
                weight: 1,
                time: 0
            });
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

    union(n1, n2, time) {
        const root1 = this.root(n1);
        const root2 = this.root(n2);
        const prop1 = this.props[root1];
        const prop2 = this.props[root2];

        if (root1 === root2) return;

        if (prop1.weight < prop2.weight) {
            this.list[root1] = root2;
            this.props[root2] = {
                weight: prop1.weight + prop2.weight,
                time
            }
        } else {
            this.list[root2] = root1;
            this.props[root1] = {
                weight: prop1.weight + prop2.weight,
                time,
            }
        }
    }

    findEarliestTime() {
        const root = this.root(this.list[0]);
        return this.props[root].time;
    }

}


const network = new SocialNetwork(4);

// 0 1 2 3 4

network.union(0, 1, 3);
console.log('list:', network.list);
console.log('props:', network.props);

network.union(0, 2, 5);
console.log('list:', network.list);
console.log('props:', network.props);

network.union(1, 3, 6);
console.log('list:', network.list);
console.log('props:', network.props);

network.union(3, 4, 7);
console.log('list:', network.list);
console.log('props:', network.props);

network.union(0, 4, 10);
console.log('list:', network.list);
console.log('props:', network.props);

console.log('f:', network.findEarliestTime());