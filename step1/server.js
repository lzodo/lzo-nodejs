const http = require("http");
const fs = require("fs");

let server = http.createServer((req, res) => {
    //不论请求什么地址,只要是这个端口都会来这里
    //request 请求(服务器接收)
    // switch(req.url){
    // 	case '/':res.write('只要根目录才能来这');
    // 	break;
    // 	default:res.write('除了根目录都能来这');
    // 	break;
    // }
    //已读取文件方式做一上操作(首先需要一个可以被随便访问的目录 如www)
    console.log(req.url);
    fs.readFile(`www${req.url}`, (err, data) => {
        if (err) {
            res.writeHeader(404); //设置状态码
            res.write("Not Found"); //写入页面的内容
        } else {
            console.log(data);
            res.write(data);
        }
        res.end(); //告诉浏览器结束了 不然会一直转 尽量不要放在异步回调外面,先结束了回调里会出错的
    });

    //response 响应（服务器响应）
    //res.write('都回来');
});

server.listen(8080); //浏览器访问localhost:8080就用这个服务器
