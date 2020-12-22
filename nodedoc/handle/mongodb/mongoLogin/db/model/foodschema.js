var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var foodSchema = new Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    desc: { type: String, required: true },
    typename: { type: String, required: true },
    typeid: { type: Number, default: 1 },
    img: { type: String },
});

//将schema对象转化为数据模型
var Food = mongoose.model("food", foodSchema);

module.exports = Food;
