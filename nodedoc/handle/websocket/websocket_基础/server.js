const WebSocket = require("ws");
const ws = new WebSocket.Server({ port: 8080 }, () => {
    console.log("socket start");
});

let clinets = [];
ws.on("connection", (clinet) => {
    clinets.push(clinet); //储存每个终端来的链接
    clinet.send("欢迎管理"); //数据传输字符串
    clinet.on("message", (msg) => {
        console.log("来自前端的数据:" + msg);
        sendAll();
    });
    clinet.on("close", (msg) => {
        console.log("前端主动断开链接");
    });
});

//广播 给每个链接发送消息,群聊一个发消息,服务器主动发消息广播到所有人
function sendAll() {
    clinets.forEach((item, index) => {
        item.send("前端发数据了");
    });
}
