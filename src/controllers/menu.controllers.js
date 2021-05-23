const jwt_decode = require("jwt-decode");

const MenuService = require('../services/menu.services')
const FoodService = require('../services/food.services')

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
    const token = req.headers.authorization.split(" ")[1];
    const id = jwt_decode(token);

    const id_menu = req.body.menuId
    try {
        let menu = await MenuService.showMenu(id_menu,id.userId)
        const breakfast = await FoodService.getManyFoods(menu.breakfast)
        const lunch = await FoodService.getManyFoods(menu.lunch)
        const dinner = await FoodService.getManyFoods(menu.dinner)
        menu.breakfast = breakfast
        menu.lunch = lunch
        menu.dinner = dinner
        return res.status(200).json({
            status: 200,
            message: "Successfully Get menu",
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

exports.showAllMenuOfUser = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const id = jwt_decode(token);
    try {
        let menu = await MenuService.getMenuByIdUser(id.userId)
        let detail =  await MenuService.getDetailByArMenu(menu)
        return res.status(200).json({
            status: 200,
            message: "Successfully Get all menu of user",
            error: '',
            data: detail,
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

exports.deleteMenu = async function (req, res, next) {
    const id_menu = req.body.menuId
    try {
        await MenuService.deleteMenuById(id_menu)
        return res.status(200).json({
            status: 200,
            message: "Successfully Delete menu",
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

exports.addFoodBreakfast = async function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const id = jwt_decode(token);

    const menuId = req.body.menuId
    const foodId = req.body.foodId; // đây là _id của mongo
    try {
        await MenuService.add_food_morning(id.userId,menuId, foodId)
        return res.status(200).json({
            status: 200,
            message: "Successfully Add Breakfast Food into this Menu",
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

exports.addFoodLunch = async function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const id = jwt_decode(token);

    const menuId = req.body.menuId
    const foodId = req.body.foodId; // đây là _id của mongo
    try {
        await MenuService.add_food_noon(id.userId,menuId, foodId)
        return res.status(200).json({
            status: 200,
            message: "Successfully Add Lunch Food into this Menu",
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

exports.addFoodDinner = async function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const id = jwt_decode(token);

    const menuId = req.body.menuId
    const foodId = req.body.foodId; // đây là _id của mongo
    try {
        await MenuService.add_food_night(id.userId,menuId, foodId)
        return res.status(200).json({
            status: 200,
            message: "Successfully Add Dinner Food into this Menu",
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

exports.delFoodBreakfast = async function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const id = jwt_decode(token);

    const menuId = req.body.menuId
    const foodId = req.body.foodId; // đây là _id của mongo
    try {
        await MenuService.del_food_morning(id.userId,menuId, foodId)
        return res.status(200).json({
            status: 200,
            message: "Successfully delete Breakfast Food from this Menu",
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

exports.delFoodLunch = async function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const id = jwt_decode(token);

    const menuId = req.body.menuId
    const foodId = req.body.foodId; // đây là _id của mongo
    try {
        await MenuService.del_food_noon(id.userId,menuId, foodId)
        return res.status(200).json({
            status: 200,
            message: "Successfully delete Lunch Food from this Menu",
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

exports.delFoodDinner = async function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const id = jwt_decode(token);

    const menuId = req.body.menuId
    const foodId = req.body.foodId; // đây là _id của mongo
    try {
        await MenuService.del_food_night(id.userId,menuId, foodId)
        return res.status(200).json({
            status: 200,
            message: "Successfully delete Dinner Food from this Menu",
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

