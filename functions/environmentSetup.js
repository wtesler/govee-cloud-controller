module.exports = function () {
  const {reportError} = require('google-cloud-report-error');
  process.env.GCLOUD_PROJECT = 'catlight';
  global.crannyReportError = e => reportError(e, 'functions');
};
