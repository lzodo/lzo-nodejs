const http = require("http");
const url = require("url");
const querystring = require("querystring");
const fs = require("fs");
const path = require("path");
const { readStaticFile } = require("./readStaticFile");

let server = http.createServer((req, res) => {
    //处理get数据
    let { pathname, query } = url.parse(req.url, true);
    let getFileUrl = path.join(__dirname, "../www", pathname);

    // console.log(pathname, query);
    // console.log(req.socket.remotePort); //NET 模块下 socket.remotePort 获取客户端的端口号

    //处理post数据
    /*
      一般大的数据包会分成很多小包进行处理
      当收到一个数据包会触发data事件
    */
    let str = "";
    req.on("data", (data) => {
        str += data;
    });

    res.setHeader("Content-Type", "text/plain;charset=utf-8"); //设置编码

    //接收结束了就会触发end事件
    req.on("end", () => {
        let post = querystring.parse(str);
        //操作数据
        switch (pathname) {
            case "/reg":
                res.write("reg");
                res.end();
                break; //注册
            case "/login":
                res.end("login");
                break; //登录
            default:
                //其他
                let { data, fileType,status } = readStaticFile(getFileUrl, res);
                console.log(data, fileType);
                if (fileType) {
                    res.writeHeader(status, {
                        "content-type": `${fileType};charset=UTF-8`,
                    });
                }
                res.write(data);
                res.end(); //告诉浏览器结束了 不然会一直转 尽量不要放在异步回调外面,先结束了回调里会出错的
        }
    });

    // res.end();
});

server.listen(8080, () => console.log("server 8080"));
