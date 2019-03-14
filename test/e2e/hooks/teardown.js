/// <reference types="node" />

const server = require('./app_server');

module.exports = function(done) {
  server.stop(done);
};
