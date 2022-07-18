const {reportError} = require('google-cloud-report-error');

module.exports = function () {
  process.env.GCLOUD_PROJECT = 'catlight';
  global.crannyReportError = e => reportError(e, 'functions');
};
