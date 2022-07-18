module.exports = async () => {
  const goveeClient = require('../govee/GoveeClient');
  const controlResponse = await goveeClient.controlDevice({name: 'turn', value: 'off'});
  console.log(JSON.stringify(controlResponse));
};
