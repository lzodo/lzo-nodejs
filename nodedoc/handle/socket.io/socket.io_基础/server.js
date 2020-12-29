var express = require("express");
var app = express();

var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3001;

app.use(express.static(__dirname + "/static"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

let connects = [];

io.on("connection", function (socket) {
    connects.push(socket);
    console.log(`有人连接,当前连接人数${connects.length}`);
    // console.log(connects);
    socket.on("chat message", function (msg) {
        io.emit("chat message", msg); //广播给所有链接用户
        socket.emit("chat message", msg); //发送给自己
    });
    socket.on("disconnect", (reason) => {
        connects.splice(connects.indexOf(socket), 1);
        console.log(`${reason} 连接断开了`);
    });
    socket.on("disconnecting", (reason) => {
        //socket正在断开
        console.log(socket.rooms); // Set { ... }
    });
});

http.listen(port, function () {
    console.log("listening on *:" + port);
});
