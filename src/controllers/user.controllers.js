const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
// require('dotenv').config();

const User = require("../models/user.model");

var TokenService = require('../services/token.services')
var UserService = require('../services/user.services')

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
          status: 409,
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
              email: req.body.email || "Error mail null",
              password: hash,
            });
            user
              .save()
              .then(result => {
                res.status(201).json({
                  status: 201,
                  message: "Sign Up Success",
                  error: '',
                  data: '',
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  status: 500,
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
          status: 401,
          message: "Email or Password is not exits",
          error: '',
          data: '',
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            status: 401,
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
              expiresIn: "168h"
            }
          );
          TokenService.addToken(token)
          return res.status(200).json({
            status: 200,
            message: "Login successfully",
            error: '',
            data: {
              token: token
            }

          });
        } else {
          return res.status(401).json({
            status: 401,
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
        status: 500,
        message: "Error at user.controllers.js",
        error: err,
        data: ''
      });
    });
};

exports.logout = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    TokenService.deleteToken(token)
    return res.status(200).json({
      status: 200,
      message: "Logout Success",
      error: '',
      data: '',

    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "Logout Failed",
      error: e.message,
      data: ''
    });
  }

}

exports.showDetail = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const id = jwt_decode(token);
    var userDetail = await UserService.getUserbyId(id.userId)
    return res.status(200).json({
      status: 200,
      message: "Successfully User Details Retrieved",
      error: '',
      data: userDetail

    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "",
      error: e.message,
      data: ''
    });
  }
};

exports.editUser = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const id = jwt_decode(token);
  const userDetail = await UserService.getUserbyId(id.userId)

  const firstName = req.body.firstName || userDetail.firstName
  const lastName = req.body.lastName || userDetail.lastName
  const dob = req.body.dob || userDetail.dob
  const gender = req.body.gender || userDetail.gender
  const targetU = req.body.targetU || userDetail.targetU
  const customFood = req.body.customFood || userDetail.customFood 
  const collecTion = req.body.collecTion || userDetail.collecTion 
  const fav = req.body.fav || userDetail.fav 
  const menu = req.body.menu || userDetail.menu 
  const isBanned = userDetail.isBanned

  const updateOps = {
    firstName: firstName,
    lastName: lastName,
    dob: dob,
    gender: gender,
    targetU: targetU,
    customFood: customFood,
    collecTion: collecTion,
    fav: fav,
    menu: menu,
    isBanned: isBanned,
  };
  // for (const ops of req.body) {
  //   updateOps[ops.propName] = ops.value;
  // }

  User.updateOne({ _id: id.userId }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        status: 200,
        message: "Edit User Success",
        error: '',
        data: '',
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}
//////////////////////////////////////
// exports.editUser = (req, res, next) => {
//   const token = req.headers.authorization.split(" ")[1];
//   const id = jwt_decode(token);
//   const updateOps = {};
//   for (const ops of req.body) {
//     updateOps[ops.propName] = ops.value;
//   }
//   User.updateOne({ _id: id.userId }, { $set: updateOps })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         status: 200,
//         message: "Edit User Success",
//         error: '',
//         data: '',
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// }
//////////////////////////////////////
exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        status: 200,
        message: "User deleted",
        error: '',
        data: ''
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        status: 500,
        message: "Can't find this Email",
        error: err,
        data: ''
      });
    });
};
