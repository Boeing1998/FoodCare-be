const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// require('dotenv').config();

const User = require("../models/user.model");

exports.user_signup = (req, res, next) => {
  User.find({ 
    $and: [
      { email: req.body.email },
      { email: { $ne: null } }
    ]
   })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          statuscode: 409,
          message: "Mail exists",
          error: '',
          data: '',
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: 'Bcrypt.hash at user.controllers.js ' + err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email || "Error mail null" ,
              password: hash,
            });
            user
              .save()
              .then(result => {
                res.status(201).json({
                  statuscode: 201,
                  message: "Sign Up Success",
                  error: '',
                  data: '',
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  statuscode: 500,
                  message: "Sign Up failed",
                  error: err.errors.email.name,
                  data: '',
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  User.find({
    $and: [
      { email: req.body.email },
      { email: { $ne: null } }
    ]
  })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          statuscode: 401,
          message: "Email or Password is not exits",
          error: '',
          data: '',
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            statuscode: 401,
            message: "Email or Password is not exits",
            error: err,
            data: ''
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "20h"
            }
          );
          return res.status(200).json({
            statuscode: 200,
            message: "Login successfully",
            error: '',
            data: {
              token: token
            }

          });
        } else {
          return res.status(401).json({
            statuscode: 401,
            message: "Email or Password is not exits",
            error: '',
            data: ''
          });
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        statuscode: 500,
        message: "Error at user.controllers.js",
        error: err,
        data: ''
      });
    });
};

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        statuscode: 200,
        message: "User deleted",
        error: '',
        data: ''
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        statuscode: 500,
        message: "Can't find this Email",
        error: err,
        data: ''
      });
    });
};
