module.exports = async () => {
  const goveeClient = require('../govee/GoveeClient');
  const lerp = require('../lerp/lerp');
  const toColorObject = require('../color/toColorObject');
  const saturate = require('../color/saturate');
  const lighten = require('../color/lighten');

  const BLUE = toColorObject(0x0000FF);
  const OFF = toColorObject(0x0);

  const sleep = ms => new Promise(res => setTimeout(res, ms));

  await goveeClient.controlDevice({name: 'brightness', value: 90});

  const STEPS = 5;
  for (let i = 0; i < STEPS; i++) {
    let t = i / (STEPS - 1);
    t = lerp(.1, 1, t);
    // t = Math.pow(t, 3);

    const colorObj = saturate(lighten(BLUE, t), t);

    console.log(colorObj);

    await goveeClient.controlDevice({name: 'color', value: colorObj});

    await sleep(3000);
  }

  await sleep(2000);

  await goveeClient.controlDevice({name: 'color', value: toColorObject(OFF)});
};
