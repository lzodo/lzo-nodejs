const express = require("express");
const app = express();

app.get("/products/:id/:name", (req, res, next) => { 

    // res.type("application/json") 
    res.status("200") // 设置响应码
    res.json(req.params) // 返回json数据
}) 

app.listen(3004, () => {
    console.log("服务开启成功，请通过: http://localhost:3004/ 进行访问");
});
