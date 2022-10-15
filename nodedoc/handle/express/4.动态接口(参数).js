const express = require("express");
const app = express();

app.get("/products/:id/:name", (req, res, next) => { 
    console.log(req.params);
    // console.log(req.query); 获取query
    res.end(req.params)
})

// http://localhost:3004/products/idval/nameval  可以获取到这连个动态参数

app.listen(3004, () => {
    console.log("服务开启成功，请通过: http://localhost:3004/ 进行访问");
});
