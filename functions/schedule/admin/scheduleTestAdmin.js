(async () => {
  const scheduleTest = require("../scheduleTest");
  try {
    await scheduleTest();
  } catch (e) {
    console.error(e);
  }
})();
