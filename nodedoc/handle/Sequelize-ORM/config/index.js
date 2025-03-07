// 鉴权白名单
const whiteList = [
  { method: "POST", path: "/api/admin/loginByCookie" },
  { method: "POST", path: "/api/admin/loginBySession" },
  { method: "POST", path: "/api/admin/loginByJwt" },
  { method: "GET", path: "/extend/captcha" },
  { method: "GET", path: "/api/admin/:id" },
  { method: "GET", path: "/" },
  { path: "/coder", type: "before" },
  { path: "/api-docs", type: "before" },
];

// 对称加密秘钥
const secretKey = "miyao";

// proxy 服务器
const proxyList = {
  coder: "http://localhost:8778/",
};

// 服务器
const servers = {
  port: 5008,
};

const mysqlConfig = {
  database: "duyi_myschooldb",
  account: "root",
  passwd: "Lzx542684.@",
  host: "192.168.203.132",
};

module.exports = {
  whiteList,
  secretKey,
  proxyList,
  servers,
  mysqlConfig,
};
