const { Schema, model } = require('mongoose');
// const mongoosePaginate = require('mongoose-paginate-v2');

const FoodSchema = new Schema({
    food_name: String,
    custom : { 
        type : String,
        default: "false" // tạo api, truyền vào foodId chuyển thành true và ngược lại
    },
    request : {
        type : String,
        default: "false" // tạo api chuyển thành true và ngược lại
    },
    status : {
        type : String,
        default: "show" // tạo api chuyển thành hidden và ngược lại
    },
    userId : {
        type : String,
        default: "all"
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: null},
    deleted_at: {type: Date, default: null},
},
    {
        strict: false,
        timestamp: true
    }
)
FoodSchema.index({food_name: 'text'});

// const Food = mongoose.model('Food', FoodSchema)
// module.exports = Food;
module.exports = model('Food', FoodSchema);