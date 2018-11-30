var express = require('express');
var app = module.exports = express.Router();
var PV = require('../models/pv_device');

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