module.exports = async () => {
  const goveeClient = require('../govee/GoveeClient');
  const toColorObject = require('../color/toColorObject');
  const saturate = require('../color/saturate');
  const lighten = require('../color/lighten');

  const START_MINUTES = 1200; // 3 PM CST
  const END_MINUTES = 1260; // 4 PM CST

  const BLUE = toColorObject(0x0000FF);
  const OFF = toColorObject(0x0);

  // Get number of minutes since midnight.
  const date = new Date();
  const now = new Date(date);
  const msSinceMidnight = now - date.setHours(0, 0, 0, 0);
  const secSinceMidnight = msSinceMidnight / 1000;
  const minutes = Math.floor(secSinceMidnight / 60);

  if (minutes < START_MINUTES) {
    return;
  }

  if (minutes >= END_MINUTES) {
    return;
  }

  if (minutes === START_MINUTES) {
    await goveeClient.controlDevice({name: 'brightness', value: 90});
  }

  let colorObj;

  if (minutes === END_MINUTES - 1) {
    colorObj = OFF;
  } else {
    let t = (minutes - START_MINUTES) / (END_MINUTES - START_MINUTES);
    t = Math.pow(t, 3);

    colorObj = saturate(lighten(BLUE, t), t);
  }

  await goveeClient.controlDevice({name: 'color', value: colorObj});
};
