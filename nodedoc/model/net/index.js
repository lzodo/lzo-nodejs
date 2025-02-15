const net = require("net");

// 创建一个链接，返回一个socket对象，http的底层原理，工作中不会直接用net的
const socket = net.createConnection(
  {
    host: "study.duyiedu.com",
    port: 80,
  },
  () => {
    console.log("连接成功");
  }
);

// 监听服务器返回的消息
socket.on("data", (chunk) => {
  console.log("来自服务器返回的消息：");
  console.log(chunk.toString("utf-8"));

  // 各种操作，判断数据接收完成后手动关闭socket
  socket.end();
});

/**
 * 向服务器发送消息
 * 最后的两个换行一定要有，代表请求体位空，否则服务器会一直等待
 * 返回的最原始的响应格式
 */
socket.write(`
GET /api/lyrics HTTP/1.1   
Host: study.duyiedu.com
Connection: keep-alive

`);
