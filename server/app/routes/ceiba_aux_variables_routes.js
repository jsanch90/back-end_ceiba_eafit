var express = require('express');
var app = module.exports = express.Router();
var Ceiba_aux = require('../models/ceiba_aux_variables');

//Save a record( can be many records) in the DB
app.post('/aux_vars', function (req, res) {
    Ceiba_aux.insertMany(req.body.data, function (err) {
        if (err) {
            return res.json({
                "success": false,
                "msg": "Error while saving the data, one of the variable name already exist, it must be unique",
                "error": err
            });
        }
        res.status(200).send({
            "success": true,
            "result": "records saved"
        });
    });
});

//Get the variable specified in the json request body, if the json request body is empty all records will be returned
app.get('/get_aux_vars', function (req, res) {
    if (req.body.variable != null) {
        Ceiba_aux.find({ variable: req.body.variable }, null, { sort: { date_time: -1 } }, function (err, records) {
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
    } else {
        Ceiba_aux.find({}, null, { sort: { date_time: -1 } }, function (err, records) {
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

//Update the "state" field of a variable
app.put('/aux_var_update_state', function (req, res) {
    Ceiba_aux.findOne({ variable: req.body.variable }).then(function (variable) {
        if (!variable) {
            res.send({
                "success": false,
                "msg": "Variable doesn't exist"
            });
        }
        else {
            if (req.body.state != null && req.body.f_name != '' && req.body.f_name != ' ') {
                variable.state = req.body.state;
            }

            variable.save((err, usr) => {
                if (err) {
                    res.status(500).send(err)
                }
                res.send({
                    "success": true,
                    "msg": "State updated"
                });
            });
        }
    });
});
