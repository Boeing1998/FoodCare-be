const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

// require('dotenv').config();

const User = require("../models/user.model");

const FoodService = require('../services/food.services')
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
    let token1 = req.headers.authorization.split(" ")[1];
    let id1 = jwt_decode(token1);
    var userDetail = await UserService.getUserbyId(id1.userId)
    var currentYear = new Date().getFullYear()
    var year = userDetail.dob.split("-")
    // console.log(userDetail)
    let food = await FoodService.getManyFoods(userDetail.fav)


    return res.status(200).json({
      status: 200,
      message: "Successfully User Details Retrieved",
      error: '',
      data: {
        isBanned: userDetail.isBanned,
        _id: userDetail._id,
        email: userDetail.email,
        firstName: userDetail.firstName,
        lastName: userDetail.lastName,
        dob: userDetail.dob,
        age: currentYear - parseInt(year[0]),
        gender: userDetail.gender,
        targetU: userDetail.targetU,
        role:  userDetail.role,
        fav: food
      }

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
  const collecTion = userDetail.collecTion
  const fav = userDetail.fav
  const menu = userDetail.menu
  const role = userDetail.isBanned
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

exports.changePassword = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const id = jwt_decode(token);
  const userDetail = await UserService.getUserbyId(id.userId)

  const firstName = userDetail.firstName
  const lastName = userDetail.lastName
  const dob = userDetail.dob
  const gender = userDetail.gender
  const targetU = userDetail.targetU
  const customFood = userDetail.customFood
  const collecTion = userDetail.collecTion
  const fav = userDetail.fav
  const menu = userDetail.menu
  const isBanned = userDetail.isBanned

  bcrypt.compare(req.body.password, userDetail.password, (err, result) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        message: "Old password is incorrect",
        error: err,
        data: ''
      });
    }
    if (result) {
      bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: 'Bcrypt.hash at user.controllers.js ' + err
          });
        } else {
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
            password: hash
          };
          User.updateOne({ _id: id.userId }, { $set: updateOps })
            .exec()
            .then(result => {
              res.status(200).json({
                status: 200,
                message: "Change Password Success",
                error: '',
                data: '',
              });
            })
            .catch(err => {
              res.status(500).json({
                status: 500,
                message: "Database busy",
                error: 'err when update data in to database',
                data: '',
              });
            });
        }
      })
    } else {
      return res.status(401).json({
        status: 401,
        message: "Incorrect password",
        error: '',
        data: ''
      });
    }
  })


}

exports.addFavFood = async function (req, res, next) {
  const foodid = req.body.foodId;
  const token = req.headers.authorization.split(" ")[1];
  const id = jwt_decode(token);
  try {
      var foods = await UserService.addFav(id.userId,foodid)
      return res.status(200).json({
          status: 200,
          message: "Successfully Add Favorite",
          error: '',
          data: ""

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


exports.delFavFood = async function (req, res, next) {
  const foodid = req.body.foodId;
  const token = req.headers.authorization.split(" ")[1];
  const id = jwt_decode(token);
  try {
      var foods = await UserService.delFav(id.userId,foodid)
      return res.status(200).json({
          status: 200,
          message: "Successfully Remove Favorite",
          error: '',
          data: ""

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
