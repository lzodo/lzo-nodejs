const { template } = require("express-art-template");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

//分离控制层P|C
exports.login = (req, res) => {
    //接收参数
    let { us, ps } = req.query;

    //处理数据
    if (us == 123 && ps == 456) {
        res.send({ status: 0, message: "router ok 1121" });
    } else {
        res.json({ status: 99, message: "router 请求错误" });
    }
};

exports.all = (req, res) => {
    res.send("无论什么请求方式，只要路径匹配就能调用");
};

//服务端渲染-正常项目开发中数据处理再外部文件model(M)中处理，之后在导入控制器(C|P)中使用
exports.server = (req, res) => {
    res.render("serve.art", {
        data: [1, 2, 3, 4, 5],
        userInfo: {
            name: "user1",
            arg: 10,
            "user key": "keys",
        },
    });
};

//服务端渲染整个页面
exports.serverPage = (req, res) => {
    res.render("page.art", {
        data: [1, 2, 3, 4, 5],
    });
};

//服务端渲染发布静态网页（CMS）
exports.serverStaticPage = (req, res) => {
    //通过模板渲染数据，直接写入文件中
    let page = template(path.join(__dirname, "../views/page.art"), {
        data: "发布页面数据",
    });
    fs.writeFileSync(
        path.join(__dirname, "../public/page_" + Date.now() + ".html"),
        page
    );

    res.send("发布成功");
};

//客户端渲染
exports.client = (req, res) => {
    let data = [1, 2, 3, 4, 5, "line111"];
    //render代替send ，art-template自带的，list模板文件名称
    res.render("client.art", {
        data: data,
    });
};

//获取token
exports.token = (req, res) => {
    //对称加密
    // let tk = jwt.sign({ us: 123, ps: 456 }, "mi-yao-sui-ji-zi-fu");
    // res.send({
    //     status: 0,
    //     token: tk,
    //     parse: jwt.verify(tk, "mi-yao-sui-ji-zi-fu"),
    // });

    //非对称加密
    let privateKey = fs.readFileSync(
        path.join(__dirname, "../keys/rsa_private_key.pem")
    );
    let publicKey = fs.readFileSync(
        path.join(__dirname, "../keys/rsa_public_key.pem")
    );
    let tk = jwt.sign({ us: 123, ps: 4567 }, privateKey, {
        algorithm: "RS256",
    });

    // 也可以通过头部发给前端
    res.set("X-Access-Token", tk);
    //jq ajax 成功回调的第三个参数.getResponseHeader("X-Access-Token") 获取
    //调用接口时传递的话 headers:{"X-Access-Token":localStorage.getItem('token')} 携带
    //后端验证：let token = req.get("X-Access-Token"), 再调用 jwt.verify

    res.send({
        status: 0,
        token: tk,
        parse: jwt.verify(tk, publicKey, { algorithm: "RS256" }),
    });
};

// exports.login = login;
// exports.all = all;
