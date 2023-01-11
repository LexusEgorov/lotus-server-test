const { default: mongoose } = require('mongoose');
const Schema = mongoose.Schema;

const lastUpdateSchema = new Schema({
  lastCall: Number,
  step: Number,
  timeLeft: Number,
});

const LastUpdate = mongoose.model('last-update', lastUpdateSchema);

module.exports = LastUpdate;
