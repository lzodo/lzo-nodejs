const { static } = require("express");
const express = require("express");
const path = require("path");

const app = express();

//静态目录 设置
app.use(express.static(path.join(__dirname, "./public")));

//art-tetemplate 设置
app.engine("art", require("express-art-template"));
// app.set("view", {
//     debug: process.env.NODE_ENV !== "production",
// });
app.set("views", path.join(__dirname, "view"));
app.set("view", "art");

//路由 设置
let userRouter = require("./router/user");
app.use("/user", userRouter); // R: /user

//开启服务
app.listen(3002, () => {
    console.log("服务开启成功，请通过: http://localhost:3002/ 进行访问");
});
