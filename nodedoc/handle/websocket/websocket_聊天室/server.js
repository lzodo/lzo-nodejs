const ws = require("nodejs-websocket");

let count = 0;
//conn 当前用户
const server = ws.createServer((conn) => {
    /*
        type:0 用户进入、1 用户离开、2 正常消息
        msg:内容
        time：事件
    */
    console.log(`有新用户连接 当前人数:${++count}`);
    conn.userName = `用户${count}`;
    sendAll({
        type: 0,
        msg: `${conn.userName}进入了聊天室`,
        time: new Date().toLocaleTimeString(),
    });

    conn.on("text", (data) => {
        console.log("接收到信息");
        sendAll({
            type: 2,
            msg: data,
            time: new Date().toLocaleTimeString(),
        });
    });
    conn.on("close", (data) => {
        console.log("关闭连接");
        // count--;
        console.log(`有新用户连接 当前人数:${--count}`);
        sendAll({
            type: 1,
            msg: `${conn.userName}离开了聊天室`,
            time: new Date().toLocaleTimeString(),
        });
    });
    conn.on("error", (data) => {
        console.log("发生异常");
    });
});

//广播 给每个链接发送消息,群聊一个发消息,服务器主动发消息广播到所有人
function sendAll(msg) {
    server.connections.forEach((item, index) => {
        item.send(JSON.stringify(msg));
    });
}

server.listen(8080, () => {
    console.log("listen 8080");
});
