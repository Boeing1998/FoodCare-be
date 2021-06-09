const { Schema, model } = require('mongoose');

const collecTionSchema = new Schema({
    title: String,
    description: String,
    image: String,
    foods: {
        type: Array,
        default: []
    },
    quantity: {
        type: Number,
        default: 0
    },
    userId: String
},
{
    strict: false,
}
);

module.exports = model('CollecTion', collecTionSchema);