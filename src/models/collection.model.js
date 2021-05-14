const mongoose = require('mongoose');

const collecTionSchema = mongoose.Schema({
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
});

module.exports = mongoose.model('CollecTion', collecTionSchema);