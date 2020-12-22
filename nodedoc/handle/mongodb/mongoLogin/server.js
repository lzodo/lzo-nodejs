const express = require("express");
const path = require("path");
const app = express();

app.use("/", express.static(path.join(__dirname, "./www")));
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let db = require("./db/connect");

let userRouter = require("./router/userRouter");
let foodRouter = require("./router/foodRouter");
app.use("/user", userRouter);
app.use("/food", foodRouter);

app.listen(3002, () => {
    console.log(
        "mongoLogin服务开启成功，请通过: http://localhost:3002/ 进行访问"
    );
});
