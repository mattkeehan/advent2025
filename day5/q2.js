const { inputFilePath, loadDataFromFile } = require('../util/fileLoader');
const data = loadDataFromFile(inputFilePath).split('\n');
console.log('Running:', __filename);

let grid = data.map(line => line.split(''));

const neighbourOffsets = [
    [-1, -1], [-1, 0], [-1, 1],
    [ 0, -1],          [ 0, 1],
    [ 1, -1], [ 1, 0], [ 1, 1]
];

let totalRemoved = 0;

while (true) {
    let toRemove = [];

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        for (let colIndex = 0; colIndex < grid[rowIndex].length; colIndex++) {

            if (grid[rowIndex][colIndex] !== '@') continue;

            let adjacentRollCount = 0;

            for (const [rowOffset, colOffset] of neighbourOffsets) {
                const nr = rowIndex + rowOffset;
                const nc = colIndex + colOffset;

                if (grid[nr]?.[nc] === '@') adjacentRollCount++;
            }

            if (adjacentRollCount < 4) {
                // Mark current @ for removal later
                toRemove.push([rowIndex, colIndex]);
            }
        }
    }

    if (toRemove.length === 0) break;

    for (const [r, c] of toRemove) {
        grid[r][c] = '.'; 
    }

    totalRemoved += toRemove.length;
}

console.log(`Total removed rolls (Part 2): ${totalRemoved}`);
