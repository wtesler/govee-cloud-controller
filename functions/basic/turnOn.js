module.exports = async () => {
  const goveeClient = require('../govee/GoveeClient');
  const controlResponse = await goveeClient.controlDevice({name: 'turn', value: 'on'});
  console.log(JSON.stringify(controlResponse));
};
