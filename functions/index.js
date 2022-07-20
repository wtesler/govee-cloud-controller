(async function () {
  const functions = require('firebase-functions');
  const {discoverEndpoints, rest} = require('cranny');

  const cors = require('cors')({
    origin: true
  });

  const environmentSetup = require('./environmentSetup');
  environmentSetup();

  const restEndpoints = discoverEndpoints(__dirname, 'rest');

  for (const endpoint of restEndpoints) {
    const name = endpoint.name;
    const func = endpoint.obj;
    exports[name] = functions.region('us-central1').https.onRequest(async (req, res) => {
      cors(req, res, async () => {
        await rest(func(req, res));
      });
    });
  }
})();
