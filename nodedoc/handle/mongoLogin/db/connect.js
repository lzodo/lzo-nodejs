var mongoose = require("mongoose");
// var User = require("./model/userschema");

mongoose.connect("mongodb://localhost/test2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//数据库链接对象
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("数据库链接成功");
});

// module.exports = { User };
