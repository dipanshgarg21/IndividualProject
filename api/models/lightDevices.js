const mongoose = require('mongoose');

const controlSchema = new mongoose.Schema({
  light: {
    type: Number
  },
  brightness: {
    type: Number
  },
  color: {
    type: String
  }
});

module.exports = mongoose.model('lightSchema', controlSchema,'lightDevices');
