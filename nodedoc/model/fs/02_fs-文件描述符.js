const fs = require("fs")
const path = require("path")

const filepath = path.resolve(__dirname,"../testfiles/test.txt");

// 获取文件描述符
fs.open(filepath,(err,fd)=>{
    if(err){
        console.log("err")
        return;
    }
    console.log(fd) //得到一个数字

    //通过文件描述符获取文件信息,不需要文件名了
    fs.fstat(fd,(err,info)=>{
        console.log(info)
    })
})