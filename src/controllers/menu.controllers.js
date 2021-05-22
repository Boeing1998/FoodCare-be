const jwt_decode = require("jwt-decode");

const MenuService = require('../services/menu.services')

exports.createMenu = async function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const id = jwt_decode(token);

    try {
        let menu = await MenuService.newMenu(id.userId)
        return res.status(200).json({
            status: 200,
            message: "Successfully Create menu",
            error: '',
            data: menu,
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

exports.showDetailMenu = async function (req, res, next) {
    const id_menu = req.body.menuId
    try {
        let menu = await MenuService.showMenu(id_menu)
        return res.status(200).json({
            status: 200,
            message: "Successfully Create menu",
            error: '',
            data: menu,
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