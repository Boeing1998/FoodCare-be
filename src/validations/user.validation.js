const validator = require('validator');

module.exports = (req, res, next) => {
    try {
        const password = validator.isStrongPassword(req.body.newPassword, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })
        if (password) {
            next()
        } else {
            throw err
        }
    } catch (err) {
        return res.status(400).json({
            status: 400,
            message: "Password is invalid",
            error: "validate error",
            data: '',
        })
    }
}