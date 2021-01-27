const http = require("http");
const url = require("url");
const querystring = require("querystring");
const fs = require("fs");

let server = http.createServer((req, res) => {
    //处理get数据
    let { pathname, query } = url.parse(req.url, true);
    // console.log(pathname, query);
    // console.log(req.socket.remotePort); //NET 模块下 socket.remotePort 获取客户端的端口号

    //处理post数据
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
            case "/":
                res.write("根目录");
                res.end();
                break; //注册
            case "/reg":
                res.write("reg");
                res.end();
                break; //注册
            case "/login":
                res.end("login");
                break; //登录
            case "/readimg.jpg":
                fs.readFile(`www/readimg.jpg`, (err, data) => {
                    if (err) {
                        res.writeHeader(404); //设置状态码
                        res.write("err"); //写入页面的内容
                    } else {
                        /**
                         * 不同资源 Content-Type 不一样的,图片不需要指定编码
                         */
                        res.setHeader("Content-Type", "image/jpeg"); //设置编码
                        res.write(data);
                    }
                    res.end();
                });
                break;
            default:
                //其他
                fs.readFile(`www${pathname}`, (err, data) => {
                    if (err) {
                        res.writeHeader(404); //设置状态码
                        res.write("errr"); //写入页面的内容
                    } else {
                        console.log(data);
                        res.writeHeader(200, {
                            "content-type": "text/html", //设置返回的数据的类型
                        });
                        res.write(data);
                    }
                    res.end(); //告诉浏览器结束了 不然会一直转 尽量不要放在异步回调外面,先结束了回调里会出错的
                });
        }
    });

    // res.end();
});

server.listen(8080);
