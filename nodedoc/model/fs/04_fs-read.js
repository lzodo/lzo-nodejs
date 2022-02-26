"use strict";
var fs = require("fs");

// 文件路径相对 process.cwd() 也就是打开这个项目的跟文件夹

//异步读取文件
// 编码也可以 {encoding:"utf-8"} 或 直接写 "utf-8"
fs.readFile("./nodedoc/model/testfiles/text.txt", { encoding: "utf-8" }, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        // String -> Buffer
        var buf = Buffer.from(data, "utf-8");
        console.log(buf);
        console.log("===============================================");
    }
});

//异步以二进制形式读取文件
//异步意思整个程序运行完了才开始读取text文件的过程，读取完成再去执行后面的回调
fs.readFile("./nodedoc/model/testfiles/text.txt", function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        // Buffer -> String
        var text = data.toString("utf-8");
        console.log(text);
        console.log("===============================================");
    }
});

//同步读取文件（多了Sync && 不支持回调）
try {
    var syncdata = fs.readFileSync("./nodedoc/model/testfiles/text.txt", "utf-8");
    console.log("======下面一行是同步读取到的文件内容=========");
    console.log(syncdata);
} catch (err) {
    // 出错了
}

//同步读取文件详细信息  statSync 为同步获取
fs.stat("./nodedoc/model/testfiles/text.txt", function (err, stat) {
    if (err) {
        console.log(err);
    } else {
        // 是否是文件:
        console.log("isFile: " + stat.isFile());
        // 是否是目录:
        console.log("isDirectory: " + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            console.log("size: " + stat.size);
            // 创建时间, Date对象:
            console.log("birth time: " + stat.birthtime);
            // 修改时间, Date对象:
            console.log("modified time: " + stat.mtime);
        }
    }
});
