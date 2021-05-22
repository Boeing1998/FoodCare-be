const { Schema, model } = require('mongoose');

const MenuSchema = new Schema({
    idUser: String,
    breakfast: {
        type: Array,
        default: []
    },
    lunch: {
        type: Array,
        default: []
    },
    dinner: {
        type: Array,
        default: []
    },
    dayMenu: Date
},
    {
        strict: false,
        timestamp: true
    }
)

module.exports = model('Menu', MenuSchema);