const fs = require("fs");
const path = require("path")
//每种操作node一般提供三种常用调用方式，同步、异步回调、异步promise

const filepath = path.resolve(__dirname,"../testfiles/test.txt");
// stat 读取文件信息
// 方式一:同步读取
const info = fs.statSync(filepath);
console.log("statSync会阻塞，后续代码需要它执行完成后才会执行")
console.log(info)

// 方式二:回调异步
fs.stat(filepath,(err,info)=>{
    if(err){
        console.log("执行错误")
        return;
    }
    console.log(info)
})

// 方式三：promise异步(开始支持不好，新版本基本都有了)
fs.promises.stat(filepath).then((info)=>{console.log(info)}).catch((err)=>{})
/**
 * node v10以上版本
 * const fsPromises = require("fs").promises;

(async () => {
    let result = await fsPromises.readFile(__dirname + "/fs.js");
    console.log(result.toString());
})();

 * node v13以上版本可以使用import导入模块了
 */

//-------------------------------------------------------------------------------------
// 内部完成，一般不需要用的,有通过文件名的代替方法
// 通过文件描述符
//fs.fstat(fd,(err,info)=>{}) //fd通过fs.open得到的文件描述符