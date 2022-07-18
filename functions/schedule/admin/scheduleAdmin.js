(async () => {
  const schedule = require("../schedule");
  try {
    await schedule();
  } catch (e) {
    console.error(e);
  }
})();
