const HTTP_ROOT = process.env.HTTP_ROOT || 'https://www.stage.veritone.com/login';
// const HTTP_PORT = process.env.HTTP_PORT || 3000;
const SKIP_BOOTSTRAP = process.env.E2E_SKIP_BOOTSTRAP === 'true';
const GENERATE_REPORT = process.env.E2E_GENERATE_REPORT === 'true';

/**
 * Need ENV for:
 * - HTTP_ROOT = 'http://local.veritone.com'
 * - HTTP_PORT = 3001
 */

exports.config = {
  tests: './test/e2e/*.test.js',
  output: './test/e2e/output',
  helpers: {
    Puppeteer: {
      // url: `${HTTP_ROOT}:${HTTP_PORT}`,
      url: `${HTTP_ROOT}`,
      chrome: {
        args: ['--no-sandbox'],
      },
      windowSize: '1200x1000',
      show: true,
      restart: false,
      keepBrowserState: true,
      executablePath: 'google-chrome-unstable'
    }
  },
  include: {
    I: './test/e2e/_steps_file.js'
  },
  bootstrap: SKIP_BOOTSTRAP || './test/e2e/hooks/bootstrap.js',
  teardown: SKIP_BOOTSTRAP || './test/e2e/hooks/teardown.js',
  plugins: {
    allure: {
      enabled: GENERATE_REPORT
    },
    stepByStepReport: {
      enabled: GENERATE_REPORT
    }
  },
  mocha: {
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-'
      },
      'mocha-junit-reporter': {
        stdout: 'test/e2e/output/junit-console.log'
      }
    }
  },
  name: 'docs'
};
