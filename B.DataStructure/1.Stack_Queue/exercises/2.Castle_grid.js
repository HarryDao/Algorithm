function minimumMoves(grid, startX, startY, goalX, goalY) {
    const maxX = grid.length - 1;
    const maxY = grid[0].length - 1;
    const array = [{
        path: [{
            x: startX,
            y: startY
        }],
        count: 0
    }];
    let minPath = [];
    let minCount = 0;

    while (array.length) {
        const { path, count } = array.pop();
        const { x, y } = path[path.length - 1];
        const prev = path[path.length - 2];
        const dx = prev ? (x - prev.x) : 0;
        const dy = prev ? (y - prev.y) : 0;

        if (x === goalX && y === goalY) {
            minPath = path;
            minCount = count;
            break;
        }

        const children = [
            { x: x - 1, y },
            { x: x + 1, y },
            { x, y: y - 1 },
            { x, y: y + 1 },
        ];
        
        children.forEach(child => {
            if (
                child.x < 0 ||
                child.x > maxX ||
                child.y < 0 ||
                child.y > maxY ||
                grid[child.x][child.y] === 'X'
            ) {
                return
            };

            const dxChild = child.x - x;
            const dyChild = child.y - y;

            if (
                (dxChild + dx) === 0 &&
                (dyChild + dy) === 0
            ) {
                return
            };
            
            const newPath = [...path, child];

            if (
                Math.abs(dx) === Math.abs(dxChild) &&
                Math.abs(dy) === Math.abs(dyChild)
            ) {
                array.push({
                    path: newPath,
                    count: count || 1
                });
                return;
            }

            array.unshift({
                path: newPath,
                count: count + 1
            });
        });
    }

    return minCount;
}


//minimumMoves(
//    [ '.X.', '.X.', '...' ],
//    0, 0, 1, 2
//);

minimumMoves(
    [
        '.X..XX...X',
        'X.........',
        '.X.......X',
        '..........',
        '........X.',
        '.X...XXX..',
        '.....X..XX',
        '.....X.X..',
        '..........',
        '.....X..XX'
    ],
    9,1,9,6
)


//.X..XX...X
//X.........
//.X.......X
//..........
//........X.
//.X...XXX..
//.....X..XX
//.....X.X..
//..........
//.....X..XX

//9 1 9 6