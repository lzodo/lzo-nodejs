const Mock = require("mockjs");
const extendServ = require("../services/extendService");
// const { PassThrough } = require("stream");

class ExtendController {
  // 更新提示
  async prompt(req, res, next) {
    // 设置响应头
    res.setHeader("Content-Type", "text/event-stream"); // SSE 通信核心代码
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

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

  async jsonp(req, res, next) {
    const callback = req.query.callback || "callback";
    const data = Mock.mock({
      type: "jsonp 数据模拟",
      name: "@cname",
    });
    res.send(`${callback}(${JSON.stringify(data)})`);
  }
}

module.exports = new ExtendController();
