require("./services/globalExtend");
require("./models/sync"); // 初始化模型
// require("./mock/init"); // 初始化模拟数据

const path = require("path");
const express = require("express");
const app = express(); //创建一个express应用

/**
 * 静态资源服务器
 *    通过 http://localhost:5008/images/t1.png 进行访问
 * 下面这段代码的作用：
 * 当请求时，会根据请求路径(req.path)，从指定的目录中寻找是否存在该文件，如果存在，直接响应文件内容，而不再移交给后续的中间件
 * 如果不存在文件，则直接移交给后续的中间件处理
 * 默认情况下，如果映射的结果是一个目录，则会自动使用index.html文件
 */
app.use(express.static(path.resolve(__dirname, "./public")));

// 消息体解析
app.use(
  // 解析请求 Content-Type 为 application/x-www-form-urlencoded 的请求体
  express.urlencoded({
    extended: true, // 内部使用新的库进行处理
  }),
  // 解析请求 Content-Type 为 application/json 的请求体
  express.json()
);

// api 的请求处理，【路由部分】
app.post("/api/showBody", (req, res) => {
  // 正常情况需要通过流的形式一点一点读取
  console.log(req.body);
  res.send(req.body);
});

// 错误同一处理
app.use((err, req, res, next) => {
  // 四个参数就认为是4个中间件
  console.log("handler3");
  if (err) {
    const errObj = {
      code: 500,
      msg: err instanceof Error ? err.message : err,
    };
    //发生了错误
    res.status(500).send(errObj);
  } else {
    next();
  }
});

// 监听一个服务
const port = 5008;
app.listen(port, () => {
  console.log(`server listen on ${port}`);
});
