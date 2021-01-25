const http = require("http");
const url = require("url");

let server = http
    .createServer((req, res) => {
        let urlObj = url.parse(req.url, true);
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
        res.end();
    })
    .listen("8084", () => {
        console.log("listen port success 8084");
    });

/** 第三方插件
 * 
 *  var cors = require('cors')
    var app = express()
    
    app.use(cors())
 */
