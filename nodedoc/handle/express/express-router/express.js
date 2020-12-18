const express = require("express");
const app = express();

let userRouter = require("./router/user");
app.use("/user", userRouter);
app.listen(3002, () => {
    console.log("服务开启成功，请通过: http://localhost:3002/ 进行访问");
});

//  http://localhost:3002/user/add 访问3002/user 里面的add
