"use strict";
var fs = require("fs");

// 文件路径相对 process.cwd() 也就是打开这个项目的跟文件夹
var writeData = "写入一段类容2";

//异步写入文件
//flag:默认w写入,a追加
//encoding:编码 默认utf8
fs.writeFile("./nodedoc/model/testfiles/output.txt", writeData, { flag: "w" }, function (err) {
    console.log(err); //null
    if (err) {
        console.log(err);
    } else {
        console.log("ok.");
    }
});

//异步写入文件（多了Sync && 不支持回调）
var data = "Hello, Node.js";
fs.writeFileSync("./nodedoc/model/output.txt", data);
