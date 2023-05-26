const fs = require('fs');
const readline = require('readline');
const pool = require('./pgConnection.js');

const photos = '/Users/yluo/Documents/hackreactor/SDC_Data/photos.csv';

const readlineInterface = readline.createInterface({
  input: fs.createReadStream(photos),
  output: false,
  console: false
});

const updateURLFormat = (url) => {
  let updatedFormat = url.trim();
  if (updatedFormat[0] === '"') {
    updatedFormat = updatedFormat.slice(1);
  }
  const lastIndex = updatedFormat.length - 1;
  if (updatedFormat[lastIndex] === '"') {
    updatedFormat = updatedFormat.slice(0, lastIndex);
  }
  return updatedFormat;
}

readlineInterface.on('line', (line) => {
  const [photo_id, style_id, url, thumbnail_url] = line.split(',');
  const updatedURL = updateURLFormat(url);
  const updatedThumbnail_url = updateURLFormat(thumbnail_url);

  const queryStr = `INSERT INTO photos (photo_id, style_id, url, thumbnail_url) VALUES (${photo_id}, ${style_id}, '${updatedURL}', '${updatedThumbnail_url}');`;
  // console.log(`query string: ${queryStr}`);
  pool.query(queryStr)
    .then((res) => {
      // console.log(res.rowCount, 'url is inserted');
    })
    .catch((err) => {
      console.log(err, 'insertion failed');
    });
  // process.exit(0);
});

// console.log(process.memoryUsage());
readlineInterface.on('close', () => {
  console.log('CSV file imported successfully');
});