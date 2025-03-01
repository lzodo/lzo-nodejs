const { whiteList } = require("../config");
const { decrypt } = require("../utils/crypt");
const { sendErrResult } = require("../utils/tools");
const { pathToRegexp } = require("path-to-regexp");

exports.authByCookie = function (req, res, next) {
  const isPass = whiteList.filter((item) => {
    // 生成正则表达式
    const reg = pathToRegexp(item.path); // PUT /api/admin/:id 这种不能全等判断，也是能进白名单的
    return item.method == req.method && reg.regexp.test(req.url);
  });

  // 如果当前请求存在白名单中
  if (isPass.length) {
    next();
  } else {
    // const token = req.signedCookies.token;
    const token = req.cookies.token;
    if (token) {
      req.userId = decrypt(token);
      // 判断有效性，再决定要不要next
      next();
    } else {
      res.send(sendErrResult("鉴权失败"));
    }
  }
};
