// stream 流: 输入流（stdin） 输出流（stdout） ....

"use strict";

var fs = require("fs");

// 打开一个文件输出流:
var rs = fs.createReadStream("./nodedoc/model/text.txt", "utf-8");

rs.on("data", function (chunk) {
    //读取每一个
    console.log("DATA:");
    console.log(chunk);
});

rs.on("end", function () {
    //读取完成
    console.log("END");
});

rs.on("error", function (err) {
    console.log("ERROR: " + err);
});

// 创建输入流
var ws1 = fs.createWriteStream("./nodedoc/model/output1.txt", "utf-8");
ws1.write("使用Stream写入文本数据...\n");
ws1.write("END.");
ws1.end();

// let acc = new Buffer('使用Stream写入二进制数据...\n');
const buf = Buffer.alloc(5, "a");
var ws2 = fs.createWriteStream("output2.txt");
ws2.write(buf);
ws2.end();

var rsping = fs.createReadStream("./nodedoc/model/copied.txt");
var wsping = fs.createWriteStream("./nodedoc/model/copied.txt");

wsping.write("before rsping filee \n");

rsping.pipe(wsping);
