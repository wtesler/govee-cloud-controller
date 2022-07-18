const {rest} = require('cranny');

module.exports = rest(async (req, res) => {
  const schedule = require('../schedule');
  await schedule();
});
