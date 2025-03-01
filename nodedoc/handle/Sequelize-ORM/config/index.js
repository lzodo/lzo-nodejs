// 鉴权白名单
const whiteList = [
  { method: "POST", path: "/api/admin/loginByCookie" },
  { method: "PUT", path: "/api/admin/:id" },
];

// 跨域白名单

module.exports = {
  whiteList,
};
