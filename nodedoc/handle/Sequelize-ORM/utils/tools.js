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
exports.sendResult = function (data) {
  return {
    code: 0,
    msg: "",
    data,
  };
};

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
