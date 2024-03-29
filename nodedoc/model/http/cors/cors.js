const http = require("http");
const url = require("url");
const querystring  = require("querystring")

/**
 * 创建一个web服务器,没有end关闭之前会一直转，res.end("over") == res.write("over") + res.close();
 * listen 主要的三个参数，可选
 *  port ->  不穿系统会生成一个，通过server.address().port可以查看
 *  hostname -> 如果使用127.0.0.1 ，浏览器不能通过ip地址加端口进行访问，捕获不到这个服务
 *           -> 0.0.0.0 可以访问，他监听IPV4下所有地址，不写默认就是这个
 *  callback
 */
let server = http
    .createServer((req, res) => {
        /**
         * req 获取用户提交的信息
         * console.log(req.url)
         * console.log(req.method)
         * console.log(req.headers)
         *   content-type:"..." 代表用户这次传递过来数据的类型,服务器应该安按照这种类型解析得到的数据
         *   accept-encoding："gzip ...",客户端告诉服务器字节可以识别这些类型的压缩文件，如果支持，浏览器得到.gz 自己解压提高速率 
         *   connection:"keep-alive", 保持一定时间活跃，不用直接就断，http1.1默认长连接，在一段事件内如果可以段没有继续发送请求的时候，服务器自己的中断
         *   connection-length:52, 数据长度，每次on data的时候拿到一个进度
         *   accept:"xx/xx",告诉服务器我客户端可以接收的文件类型
         *   user-agent:'xxx',客户端信息
         */

         /**
         * res 响应信息给用户
         *  res.statusCode=200 设置状态码
         *  res.setHeader("Content-Type","text/plain;charset=utf8") 设置header,告诉客户端我返回的是什么类型数据，与对应编码 
         * 
         *  res.writeHead(200,{
         *      "Content-Type","text/plain"
         *  })  方式二
         * 
         *  
         */

        //处理url
        if(req.method == "GET"){
            let urlObj = url.parse(req.url, true);
            
            let query = querystring.parse("a=b&c=88");
            console.log(query)
        }

        //body 内容
        //res 默认是没有body的
        if(req.method == "POST"){
            // 设置编码
            // req.setEncoding("binary");//图片文件
            req.setEncoding("utf-8");//这样得到的就是正常文字了
            req.on("data",(data)=>{
                console.log(data); //得到一个json字符串
                // console.log(data.toString()); //转文字默认得到的是buffer数据
            })
        }



        switch (urlObj.pathname) {
            case "/api/data":
                res.writeHead(200, {
                    "content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                });

                res.write('{"data":"hello"}');
                break;
            default:
                console.log("正常访问");
        }
        res.end('以及结束了');
    })
    .listen("8084", () => {
        console.log("listen port success 8084");
        server.address().port; //查看端口号
    });

/**
 * 创建方式2
 */

const  server2 = new http.Server((req,res)=>{
    res.end("serve2 end");
})

server2.listen()


/** 第三方插件
 * 
 *  var cors = require('cors')
    var app = express()
    
    app.use(cors())
 */

