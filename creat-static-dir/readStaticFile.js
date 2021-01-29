const path = require("path");
const fs = require("fs");
const mime = require("mime"); //根据扩展名操作文件类型text/plain、application/json....

function myReadFile(filePathName, res) {
    let datas = "";
    console.log(filePathName)
    try {
        datas = fs.readFileSync(filePathName);
    } catch (error) {
        datas = `文件${filePathName}不存在`; 
        status = 404;
    }

    return datas;

}

module.exports.readStaticFile = (filePathName, res) => {
    let ext = path.extname(filePathName);
    let fileType = mime.getType(ext) || "text/html";
    let data = "";
    let status = 200;

    //如果文件或文件夹存在
    if (fs.existsSync(filePathName)) {
        //如果是文件 或 如果 ext
        if (fs.statSync(filePathName).isFile()) {
            data = myReadFile(filePathName, res);
        } else {
            // fileType = mime.getType(".html");
            data = myReadFile(path.join(filePathName, "/index.html"), res);
        }
    } else {
        console.log(`文件${filePathName}不存在`);
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
