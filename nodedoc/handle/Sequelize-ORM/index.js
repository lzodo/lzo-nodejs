require("./services/globalExtend");
require("./models/sync"); // 初始化模型
// require("./mock/init"); // 初始化模拟数据

const path = require("path");
const express = require("express");
const app = express(); //创建一个express应用
const useRouter = require("./routes/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { RedisStore } = require("connect-redis");
const { authByCookie, authBySession, authByJwt } = require("./middleware/auth");
const { crosVis } = require("./middleware/cros");
const errHealder = require("./middleware/error");
const client = require("./redis");
const { secretKey } = require("./config");
client.select(2);

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

// 跨域处理
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = ["xxx"];
      if (!origin || !allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
// app.use(crosVis());

// ==================cookie========================

// 解析cookie，
// 加入之后会在res添加cookie方法用于设置cookie，res.cookie 的 max-age变成毫秒
// 通过 req.cookies 属性接收请求中的cookie
// 对称加密：可以选择输入一个秘钥，如果通过 res.cookie 添加cookie，可以通过属性signed:true 加密 cookie，通过req.signedCookies 接收
app.use(cookieParser(secretKey));
// 权限校验（cookie）
// app.use(authByCookie()); // 所有请求必须讲过 cookie 校验

// ==================cookie==end======================

// ==================session==========================
// session
// 服务端维护着session表，只将sessionId发到客户端，服务端不是直接使用sessionId，而是通过这个sessionId关联对应的用户信息
app.use(
  session({
    secret: secretKey,
    name: "sessionId",
    resave: true, // 强制保存到仓库
    saveUninitialized: false, // 没有用过的session要不要保存
    cookie: {
      // session 内部也是需要通过cookie实现的
      maxAge: 60 * 60 * 1000,
      base: "/",
      domain: "localhost",
    },
    // 如果不用仓库，存在内存，数据一会就丢失了
    store: new RedisStore({
      client: client,
      prefix: "sessionLogin:",
    }),
  })
);
// app.use(authBySession());

// ==================session==end======================

// ==================jwt==========================
// jwt
app.use(authByJwt());
// ==================jwt==end======================

// api 的请求处理【路由部分】
useRouter(app);

// 错误中间件同一处理
app.use(errHealder());

// 监听一个服务
const port = 5008;
app.listen(port, () => {
  console.log(`server listen on ${port}`);
});
