module.exports = function (rgb, t) {
  const rgbIntArray = [rgb.r, rgb.g, rgb.b];

  const [lowest, middle, highest] = getLowestMiddleHighest(rgbIntArray);

  if (highest.val === 0) {
    return rgb;
  }

  const returnArray = [];

  returnArray[highest.index] = highest.val - (Math.min(highest.val, 255 * (1 - t)));
  const decreaseFraction = (highest.val - returnArray[highest.index]) / (highest.val);
  returnArray[middle.index] = middle.val - middle.val * decreaseFraction;
  returnArray[lowest.index] = lowest.val - lowest.val * decreaseFraction;

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
