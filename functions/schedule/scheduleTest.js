module.exports = async () => {
  const goveeClient = require('../govee/GoveeClient');
  const lerpColor = require('../lerp/lerpColor');
  const lerp = require('../lerp/lerp');
  const toColorObject = require('../color/toColorObject');
  const dim = require('../color/dim');

  const WHITE = 0xFF0000;
  // const RED = 0xFF0000;
  // const GREEN = 0x00FF00;
  const BLUE = 0x0000FF;

  const sleep = ms => new Promise(res => setTimeout(res, ms));

  for (let i = 0; i < 3; i++) {
    const t = i / 2;

    const dimMultiplier = lerp(.1, 1, t);
    const color = toColorObject(lerpColor(WHITE, BLUE, t));
    dim(color, dimMultiplier);

    console.log(color);

    await goveeClient.controlDevice({name: 'color', value: color});

    await sleep(2000);
  }

  await goveeClient.controlDevice({name: 'color', value: toColorObject(0x0)});
};
