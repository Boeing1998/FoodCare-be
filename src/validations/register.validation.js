const validator = require('validator');

module.exports = (req, res, next) => {
    try {
        const email = validator.isEmail(req.body.email)
        const password = validator.isStrongPassword(req.body.password, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })
        if (email && password) {
            next()
        } else {
            throw err
        }

    } catch (err) {
        return res.status(400).json({
            status: 400,
            message: "Email or Password is invalid",
            error: "validate error",
            data: '',
        })
    }

}

// const checkEmail = (req, res, next) => {
//     const email = req.body.email
//     validator.isEmail(email);
// }
// const checkPassword = (req, res, next) => {
//     const password = req.body.password
//     validator.isStrongPassword(password, {
//         minLength: 8, minLowercase: 1,
//         minUppercase: 1, minNumbers: 1, minSymbols: 1
//     })
// }

