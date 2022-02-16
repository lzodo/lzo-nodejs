const express = require("express");
const path = require("path");
const app = express();

//app.use(express.static(设置目录));  //绝对路径
// console.log(path.join(__dirname, "./wwwstatic"));
//app.use(express.static(path.join(__dirname, "./wwwstatic")));
app.use("/public", express.static(path.join(__dirname, "./wwwstatic")));

//测试 如果wwwstatic的文件通过/public/文件名 不填路径默认根路径直接访问就成功了

app.listen(3004, () => {
    console.log("服务开启成功，请通过: http://localhost:3004/ 进行访问");
});
