const extendServ = require("../services/extendService");
const { PassThrough } = require("stream");

class ExtendController {
  // 更新提示
  async prompt(req, res, next) {
    // 设置响应头
    res.setHeader("Content-Type", "text/event-stream"); // SSE 通信核心代码
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // const stream = new PassThrough();
    // res.send(stream);
    // stream.write(`event: res\n`); // 自定义客户端监听事件，可以定义多个，默认 message
    // stream.write(`data: ${res}\n\n`);
    // setInterval(async () => {
    //   const result = await extendServ.getPrompt();
    //   stream.write(`event: res\n`); // 自定义客户端监听事件，可以定义多个，默认 message
    //   stream.write(`data: ${result}\n\n`);
    // }, 3000);

    // 发送初始数据
    res.write("data: Connected\n\n");

    // 定时发送数据
    const interval = setInterval(async () => {
      const result = await extendServ.getPrompt();
      res.write(`data: ${JSON.stringify(result)}\n\n`); // 发送数据
    }, 4000);

    // 处理客户端断开连接
    req.on("close", () => {
      clearInterval(interval); // 清除定时器
      console.log("Client disconnected");
    });
  }
}

module.exports = new ExtendController();
