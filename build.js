const { readFileSync, writeFileSync } = require('fs');

const buildDirectory = `build-${process.env.ENVIRONMENT || 'local'}`;
const config = JSON.parse(readFileSync('config.json', 'utf8'));
const indexFileLocation = `${buildDirectory}/index.html`;
const indexContents = readFileSync(indexFileLocation, 'utf8');

writeFileSync(
  indexFileLocation,
  indexContents.replace('@@apiRoot@@', config.apiRoot)
);
