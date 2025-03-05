const { whiteList, secretKey } = require("../config");
const { decrypt } = require("../utils/crypt");
const { sendErrResult, sendResult } = require("../utils/tools");
const { pathToRegexp } = require("path-to-regexp");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

// cookie 鉴权
exports.authByCookie = function () {
  return function (req, res, next) {
    const isPass = whiteList.filter((item) => {
      // 生成正则表达式
      const reg = pathToRegexp(item.path); // PUT /api/admin/:id 这种不能全等判断，也是能进白名单的
      return item.method == req.method && reg.regexp.test(req.url);
    });

    // 如果当前请求存在白名单中
    if (isPass.length) {
      next();
      return;
    }

    // const token = req.signedCookies.token;
    const token = req.cookies.token;
    if (token) {
      req.userInfo = decrypt(token);
      // 判断有效性，再决定要不要next
      next();
    } else {
      res.send(sendErrResult("鉴权失败"));
    }
  };
};

// session 鉴权
exports.authBySession = function () {
  return function (req, res, next) {
    const isPass = whiteList.filter((item) => {
      const reg = pathToRegexp(item.path);
      return item.method == req.method && reg.regexp.test(req.url);
    });

    // 如果当前请求存在白名单中
    if (isPass.length) {
      next();
      return;
    }

    const userInfo = req.session.userInfo;
    req.userInfo = userInfo;

    if (userInfo) {
      next();
    } else {
      res.send(sendErrResult("鉴权失败"));
    }
  };
};

// jwt 鉴权
// session 鉴权
exports.authByJwt = function () {
  return function (req, res, next) {
    const isPass = whiteList.filter((item) => {
      const reg = pathToRegexp(item.path);
      console.log(reg);

      return item.method == req.method && reg.regexp.test(req.url);
    });

    // 如果当前请求存在白名单中
    if (isPass.length) {
      next();
      return;
    }

    // 只要有后缀名就不需要验证token;
    if (path.extname(req.originalUrl)) {
      next();
      return;
    }

    // 这边一般从header 的 authorization 取，需要前端手动设置，除了浏览器很多终端不支持cookie，先用cookie测试
    // console.log(req.headers.cookie);
    const token = req.cookies.token;
    // console.log(token);
    // verify a token symmetric

    try {
      // jwt.decode(token) 解码，不带校验功能
      const result = jwt.verify(token, secretKey, { algorithms: ["HS256"] });
      req.userInfo = result;
      next();
    } catch (error) {
      next(error + ": jwt 鉴权失败");
    }
  };
};

// 创建jwt
// const privateKey = fs.readFileSync(path.join(__dirname, "../keys/private.key"));
// const publicKey = fs.readFileSync(path.join(__dirname, "../keys/public.key"));
exports.createToken = function () {
  return (req, res, next) => {
    const data = req.userInfo || {};
    console.log("createToken");

    // jwt 签名
    jwt.sign(
      data,
      secretKey,
      { algorithm: "HS256", expiresIn: 60 * 60 * 1000 },
      function (err, token) {
        if (err) {
          next(err);
          return;
        }

        /**
         *  Authorization 头部字段支持多种授权方案，例如：
         *    Basic：用于基本认证（用户名和密码）。
         *    Bearer：用于持有者令牌（如 JWT）。
         *    Digest：用于摘要认证。
         */

        res.cookie("token", token);
        res.header("authorization", token);
        res.send(sendResult(token));
      }
    );
  };
};
