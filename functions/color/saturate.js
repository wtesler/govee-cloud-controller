module.exports = function (rgb, t) {
  const rgbIntArray = [rgb.r, rgb.g, rgb.b];

  const [lowest, middle, highest] = getLowestMiddleHighest(rgbIntArray);
  const grayVal = getLightnessOfRGB(rgbIntArray) * 255;

  if (lowest.val === highest.val) {
    return rgb;
  }

  const saturationRange = Math.round(Math.min(255 - grayVal, grayVal));
  const maxChange = grayVal - lowest.val;
  const changeAmount = Math.min(saturationRange * (1 - t), maxChange);

  const middleValueRatio = (grayVal - middle.val) / (grayVal - highest.val);

  const returnArray = [];
  returnArray[highest.index] = Math.round(highest.val - changeAmount);
  returnArray[lowest.index] = Math.round(lowest.val + changeAmount);
  returnArray[middle.index] = Math.round(grayVal + (returnArray[highest.index] - grayVal) * middleValueRatio);

  return {
    r: returnArray[0],
    g: returnArray[1],
    b: returnArray[2],
  };
};

function getLowestMiddleHighest(rgbIntArray) {
  let highest = {val: -1, index: -1};
  let lowest = {val: Infinity, index: -1};

  for (let i = 0; i < rgbIntArray.length; i++) {
    const val = rgbIntArray[i];
    if (val > highest.val) {
      highest = {val: val, index: i};
    }
    if (val < lowest.val) {
      lowest = {val: val, index: i};
    }
  }

  if (lowest.index === highest.index) {
    lowest.index = highest.index + 1;
  }

  const middle = {index: (3 - highest.index - lowest.index)};
  middle.val = rgbIntArray[middle.index];
  return [lowest, middle, highest];
}

function getLightnessOfRGB(rgbIntArray) {
  // Get the highest and lowest out of red green and blue
  const highest = Math.max(...rgbIntArray);
  const lowest = Math.min(...rgbIntArray);

  // Return the average divided by 255
  return (highest + lowest) / 2 / 255;
}
