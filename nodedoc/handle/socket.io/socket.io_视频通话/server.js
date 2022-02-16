var express = require("express");
var app = express();
var http = require("http").createServer(app);
var fs = require("fs");
let sslOptions = {
    key: fs.readFileSync("C:/privkey.key"), //里面的文件替换成你生成的私钥
    cert: fs.readFileSync("C:/cacert.pem"), //里面的文件替换成你生成的证书
};
const https = require("https").createServer(sslOptions, app);
var io = require("socket.io")(https);
var path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/camera.html");
});
app.get("/camera", (req, res) => {
    res.sendFile(__dirname + "/camera.html");
});
io.on("connection", (socket) => {
    //连接加入子房间
    socket.join(socket.id);
    console.log("auserconnected" + socket.id);
    socket.on("disconnect", () => {
        console.log("userdisconnected:" + socket.id); //某个用户断开连接的时候，我们需要告诉所有还在线的用户这个信息
        socket.broadcast.emit("userdisconnected", socket.id);
    });
    socket.on("chatmessage", (msg) => {
        console.log(socket.id + "say:" + msg);
        //io.emit("chatmessage",msg);
        socket.broadcast.emit("chatmessage", msg);
    });
    //当有新用户加入，打招呼时，需要转发消息到所有在线用户。
    socket.on("newusergreet", (data) => {
        console.log(data);
        console.log(socket.id + "greet" + data.msg);
        socket.broadcast.emit("needconnect", {
            sender: socket.id,
            msg: data.msg,
        });
    });
    //在线用户回应新用户消息的转发
    socket.on("okweconnect", (data) => {
        io.to(data.receiver).emit("okweconnect", { sender: data.sender });
    });
    //sdp消息的转发
    socket.on("sdp", (data) => {
        console.log("sdp");
        console.log(data.description);
        console.log("sdp:" + data.sender + "to:" + data.to);
        socket.to(data.to).emit("sdp", {
            description: data.description,
            sender: data.sender,
        });
    });
    //candidates消息的转发
    socket.on("icecandidates", (data) => {
        console.log("icecandidates:");
        console.log(data);
        socket.to(data.to).emit("icecandidates", {
            candidate: data.candidate,
            sender: data.sender,
        });
    });
});
https.listen(9998, () => {
    console.log("httpslisteningon*:9998");
});
