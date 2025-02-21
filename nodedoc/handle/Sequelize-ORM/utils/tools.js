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
 * @returns 是否验证成功
 */
exports.visHandler = function (vis, data) {
  let res = vis(data);
  if (res) {
    // 验证失败统一处理
    console.log("验证失败", res);
  } else {
    console.log("通过验证");
    return true;
  }
};
