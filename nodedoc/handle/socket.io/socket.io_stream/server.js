var express = require("express");
var app = express();

var port = process.env.PORT || 3001;
var ss = require("socket.io-stream");
var path = require("path");
var fs = require("fs");

var sslOptions = {
    key: fs.readFileSync("C:/privkey.key"),
    cert: fs.readFileSync("C:/cacert.pen"),
};
var http = require("https").Server(sslOptions, app);
var io = require("socket.io")(http);

app.use(express.static(__dirname + "/static"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/camera", function (req, res) {
    res.sendFile(__dirname + "/camera.html");
});

let connects = [];

io.on("connection", function (socket) {
    //链接加入子房间
    socket.join(socket.id);
    connects.push(socket);
    console.log(`有人连接,当前连接人数${connects.length}`);

    socket.on("chat message", function (msg) {
        io.emit("chat message", msg); //广播给所有链接用户
        socket.emit("chat message", msg); //发送给自己
    });
    // ss(socket).on("multiple-streams", function (stream, data) {
    //     console.log("==========================================");
    //     // var filename = path.basename(data.name);
    //     // stream.pipe(fs.createWriteStream(filename));
    //     console.log(stream);

    //     console.log("==========================================");
    //     //io.emit("streamuser", msg); //广播给所有链接用户
    // });

    //给发送者之外其他用户推送消息
    socket.on("new user greet", (data) => {
        console.log(`${socket.id} greet ${data.msg}`);
        socket.broadcast.emit("need connect", {
            sender: socket.id,
            msg: data.msg,
        });
    });
    //发送给谁
    socket.on("ok we connect", (data) => {
        console.log("ok we connect");
        io.to(data, receiver).emit("ok we connect", {
            sender: data.sender,
        });
    });

    //sdp candidate
    socket.on("sdp", (data) => {
        socket.to(data.to).emit("sdp", {
            description: data.description,
            sender: data.sender,
        });
    });
    socket.on("ice candidates", (data) => {
        socket.to(data.to).emit("ice candidates", {
            candidate: data.candidate,
            sender: data.sender,
        });
    });

    //socket有链接断开
    socket.on("disconnect", (reason) => {
        connects.splice(connects.indexOf(socket), 1);
        console.log(`${reason} 连接断开了`);
    });
    //socket有链接正在断开
    socket.on("disconnecting", (reason) => {
        console.log(socket.rooms); // Set { ... }
    });
});

http.listen(port, function () {
    console.log("listening on *:" + port);
});
