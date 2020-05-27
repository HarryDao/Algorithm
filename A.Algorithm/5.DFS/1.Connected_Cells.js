// https://www.hackerrank.com/challenges/ctci-connected-cell-in-a-grid/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=graphs

//Consider a matrix where each cell contains either a  or a  and any cell containing a  is called a filled cell. Two cells are said to be connected if they are adjacent to each other horizontally, vertically, or diagonally. In the diagram below, the two colored regions show cells connected to the filled cells. Black on white are not connected.

// Cells adjacent to filled cells:

// If one or more filled cells are also connected, they form a region. Note that each cell in a region is connected to at least one other cell in the region but is not necessarily directly connected to all the other cells in the region.


function maxRegion(grid) {
    const ROW = grid.length;
    const COL = grid[0].length;
    let max = 0;

    function find(r, c, mapped = {}) {
        if (grid[r][c] === 0) return mapped;
        mapped[`${r}-${c}`] = true;

        const children = [
            [r - 1, c - 1],
            [r - 1, c],
            [r - 1, c + 1],
            [r, c - 1],
            [r, c + 1],
            [r + 1, c - 1],
            [r + 1, c],
            [r + 1, c + 1]
        ].filter(([rChild, cChild]) => {
            return  rChild >= 0 &&
                rChild < ROW &&
                cChild >= 0 &&
                cChild < COL &&
                grid[rChild][cChild] === 1
        });

        grid[r][c] = 0;

        for (let child of children) {
            find(child[0], child[1], mapped);
        }

        return mapped;
    }
    
    for (let r = 0; r < ROW; r ++) {
        for (let c = 0; c < COL; c ++) {
            const mapped = find(r, c);
            const length = Object.keys(mapped).length;
            if (length > max) max = length;
        }
    }
    return max;
}


//console.log(maxRegion([[1,1,0,0],[0,1,1,0],[0,0,1,0],[1,0,0,0]]));

console.log(maxRegion([
    [ 1, 0, 1, 1, 0 ],
    [ 1, 1, 0, 0, 1 ],
    [ 0, 1, 1, 1, 0 ],
    [ 0, 0, 0, 0, 1 ],
    [ 1, 1, 1, 0, 0 ]
]))

