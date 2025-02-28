/**
 * 保留对象的指定属性
 * @param {*} obj
 * @param  {...any} props
 * @returns
 */
exports.pick = function (obj, ...props) {
  if (!obj || typeof obj !== "object") {
    return obj;
  }
  const newObj = {};
  for (const key in obj) {
    if (props.includes(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

/**
 * @param {*} vis  validate.js 校验函数
 * @param {*} data  校验数据
 * @returns 是否验证失败
 */
exports.visHandler = function (vis, data) {
  let res = vis(data);
  if (res) {
    // 验证失败统一处理
    console.log("验证失败", res);
    return res;
  } else {
    console.log("通过验证");
  }
};

/**
 * 请求返回数据
 * @param {*} data
 * @returns
 */
function sendResult(data) {
  return {
    code: 0,
    msg: "success",
    data,
  };
}
exports.sendResult = sendResult;

/**
 * 请求异常返回数据
 * @param {*} msg
 * @param {*} errCode
 * @returns
 */
exports.sendErrResult = function (msg = "请求异常", errCode = 500) {
  try {
    let data = JSON.parse(msg);
    return {
      code: errCode,
      msg: data,
    };
  } catch (error) {
    return {
      code: errCode,
      msg: msg,
    };
  }
};

/**
 * 捕获异常通用封装，返回结果需要再次处理
 * @param {*} promise
 * @returns
 *
 * 使用：let [error, result] = await to(adminServ.findByPage(searchObj));
 */
exports.toh = function (promise) {
  return promise
    .then((data) => [null, data]) // 成功时返回 [null, 数据]
    .catch((error) => [error, undefined]); // 失败时返回 [错误, undefined]
};

/**
 * 捕获异常通用封装，返回结果不需要处理
 * @param {*} promise
 * @returns
 *
 * 使用：await to(adminServ.findByPage(searchObj),res,next);
 */
exports.to = function (promise, res, next) {
  return promise
    .then((data) => res.send(sendResult(data))) // 将数据格式化后返回客户端
    .catch((error) => next(error)); // 进入异常中间件进行处理
};
