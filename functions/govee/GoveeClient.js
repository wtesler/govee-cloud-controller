const config = require('./config.json');

class ServerClient {
  constructor() {
    this.HOST = 'developer-api.govee.com';

    this.DEVICES = '/v1/devices';
    this.CONTROL = '/v1/devices/control';

    this.GET = 'GET';
    this.PUT = 'PUT';

    this.HMAC = config.hmac;
    this.MODEL = config.model;
  }

  async getDevices() {
    return await this._httpsAsync(this.GET, this.HOST, this.DEVICES, {}, this._createGoveeHeader());
  }

  async controlDevice(cmd) {
    const body = {
      device: this.HMAC,
      model: this.MODEL,
      cmd: cmd,
    };
    return await this._httpsAsync(this.PUT, this.HOST, this.CONTROL, body, this._createGoveeHeader());
  }

  _createGoveeHeader() {
    return {
      'Content-Type': 'application/json',
      'Govee-API-Key': config.key
    };
  }

  async _httpsAsync(type, host, path, body = {}, headers = {}) {
    const https = require('https');

    if (type === 'GET') {
      const keys = Object.keys(body);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (i === 0) {
          path += '?';
        }

        path += `${key}=${body[key]}`;

        if (i < keys.length - 1) {
          path += '&';
        }
      }
    } else if (type === 'POST' || type === 'PUT') {
      body = JSON.stringify(body);
      headers['Content-Length'] = body.length;
    }

    const options = {
      hostname: host,
      path: path,
      method: type,
      headers: headers,
    };

    return new Promise((resolve, reject) => {
      const data = [];

      const req = https.request(options, res => {
        let isError = false;
        if (res.statusCode !== 200) {
          isError = true;
        }

        res.on('data', chunk => data.push(chunk));
        res.on('error', e => reject(e));
        res.on('end', () => {
          try {
            const resStr = Buffer.concat(data).toString();
            if (isError) {
              reject(new Error(resStr));
            } else {
              const response = JSON.parse(resStr);
              resolve(response);
            }
          } catch (e) {
            reject(e);
          }
        });
      });

      if (type === 'POST' || type === 'PUT') {
        req.write(body);
      }

      req.end();
    });
  }
}

module.exports = new ServerClient();
