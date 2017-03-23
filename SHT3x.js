/*
 Copyright (c) 2017 Nicolas Jorand, nicolas.jorand.io

 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 "Software"), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/*========================================================================
 Module for SHT3x Humidity and Temperature Sensor IC.
 Wemos SHT30 shield (v1.0.0) tested on wemos D1 mini v2.1.0
 ========================================================================*/

const DEFAULT_ADDR = 0x45;
const I2C_CMD = [0x2c, 0x06];
const LATENCY = 500;

exports.connect = (i2c, addr) => {
    return new SHT3x(i2c, addr);
};

function SHT3x(i2c, addr) {
    this.i2c = i2c;
    this.addr = addr || DEFAULT_ADDR;
}

SHT3x.prototype.readTemperature = () => {
    let that = this; // Keep in the global scope otherwise not seen in the promise
    let cmd = () => {
        return new Promise((resolve, reject) => {
            resolve(that.i2c.writeTo(that.addr, I2C_CMD));
            });
        };

    let getTemp = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let rawData = that.i2c.readFrom(that.addr, 6);
                let t = ((((rawData[0] * 256.0) + rawData[1]) * 175) / 65535.0) - 45;
                resolve(t);
            }, LATENCY);
        });
    };
    return cmd().then(getTemp);
};

SHT3x.prototype.readHumidity = () => {
    let that = this; // Keep in the global scope otherwise not seen in the promise
    let cmd = () => {
        return new Promise((resolve, reject) => {
                resolve(that.i2c.writeTo(that.addr, I2C_CMD));
    });
    };

    let getHumidity = () => {
        return new Promise((resolve, reject) => {
                setTimeout(() => {
                    let rawData = that.i2c.readFrom(that.addr, 6);
                    let h = ((((rawData[3] * 256.0) + rawData[4]) * 100) / 65535.0);
                    resolve(h);
                }, LATENCY);
    });
    };
    return cmd().then(getHumidity);
};

SHT3x.prototype.readAll = () => {
    let that = this; // Keep in the global scope otherwise not seen in the promise
    let cmd = () => {
        return new Promise((resolve, reject) => {
                resolve(that.i2c.writeTo(that.addr, I2C_CMD));
    });
    };

    let getAll = () => {
        return new Promise((resolve, reject) => {
                setTimeout(() => {
                    let rawData = that.i2c.readFrom(that.addr, 6);
                    let h = ((((rawData[3] * 256.0) + rawData[4]) * 100) / 65535.0);
                    let t = ((((rawData[0] * 256.0) + rawData[1]) * 175) / 65535.0) - 45;
                    resolve({temperature:t, humidity:h});
                }, LATENCY);
    });
    };
    return cmd().then(getAll);
};
