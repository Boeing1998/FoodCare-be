const mongoose = require('mongoose');

const FoodSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nameFood: String,    
    isVegetarian : Boolean,
    time: String,
    ingredients: {
        type: Number,
        quantity: Number,
    },
    sumCa: Number, //canxi
    sumFe: Number, //sắt
    sumZn: Number, //Kẽm
    sumIot: Number, //I ốt
    sumVita_A: Number, //Vitamin A
    sumVita_D: Number, //Vitamin D
    sumVita_B: Number, //Vitamin B
    sumVita_C: Number, //Vitamin C
    sumCalo: Number, //calories
    sumLipid: Number, //Béo
    sumPro: Number, //protein
    tags: Number,
})

const Food = mongoose.model('Food', FoodSchema)

module.exports = Food;