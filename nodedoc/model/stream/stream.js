/**
 * stream 流: 输入流（stdin） 输出流（stdout） ....
 * 程序中的流，比如从文件读取数据时，程序中的二进制(字节)会源源不断的被读取到我们的程序中
 * 这一连串的字节就是程序的流
 * 流是可读可写的，是连续字节的一种表现形式
 *
 * 直接readFile读取文件无法控制一些细节，太大的文件不合适一次性读取
 * 所有流都是具有 EveteEmitte 的
 *     Writable -> 可以写入数据的流
 *     Readable -> 可以读取数据的流
 *     Duplex -> 同时可读可写（如socket）
 *     Transfrom -> 读写时修改或转换数据流
 */

"use strict";

var fs = require("fs");

// 打开一个文件输出流:
var rs = fs.createReadStream("./nodedoc/model/testfiles/text.txt", "utf-8");

rs.on("data", function (chunk) {
  //读取每一个
  console.log("DATA:");
  // console.log(chunk);
});

rs.on("end", function () {
  //读取完成
  console.log("END");
});

rs.on("error", function (err) {
  console.log("ERROR: " + err);
});

// 限制读取
var rsonly = fs.createReadStream("./nodedoc/model/testfiles/text.txt", {
  start: 4,
  // end:8,
  highWaterMark: 2, //每次读几个字节
});

rsonly.on("data", function (chunk) {
  //读取每一个
  console.log("ONLYDATA:");
  console.log(chunk);

  rsonly.pause(); //暂停
  setTimeout(() => {
    rsonly.resume(); //一段时间后继续读取
  }, 5000);
});

rsonly.on("end", function () {
  //读取完成
  console.log("ONLYEND");
});

rsonly.on("error", function (err) {
  console.log("ERROR: " + err);
});

rsonly.on("open", () => {});
rsonly.on("close", () => {});
// ==================================================
// 创建输入流
var ws1 = fs.createWriteStream(
  "./nodedoc/model/testfiles/output1.txt",
  "utf-8"
);
ws1.write("使用Stream写入文本数据...\n");
ws1.write("END.");
ws1.end("last"); //表示最后的内容写进去后全部已经写完，直接关闭

// let acc = new Buffer('使用Stream写入二进制数据...\n');
const buf = Buffer.alloc(5, "a");
var ws2 = fs.createWriteStream("./nodedoc/model/testfiles/output2.txt");
ws2.write(buf);
ws2.end();

var ws3 = fs.createWriteStream("./nodedoc/model/testfiles/output3.txt", {
  flags: "a", //追加文件写入的是 flag
  start: 4,
});
ws3.write("123456789", (err) => {
  console.log("写入成功");
});
ws3.end();

//===============================================================

var rsping = fs.createReadStream("./nodedoc/model/testfiles/copied.txt");
var wsping = fs.createWriteStream("./nodedoc/model/testfiles/copied2.txt");

wsping.write("before rsping filee ha ha ha \n");

rsping.pipe(wsping); //将copied的流直接读取并写入copied2中
