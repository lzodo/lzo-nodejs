/**
 * 依赖可视化
 * npm -g install madge
 * yum install graphviz
 * 终端直接执行 madge --image graph.png ./main.js    =>   graph.png
 */

// 代码中使用
const madge = require("madge");

madge("/opt/lzo-project/lzo-tsvue-admin/src/main.ts").then((res) => {
  console.log(res.leaves());
});
