const crypto = require("crypto");
const pwd = "12345";

let hash = crypto
    .createHash("sha1") //设置算法 sha1、md5....
    .update(pwd) //要加密的数据
    .digest("hex"); //设置进制展示方式

console.log(hash);
