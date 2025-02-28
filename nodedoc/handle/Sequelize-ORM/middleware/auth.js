const { decrypt } = require("../utils/crypt");
const { sendErrResult } = require("../utils/tools");

exports.authByCookie = function (req, res, next) {
  const token = req.cookies.token;
  //   const token = req.signedCookies.token;
  req.userId = decrypt(token);
  if (token) {
    next();
  } else {
    res.send(sendErrResult("鉴权失败"));
  }
};
