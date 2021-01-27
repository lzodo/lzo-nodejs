const { createWriteStream } = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");

module.exports = async (src, dir) => {
    if (/.(jpg|png|gif)$/.test(src)) {
        await urlToImg(src, dir);
    } else {
        //base64图片
        await base64ToImg(src, dir);
    }
};

const urlToImg = async (url, dir) => {
    let mod = /^https:/.test(url) ? https : http; //用https获取https开头的资源
    //设置名称
    let ext = path.extname(url);
    let file = path.join(dir, `${Date.now()}${ext}`);
    console.log(file);

    mod.get(url, (res) => {
        res.pipe(createWriteStream(file)).on("finish", () => {
            console.log("写入成功");
        });
    });
};
const base64ToImg = async (url, dir) => {
    //data:image/jpeg;base64,/资源内容
};
