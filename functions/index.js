(async function () {
  const functions = require('firebase-functions');
  const {discoverEndpoints} = require('cranny');

  const cors = require('cors')({
    origin: true
  });

  const environmentSetup = require('./environmentSetup');
  environmentSetup();

  const justRouteName = route => route.replace('/', '');

  const restEndpoints = discoverEndpoints(__dirname, 'rest');

  for (const endpoint of restEndpoints) {
    const funcName = justRouteName(endpoint.route);
    const func = endpoint.obj;
    exports[funcName] = functions.region('us-central1').https.onRequest(async (req, res) => {
      cors(req, res, async () => {
        await func(req, res);
      });
    });
  }
})();
