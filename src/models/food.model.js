const { Schema, model } = require('mongoose');
// const mongoosePaginate = require('mongoose-paginate-v2');

const FoodSchema = new Schema({
    id: Number,
    foodName: String,
    isVegetarian: Boolean,
    isVegan: Boolean,
    ingredients: [
        {
            id: Number,
            quantity: Number
        }
    ],
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
},
    {
        strict: false,
        timestamp: true
    }
)


// const Food = mongoose.model('Food', FoodSchema)
// module.exports = Food;
module.exports = model('Food', FoodSchema);