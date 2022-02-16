const http = require("http");
const url = require("url");
const { createProxyMiddleware } = require("http-proxy-middleware"); //处理代理跨域

//https://mapi.vip.com/vips-mobile/rest/pcoperation/switch/v1?callback=getSwitch1611582452180&app_name=shop_pc&app_version=1&warehouse=VIP_NH&fdc_area_id=103105101&client=pc&mobile_platform=1&province_id=103105&api_key=70f71280d5d547b2a7bb370a529aeea1&user_id=&mars_cid=1611579565351_46431449f9bb78201c070eac53cf56cd&wap_consumer=a&switch_id=444&_=1611582452132
let server = http
    .createServer((req, res) => {
        let url = req.url;

        res.writeHead(200, {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*", //处理页面访问服务器产生的跨域
        });

        //如果访问路径以api开头
        if (/^\/api/.test(url)) {
            let ajaxProxy = createProxyMiddleware("/api", {
                target: "https://mapi.vip.com", //要访问的跨域网址
                changeOrigin: true, //切换源
                pathRewrite: {
                    //重写地址 因为访问的地址是没有api的,所有把/api替换成空
                    //如果本来就有api那么就不需要这一步
                    "^/api": "",
                },
            });

            //http://localhost:8084/ajax 拦截
            //将 前面部分替换成target
            //再通过ajaxProxy 将拿到的数据返回前端

            ajaxProxy(req, res); //不要再 res.end();
        }

        // res.end();
    })
    .listen("8084", () => {
        console.log("listen port success 8084");
    });
