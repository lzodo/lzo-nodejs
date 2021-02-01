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

//服务端渲染
exports.server = (req, res) => {
    let data = `<ul><li>1</li><li>2</li><li>3</li><li>4</li></ul>`;
    res.send(data);
};

//客户端渲染
exports.client = (req, res) => {
    // let data = {
    //     status: 0,
    //     data: [
    //         {
    //             key: "name",
    //             val: "1",
    //         },
    //         {
    //             key: "name",
    //             val: "2",
    //         },
    //     ],
    // };

    let data = "[1, 2, 3, 4, 5]";
    //render代替send ，art-template自带的，list模板文件名称
    res.render("list.art", {
        data: data,
    });
};

// exports.login = login;
// exports.all = all;
