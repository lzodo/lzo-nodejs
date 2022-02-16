const path = require("path");
const fs = require("fs");
const mime = require("mime"); //根据扩展名操作文件类型text/plain、application/json....

function myReadFile(filePathName, res) {
    return new Promise((resolve, reject)=>{
        fs.readFile(filePathName,(err,data)=>{
            if(!err){
                resolve(data);
            }else{
                reject(`文件${filePathName}读取出错....`)
                status = 404;
            }
        })
    })
}

module.exports.readStaticFile = async (filePathName, res) => {
    let ext = path.extname(filePathName);
    let fileType = mime.getType(ext) || "text/html";
    let data = "";
    let status = 200;

    //如果文件或文件夹存在
    if (fs.existsSync(filePathName)) {
        // if (fs.statSync(filePathName).isFile()) {
               // 直接使用then的话return要写到then里 很麻烦
        //     myReadFile(filePathName, res).then((res)=>{
        //         data = res;
        //         console.log(res);
        //     }).catch((err)=>{
        //         data = err;
        //     });
        // } else {
        //     myReadFile(path.join(filePathName, "/index1.html"), res).then((res)=>{
        //         data = res;
        //     }).catch(err=>{
        //         data = err;
        //     });
        // }
        if (fs.statSync(filePathName).isFile()) {
            data = await myReadFile(filePathName, res);
            
        } else {
            data = await myReadFile(path.join(filePathName, "/index.html"), res)
        }
    } else {
        data = `文件${filePathName}不存在`;
        status = 404;
        fileType = 'text/html'
    }

    return {
        data,
        fileType,
        status,
    };
};

//重写异步 async 版本
