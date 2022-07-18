module.exports = function (colorNum) {
  const r = (colorNum >> 16) & 0xFF;
  const g = (colorNum >> 8) & 0xFF;
  const b = colorNum & 255;

  return {
    r: r,
    g: g,
    b: b
  };
};
