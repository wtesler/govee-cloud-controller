(async () => {
  const getDeviceInfo = require("../getDeviceInfo");
  const response = await getDeviceInfo();
  console.log(JSON.stringify(response));
})();
