const { sendErrResult } = require("../utils/tools");

module.exports = function (err, req, res, next) {
  // 四个参数就认为是4个中间件
  console.log("进入了错误中间件");
  if (err) {
    const errObj = {
      code: 500,
      msg: err instanceof Error ? err.message : err,
    };
    //发生了错误
    res.status(500).send(sendErrResult(errObj, 401));
  } else {
    next();
  }
};
