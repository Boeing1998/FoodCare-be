const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const nodemailer = require('nodemailer');
require('dotenv').config();


const option = {
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER, // email
    pass: process.env.MAIL_PASS // password
  }
};
var transporter = nodemailer.createTransport(option);

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
              username: req.body.email.split('@')[0]
            });
            user
              .save()
              .then(result => {
                transporter.verify(function (error, success) {
                  // Nếu có lỗi.
                  if (error) {
                    console.log(error);
                  } else { //Nếu thành công.
                    console.log('Kết nối thành công!');
                    var mail = {
                      from: process.env.MAIL_USER, // Địa chỉ email của người gửi
                      to: req.body.email, // Địa chỉ email của người gửi
                      subject: 'Xác Thực Tài Khoản Tại FoodCare', // Tiêu đề mail
                      text: `Bấm vào link này để kích hoạt tài khoản của bạn : http://localhost:3000/user/active/${result._id}`, // Nội dung mail dạng text
                    };
                    //Tiến hành gửi email
                    transporter.sendMail(mail, function (error, info) {
                      if (error) { // nếu có lỗi
                        console.log(error);
                      } else { //nếu thành công
                        console.log('Email sent: ' + info.response);
                      }
                    });
                  }
                });
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
  const userDetail = User.find({
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
      if (user[0].isBanned) {
        return res.status(401).json({
          status: 401,
          message: "Your account has been banned",
          error: '',
          data: ''
        });
      }
      if (!user[0].isActive) {
        transporter.verify(function (error, success) {
          // Nếu có lỗi.
          if (error) {
            console.log(error);
          } else { //Nếu thành công.
            console.log('Kết nối thành công!');
            var mail = {
              from: process.env.MAIL_USER, // Địa chỉ email của người gửi
              to: req.body.email, // Địa chỉ email của người gửi
              subject: 'Xác Thực Tài Khoản Tại FoodCare', // Tiêu đề mail
              text: `Bấm vào link này để kích hoạt tài khoản của bạn : http://localhost:3000/user/active/${user[0]._id}`, // Nội dung mail dạng text
            };
            //Tiến hành gửi email
            transporter.sendMail(mail, function (error, info) {
              if (error) { // nếu có lỗi
                console.log(error);
              } else { //nếu thành công
                console.log('Email sent: ' + info.response);
              }
            });
          }
        });
        return res.status(401).json({
          status: 401,
          message: "You must activate your account, please verify your email address",
          error: '',
          data: ''
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
              token: token,
              role: user[0].role,
              username: user[0].username,
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
    // var currentYear = new Date().getFullYear()
    // var year = userDetail.dob.split("-")
    // let food = await FoodService.getManyFoods(userDetail.fav)
    // userDetail.fav = food
    return res.status(200).json({
      status: 200,
      message: "Successfully User Details Retrieved",
      error: '',
      data: userDetail
      // {
      //   isBanned: userDetail.isBanned,
      //   _id: userDetail._id,
      //   isActive: userDetail.isActive,
      //   email: userDetail.email,
      //   profile: userDetail.profile,
      //   age:  currentYear - parseInt(userDetail.profile.dob.split("-")[0]),
      //   role: userDetail.role,
      //   fav: food
      // }

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

// exports.editUser = async (req, res, next) => {
//   const token = req.headers.authorization.split(" ")[1];
//   const id = jwt_decode(token);

//   const userDetail = await UserService.getUserbyId(id.userId)

//   const firstName = req.body.firstName || userDetail.firstName
//   const lastName = req.body.lastName || userDetail.lastName
//   const dob = req.body.dob || userDetail.dob
//   const gender = req.body.gender || userDetail.gender
//   const targetU = req.body.targetU || userDetail.targetU
//   const customFood = req.body.customFood || userDetail.customFood
//   const collecTion = userDetail.collecTion
//   const fav = userDetail.fav
//   const menu = userDetail.menu
//   const role = userDetail.isBanned
//   const isBanned = userDetail.isBanned

//   const updateOps = {
//     firstName: firstName,
//     lastName: lastName,
//     dob: dob,
//     gender: gender,
//     targetU: targetU,
//     customFood: customFood,
//     collecTion: collecTion,
//     fav: fav,
//     menu: menu,
//     isBanned: isBanned,
//   };

exports.editUser = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const id = jwt_decode(token);

  let value = { ...req.body }

  try {
    await UserService.editUser(id.userId, value)
    return res.status(200).json({
      status: 200,
      message: "Successfully Edit User",
      error: '',
      data: "",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "",
      error: e.message,
      data: ''
    });
  }
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
    var foods = await UserService.addFav(id.userId, foodid)
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
    var foods = await UserService.delFav(id.userId, foodid)
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

exports.activeUser = async function (req, res, next) {
  const id = req.params.id;
  const set = { isActive: true }
  try {
    await UserService.editUser(id, set)
    return res.status(200).json({
      status: 200,
      message: "Active User Successful",
      error: '',
      data: '',
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

exports.resetPass = function (req, res, next) {
  const id = req.params.id;
  bcrypt.hash("FoodCare@123", 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: 'Bcrypt.hash at user.controllers.js ' + err
      });
    } else {
      const set = { password: hash }
      try {
        console.log(set)
        await UserService.editUser(id, set)
        return res.status(200).json({
          status: 200,
          message: "Reset Password Successful",
          error: '',
          data: '',
        });
      } catch (e) {
        return res.status(400).json({
          status: 400,
          message: "",
          error: e.message,
          data: ''
        });
      }
    }
  });
};


exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.id })
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

exports.getAllUser = async function (req, res, next) {
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const valueOld = req.query
  const value = {}
  for (const property in valueOld) {
    if (valueOld[property] == "true") {
      value[property] = true
    } if (valueOld[property] == "false") {
      value[property] = false
    }
  }

  try {
    var user = await UserService.getUser(value, page, limit)
    return res.status(200).json({
      status: 200,
      message: "Successfully Users Retrieved",
      error: '',
      data: user

    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "",
      error: e.message,
      data: ''
    });
  }
}

exports.banUser = async (req, res, next) => {
  try {
    let value = {}
    const id = req.params.id
    const userDetail = await UserService.getUserbyId(id)
    if (userDetail.isBanned) {
      value = { isBanned: false }
    } else {
      value = { isBanned: true }
    }
    await UserService.editUser(id, value)
    return res.status(200).json({
      status: 200,
      message: "Successfully Edit User",
      error: '',
      data: "",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "",
      error: e.message,
      data: ''
    });
  }
}

exports.getFoodFav = async function (req, res, next) {
  try {
    let token1 = req.headers.authorization.split(" ")[1];
    let id1 = jwt_decode(token1);
    var userDetail = await UserService.getUserbyId(id1.userId)

    let food = await FoodService.getManyFoods(userDetail.fav)
    // userDetail.fav = food
    return res.status(200).json({
      status: 200,
      message: "Successfully User's Favorite Food Retrieved",
      error: '',
      data: food
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