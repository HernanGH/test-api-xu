'use strict';
const express = require('express');
const router = express.Router();
const ApiUx = require('../utils/apixuModule');
router.get('/getCurrentTempBS', function(req, res) {
    ApiUx.getInformationByNameCity().then((data) => {
        console.log('[DATA]=>', data);
        res.json({
          title: 'get current temperature in buenos aires',
          data: data
        });
    }).catch((err) => {
        res.json({
          error: err
        });
    });
});

module.exports = router;
