const Token = require('../models/token.model')

exports.addToken = async (param) => {
    try {
        var a = { token: param }
        const tokens = new Token(a)
        await tokens.save()
    } catch (e) {
        throw 'Error while Add Token'
    }
}

exports.deleteToken = async (param) => {
    try {
        var a = { token: param }
        const tokens = Token.findOneAndRemove({ token: param})
        await tokens.exec()
    } catch (e) {
        throw Error('Error while Delete Token')
    }
}