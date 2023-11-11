// const http = require("http");
const http = require("https");
const fs = require("fs");
const cheerio = require("cheerio");

let url = "https://www.qunar.com";
// let url = "http://iot.huihezn.com/";
http
  .get(url, (res) => {
    // 安全判断
    const { statusCode } = res; //获取状态码
    const contentType = res.headers["content-type"]; //获取文件类型
    console.log(contentType);
    console.log(statusCode);

    let err = null;
    if (statusCode !== 200) {
      err = new Error("请求状态错误");
    } else if (!/^text\/html/.test(contentType)) {
      err = new Error("文件类型错误");
    }

    if (err) {
      res.resume(); //重置缓存
      throw err;
      return false;
    }

    // 数据处理
    let linkdata = "";
    res.on("data", (chunk) => {
      // 数据分段,只要接收数据就会触发data，chunk是每次接收数据的片段,数据流
      linkdata += chunk;
      console.log("接收数据");
    });

    //数据传输完毕
    res.on("end", (chunk) => {
      fs.writeFileSync(__dirname + "/bilibil.html", linkdata);
      console.log("接收数据结束");
      let $ = cheerio.load(linkdata); //将请求到的内容转换为类DOM
      $("img").each((index, item) => {
        console.log($(item).attr("src"));
      });
    });
  })
  .on("error", (err) => {
    console.log("请求错误");
  });
