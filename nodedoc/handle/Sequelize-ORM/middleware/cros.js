const allowOrigins = ["http://127.0.0.1:5500"];

exports.crosVis = function (req, res, next) {
  // 处理预检请求
  if (req.method === "OPTIONS") {
    // 将预检请求发送的对应信息响应回去
    res.header(
      `Access-Control-Allow-Methods`,
      req.headers["access-control-request-method"]
    );
    res.header(
      `Access-Control-Allow-Headers`,
      req.headers["access-control-request-headers"]
    );
  }

  // 允许附带身份凭证的请求跨域（附带省份凭证的请求 access-control-allow-origin 不允许为 *）
  res.header("Access-Control-Allow-Credentials", true);

  // 简单请求跨域校验
  if (req.headers.origin && allowOrigins.includes(req.headers.origin)) {
    res.header("access-control-allow-origin", req.headers.origin);
  }
  next();
};
