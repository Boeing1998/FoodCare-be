const jwt = require('jsonwebtoken');
const Token = require('../models/token.model')
// require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        var tokens = await Token
            .find({ "token": token })
        if(tokens[0]) {
            next();
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