'use strict';
const express = require('express');
const router = express.Router();
const ApiUx = require('../utils/apixuModule');

router.get('/currenttemp', function(req, res) {
    ApiUx.getInformationByNameCity().then((data) => {
        let dataResp = {
          grados: data.current.temp_c,
          humedad: data.current.humidity,
          condicion: data.current.text
        };
        res.status(200).json(dataResp);
    }).catch((err) => {
        res.status(400).json({
          error: err
        });
    });
});

module.exports = router;
