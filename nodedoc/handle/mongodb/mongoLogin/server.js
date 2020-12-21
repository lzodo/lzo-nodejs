const express = require("express");
const app = express();

let userRouter = require("./router/userRouter");
let db = require("./db/connect");
app.use("/user", userRouter);

app.listen(3002, () => {
    console.log("mongoLogin服务开启成功，请通过: http://localhost:3002/ 进行访问");
});