const path = require("path");

console.log(path.dirname("/path/1.txt")); //获取路径
console.log(path.basename("/path/1.txt")); //获取文件名
console.log(path.extname("/path/1.txt")); //获取扩展名
console.log(path.join(__dirname, "path.js")); //拼接得到绝对路径
console.log(path.join(__dirname, "../","add.js"));
console.log(path.resolve(__dirname, "../","add.js")); //路径拼接

let base = "../d/aaa/";
let after = "path.js"
console.log(path.join(base,after)); // 无脑拼接，只会将斜杠转成系统适合的斜杠,认识./../,如果../在base，会直接显示
console.log(path.resolve(base, after)); //判断拼接路径中是否有/开头的,如果有，只会取/后面的，如果没有，会自动添加运行指令所在路径再加上要拼的路径
                                                        //没/开头，并且../在base,得到运行指令所在路径上一级，加上base/after