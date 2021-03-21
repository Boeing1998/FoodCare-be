const mongoose = require('mongoose');

const nutrientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nameMaterial: String,    
    isVegetarian : Boolean,
    qtyCa: Number, // Quantity canxi
    qtyFe: Number, //sắt
    qtyZn: Number, //Kẽm
    qtyIot: Number, //I ốt
    qtyVita_A: Number, //Vitamin A
    qtyVita_D: Number, //Vitamin D
    qtyVita_B: Number, //Vitamin B
    qtyVita_C: Number, //Vitamin C
    qtyCalo: Number, //calories
    qtyLipid: Number, //Béo
    qtyPro: Number, //protein
})

module.exports = mongoose.model('Nutrient', nutrientSchema);