var express = require('express');
var app = module.exports = express.Router();
var Ceiba = require('../models/ceiba_data');

//Save a record( can be many records) in the DB
app.post('/ceiba_data', function (req, res) {
    Ceiba.insertMany(req.body.data, function (err) {
        if (err) {
            return res.json({
                "success": false,
                "msg": "Error while saving the data",
                "error": err
            });
        }
        res.status(200).send({
            "success": true,
            "result": "records saved"
        });
    });
});

//Get all records of the DB
app.get('/ceiba_data_get_all', function (req, res) {
    Ceiba.find({}, null, { sort: { date_time: -1 } }, function (err, records) {
        if (err) {
            return res.json({
                "success": false,
                "msg": "Error while retrieving the data",
                "error": err
            });
        }
        res.status(200).send({
            "success": true,
            "result": records
        });
    });
});

//Get all records from a specific measuring device
app.post('/get_measuring_device_data', function (req, res) {
    Ceiba.find({ measure: req.body.device }, null, { sort: { date_time: -1 } }, function (err, records) {
        if (err) {
            return res.json({
                "success": false,
                "msg": "Error while retrieving the data",
                "error": err
            });
        }
        res.status(200).send({
            "success": true,
            "result": records
        });
    });
});

//Get the records by date in different ways:
//- In a range if lowerLimit and upperLimit fields are setted in the json request body
//- Greater or equal to the lowerLimit field if the upperLimit field is null in the json request body
//- Lower or equal to the upperLimit field if the lowerLimit field is null in the json requestbody
//- Just in the given date if date field is setted in the json request body
app.get('/ceiba_get_data_by_date', function (req, res) {

    if (req.body.upperLimit == null && req.body.lowerLimit == null && req.body.data == null) {
        return res.json({
            "success": false,
            "msg": "Error while retrieving the data, json request body is empty"
        });
    }

    else if (req.body.data != null) {
        console.log("From data");
        var data1 = req.body.data.toString() + "T00:00:00.000Z";
        var data2 = req.body.data.toString() + "T23:59:59.000Z";
        Ceiba.find({ date_time: { $gte: data1, $lte: data2 } }, null, { sort: { date_time: -1 } }, function (err, records) {
            if (err) {
                return res.json({
                    "success": false,
                    "msg": "Error while retrieving the data",
                    "error": err
                });
            }
            res.status(200).send({
                "success": true,
                "result": records
            });
        });
    }

    else if (req.body.lowerLimit != null && req.body.upperLimit != null) {
        console.log("From lower and upper");
        var lowerLimit2 = req.body.lowerLimit.toString() + "T00:00:00.000Z";
        var upperLimit2 = req.body.upperLimit.toString() + "T23:59:59.000Z";
        Ceiba.find({ date_time: { $gte: lowerLimit2, $lte: upperLimit2 } }, function (err, records) {
            if (err) {
                return res.json({
                    "success": false,
                    "msg": "Error while retrieving the data",
                    "error": err
                });
            }
            res.status(200).send({
                "success": true,
                "result": records
            });
        });
    }

    else if (req.body.lowerLimit != null && req.body.upperLimit == null) {
        console.log("From lower");
        var lowerLimit2 = req.body.lowerLimit.toString() + "T00:00:00.000Z";
        Ceiba.find({ date_time: { $gte: lowerLimit2 } }, null, { sort: { date_time: -1 } }, function (err, records) {
            if (err) {
                return res.json({
                    "success": false,
                    "msg": "Error while retrieving the data",
                    "error": err
                });
            }
            res.status(200).send({
                "success": true,
                "result": records
            });
        });
    }

    else if (req.body.lowerLimit == null && req.body.upperLimit != null) {
        console.log("From upper");
        var upperLimit2 = req.body.upperLimit.toString() + "T23:59:59.000Z";
        Ceiba.find({ date_time: { $lte: upperLimit2 } }, null, { sort: { date_time: -1 } }, function (err, records) {
            if (err) {
                return res.json({
                    "success": false,
                    "msg": "Error while retrieving the data",
                    "error": err
                });
            }
            res.status(200).send({
                "success": true,
                "result": records
            });
        });
    }
});

//Get the records by date and device type in different ways:
//- In a range if lowerLimit and upperLimit fields are setted in the json request body
//- Greater or equal to the lowerLimit field if the upperLimit field is null in the json request body
//- Lower or equal to the upperLimit field if the lowerLimit field is null in the json requestbody
//- Just in the given date if date field is setted in the json request body
app.get('/get_device_data_by_date', function (req, res) {

    if (req.body.upperLimit == null && req.body.lowerLimit == null && req.body.data == null) {
        return res.json({
            "success": false,
            "msg": "Error while retrieving the data, json request body is empty"
        });
    }

    else if (req.body.data != null && req.body.device != null) {
        var data1 = req.body.data.toString() + "T00:00:00.000Z";
        var data2 = req.body.data.toString() + "T23:59:59.000Z";
        Ceiba.find({ measure: req.body.device, date_time: { $gte: data1, $lte: data2 } }, null, { sort: { date_time: -1 } }, function (err, records) {
            if (err) {
                return res.json({
                    "success": false,
                    "msg": "Error while retrieving the data",
                    "error": err
                });
            }
            res.status(200).send({
                "success": true,
                "result": records
            });
        });
    }

    else if (req.body.lowerLimit != null && req.body.upperLimit != null && req.body.device != null) {
        var lowerLimit2 = req.body.lowerLimit.toString() + "T00:00:00.000Z";
        var upperLimit2 = req.body.upperLimit.toString() + "T23:59:59.000Z";
        Ceiba.find({ measure: req.body.device, date_time: { $gte: lowerLimit2, $lte: upperLimit2 } }, null, { sort: { date_time: -1 } }, function (err, records) {
            if (err) {
                return res.json({
                    "success": false,
                    "msg": "Error while retrieving the data",
                    "error": err
                });
            }
            res.status(200).send({
                "success": true,
                "result": records
            });
        });
    }

    else if (req.body.lowerLimit != null && req.body.upperLimit == null && req.body.device != null) {
        var lowerLimit2 = req.body.lowerLimit.toString() + "T00:00:00.000Z";
        Ceiba.find({ measure: req.body.device, date_time: { $gte: lowerLimit2 } }, null, { sort: { date_time: -1 } }, function (err, records) {
            if (err) {
                return res.json({
                    "success": false,
                    "msg": "Error while retrieving the data",
                    "error": err
                });
            }
            res.status(200).send({
                "success": true,
                "result": records
            });
        });
    }

    else if (req.body.lowerLimit == null && req.body.upperLimit != null && req.body.device != null) {
        var upperLimit2 = req.body.upperLimit.toString() + "T23:59:59.000Z";
        Ceiba.find({ measure: req.body.device, date_time: { $lte: upperLimit2 } }, null, { sort: { date_time: -1 } }, function (err, records) {
            if (err) {
                return res.json({
                    "success": false,
                    "msg": "Error while retrieving the data",
                    "error": err
                });
            }
            res.status(200).send({
                "success": true,
                "result": records
            });
        });
    }

    else {
        return res.json({
            "success": false,
            "msg": "Error while retrieving the data, missing fields in json request body"
        });
    }
});