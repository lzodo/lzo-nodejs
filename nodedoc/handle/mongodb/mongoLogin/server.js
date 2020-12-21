const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let userRouter = require("./router/userRouter");
let db = require("./db/connect");
app.use("/user", userRouter);

app.listen(3002, () => {
    console.log(
        "mongoLogin服务开启成功，请通过: http://localhost:3002/ 进行访问"
    );
});
