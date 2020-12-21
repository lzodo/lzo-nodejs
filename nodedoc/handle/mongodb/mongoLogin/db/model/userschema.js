var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    us: { type: String, required: true },
    ps: { type: String, required: true },
    age: { type: Number, default: 20 },
});

//将schema对象转化为数据模型
var User = mongoose.model("user", userSchema);

module.exports = User;
