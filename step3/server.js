const http = require("http");
const url = require("url");
const querystring = require("querystring");
const fs = require("fs");

let server = http.createServer((req, res) => {
    //处理get数据
    let { pathname, query } = url.parse(req.url, true);
    console.log(pathname, query);

    //处理post数据
    let str = "";
    req.on("data", (data) => {
        str += data;
    });

    //接收结束了就会触发end事件
    req.on("end", () => {
        let post = querystring.parse(str);
        //操作数据
        switch (pathname) {
            case "/reg":
                break; //注册
            case "/login":
                break; //登录
            default:
                //其他
                fs.readFile(`www${pathname}`, (err, data) => {
                    if (err) {
                        res.writeHeader(404); //设置状态码
                        res.write("Not Found"); //写入页面的内容
                    } else {
                        console.log(data);
                        res.write(data);
                    }
                    res.end(); //告诉浏览器结束了 不然会一直转 尽量不要放在异步回调外面,先结束了回调里会出错的
                });
        }
    });

    // res.end();
});

server.listen(8080);
