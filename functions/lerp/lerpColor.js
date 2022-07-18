module.exports = function (a, b, t) {
  const ar = (a & 0xFF0000) >> 16,
    ag = (a & 0x00FF00) >> 8,
    ab = (a & 0x0000FF),

    br = (b & 0xFF0000) >> 16,
    bg = (b & 0x00FF00) >> 8,
    bb = (b & 0x0000FF),

    rr = ar + t * (br - ar),
    rg = ag + t * (bg - ag),
    rb = ab + t * (bb - ab);

  return (rr << 16) + (rg << 8) + (rb | 0);
};
