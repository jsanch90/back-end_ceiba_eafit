var express = require('express');
var app = module.exports = express.Router();
var Ceiba = require('../models/ceiba_data');

app.post('/ceiba_data',function(req, res){
    if (req.body.measure == ' '|| req.body.measure == null) {
        return res.status(400).send({
            "success": false,
            "msg": "Error, all fields must be filled"
        });
    }

    var newCeiba_Data = new Ceiba({
        measure : req.body.measure,
    });

    newCeiba_Data.save(function (err) {
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