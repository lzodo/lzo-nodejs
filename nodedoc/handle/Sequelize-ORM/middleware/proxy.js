const {
  createProxyMiddleware,
  fixRequestBody,
} = require("http-proxy-middleware");
const { proxyList } = require("../config");

// 返回一个中间件，将/coder开头的请求，转发到 proxyList.coder 服务器中
exports.httpProxy = createProxyMiddleware({
  target: proxyList.coder,
  changeOrigin: false,
  pathRewrite: { "^/coder": "" },
  // post 请求体处理
  on: {
    proxyReq: fixRequestBody,
  },
});
