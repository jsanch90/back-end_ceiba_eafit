var express = require('express');
var app = module.exports = express.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

// With this route we can create an user in the data base.
app.post('/user', function (req, res) {
    if (req.body.userName == ' ' || req.body.userName == null ||
        req.body.password == ' ' || req.body.password == null ||
        req.body.f_name == ' ' || req.body.f_name == null ||
        req.body.l_name == ' ' || req.body.l_name == null ||
        req.body.type == ' ' || req.body.type == null) {
        return res.status(400).send({
            "success": false,
            "msg": "Error, all fields must be filled"
        });
    }

    var newUser = new User({
        userName: req.body.userName,
        password: req.body.password,
        type: req.body.type,
        f_name: req.body.f_name,
        l_name: req.body.l_name
    });

    //With this function we encrypt the password 
    bcrypt.hash(req.body.password, null, null, function (err, hash) {
        if (err) return next(err);
        newUser.password = hash;
        //next();
    });

    newUser.save(function (err) {
        if (err) {
            return res.json({
                "success": false,
                "msg": "Error",
                "error": err
            });
        }
        res.status(201).send({ "success": true, "msg": "user created" });
    });

});

//login : storing and comparing username and password
app.post('/user_login', function (req, res) {
    User.findOne({ userName: req.body.userName }).then(function (user) {
        if (!user) {
            res.send({
                "success": false,
                "msg": "User doesn't exist"
            });
        }
        else {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result == true) {
                    res.send({
                        "success": true,
                        "msg": "User logged"
                    });
                } else {
                    res.send({
                        "success": false,
                        "msg": "Incorrect password"
                    });
                }
            });
        }
    });
});

//With this route we can update the password, first name and last name from an user.
app.put('/user_update', function (req, res) {
    User.findOne({ userName: req.body.userName }).then(function (user) {
        if (!user) {
            res.send({
                "success": false,
                "msg": "User doesn't exist"
            });
        }
        else {
            if(req.body.password != null && req.body.password != '' && req.body.password != ' ' ){
                user.password 
                bcrypt.hash(req.body.password, null, null, function (err, hash) {
                    if (err) return next(err);
                    user.password = hash;
                });
            }

            if(req.body.f_name != null && req.body.f_name != '' && req.body.f_name != ' ' ){
                user.f_name = req.body.f_name;
            }


            if(req.body.l_name != null && req.body.l_name != '' && req.body.l_name != ' ' ){
                user.l_name = req.body.l_name;
            }

            user.save((err, usr) => {
                if (err) {
                    res.status(500).send(err)
                }
                res.send({
                    "success": true,
                    "msg": "User updated"
                });
            });
        }
    });
});

//Get user information searching by userName
app.post('/get_user', function (req, res) {
    User.findOne({ userName: req.body.userName }).then(function (user) {
        if (!user) {
            res.send({
                "success": false,
                "msg": "User not found"
            });
        }
        else {
           return  res.send({
            "success": true,
            "msg": user
        });
        }
    });
});

app.delete('/delete_user', function (req, res) {
    User.findOneAndRemove({ userName: req.body.userName }).then(function (user) {
        if (!user) {
            res.send({
                "success": false,
                "msg": "User not found"
            });
        }
        else {
           return  res.send({
            "success": true,
            "msg": "User deleted"
        });
        }
    });
});