const http = require("http");
const url = require("url");

let server = http
    .createServer((req, res) => {
        let urlObj = url.parse(req.url, true);
        switch (urlObj.pathname) {
            case "/api/data":
                //返回到页面上会被当做js执行
                //数据两端的的函数被当做填充(padding)，就是jsonp的p

                res.write(`${urlObj.query.cb}('数据')`);
                break;
            default:
                console.log("正常访问");
        }
        res.end();
    })
    .listen("8084", () => {
        console.log("listen port success 8084");
    });
