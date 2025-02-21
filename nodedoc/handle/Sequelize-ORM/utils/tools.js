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
