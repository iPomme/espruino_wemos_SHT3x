# SHT30

Module for SHT3x Humidity and Temperature Sensor IC.

Wemos SHT30 shield (v1.0.0) tested on wemos D1 mini v2.1.0

## How to use
Using the Espruino Web IDE you can either download the file and copy on your local `modules` folder
or require the file directly from this Github repository.

The probe instance is created using the `connect` method on the SHT3x object.

Notice that the I2C needs to be initialize before.

Sample code:

```
I2C1.setup({ scl : NodeMCU.D1, sda: NodeMCU.D2 });
var sht = require("SHT3x").connect(I2C1);
```

### Setting the I2C Address

```
I2C1.setup({ scl : NodeMCU.D1, sda: NodeMCU.D2 });
var sht = require("SHT3x").connect(I2C1, 0x40); // If 0x40 is set as target adress
```

## Full Example

```
I2C1.setup({ scl : NodeMCU.D1, sda: NodeMCU.D2 });
var sht = require("SHT3x").connect(I2C1);
sht.readAll().then( r => {
   console.log('Humidity:', r.humidity);
   console.log('Temperature:', r.temperature);
 }).catch( error => {
   console.log(error);
 });
```