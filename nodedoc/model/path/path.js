const path = require("path");

console.log(path.extname("1.txt")); //获取扩展名
console.log(path.join(__dirname, "path.js")); //拼接得到绝对路径
