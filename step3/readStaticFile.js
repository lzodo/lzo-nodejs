const path = require("path");
const fs = require("fs");
const mime = require("mime"); //根据扩展名操作文件类型text/plain、application/json....

function myReadFile(filePathName, res) {
    let datas = "";

    datas = fs.readFileSync(filePathName);
    if (datas) {
        return datas;
    } else {
        res.end("err");
    }
}

module.exports.readStaticFile = (filePathName, res) => {
    let ext = path.extname(filePathName);
    let fileType = mime.getType(ext) || "text/html";
    let data = "";

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
        res.end("文件不存在");
    }

    return {
        data,
        fileType,
    };
};

//重写异步 async 版本
