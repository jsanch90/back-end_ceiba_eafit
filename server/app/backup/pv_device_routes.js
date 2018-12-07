var express = require('express');
var app = module.exports = express.Router();
var PV = require('../models/pv_device');

//Save a record (a new one) in the DB
app.post('/pv_device', function (req, res) {
    if (req.body.T == ' ' || req.body.T == null ||
        req.body.P == ' ' || req.body.P == null ||
        req.body.H == ' ' || req.body.H == null ||
        req.body.L == ' ' || req.body.L == null ||
        req.body.C1 == ' ' || req.body.C1 == null ||
        req.body.V1 == ' ' || req.body.V1 == null ||
        req.body.C2 == ' ' || req.body.C2 == null ||
        req.body.V2 == ' ' || req.body.V2 == null) {
        return res.status(400).send({
            "success": false,
            "msg": "Error, all fields must be filled"
        });
    }

    var newPV_device = new PV({
        P: req.body.P,
        H: req.body.H,
        T: req.body.T,
        L: req.body.L,
        C1: req.body.C1,
        V1: req.body.V1,
        C2: req.body.C2,
        V2: req.body.V2
    });

    newPV_device.save(function (err) {
        if (err) {
            console.log("Some error", err);
            return res.json({
                "success": false,
                "msg": "Error",
                "error": err
            });
        }
        res.status(201).send({ "success": true, "msg": "Record saved" });
    });

});

//Get all records of the DB
app.get('/pv_device_records', function (req, res) {
    PV.find({}, function (err, records) {
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

//Add new records to database, could be one or many fields
app.put('/pv_device_add_records', function (req, res) {
    PV.updateOne({}, {
        $addToSet: {
            P: req.body.P,
            T: req.body.T,
            L: req.body.L,
            H: req.body.H,
            C1: req.body.C1,
            V1: req.body.V1,
            C2: req.body.C2,
            V2: req.body.V2
        }
    }, function (err, records) {
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

//Get all records from a specific sensor
app.get('/get_sensor_data', function (req, res) {
    var sensor = req.body.sensor;
    switch (sensor) {
        case "T":
            PV.find({}, { T: 1 }, function (err, records) {
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
            break;
        case "L":
            PV.find({}, { L: 1 }, function (err, records) {
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
            break;
        case "P":
            PV.find({}, { P: 1 }, function (err, records) {
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
            break;
        case "C1":
            PV.find({}, { C1: 1 }, function (err, records) {
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
            break;
        case "V1":
            PV.find({}, { V1: 1 }, function (err, records) {
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
            break;
        case "C2":
            PV.find({}, { C2: 1 }, function (err, records) {
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
            break;
        case "V2":
            PV.find({}, { V2: 1 }, function (err, records) {
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
            break;
        default:
            return res.json({
                "success": false,
                "msg": "Error while retrieving the data, field " + "\"" + req.body.sensor + "\"" + " doesn't exist"
            });
            break;
    }
});

//Get the records in different ways:
//- In a range if lowerLimit and upperLimit fields are setted in the json request body
//- Greater or equal to the lowerLimit field if the upperLimit field is null in the json request body
//- Lower or equal to the upperLimit field if the lowerLimit field is null in the json requestbody
//- Just in the given date if date field is setted in the json request body
app.get('/get_sensor_data_by_date', function (req, res) {
    var sensor = req.body.sensor;
    switch (sensor) {
        case "T":
            PV.find({}, { T: 1 }, function (err, records) {
                console.log(records[0].T[1].date_time, "------------------------------");
                var date1 = new Date(records[0].T[1].date_time);
                var date2 = new Date(records[0].T[0].date_time);
                console.log(date2 > date1);
                records[0].T.forEach(element => {
                    if (element != null) {
                        var eDate = new Date(element.date_time);
                        console.log(eDate);
                    }
                });
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
            break;
        case "L":
            PV.find({}, { L: 1 }, function (err, records) {
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
            break;
        case "P":
            PV.find({}, { P: 1 }, function (err, records) {
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
            break;
        case "C1":
            PV.find({}, { C1: 1 }, function (err, records) {
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
            break;
        case "V1":
            PV.find({}, { V1: 1 }, function (err, records) {
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
            break;
        case "C2":
            PV.find({}, { C2: 1 }, function (err, records) {
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
            break;
        case "V2":
            PV.find({}, { V2: 1 }, function (err, records) {
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
            break;
        default:
            return res.json({
                "success": false,
                "msg": "Error while retrieving the data, field " + "\"" + req.body.sensor + "\"" + " doesn't exist"
            });
            break;
    }
});