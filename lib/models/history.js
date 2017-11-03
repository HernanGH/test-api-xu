'use strict';
const mongoose = require('mongoose');
const HistorySchema = require('./schemas/history-schema');

module.exports = mongoose.model('History', HistorySchema);
