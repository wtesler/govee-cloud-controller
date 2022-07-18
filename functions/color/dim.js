module.exports = function(rgbObj, t) {
  for (const key of Object.keys(rgbObj)) {
    rgbObj[key] *= t;
  }
};
