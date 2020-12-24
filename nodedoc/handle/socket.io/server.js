//npm 安装 socket.io

const express = require("express");
const app = express();
const server = require("http").Server(app);
const ws = require("socket.io")(server); //与express服务结合

app.use(express.static(__dirname + "/client"));

//客户端链接
ws.on("connection", (clinet) => {
    clinet.emit("hehe", "欢迎管理");
});

server.listen(8081, "0.0.0.0"); //允许所有ip访问
