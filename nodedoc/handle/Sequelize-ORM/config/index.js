// 鉴权白名单
const whiteList = [
  { method: "POST", path: "/api/admin/loginByCookie" },
  { method: "POST", path: "/api/admin/loginBySession" },
  { method: "POST", path: "/api/admin/loginByJwt" },
  { method: "GET", path: "/api/admin/:id" },
];

// 对称加密秘钥
const secretKey = "miyao";

// 跨域白名单

module.exports = {
  whiteList,
  secretKey,
};
