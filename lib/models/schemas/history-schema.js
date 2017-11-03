'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const daySchema = new Schema({
    maxtemp_c: Number,
    mintemp_c: Number,
    condition: {
      text: String
    }
});

const hourSchema = new Schema({
    hour: Number,
    time: String,
    temp_c: Number,
    condition: {
      text: String
    }
});

const historySchema = new Schema({
    date: String,
    day: daySchema,
    hour: [hourSchema],
    name: String,
    region: String,
    country: String
}, {
    timestamps: true
});

hourSchema.pre('save', function(next) {
    let hour = this;
    hour.hour = parseInt(hour.time.substring(hour.time.length - 5, hour.time.length - 3));
    return next();
});

module.exports = historySchema;
