const http = require("http");
const fs = require("fs");
const qs = require("querystring");
const path = require("path")

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

        let body = "";
        let boundary = qs.parse(req.headers["content-type"], ";", "=");
        let fileSize = req.headers['content-length']
        console.log(boundary[" boundary"]);

        req.on("data", (data) => {
            body += data;
        });
        req.on("end", () => {
            // console.log(body);
            console.log('=================222');
            let payload = qs.parse(body, "\r\n", ":"); //解析body，为了达到文件类型位置

            let other_info = qs.parse(payload['Content-Disposition'], ";", "=");
            let exp = path.extname(other_info[' filename'])
            
            console.log(payload['Content-Disposition'])
            console.log(payload["Content-Type"])
            console.log(other_info)

            let type = payload["Content-Type"]; //获取文件类型
            let fileData = body.substring(body.indexOf(type) + type.length); //文件内容为图片类型后面

            // let reg = new RegExp(`^\\s*`); //不包括前面空格与后面boundary的部分
            // let reg2 = new RegExp(`--${boundary[" boundary"]}--\\s*$`);
            // console.log(reg);
            // console.log(reg2);
            // fileData = fileData.replace(reg, "");
            // fileData = fileData.replace(reg2, "");

            let reg = new RegExp(`^\\s*`); //不包括前面空格与后面boundary的部分,测试后面boundary可用保留
            console.log(reg);
            fileData = fileData.replace(reg, "");

            // 写入到文件中
            let fileName = path.resolve(__dirname,`../testfiles/${new Date().getTime()}${exp}`)
            fileName = fileName.replace("\"","");
            fs.writeFile(fileName, fileData, "binary", (err) => {
                console.log("数据上传完毕");
            });
        });

        res.end("上传成功");
    }
}).listen(8889, () => {
    console.log("启动图片上传服务");
});
