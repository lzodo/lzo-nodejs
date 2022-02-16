//生成一个随机串
var uuid = require("uuid");

console.log(uuid().replace(/\-/g, "")); //cd42c2b9d871468381ea93054e86fadb 得到这种格式的字符串
