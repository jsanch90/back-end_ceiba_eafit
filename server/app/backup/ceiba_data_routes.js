var express = require('express');
var app = module.exports = express.Router();
var Ceiba = require('../models/ceiba_data');

//Save a record (a new one) in the DB
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

//Get all records of the DB
app.get('/ceiba_data_records', function (req, res) {
    Ceiba.find({}, function (err, records) {
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