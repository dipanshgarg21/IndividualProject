const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Device = require('./models/device');
const lightDevices = require('./models/lightDevices');
const acDevices = require('./models/acDevices');
const securityDevices = require('./models/securityDevices');
mongoose.connect('mongodb+srv://dipansh:qwerty99@mydb.chvnp5g.mongodb.net/mydb', {useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
});
const port = 5000;

/**
* @api {get} /api/devices Get Device
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*  [
*    {
*       "_id":	"6459375cdc5852aac04da533",
*       "name":	"device2",
*       "user":	"user2",
*       "room":	"livingRoom",
*       "category":	"airConditioning"
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/


app.get('/api/devices', (req, res) => {
  Device.find({}, (err, devices) => {
    if (err == true) {
      return res.send(err);
    } else {
      return res.send(devices);
    }
  });
});

/**
* @api {post} /api/devices Add Device
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*  [
*    {
*       "_id":	"6459375cdc5852aac04da533",
*       "name":	"device2",
*       "user":	"user2",
*       "room":	"livingRoom",
*       "category":	"airConditioning"
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.post('/api/devices', (req, res) => {
  const { name, user, room, category } = req.body;
  const newDevice = new Device({
    name,
    user,
    room,
    category
  });

  newDevice.save();
});

/**
* @api {delete} /api/devices Delete Device
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*  [
*    {
*       "_id":	"6459375cdc5852aac04da533",
*       "name":	"device2",
*       "user":	"user2",
*       "room":	"livingRoom",
*       "category":	"airConditioning"
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.delete('/api/devices', (req, res) => {
  const { name, user, room, category } = req.body;

  Device.findOneAndDelete({ name, user, room, category }, (err, deletedDevice) => {
    if (err) {
      return res.status(500).send(err);
    } else if (!deletedDevice) {
      return res.status(404).send('Device not found');
    } else {
      return res.send(deletedDevice);
    }
  });
});

/**
* @api {get} /api/lightDevices Get Light Device
* @apiGroup lightDevices
* @apiSuccessExample {json} Success-Response:
*  [
*    {
*      "_id":"645a09f241f5cd47de9a45bf",
*      "light":1,
*      "brightness":1,
*      "color":"#ffffff"
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

  app.get('/api/lightDevices', (req, res) => {
    lightDevices.find({})
        .then(light => res.send(light))
        .catch(err => res.send(err));
});

/**
* @api {get} /api/acDevices Get AC Device
* @apiGroup acDevices
* @apiSuccessExample {json} Success-Response:
* [
*   {
*     "_id":"645a0b3387a939ac846dedad",
*     "id":1,
*     "temperature":26,
*     "fanSpeed":2,
*     "mode":"cool"
*   }
* ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.get('/api/acDevices', (req, res) => {
    acDevices.find({})
        .then(light => res.send(light))
        .catch(err => res.send(err));
});

/**
* @api {get} /api/securityDevices Get Security Device
* @apiGroup securityDevices
* @apiSuccessExample {json} Success-Response:
* [
*   {
*    "_id":"645a0b6be3ffbe79a5a99867",
*    "id":1,
*    "temperature":26,
*     "door1":	"locked",
*     "door2":	"locked",
*     "window1":	"closed"
*   }
* ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.get('/api/securityDevices', (req, res) => {
    securityDevices.find({})
        .then(light => res.send(light))
        .catch(err => res.send(err));
});

/**
* @api {post} /api/lightDevices Add Light Device
* @apiGroup lightDevices
* @apiSuccessExample {json} Success-Response:
*  [
*    {
*      "_id":"645a09f241f5cd47de9a45bf",
*      "light":1,
*      "brightness":1,
*      "color":"#ffffff"
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.post('/api/lightDevices', async (req, res) => {
    const { light, brightness, color } = req.body;
    console.log(req.body);
    const check = { light: light };
    const update = { brightness: brightness, color: color };

    // const body = new lightDevices({
    //   light, brightness, color 
    // })
    try {;
      // body.save();
        const result = await lightDevices.findOneAndUpdate(check, update).exec();
        
    } catch (error) {
        console.log(error);
    }
});

/**
* @api {post} /api/acDevices Add AC Device
* @apiGroup acDevices
* @apiSuccessExample {json} Success-Response:
* [
*   {
*     "_id":"645a0b3387a939ac846dedad",
*     "id":1,
*     "temperature":26,
*     "fanSpeed":2,
*     "mode":"cool"
*   }
* ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.post('/api/acDevices', (req, res) => {
    const { id,temperature, fanSpeed, mode } = req.body;
    console.log(req.body);
    const checkac = { id: id };
    const updateac = {temperature:temperature, fanSpeed: fanSpeed, mode: mode
    };

    // const body = new acDevices({
    //   id,temperature, fanSpeed, mode
    // });

    try {
        // body.save();
        const result = acDevices.findOneAndUpdate(checkac, updateac).exec();
    } catch (error) {
        console.log(error);
    }
});

/**
* @api {post} /api/securityDevices Add Security Device
* @apiGroup securityDevices
* @apiSuccessExample {json} Success-Response:
* [
*   {
*    "_id":"645a0b6be3ffbe79a5a99867",
*    "id":1,
*    "temperature":26,
*     "door1":	"locked",
*     "door2":	"locked",
*     "window1":	"closed"
*   }
* ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.post('/api/securityDevices', (req, res) => {
    const {id, door1,door2,window1} = req.body;
    console.log(req.body);
    const check = { id: id };
    const update = {door1: door1, door2: door2, window1: window1};
    // const body = new securityDevices({
    //   id, door1,door2,window1
    // });

    try {
        // body.save();
        const result = securityDevices.findOneAndUpdate(check, update).exec();
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
