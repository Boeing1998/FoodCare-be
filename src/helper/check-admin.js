const jwt = require('jsonwebtoken');
const Token = require('../models/token.model')
const User = require('../models/user.model')
const jwt_decode = require("jwt-decode");
// require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        var tokens = await Token
            .findOne({ "token": token })
        if(tokens) {
            var isAdmin = await User
            .findOne({ _id: decoded.userId })
            if(isAdmin.role === "admin") {
                next();
            } else {
                return res.status(401).json({
                    status: 401,
                    message: 'Bạn không có quyền vào trang này',
                    error: "",
                    data: '',
                }); 
            }
        } else {
            return res.status(401).json({
                status: 401,
                message: 'Không có token trong db',
                error: "",
                data: '',
            });
        }
        
    } catch (error) {
        return res.status(401).json({
            status: 401,
            message: 'Lỗi Xác thực tại Check Auth',
            error: error.message,
            data: '',
        });
    }
};