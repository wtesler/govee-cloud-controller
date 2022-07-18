module.exports = async () => {
  const goveeClient = require('../govee/GoveeClient');
  const lerpColor = require('../lerp/lerpColor');
  const lerp = require('../lerp/lerp');
  const toColorObject = require('../color/toColorObject');
  const dim = require('../color/dim');

  const START_MINUTES = 1200; // 3 PM CST
  const END_MINUTES = 1260; // 4 PM CST

  const WHITE = 0xFFFFFF;
  // const RED = 0xFF0000;
  // const GREEN = 0x00FF00;
  const BLUE = 0x0000FF;

  // Get number of minutes since midnight. Note Cloud Functions are in EST!
  const date = new Date();
  const now = new Date(date);
  const msSinceMidnight = now - date.setHours(0, 0, 0, 0);
  const secSinceMidnight = msSinceMidnight / 1000;
  const minutes = Math.floor(secSinceMidnight / 60);

  if (minutes < START_MINUTES) {
    return;
  }

  if (minutes > END_MINUTES) {
    return;
  }

  if (minutes === END_MINUTES) {
    await goveeClient.controlDevice({name: 'color', value: toColorObject(0x0)});
    return;
  }

  let t = (minutes - START_MINUTES) / (END_MINUTES - START_MINUTES);
  t = Math.pow(t, 3);

  const dimMultiplier = lerp(0, 0.9, t);
  const color = toColorObject(lerpColor(WHITE, BLUE, t));
  dim(color, dimMultiplier);

  await goveeClient.controlDevice({name: 'color', value: color});
};
