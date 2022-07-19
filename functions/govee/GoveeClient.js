const config = require('./config.json');
const HttpsClient = require('https-client');

class GoveeClient extends HttpsClient {
  constructor() {
    super();

    this.HOST = 'developer-api.govee.com';

    this.DEVICES = '/v1/devices';
    this.CONTROL = '/v1/devices/control';

    this.GET = 'GET';
    this.PUT = 'PUT';

    this.HMAC = config.hmac;
    this.MODEL = config.model;
  }

  async getDevices() {
    return await this.call(this.GET, this.HOST, this.DEVICES, {}, this._createGoveeHeader());
  }

  async controlDevice(cmd) {
    const body = {
      device: this.HMAC,
      model: this.MODEL,
      cmd: cmd,
    };
    return await this.call(this.PUT, this.HOST, this.CONTROL, body, this._createGoveeHeader());
  }

  _createGoveeHeader() {
    return {
      'Govee-API-Key': config.key
    };
  }
}

module.exports = new GoveeClient();
