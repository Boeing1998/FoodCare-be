const { Schema, model } = require('mongoose');

const favoriteSchema = new Schema({
    foodId: String,
    user_info: String,
    user_diet: String,
    quantity : { type: Number, default: 1 },
},
{
    strict: false,
}
);

module.exports = model('Favorite', favoriteSchema);