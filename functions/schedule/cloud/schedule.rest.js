const {rest} = require('cranny');

module.exports = [
  null,
  rest(async (req, res) => {
    const schedule = require('../schedule');
    await schedule();
  })
];
