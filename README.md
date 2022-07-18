# Govee Cloud Controller

Firebase functions which control a Govee light from the cloud.

Currently a single cloud function `schedule` which lerps the
govee color and brightness between a few hours of the day.

## Environment

You are expected to add a `config.json` next to `GoveeClient.js` which 
contains `key`, `hmac`, and `device` fields.

You should replace the firebase project id in `firebase.json` and `environmentSetup`
with your own project id.


## Dependencies

Project uses `cranny` syntax where `.rest.js` files are exported as cloud functions.
