const { inputFilePath, loadDataFromFile } = require('../util/fileLoader');
console.log('Running:', __filename);

const findStart = (grid) => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 'S') {
        return { row, col };
      }
    }
  }
  throw new Error('Start position "S" not found in grid');
};

const advanceBeamOnce = (beam, grid) => {
  const HEIGHT = grid.length;
  const WIDTH = grid[0].length;
  
  const nextRow = beam.row + 1;
  
  if (nextRow >= HEIGHT) {
    return { type: "exit" };
  }
  
  const cell = grid[nextRow][beam.col];
  
  if (cell === '^') {
    const result = { type: "split" };
    
    if (beam.col - 1 >= 0) {
      result.leftBeam = { row: nextRow, col: beam.col - 1 };
    }
    if (beam.col + 1 < WIDTH) {
      result.rightBeam = { row: nextRow, col: beam.col + 1 };
    }
    
    return result;
  }
  
  return { type: "continue", beam: { row: nextRow, col: beam.col } };
};

const simulate = (grid, start) => {
  const queue = [];
  let splitCount = 0;

  // NEW: keep track of positions we've already processed
  const visited = new Set();
  
  queue.push({ row: start.row, col: start.col });
  
  while (queue.length > 0) {
    const beam = queue.pop();

    const key = `${beam.row},${beam.col}`;
    if (visited.has(key)) {
      // We've already processed a beam starting from here
      continue;
    }
    visited.add(key);

    const result = advanceBeamOnce(beam, grid);
    
    if (result.type === "exit") {
      // nothing
    } else if (result.type === "continue") {
      queue.push(result.beam);
    } else if (result.type === "split") {
      splitCount++;
      if (result.leftBeam) queue.push(result.leftBeam);
      if (result.rightBeam) queue.push(result.rightBeam);
    }
  }
  
  return splitCount;
};

let data = loadDataFromFile(inputFilePath).trim().split('\n');
const grid = data.map(line => line.split(''));

const start = findStart(grid);
const splitCount = simulate(grid, start);
console.log('Split count:', splitCount);
