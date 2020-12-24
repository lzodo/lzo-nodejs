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
let fileRouter = require("./router/fileRouter");
app.use("/user", userRouter);
app.use("/food", foodRouter);
app.use("/file", fileRouter);

app.listen(3002, () => {
    console.log(
        "mongoLogin server success to http://localhost:3002/"
    );
    global.thisServer = 'http://localhost:3002/'
});
