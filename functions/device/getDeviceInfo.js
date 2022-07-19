module.exports = async () => {
  const goveeClient = require('../govee/GoveeClient');
  return await goveeClient.getDevices();
};
