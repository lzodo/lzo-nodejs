const crypto = require("crypto");
// 对称加密算法：ase 128
// 1、准备一个固定的128位的秘钥
const secret = Buffer.from("2c6a07aa9c43abdc");
// const result = crypto.getCiphers();
// console.log(result); // 查看 crypto 提供的所有加密算法

// 2、准备一个随机向量，随机变化的iv，每次导出都不一样，内部方法使用的是相同的
const iv = crypto.randomBytes(16);

// 加密一个字符串
exports.encrypt = function (str) {
  // 创建一个加密函数
  const cry = crypto.createCipheriv("aes-128-cbc", secret, iv);
  // 通过加密函数加密数据(加密的数据，加密这个数据的类型，输出类型)
  let result = cry.update(str, "utf8", "hex");
  result += cry.final("hex");
  return result;
};

// 解密一个字符串
exports.decrypt = function (str) {
  const decry = crypto.createDecipheriv("aes-128-cbc", secret, iv);
  let result = decry.update(str, "hex", "utf8");
  result += decry.final("utf8");
  return result;
};
