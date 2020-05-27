// https://www.hackerrank.com/challenges/torque-and-development/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=graphs

// The Ruler of HackerLand believes that every citizen of the country should have access to a library. Unfortunately, HackerLand was hit by a tornado that destroyed all of its libraries and obstructed its roads! As you are the greatest programmer of HackerLand, the ruler wants your help to repair the roads and build some new libraries efficiently.

// HackerLand has  cities numbered from  to . The cities are connected by  bidirectional roads. A citizen has access to a library if:

// Their city contains a library.
// They can travel by road from their city to a city containing a library.

function roadsAndLibraries(n, c_lib, c_road, cities) {
    if (c_lib < c_road) return n * c_lib;

    const unionFind = new UnionFind(n);
    cities.forEach(pair => {
        unionFind.union(pair[0] - 1, pair[1] - 1);
    });
    const clusters = unionFind.findClusters();
    
    let total = 0;
    for (let cluster in clusters) {
        total += c_lib + (clusters[cluster] - 1) * c_road;
    }

    return total;
}    

class UnionFind {
    constructor(n) {
        this.cities = [];
        this.weight = [];
        for (let i = 0; i < n; i++) {
            this.cities.push(i);
            this.weight.push(1);
        }
    }

    root(city) {
        let root = city;
        while (root !== this.cities[root]) {
            this.cities[root] = this.cities[this.cities[root]];
            root = this.cities[root];
        }
        return root;
    }

    union(city1, city2) {
        const root1 = this.root(city1);
        const root2 = this.root(city2);
        const weight1 = this.weight[root1];
        const weight2 = this.weight[root2];

        if (weight1 < weight2) {
            this.cities[root1] = root2;
            this.weight[root2] = weight1 + weight2;
        } else {
            this.cities[root2] = root1;
            this.weight[root1] = weight1 + weight2;
        }
    }

    findClusters() {
        const clusters = {};

        for (let city of this.cities) {
            const root = this.root(city);
            if (!clusters[root]) clusters[root] = 0;
            clusters[root] += 1;
        }

        return clusters;
    }
}

//roadsAndLibraries(3, 2, 1, [
//    [ 1, 2 ],
//    [ 3, 1 ],
//    [ 2, 3 ]
//]);

roadsAndLibraries(5, 6, 1, [
    [ 1, 2 ],
    [ 1, 3 ],
    [ 1, 4 ]
]);
 