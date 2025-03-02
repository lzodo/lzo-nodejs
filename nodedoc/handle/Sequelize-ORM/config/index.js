// 鉴权白名单
const whiteList = [
  { method: "POST", path: "/api/admin/loginByCookie" },
  { method: "POST", path: "/api/admin/loginBySession" },
  { method: "GET", path: "/api/admin/:id" },
];

// 跨域白名单

module.exports = {
  whiteList,
};
