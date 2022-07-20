const config = require('./config.json');
const {get, put} = require('https-client');

class GoveeClient {
  constructor() {
    this.HOST = 'developer-api.govee.com';

    this.DEVICES = '/v1/devices';
    this.CONTROL = '/v1/devices/control';

    this.HMAC = config.hmac;
    this.MODEL = config.model;
    this.HEADER = {
      'Govee-API-Key': config.key
    };
  }

  async getDevices() {
    return get(this.DEVICES, this.HOST, {}, this.HEADER);
  }

  async controlDevice(cmd) {
    const body = {
      device: this.HMAC,
      model: this.MODEL,
      cmd: cmd,
    };
    return put(this.CONTROL, this.HOST, body, this.HEADER);
  }
}

module.exports = new GoveeClient();
