module.exports = async (req, res) => {
  const schedule = require('../schedule');
  await schedule();
};
