const fs = require('fs');
const readline = require('readline');
const skus = require('./mockData/skus.csv');

const readlineInterface = readline.createInterface({
  input: fs.createReadStream(skus),
  output: false,
  console: false
});

readlineInterface.on('line', (line) => {
  console.log(line);
  process.exit(0);
});