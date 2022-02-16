var mongoose = require("mongoose");
//链接数据库
//地址:mongodb://主机/数据库名
mongoose.connect("mongodb://localhost/test1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//数据库链接对象
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("链接成功");
});

//Mongoose 里，一切都始于Schema。
//创建一个和集合相关的schema对象(类似表头)
var Schema = mongoose.Schema;

var userSchema = new Schema({
    us: { type: String, required: true }, //标题:{类型:String,是否必须:true,默认:'123456'}
    ps: { type: String, required: true, default: "123456" },
    age: Number, //年龄:Number类型
});

//将schema对象转化为数据模型
var User = mongoose.model("user", userSchema);
var UserTest = mongoose.model("usertest", userSchema);
//该数据对象与集合相连('test1里的集合名',schema对象)
//数据库中的集合名会自动以复数形式表示

//操作数据库

//API文档 -> 模型(mongoose的增删改查) -> 插入方法 Model.insertMany()
User.insertMany({ us: "123", ps: "456", age: 12 })
    .then((data) => {
        console.log(data);
        console.log("插入成功");
    })
    .catch((err) => {
        console.log("插入失败：" + err);
    });

//查询
User.find({ age: 12 })
    .then((data) => {
        console.log(data);
        console.log("查询成功");
    })
    .catch((err) => {
        console.log("查询失败：" + err);
    });

//删除
User.remove({ age: 12 })
    .then((data) => {
        console.log(data);
        console.log("删除成功");
    })
    .catch((err) => {
        console.log("删除失败：" + err);
    });

// 修改
//Model.update('更新条件','更新内容',[options],[callback]);
User.update({ age: 20 }, { us: "new123" })
    .then((data) => {
        console.log(data);
        console.log("更新成功");
    })
    .catch((err) => {
        console.log("更新失败：" + err);
    });
