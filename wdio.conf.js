const constants = require('./test/constants');
const allure = require('allure-commandline');
const LoginPage = require('./test/page-objects/login.page');

exports.config = {
  runner: 'local',
  specs: [
    './test/specs/**/*.js'
  ],
  maxInstances: 10,
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome',
    acceptInsecureCerts: true,
    'goog:chromeOptions': {
      args: [ '--headless', '--disable-gpu']
    }
  }],

  logLevel: process.env.LOGLEVEL || 'error',
  bail: 0,
  baseUrl: constants.BASE_URL,
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: [
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true
    }],
    'spec',
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
  },

  before: async function () {
    await LoginPage.login();
  },

  afterTest: async function (test, context, { passed }) {
    if (passed === false) {
      await browser.takeScreenshot();
    }
  },

  onComplete: function () {
    utils.logout();
    const reportError = new Error('Could not generate Allure report');
    const timeoutError = new Error('Timeout generating report');
    const generation = allure(['generate', 'allure-results', '--clean']);
    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(
        () => reject(timeoutError),
        60 * 1000);

      generation.on('exit', function (exitCode) {
        clearTimeout(generationTimeout);

        if (exitCode !== 0) {
          return reject(reportError);
        }

        console.log('Allure report successfully generated');
        resolve();
      });
    });
  },
};

