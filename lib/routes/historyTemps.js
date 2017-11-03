'use strict';
const express = require('express');
const router = express.Router();
const ApiUx = require('../utils/apixuModule');
const History = require('../models/history');

function parseDate(date) {
    return date < 10 ? 0 + date.toString() : date;
}

function getTemperature(day) {
    return ApiUx.getTemperaturesByDate(day)
    .then((data) => {
        let newHistory = new History({
          date: data.forecast.forecastday[0].date,
          hour: data.forecast.forecastday[0].hour,
          day: data.forecast.forecastday[0].day,
          name: data.location.name,
          region: data.location.region,
          country: data.location.country
        });
        return newHistory.save();
    });
};

router.get('/historytemps', function(req, res) {
    let today = new Date();
    let todayAndYesterday = [];
    let dataTodayAndYesterday = [];
    todayAndYesterday.push();
    let todayParam = [today.getFullYear(), today.getMonth() + 1, parseDate(today.getDate())].join('-');
    let yesterdayParam = [today.getFullYear(), today.getMonth() + 1, parseDate(today.getDate() - 1)].join('-');
    todayAndYesterday.push([today.getFullYear(), today.getMonth() + 1, parseDate(today.getDate() - 1) ].join('-'));
    return History.find({date: todayParam}).then((dataHistory) => {
        if (dataHistory.length) {
            return dataHistory[0];
        }
        return getTemperature(todayParam);
    }).then((dataToday) => {
        dataTodayAndYesterday.push(dataToday);
        return History.find({date: yesterdayParam});
    }).then((yesterday) => {
        if (yesterday.length) {
            return yesterday[0];
        }
        return getTemperature(yesterdayParam);
    }).then((dataYesterday) => {
        dataTodayAndYesterday.push(dataYesterday);
        let todayhours = dataTodayAndYesterday[0].hour.filter((itemHour) => {
            return itemHour.hour < today.getHours();
        });
        let yesterdayhours = dataTodayAndYesterday[1].hour.filter((itemHour) => {
          return itemHour.hour >= today.getHours();
        });
        let hoursSorted = yesterdayhours.concat(todayhours).sort((item, next) => {
            return next.temp_c - item.temp_c;
        });
        let dataResp = {
            min: hoursSorted.pop(),
            max: hoursSorted.shift()
        }
        res.status(200).json({
          data: dataResp
        });
    })
    .catch((err) => {
        res.status(400).json({
          error: err
        });
    });
});

module.exports = router;
