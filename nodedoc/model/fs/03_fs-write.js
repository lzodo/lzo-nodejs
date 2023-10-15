"use strict";
var fs = require("fs");
var path = require("path");

// 文件路径相对 process.cwd() 也就是打开这个项目的跟文件夹
var writeData = "写入一段类容2";

/**
 * flag:
 *  w 写入(写入时默认), fs.writeFile时，打开一个文件，且文件可以进行写入操作
 *  w+ 读写，打开一个文件，且文件可读可写
 *  r 读取(读取时默认)
 *  r+
 *  a 追加
 *  a+
 * encoding:编码 默认utf8
 */

// let file = "./nodedoc/model/testfiles/output1.txt"; // 相对执行文件的位置
let file = path.resolve(__dirname, "../testfiles/output4.txt"); // 不管从哪执行都会定位到 testfiles
fs.writeFile(file, writeData, { flag: "a" }, function (err) {
  console.log(err); //null
  if (err) {
    console.log(err);
  } else {
    console.log("ok.");
  }
});

//异步写入文件（多了Sync && 不支持回调）
var data = "Hello, Node.js";
fs.writeFileSync(file, data, { flag: "a" });
