// 鉴权白名单
const whiteList = [
  { method: "POST", path: "/api/admin/loginByCookie" },
  { method: "POST", path: "/api/admin/loginBySession" },
  { method: "POST", path: "/api/admin/loginByJwt" },
  { method: "GET", path: "/extend/captcha" },
  { method: "GET", path: "/api/admin/:id" },
  { method: "POST", path: "/coder", type: "before" },
  { method: "GET", path: "/coder", type: "before" },
];

// 对称加密秘钥
const secretKey = "miyao";

// proxy 服务器
const proxyList = {
  coder: "http://localhost:8778/",
};

module.exports = {
  whiteList,
  secretKey,
  proxyList,
};
