const http = require("http");
const fs = require("fs");
const qs = require("querystring")

//直接读取上传的文件流，并写入文件是不对的，因为文件流中不仅包括文件内容，还有boundary(数据分隔符号)、文件名称、属性类型等其他东西是不能写入的
/**
 * ----------------------------953800592292028662124168   boundary可以冲请求头的content-type后面获取
 * Content-Disposition: form-data; name="11111"; filename="b1.png"
 * Content-Type: image/png
 * xxxxxxx
 * ----------------------------953800592292028662124168
 * Content-Disposition: form-data; name="22222"  // 如果传入类第二个字段
 *
 * 22222333
 * ----------------------------953800592292028662124168--
 */
http.createServer((req, res) => {
    if (req.url == "/upload") {
        req.setEncoding("binary");

        let body = ""
        let boundary = qs.parse(req.headers['content-type'],";","=");
        console.log(boundary[' boundary'])
        req.on("data", (data) => {
            body += data;
        })
        req.on("end", () => {
            console.log(body)
            let payload = qs.parse(body, "\r\n", ":");
            let type = payload["Content-Type"]; //获取文件类型
            let typeIndex = body.indexOf(type);
            let fileData = body.substring(typeIndex + type.length)
            let reg = new RegExp(`^\\s*`);
            let reg2 = new RegExp(`--${boundary[' boundary']}--\\s*$`);
            console.log(reg)
            console.log(reg2)
            fileData=fileData.replace(reg,"");
            fileData=fileData.replace(reg2,"");
            console.log('fileDat===========================================a');

            console.log(fileData);

            fs.writeFile("./1112.png",fileData,'binary',(err)=>{
                console.log("数据上传完毕")
            })
        })

        res.end();
    }

}).listen(8888, () => {
    console.log("启动图片上传服务")
})