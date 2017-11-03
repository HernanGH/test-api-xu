'use strict';
const request = require('request-promise');


const apiUxServices = {
    getInformationByNameCity: function (city, lang) {
        let cityParams = city || 'Buenos Aires';
        let langParams = lang || 'es';
        let params = 'key=' + process.env.TOKEN;
        params += '&q=' + cityParams;
        params += '&lang=' + langParams;
        return request.get({
           json: true,
           url:  process.env.API_UX_URL + '/current.json?' + params
        });
    },
    getTemperaturesByDate: function(date, city, lang) {
        let cityParams = city || 'Buenos Aires';
        let langParams = lang || 'es';
        let params = 'key=' + process.env.TOKEN;
        params += '&q=' + cityParams;
        params += '&lang=' + langParams;
        params += '&dt=' + date;
        return request.get({
           json: true,
           url:  process.env.API_UX_URL + '/history.json?' + params
        });
    }
}
module.exports = apiUxServices;
