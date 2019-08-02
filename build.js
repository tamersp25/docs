const { readFileSync, writeFileSync } = require('fs');

const { exec, cp, rm, mkdir } = require('shelljs');

const buildDirectory = process.env.OUTPUT_DIRECTORY || `build-${process.env.ENVIRONMENT || 'local'}`;

// Run schemagen.sh
// TODO: Refactor into node.js (if it's even needed anymore)
if (exec('./schemagen.sh').code !== 0) {
  shell.echo('Error running schemagen');
  shell.exit(1);
}

// Copy the source code to public directory
rm('-rf', buildDirectory);
mkdir(buildDirectory);
cp('-r', 'docs/*', buildDirectory);

// Inject config into index
const config = JSON.parse(readFileSync('config.json', 'utf8'));
const indexFileLocation = `${buildDirectory}/index.html`;
const indexContents = readFileSync(indexFileLocation, 'utf8');
writeFileSync(indexFileLocation, indexContents.replace('@@apiRoot@@', config.apiRoot));
