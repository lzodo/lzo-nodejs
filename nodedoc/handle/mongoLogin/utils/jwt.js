const jwt = require("jsonwebtoken");
const scrict = "jfjdsajfdsajfdsa"; //私钥

function creatToken(playload) {
    //产生token
    playload.ctime = Date.now();
    playload.exp = 1000 * 60 * 30; //30分钟过期
    // 签名 默认hs256加密方式
    return jwt.sign(playload, scrict);
}
function checkToken(token) {
    return new Promise((resovle, reject) => {
        //验证
        jwt.verify(token, scrict, (err, data) => {
            if (err) {
                reject("token 验证失败");
            }
            //ctime + exp < Data().now 说明超时了
            resolve(data);
        });
    });
}

module.exports = {
    creatToken,
    checkToken,
};
