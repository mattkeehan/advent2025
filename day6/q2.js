const { inputFilePath, loadDataFromFile } = require('../util/fileLoader');

console.log('Running:', __filename);
let data =
  loadDataFromFile(inputFilePath).trim().split('\n');

console.log('Loaded data:', data);
