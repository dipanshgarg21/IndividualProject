const mongoose = require('mongoose');

const homeSecuritySchema = new mongoose.Schema({
  id:{
    type:Number,
    required: true
  },
  door1: {
    type: String,
    required: true
  },
  door2: {
    type: String,
    required: true
  },
  window1: {
    type: String,
    required: true
  }
});

const HomeSecurity = mongoose.model('securitySchema', homeSecuritySchema,'securityDevices');

module.exports = HomeSecurity;
