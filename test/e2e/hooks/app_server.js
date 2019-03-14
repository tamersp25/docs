/// <reference types="node" />

const HTTP_PORT = process.env.HTTP_PORT || 3000;
const BUILD_DIR = process.env.ENVIRONMENT
  ? './build-' + process.env.ENVIRONMENT
  : './build-local';

/**
 * Need ENV params for:
 * - HTTP_PORT = 3001
 * - ENVIRONMENT = 'dev'
 */
module.exports = (function() {
  const http = require('http');
  const fs = require('fs');

  let server;

  /**
   *
   * @param {IncomingMessage} request
   * @param {ServerResponse} response
   */
  const requestListener = (request, response) => {
    const file = request.url === '/' ? '/index.html' : request.url;
    fs.readFile(BUILD_DIR + file, function(err, data) {
      if (err) {
        return requestListener(
          Object.assign({}, request, { url: '/index.html' }),
          response
        );
      }
      response.write(data);
      response.end();
    });
  };

  /**
   * Start HTTP server to load local build.
   * @param {() => void} done - callback function
   */
  function start(done) {
    server = http.createServer(requestListener).listen(HTTP_PORT, err => {
      if (err) {
        console.error('HTTP Serve failed to bootstrap.', err);
        process.exit(1);
      }
      done();
    });
  }

  /**
   * Stop the HTTP server.
   * @param {() => void} done - callback function
   */
  function stop(done) {
    if (server) {
      server.close(done);
    }
  }

  return {
    start,
    stop,
  };
})();
