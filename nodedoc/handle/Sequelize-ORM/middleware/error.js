const { sendErrResult } = require("../utils/tools");

module.exports = function () {
  return function (err, req, res, next) {
    // 四个参数就认为是4个中间件
    console.log("进入了错误中间件");
    if (err) {
      res
        .status(200)
        .send(sendErrResult(err instanceof Error ? err.message : err, 401));
    } else {
      next();
    }
  };
};
