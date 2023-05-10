const mongoose = require('mongoose');
const { Schema } = mongoose;

const thermostatSchema = new Schema({
  id:{
    type:Number,
    required: true
  },
  
temperature: {
    type: Number,
    required: true
  },
  fanSpeed: {
    type: Number,
    required: true
  },
  mode: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('acSchema', thermostatSchema,'acDevices');
