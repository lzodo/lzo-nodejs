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
var rs = fs.createReadStream("./temp/text.txt", "utf-8");

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

// 限制读取，返回 Readable 可读流、输出流
var rsonly = fs.createReadStream("./temp/text.txt", {
  // encoding:'utf-8',
  start: 4,
  // end:8,
  highWaterMark: 1, // 每次读1个字节，如果：encoding：utf-8 每次读取1个字符
  autoClose: true, // 读取完成自动关闭
});

// 文件读取
rsonly.on("data", function (chunk) {
  // 读取每一个，用一个，用完就扔，节约内存
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

// 读取错误触发
rsonly.on("error", function (err) {
  console.log("ERROR: " + err);
});

// 文件打开触发
rsonly.on("open", () => {});

// 文件关闭触发
rsonly.on("close", () => {});

// 读取暂停pause()触发
rsonly.on("pause", () => {
  console.log("暂停读取");
});

// 继续读取resume()触发
rsonly.on("resume", () => {
  console.log("继续读取");
});
// ==================================================
// 创建输入流
var ws1 = fs.createWriteStream("./temp/output1.txt", "utf-8");
ws1.write("使用Stream写入文本数据...\n");
ws1.write("END.");
ws1.end("last"); //表示最后的内容写进去后全部已经写完，直接关闭

// let acc = new Buffer('使用Stream写入二进制数据...\n');
const buf = Buffer.alloc(5, "a");
var ws2 = fs.createWriteStream("./temp/output2.txt");
ws2.write(buf);
ws2.end();

// 返回 Writable 可写流、输入流
var ws3 = fs.createWriteStream("./temp/output3.txt", {
  // encoding: "utf-8",
  flags: "a", //追加文件写入的是 flag
  start: 4,
  highWaterMark: 2, // 一次最多写入的字节数
});

//
const res = ws3.write("123456789", (err) => {
  console.log("写入成功");
});
// 后续不再写入了
ws3.end("最后写入的数据，可写可不写");

//===============================================================

var rsping = fs.createReadStream("./temp/copied.txt");
var wsping = fs.createWriteStream("./temp/copied2.txt");

wsping.write("先写一些内容 \n");

rsping.pipe(wsping); //将copied的流直接读取并写入copied2中
