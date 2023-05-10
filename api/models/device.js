const mongoose = require('mongoose');

module.exports = mongoose.model('Device', new mongoose.Schema({
    name: String,
    user: String,
    room: String,
    category: String
}, { collection : 'addedDevices' }));