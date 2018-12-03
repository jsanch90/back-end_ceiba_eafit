var express = require('express');
var app = module.exports = express.Router();
var PV = require('../models/pv_device');

//Save a record (a new one) in the DB
app.post('/pv_device',function(req, res){
    if (req.body.T == ' '|| req.body.T == null||
    req.body.P == ' '|| req.body.P == null||
    req.body.H == ' '|| req.body.H == null||
    req.body.C1 == ' '|| req.body.C1 == null||
    req.body.V1 == ' '|| req.body.V1 == null||
    req.body.C2 == ' '|| req.body.C2 == null||
    req.body.V2 == ' '|| req.body.V2 == null) {
        return res.status(400).send({
            "success": false,
            "msg": "Error, all fields must be filled"
        });
    }

    var newPV_device = new PV({
        P : req.body.P,
        H : req.body.H,
        T : req.body.T,
        C1 : req.body.C1,
        V1 : req.body.V1,
        C2 : req.body.C2,
        V2 : req.body.V2
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

app.put('/pv_device_add_records', function (req, res) {
    PV.updateOne({},{$addToSet : {P:req.body.P,
                               T:req.body.T,
                               H:req.body.H,
                               C1:req.body.C1,
                               V1:req.body.V1,
                               C2:req.body.C2,
                               V2:req.body.V2}},function (err, records) {
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

    // PV.find({}, function (err, records) {
    //     if (err) {
    //         return res.json({
    //             "success": false,
    //             "msg": "Error while retrieving the data",
    //             "error": err
    //         });
    //     }
        
    //     res.status(200).send({
    //         "success": true,
    //         "result": records
    //     });
    // });
});