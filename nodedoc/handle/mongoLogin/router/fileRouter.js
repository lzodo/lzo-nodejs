const express = require("express");
const router = express.Router(); //获取路由实例
var multer = require("multer");
var Food = require("../db/model/foodschema");

var storage = multer.diskStorage({
    //设置上传后的文件路径,uploads文件夹会自动创建
    destination: function (req, file, cb) {
        cb(null, "./www/image/uploads");
    },
    //设置文件名 或 添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = file.originalname.split(".");
        //给文件添加时间戳防止重名名
        //比如把abc.jpg图片切割成数组[abc,jpg],然后用数组长度-1来获取后缀名
        cb(null, file.fieldname + "." + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    },
});
var upload = multer({
    storage: storage,
});
//添加
router.post("/upload", upload.single("fileKey"), (req, res) => {
    //fileKey 上传文件的key值,接收form-data数据{fileKey:图片数据}
    console.log(req.file);
    let { size, mimetype, path, destination, filename } = req.file;
    let types = ["jpeg", "png", "jpg", "gif"]; //指定可以通过的类型
    let tmpType = mimetype.split("/")[1];
    destination = destination.split('./www')[1]

    if (size >= 5000000) {
        return res.send({ status: -1, message: "文件过大" });
    } else if (types.indexOf(tmpType) === -1) {
        return res.send({ status: -1, message: "类型错误" });
    } else {
        res.send({ status: 0, message: "上传成功", img: destination + "/" + filename });
    }
});
//前端图片上传
function upload() {
    let file = $("#file").get(0).files[0];
    let formdata = new FormData(); //创建空formdata对象
    formdata.append("fileKey", file); //upload.single对应
    //formdata直接当做请求体上传
}

module.exports = router;
