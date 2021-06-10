const mongoose = require("mongoose");
const jwt_decode = require("jwt-decode");

var FavoriteService = require('../services/favorite.services')
// const FoodService = require('../services/food.services')
const UserService = require('../services/user.services')

exports.createFav = async function (req, res, next) {
    try {
        let user_info = ""
        let user_diet = ""


        const foodId = req.params.id
        // const food = await FoodService.getFoods({_id : "60bef7c5f6e646513cd409da"})
        // let test = {...food[0]}
        // // await FoodService.editFoodByAdmin(foodId,{ num_ratings: food.num_ratings + 1})
        
        
        // console.log(food[0].description)

        const token = req.headers.authorization.split(" ")[1];
        const id = jwt_decode(token);
        
        const detailUser = await UserService.getUserbyId(id.userId)
        const uDiet = detailUser.diet
        const uProfile = detailUser.profile
        const uPlan = detailUser.plan
        user_diet = uPlan.diet.toString();
        delete uPlan.diet

        const diet = { ...uDiet, ...uPlan }
        let u_diet_S = ""
        for (const property in diet) {
            if (diet[property] == "false") {
                u_diet_S += "0"
            } else {
                u_diet_S += "1"
            }
        }
        user_diet += u_diet_S

        const currentYear = new Date().getFullYear()
        let age = currentYear - parseInt(uProfile.dob.split('-')[0])
        delete uProfile.dob
        if (age > 6 && age <= 11) {
            age = 0
        } else if (age > 11 && age <= 17) {
            age = 1
        } else if (age > 17 && age <= 23) {
            age = 2
        } else if (age > 23 && age <= 29) {
            age = 3
        } else if (age > 29 && age <= 35) {
            age = 4
        } else if (age > 35) {
            age = 5
        }
        uProfile.age = age
        for (const property in uProfile) {
            user_info += uProfile[property]
        }

        // console.log("user_info=" + user_info)
        // console.log("user_diet= " + user_diet)

        const value = {
            foodId: foodId,
            user_info: user_info,
            user_diet: user_diet,
        }

        const fav = await FavoriteService.findFav(value)
        if(!fav) {
            await FavoriteService.addFav(value)
            // console.log("Thêm mới ")
        } else {
            await FavoriteService.addQuantity(value, fav.quantity + 1)
            // console.log("cộng quantity ")
        }
        
        return res.status(200).json({
            status: 200,
            message: "Successfully Add Favorite",
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
