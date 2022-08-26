const net = require("net");

/**
 * 服务端创建连接服务
 */
const server = net.createServer((socket) => {
    //监听关闭客户端连接
    socket.on("end", () => {
        console.log("客户端关闭连接!");
    });
    //收到的数据是二进制流数据
    socket.on("data", (data) => {
        console.log("data: ", data.toString());
    });
    //向所有的客户端发送数据
    socket.write("hello, I am server!", () => {});
});

// 设置同时最大连接数
server.setMaxListeners = 99;

server.on("connection", () => {
    console.log("新的客户端已接入");
});

server.listen(4000, () => {
    console.log("server is listening 4000");
});
